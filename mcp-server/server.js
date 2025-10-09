import express from "express";
import { execSync } from "child_process";
import fs from "fs";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

// Run Playwright tests
app.post("/run-tests", (req, res) => {
  try {
    console.log("🚀 Running Playwright tests...");
    
    // Create test-results directory if it doesn't exist
    if (!fs.existsSync('./test-results')) {
      fs.mkdirSync('./test-results', { recursive: true });
    }
    
    // Run tests and capture output
    const result = execSync("npx playwright test --reporter=json --output-dir=test-results", { 
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    // Save results to file
    fs.writeFileSync('./test-results/results.json', result);
    
    res.json({ 
      status: "success", 
      message: "Tests executed successfully", 
      report: JSON.parse(result || '{}') 
    });

  } catch (err) {
    console.error('Test execution failed:', err.message);
    
    // Save error to results file
    const errorResult = {
      status: 'failed',
      error: err.message,
      timestamp: new Date().toISOString()
    };
    
    if (!fs.existsSync('./test-results')) {
      fs.mkdirSync('./test-results', { recursive: true });
    }
    
    fs.writeFileSync('./test-results/results.json', JSON.stringify(errorResult, null, 2));
    
    res.status(500).json({ status: "failed", message: err.message });
  }
});

// Email Test Report
app.post("/send-report", async (req, res) => {
  try {
    const { email } = req.body;
    const reportPath = "./test-results/results.json";
    
    console.log('📧 Attempting to send email to:', email);
    console.log('📁 Looking for report at:', reportPath);
    
    if (!fs.existsSync(reportPath)) {
      console.log('❌ Report file not found');
      return res.status(404).json({ status: "error", message: "No test report found" });
    }

    const report = fs.readFileSync(reportPath, "utf-8");
    console.log('📄 Report content length:', report.length);

    if (!process.env.REPORT_EMAIL || !process.env.REPORT_PASS) {
      console.log('❌ Email credentials not found');
      return res.status(500).json({ status: "error", message: "Email credentials not configured" });
    }

    let transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.REPORT_EMAIL,
        pass: process.env.REPORT_PASS,
      },
    });

    const mailOptions = {
      from: process.env.REPORT_EMAIL,
      to: email || process.env.REPORT_EMAIL,
      subject: "🧪 Password Generator Test Results",
      text: "Automated test results from your Password Generator project.",
      html: `
        <h2>🧪 Test Results</h2>
        <p>Your Password Generator tests have completed.</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p>See attached JSON file for detailed results.</p>
      `,
      attachments: [{ filename: "test-results.json", content: report }],
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully');

    res.json({ status: "sent", message: "Email delivered successfully" });
  } catch (error) {
    console.error('❌ Email error:', error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.listen(4000, () => {
  console.log("✅ MCP Server running on http://localhost:4000");
  console.log("📧 Email configured:", !!process.env.REPORT_EMAIL);
});
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
    execSync("npx playwright test --reporter=json", { stdio: "inherit" });

    const reportPath = "./test-results/results.json";
    const report = fs.existsSync(reportPath)
      ? fs.readFileSync(reportPath, "utf-8")
      : "{}";

    res.json({ status: "success", message: "Tests executed", report: JSON.parse(report) });

  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
});

// Email Test Report
app.post("/send-report", async (req, res) => {
  try {
    const { email } = req.body;
    const reportPath = "./test-results/results.json";
    
    if (!fs.existsSync(reportPath)) {
      return res.status(404).json({ status: "error", message: "No test report found" });
    }

    const report = fs.readFileSync(reportPath, "utf-8");

    let transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.REPORT_EMAIL,
        pass: process.env.REPORT_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.REPORT_EMAIL,
      to: email,
      subject: "Automated Test Report",
      text: "See attached test results.",
      attachments: [{ filename: "test-report.json", content: report }],
    });

    res.json({ status: "sent", message: "Email delivered" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.listen(4000, () => console.log("✅ MCP Server running on http://localhost:4000"));
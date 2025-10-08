# MCP Server + Playwright Automation

## Quick Start

1. Install dependencies:
```bash
npm install
npx playwright install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your email credentials
```

3. Start MCP Server:
```bash
npm run mcp-server
```

4. Trigger tests via API:
```bash
curl -X POST http://localhost:4000/run-tests
```

5. Send email report:
```bash
curl -X POST http://localhost:4000/send-report -H "Content-Type: application/json" -d '{"email":"developer@company.com"}'
```

## Workflow
- Push code → GitHub Action → MCP Server → Playwright tests → Email/Slack notification
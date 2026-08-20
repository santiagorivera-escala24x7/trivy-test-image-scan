const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    service: 'phoenix-mid-hub-api (trivy-test replica)',
    status: 'running',
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    uptime: process.uptime(),
    env: {
      TZ: process.env.TZ,
      PUPPETEER_EXECUTABLE_PATH: process.env.PUPPETEER_EXECUTABLE_PATH
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Trivy test app listening on port ${port}`);
});

const dotenv = require('dotenv');
const http = require('http');

dotenv.config({ path: '.env.development.local' });

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Test!');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
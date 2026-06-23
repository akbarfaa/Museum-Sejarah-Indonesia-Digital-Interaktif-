const http = require('http');

const url = 'http://localhost:8081/assets/artifacts/nias-megalith.png';

http.get(url, (res) => {
  console.log(`URL: ${url}`);
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Headers:');
  console.log(res.headers);
  
  let data = [];
  res.on('data', (chunk) => {
    data.push(chunk);
  });
  
  res.on('end', () => {
    const buffer = Buffer.concat(data);
    console.log(`Response length: ${buffer.length} bytes`);
    if (buffer.length > 0) {
      console.log(`First 50 characters of response: "${buffer.slice(0, 50).toString('utf-8').replace(/[\r\n]+/g, ' ')}"`);
    }
  });
}).on('error', (err) => {
  console.error(`Error connecting to server: ${err.message}`);
});

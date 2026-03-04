const express = require('express');
const app = express();
app.get('/data', (req, res) => res.json({ message: "Hello from HTTP Backend!" }));
app.listen(5000, () => console.log('API Server on 5000'));
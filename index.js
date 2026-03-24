const express = require('express');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/generate', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const qrDataUrl = await QRCode.toDataURL(text);
    res.json({ qr: qrDataUrl });
  } catch (error) {
    console.error('QR generation error:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

app.listen(port, () => {
  console.log(`QR Code Generator server running at http://localhost:${port}`);
});
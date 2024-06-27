const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.get('/', (req, res) => {
    const secret = 'secret';
    const hash = crypto.createHmac('sha256', secret)
                       .update('Hello World')
                       .digest('hex');
    res.json({ message: `GET request: ${hash}` });
});

router.post('/', (req, res) => {
    const secret = 'secret';
    const hash = req.body.hash;
    const decipher = crypto.createDecipher('aes256', secret);
    let decrypted = '';
    decipher.on('readable', () => {
        const data = decipher.read();
        if (data)
            decrypted += data.toString('utf8');
    });
    decipher.on('end', () => {
        res.json({ message: `POST request: ${decrypted}` });
    });
    decipher.write(hash, 'hex');
    decipher.end();
});

router.delete('/', (req, res) => {
    res.json({ message: 'DELETE request received' });
});

module.exports = router;

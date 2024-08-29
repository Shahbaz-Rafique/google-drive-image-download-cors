const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import cors middleware
const app = express();
const port = 3000;

// Use cors middleware
app.use(cors());

app.get('/fetch-image', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send('Image URL is required');
    }

    try {
        const response = await axios({
            url: url,
            method: 'GET',
            responseType: 'arraybuffer'
        });
        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Error fetching image');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

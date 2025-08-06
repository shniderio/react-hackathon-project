import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

app.get('/api/hiscores', async (req, res) => {
    const { player } = req.query;
    if (!player) {
        return res.status(400).json({ error: 'Missing player name' });
    }

    try {
        const response = await fetch(`https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${player}`);
        if (!response.ok) throw new Error('Player not found');
        const data = await response.text();
        res.send(data); // Send the raw CSV-like text
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});
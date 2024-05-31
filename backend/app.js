const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Endpoint to check server status
app.get('/api/status', (req, res) => {
    res.json({ status: 'Server is running' });
});

// The "catchall" handler: for any request that doesn't match the above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

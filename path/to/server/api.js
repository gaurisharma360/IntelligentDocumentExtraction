// Import necessary modules
const express = require('express');
const path = require('path');
const fs = require('fs');

// Create an instance of an Express application
const app = express();

// Define the port the server will listen on
const PORT = process.env.PORT || 3000;

// API endpoint to serve PDF files
app.get('/api/pdf/:filename', (req, res) => {
    // Extract the filename from the request parameters
    const filename = req.params.filename;

    // Construct the full path to the PDF file
    const filePath = path.join(__dirname, 'pdfs', filename);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If the file does not exist, send a 404 response
            return res.status(404).send('File not found');
        }

        // Set the correct MIME type for PDF
        res.setHeader('Content-Type', 'application/pdf');

        // Create a read stream and pipe it to the response
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

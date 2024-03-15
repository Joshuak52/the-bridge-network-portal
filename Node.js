// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to log every request IP address
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`Client IP: ${ip}`);

    // Read the existing log file
    fs.readFile('log.json', (err, data) => {
        if (err && err.code === 'ENOENT') {
            // If the log file doesn't exist, create a new one
            fs.writeFile('log.json', JSON.stringify([ip]), (err) => {
                if (err) throw err;
                console.log('Log file created and IP logged.');
            });
        } else {
            // If the log file exists, append the new IP
            let ips = JSON.parse(data);
            if (!ips.includes(ip)) { // Avoid duplicate IPs, optional
                ips.push(ip);
                fs.writeFile('log.json', JSON.stringify(ips), (err) => {
                    if (err) throw err;
                    console.log('IP logged.');
                });
            }
        }
    });

    next(); // Continue to the next middleware/route handler
});

// Serve your static files (HTML, CSS, JS)
app.use(express.static('public')); // Assuming your HTML file is located in the `public` directory

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

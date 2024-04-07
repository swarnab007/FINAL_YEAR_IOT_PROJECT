const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Use bodyParser middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to receive alerts from ESP32 device
app.post('/alert', (req, res) => {
    const { distance } = req.body;
    // Process the received alert data
    if (distance <= 20) {
        console.log('Alert: Water level too low!');
        // Send notification or take necessary action
    } else if (distance >= 100) {
        console.log('Alert: Water level too high!');
        // Send notification or take necessary action
    } else {
        console.log('Water level within acceptable range.');
    }
    res.sendStatus(200); // Send response back to the ESP32 device
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

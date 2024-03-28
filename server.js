const express = require('express');
const app = express();
const port = 8383;

app.use(express.static('public'));
app.use(express.json());

let scores = []; // Array to store scores

app.get('/scores', (req, res) => {
    // Sort the scores array based on the number of tries (ascending)
    scores.sort((a, b) => a.tries - b.tries);
    res.json(scores); // Send the sorted scores as a JSON response
});


app.post('/scores', (req, res) => {
    const newScore = req.body;
    scores.push(newScore); // Add the new score to the array
    res.status(201).json(newScore); // Send back the new score
});

// Endpoint to clear the scores
app.post('/clearScores', (req, res) => {
    scores = []; // Reset the scores array
    res.status(200).send('Scores cleared');
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));

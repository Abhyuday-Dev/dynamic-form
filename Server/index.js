const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());


app.use(express.json());

const questions = {
  Technology: ["What is your favorite IDE?", "Do you contribute to open-source projects?"],
  Health: ["Do you track your daily calorie intake?", "Do you prefer home workouts or gym?"],
  Education: ["What was your favorite subject in school?", "Do you prefer online courses or in-person classes?"],
};

app.post('/submit', (req, res) => {
    const additionalQuestions = questions[req.body.surveyTopic] || [];
    res.json({ additionalQuestions });
  });

app.get('/questions', (req, res) => {
  const topic = req.query.topic;
  res.json({ questions: questions[topic] || [] });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

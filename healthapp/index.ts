import express from 'express';
import { calculateBmi } from "./bmiCalculator.js";
import { calculateExercises } from "./exerciseCalculator.js";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (req.query.height === undefined || req.query.weight === undefined || isNaN(height) || isNaN(weight)) {
    res.status(400).json({
      error: "malformatted parameters"
    });
    return;
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({
      error: "parameters missing"
    });
    return;
  }

  if ( !Array.isArray(daily_exercises) || isNaN(Number(target)) || daily_exercises.some((n: unknown) => isNaN(Number(n)))) {
    res.status(400).json({
      error: "malformatted parameters"
    });
    return;
  }

  res.json(calculateExercises(daily_exercises.map(Number), Number(target)));

});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
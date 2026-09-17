import express, { type ErrorRequestHandler } from 'express';
import activityModel from './models/Activity.js';
import leaderboardModel from './models/Leaderboard.js';
import teamModel from './models/Team.js';
import userModel from './models/User.js';
import workoutModel from './models/Workout.js';
import createCrudRouter from './routes/api.js';
import { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', createCrudRouter(userModel));
app.use('/api/teams', createCrudRouter(teamModel));
app.use('/api/activities', createCrudRouter(activityModel));
app.use('/api/leaderboard', createCrudRouter(leaderboardModel));
app.use('/api/workouts', createCrudRouter(workoutModel));

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  const status = error?.name === 'ValidationError' ? 400 : 500;
  response.status(status).json({ error: error?.message || 'Internal server error' });
};
app.use(errorHandler);

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Octofit API listening at ${apiBaseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start Octofit API:', error);
  process.exitCode = 1;
});

export default app;

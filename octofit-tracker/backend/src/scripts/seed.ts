import mongoose from 'mongoose';
import activityModel from '../models/Activity.js';
import leaderboardModel from '../models/Leaderboard.js';
import teamModel from '../models/Team.js';
import userModel from '../models/User.js';
import workoutModel from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      activityModel.deleteMany({}),
      leaderboardModel.deleteMany({}),
      teamModel.deleteMany({}),
      userModel.deleteMany({}),
      workoutModel.deleteMany({}),
    ]);

    const users = await userModel.insertMany([
      {
        username: 'alex.runner',
        email: 'alex.runner@example.com',
        passwordHash: 'seeded-password-hash-alex',
        displayName: 'Alex Rivera',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      {
        username: 'jamie.strength',
        email: 'jamie.strength@example.com',
        passwordHash: 'seeded-password-hash-jamie',
        displayName: 'Jamie Chen',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
      },
      {
        username: 'taylor.yoga',
        email: 'taylor.yoga@example.com',
        passwordHash: 'seeded-password-hash-taylor',
        displayName: 'Taylor Morgan',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      },
    ]);

    const teams = await teamModel.insertMany([
      {
        name: 'Morning Movers',
        description: 'A friendly team for consistent early workouts.',
        ownerId: users[0]._id,
        memberIds: [users[0]._id, users[2]._id],
      },
      {
        name: 'Strength Circuit',
        description: 'Progressive strength training and accountability.',
        ownerId: users[1]._id,
        memberIds: [users[1]._id, users[0]._id],
      },
    ]);

    await activityModel.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        durationMinutes: 35,
        calories: 410,
        distance: 5.2,
        completedAt: new Date('2026-09-15T07:30:00Z'),
        notes: 'Easy pace along the river trail.',
      },
      {
        userId: users[1]._id,
        type: 'Strength training',
        durationMinutes: 48,
        calories: 360,
        completedAt: new Date('2026-09-14T18:00:00Z'),
        notes: 'Upper-body and core session.',
      },
      {
        userId: users[2]._id,
        type: 'Yoga',
        durationMinutes: 30,
        calories: 150,
        completedAt: new Date('2026-09-16T06:45:00Z'),
        notes: 'Mobility-focused flow.',
      },
    ]);

    await leaderboardModel.insertMany([
      { userId: users[0]._id, teamId: teams[0]._id, points: 840, rank: 1, period: '2026-09' },
      { userId: users[1]._id, teamId: teams[1]._id, points: 720, rank: 2, period: '2026-09' },
      { userId: users[2]._id, teamId: teams[0]._id, points: 610, rank: 3, period: '2026-09' },
    ]);

    await workoutModel.insertMany([
      {
        title: 'Trail Run Builder',
        description: 'Build steady endurance with a progressive outdoor run.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: [
          { name: 'Warm-up walk', durationSeconds: 300 },
          { name: 'Steady run', durationSeconds: 1500 },
          { name: 'Cool-down walk', durationSeconds: 600 },
        ],
        tags: ['cardio', 'outdoors', 'endurance'],
      },
      {
        title: 'Full Body Foundations',
        description: 'A balanced strength session using simple movements.',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: [
          { name: 'Bodyweight squat', sets: 3, reps: 12 },
          { name: 'Push-up', sets: 3, reps: 8 },
          { name: 'Plank', sets: 3, durationSeconds: 30 },
        ],
        tags: ['strength', 'full-body', 'foundations'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

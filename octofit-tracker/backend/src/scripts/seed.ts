import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [teamNova, teamSummit] = await Team.create([
      { name: 'Team Nova', color: '#e85d04', motto: 'Small steps, stellar results' },
      { name: 'Team Summit', color: '#0077b6', motto: 'Climb stronger together' },
    ]);

    const [maya, liam, sofia, noah] = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', avatar: 'MC', team: teamNova._id },
      { name: 'Liam Carter', email: 'liam.carter@example.com', avatar: 'LC', team: teamNova._id },
      { name: 'Sofia Rodriguez', email: 'sofia.rodriguez@example.com', avatar: 'SR', team: teamSummit._id },
      { name: 'Noah Williams', email: 'noah.williams@example.com', avatar: 'NW', team: teamSummit._id },
    ]);

    const completedAt = new Date('2026-08-27T08:00:00.000Z');
    await Activity.create([
      { user: maya._id, type: 'run', durationMinutes: 32, distanceKm: 5.2, calories: 410, completedAt },
      { user: liam._id, type: 'strength', durationMinutes: 45, calories: 360, completedAt: new Date(completedAt.getTime() - 3600000) },
      { user: sofia._id, type: 'cycle', durationMinutes: 50, distanceKm: 18.4, calories: 520, completedAt: new Date(completedAt.getTime() - 7200000) },
      { user: noah._id, type: 'swim', durationMinutes: 35, distanceKm: 1.4, calories: 390, completedAt: new Date(completedAt.getTime() - 10800000) },
    ]);

    await Leaderboard.create([
      { user: maya._id, points: 1840, weeklyStreak: 8, rank: 1 },
      { user: sofia._id, points: 1715, weeklyStreak: 6, rank: 2 },
      { user: liam._id, points: 1490, weeklyStreak: 5, rank: 3 },
      { user: noah._id, points: 1320, weeklyStreak: 4, rank: 4 },
    ]);

    await Workout.create([
      {
        title: 'Foundation Strength',
        category: 'strength',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Glute bridges', 'Dead bugs'],
      },
      {
        title: 'Tempo Builder',
        category: 'cardio',
        difficulty: 'intermediate',
        durationMinutes: 30,
        exercises: ['Warm-up jog', 'Tempo intervals', 'Walking recovery', 'Cool-down stretch'],
      },
      {
        title: 'Athlete Mobility Flow',
        category: 'mobility',
        difficulty: 'advanced',
        durationMinutes: 40,
        exercises: ['World7s greatest stretch', 'Cossack squats', 'Thoracic rotations', 'Pigeon pose'],
      },
    ]);

    console.log('Seeded 2 teams, 4 users, 4 activities, 4 leaderboard entries, and 3 workouts');
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();

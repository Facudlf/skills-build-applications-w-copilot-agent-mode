import { Router } from 'express';
import Activity from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response, next) => {
  try {
    const activities = await Activity.find().populate('user', 'name email').sort({ completedAt: -1 }).lean();
    response.json(activities);
  } catch (error) {
    next(error);
  }
});

export default activitiesRouter;
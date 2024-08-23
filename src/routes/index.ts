//src>routes>index.ts
import express, { IRouter } from 'express';
import userRoute from './user.route';
import NoteRoutes from './note.route'; 

const router = express.Router();
router.use(express.json());

const routes = (): IRouter => {
  router.get('/home', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', new userRoute().getRoutes());
  router.use('/notes', new NoteRoutes().getRoutes()); 

  return router;
};

export default routes;
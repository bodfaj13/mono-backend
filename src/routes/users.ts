import express, { Response, Request } from 'express';
import usersController from '../controllers/users';
import authMiddleware from '../middleware/auth';

const router = express.Router();


router.post('/signup', (req: Request, res: Response) => usersController.signupUser(req, res));

router.post('/login', (req: Request, res: Response) => usersController.loginUser(req, res));

router.patch('/deleteaccount', authMiddleware.checkToken,(req: Request, res: Response) => usersController.deleteUserAccount(req, res));

export default router;

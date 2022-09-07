import express, { Response, Request } from 'express';
import accountsController from '../controllers/accounts';
import monoMiddleware from '../middleware/mono';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});


router.post('/webhook/mono', monoMiddleware.verifyWebhook, (req: Request, res: Response) => accountsController.monoWebHook(req, res));

export default router

import express, { Response, Request } from 'express';
import accountsController from '../controllers/accounts';
import authMiddleware from '../middleware/auth';
const router = express.Router();

router.post('/linkaccount', authMiddleware.checkToken, (req: Request, res: Response) => accountsController.linkAccount(req, res));

router.get('/linkedaccounts', authMiddleware.checkToken, (req: Request, res: Response) => accountsController.getLinkedAccounts(req, res));

router.get('/transactions/:accountId', authMiddleware.checkToken, (req: Request, res: Response) => accountsController.getAccountTransactions(req, res));

router.patch('/unlink/:_id/:accountId', authMiddleware.checkToken, (req: Request, res: Response) => accountsController.unLinkAccount(req, res));

export default router;

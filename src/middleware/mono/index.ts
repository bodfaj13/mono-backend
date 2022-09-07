import { Response, Request, NextFunction } from 'express';

const verifyWebhook = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['mono-webhook-secret'] !== process.env.MONO_WEBHOOK_SECRET_KEY) {
    return res.status(401).json({
      message: "Unauthorized request."
    });
  }
  next();
}


const monoMiddleware = {
  verifyWebhook
}

export default monoMiddleware
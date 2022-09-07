import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import usersService from '../../services/users'


const createTokens = (data: any) => {
  data.password = undefined
  const token = jwt.sign({ data }, process.env.JWT_SECRET || '')

  const refreshToken = jwt.sign({ data }, process.env.JWT_SECRET || '')

  return {
    token,
    refreshToken
  }
}

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.header("authorization");
  const token = headerToken && headerToken.split(' ')[1];

  try {
    const decodedData: any = jwt.verify(token || '', process.env.JWT_SECRET || '')

    const { data } = decodedData

    const checkUser: any = await usersService.getUserById({ id: data._id })

    if (checkUser === null) {
      return res.status(401).json({
        success: false,
        message: "Please login to continue"
      })
    }

    if(checkUser.isActive !== true) {
      return res.status(401).json({
        success: false,
        message: "Please login to continue"
      })
    }

    req.user = checkUser

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Please login to continue"
    })
  }
}


const authMiddleware = {
  createTokens,
  checkToken
}

export default authMiddleware
import { Response, Request } from 'express';
import validator from 'validator';
import usersService from "../services/users";
import Utils from '../utils';
import authMiddleware from '../middleware/auth';
import { DocumentUpdateObject } from '../utils/helper-interface';


const signupUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body

  try {
    let validationErrors: {
      email?: string,
      password?: string,
    } = {}

    const checkEmailAddress = await usersService.checkEmailAddress({ email })

    const checkPassword = validator.isStrongPassword(password)

    if (checkEmailAddress) {
      validationErrors.email = 'Email already exists'
    }

    if (!checkPassword) {
      validationErrors.password = 'Password must contain minimun of eight characters, at least one uppercase letter, one lonwercase letter, one number and one special character'
    }


    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).send({
        success: false,
        message: 'Validation failed',
        error: validationErrors
      })
    }

    await usersService.createUser({ email, password, firstName, lastName })

    return res.status(200).send({
      success: true,
      message: 'User created successfully',
    })


  } catch (error) {
    Utils.handleError(res, error)
  }
}

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {

    const getUser = await usersService.checkEmailAddress({ email })

    if (getUser === null) {

      return res.status(400).send({
        success: false,
        message: 'Invalid email or password',
        error: {}
      })
    }

    const comparePassword = await usersService.comparePassword({ password, hashedPassword: getUser.password })


    if (!comparePassword) {

      return res.status(400).send({
        success: false,
        message: 'Invalid email or password',
        error: {}
      })
    }

    if (getUser.isActive !== true) {
      return res.status(400).send({
        success: false,
        message: 'Accoount is deleted, contact support',
        error: {}
      })
    }

    const tokens = authMiddleware.createTokens(getUser)

    return res.status(200).send({
      success: true,
      message: 'User authenticated successfully',
      data: {
        token: tokens.token,
        refreshToken: tokens.refreshToken
      }
    })


  } catch (error) {
    console.log(error)
    Utils.handleError(res, error)
  }
}

const deleteUserAccount = async (req: Request, res: Response) => {
  const { _id } = req.user

  try {
    await usersService.updateUser({
      _id, update: {
        "isActive": false
      }
    })

    return res.status(200).send({
      success: true,
      message: 'User account deleted successfully',
    })

  } catch (error) {
    Utils.handleError(res, error)
  }
}

const usersController = {
  signupUser,
  loginUser,
  deleteUserAccount
}

export default usersController
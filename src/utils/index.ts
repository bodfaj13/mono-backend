import express, { Response } from 'express';


const handleError = (res: Response, error: any) => {
  switch (error.name) {
    case 'ValidationError':
      const errors: any = {};

      Object.keys(error.errors as any).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).send({
        success: false,
        message: 'Validation failed',
        error: errors
      })
    case 'AxiosError':
      const errorMessage = error.response.data.message || 'Something went wrong'

      return res.status(400).send({
        success: false,
        message: errorMessage,
        error: {}
      })

    default:
      return res.status(400).send({
        success: false,
        message: 'Something went wrong',
        error: {}
      })
  }
}

const getPagination = (page: number | undefined, size: number | undefined) => {
  console.log(page, size)
  const limit = size ? size : 10;
  const offset = page ? page : 1;
  return { limit, offset };
}

const Utils = {
  handleError,
  getPagination
}

export default Utils
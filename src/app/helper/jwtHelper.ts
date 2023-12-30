import jwt, { JwtPayload } from 'jsonwebtoken'
import { AppError } from '../errors/AppError'
import httpStatus from 'http-status'

const createToken = (
  jwtPayload: JwtPayload,
  secret: string,
  options: {
    expiresIn: string
  },
) => {
  return jwt.sign(jwtPayload, secret, options)
}

const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    // If the token verification fails, throw a custom error
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access', 'You do not have the necessary permissions to access this resource');
  }
}

export const jwtHelpers = {
  createToken,
  verifyToken,
}
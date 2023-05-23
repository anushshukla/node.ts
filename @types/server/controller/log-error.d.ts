import { NextFunction, Request, Response } from 'express'
import { ExpressJoiError } from 'express-joi-validation'
declare const _default: (
  error: Error | ExpressJoiError,
  __: Request,
  response: Response,
  _: NextFunction
) => Response
export default _default

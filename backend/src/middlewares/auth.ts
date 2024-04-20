import { Request, Response, NextFunction } from "express";
// extended Request interface
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

// auth middleware is nothing but a controller function having extra parameter like nexFunction
import jwt, { JwtPayload } from "jsonwebtoken";
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  // we save userId in token
  /**
   * jwt.sign({userId:req.userId},process.env.JWT_SECRET as string)
   */
  // so we can get this userId easily
  if (!token) {
    res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    // now this decode or userId is stored in req.userId
    req.userId = (decode as JwtPayload).userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "unauthorized" });
  }
};

export default verifyToken;

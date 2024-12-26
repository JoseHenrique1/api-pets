import { Request, Response, NextFunction } from "express";
export function checkExistsUserAccount(req: Request, res: Response, next: NextFunction) {
  console.log("middleware");
  
  next()
}
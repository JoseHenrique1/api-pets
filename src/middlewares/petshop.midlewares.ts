import { Request, Response, NextFunction } from "express";

export function checkExistsUserAccount(req: Request, res: Response, next: NextFunction) {
  console.log("middleware");
  const cnpj = req.headers["cnpj"];
  req.petshop = {
    id: "acde070d-8c4c-4f0d-9d8a-162843c10333",
    name: "petshop Almarante",
    cnpj: "20.031.219/0002-46",
    pets: []
  };
  next()
}
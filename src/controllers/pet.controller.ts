import { RequestHandler } from "express";

export const getPets : RequestHandler  = (req, res) => {
  const pets = req.petshop?.pets || [];
  res.status(200).json({
    pets
  });
}
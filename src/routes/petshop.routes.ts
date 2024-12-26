import { Router } from "express";
import { createPetshop } from "../controllers/petshop.controller";

export const router = Router();

router.post("/petshops", createPetshop);
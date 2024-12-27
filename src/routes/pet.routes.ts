import { Router } from "express";
import { checkExistsUserAccount } from "../middlewares/petshop.midlewares";
import { getPets } from "../controllers/pet.controller";

export const router = Router();

router.use(checkExistsUserAccount);
router.get("/pets", getPets);



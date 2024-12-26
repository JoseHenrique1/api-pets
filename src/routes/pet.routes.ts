import { Router } from "express";
import { checkExistsUserAccount } from "../middlewares/petshop.midlewares";

export const router = Router();

router.use(checkExistsUserAccount);
router.get("/petss", (req, res) => {
  res.json({
    message: "Hello world! pets",
  });
});



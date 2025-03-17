import { Router } from "express";
import { singin, singup } from "./userController";

const router:Router=Router();


router.post('/signin',singin);
router.post('/signup',singup);

export default router;
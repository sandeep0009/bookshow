import { Router } from "express";
import userRouter from "../api/user/userRoute";
import showRouter from "../api/shows/showsRoute";
const router:Router=Router();


router.use(userRouter);
router.use(showRouter);


export default router;
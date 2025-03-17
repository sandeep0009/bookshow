import { Router } from "express";
import { verifyUser } from "../../middleware/verify";
import { verifyOrganiser } from "../../middleware/organiser";
import { createShow, deleteShow, findAllShow, findByIdShow, updateShow } from "./showsController";

const router:Router=Router();


router.post('/create-show',verifyUser,verifyOrganiser,createShow);

router.get('/all-shows',verifyUser,findAllShow);

router.get('/:id',verifyUser,findByIdShow);

router.patch('/:id',verifyUser,verifyOrganiser,updateShow);
router.delete('/:id',verifyUser,verifyOrganiser,deleteShow);

export default router;
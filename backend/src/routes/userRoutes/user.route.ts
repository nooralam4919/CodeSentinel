import { Router } from "express";
import { register, login, findUser } from "../../controllers/userController/user.register.controller.js";


const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(findUser)

export default router;
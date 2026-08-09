import { Router } from "express";
import { register } from "../../controllers/userController/user.register.controller.js";
import { loginUser as login } from "../../controllers/userController/user.register.controller.js";


const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

export default router;
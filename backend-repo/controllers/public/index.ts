import { Router } from "express";

import { registerUserController } from "@/controllers/public/auth/register-user";

const publicRouter = Router();
publicRouter.post("/register", registerUserController);

export default publicRouter;

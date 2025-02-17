import userRouter from "@/controllers/api/users";
import { Router } from "express";

const authenticatedRouter = Router();
authenticatedRouter.use("/users", userRouter);

export default authenticatedRouter;

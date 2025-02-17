import { Router } from "express";

import { fetchUserDataController } from "@/controllers/api/users/fetch-user-data";
import { updateUserDataController } from "@/controllers/api/users/update-user-data";

const userRouter = Router();
userRouter.get("/fetch-user-data", fetchUserDataController);
userRouter.post("/update-user-data", updateUserDataController);

export default userRouter;

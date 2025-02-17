import { createUserFromJSON } from "@/entities/user";
import UserCollection from "@/repositories/userCollection";

export const updateUserDataController = async (req: any, res: any) => {
  try {
    const existingUser = await UserCollection.getUserById(
      req?.authenticated?.userId
    );
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Cannot update user data, user data not found",
      });
    }

    const user = await UserCollection.updateUser(
      req?.authenticated?.userId,
      createUserFromJSON(req?.body)
    );

    if (user) {
      return res.json({
        success: true,
        message: "User data updated successfully",
        data: user,
      });
    }

    return res.status(404).json({
      success: false,
      message: "User data not found",
    });
  } catch (error) {
    console.log("error updating user data", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

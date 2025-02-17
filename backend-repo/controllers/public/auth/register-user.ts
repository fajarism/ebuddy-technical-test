import UserCollection from "@/repositories/userCollection";

export const registerUserController = async (req: any, res: any) => {
  try {
    console.log("registering user", req?.body);
    const user = await UserCollection.registerUser(req?.body);
    if (user) {
      return res.json({
        success: true,
        message: "User is registered successfully",
        data: user,
      });
    }

    return res.status(404).json({
      success: false,
      message: "User is already registered",
    });
  } catch (error) {
    console.log("error regisgtering user data", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

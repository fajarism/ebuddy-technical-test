import UserCollection from "@/repositories/userCollection";

export const fetchUserDataController = async (req: any, res: any) => {
  try {
    const user = await UserCollection.getUserById(req?.authenticated?.userId);
    if (user) {
      return res.json({
        success: true,
        message: "User data fetched successfully",
        data: user,
      });
    }

    return res.status(404).json({
      success: false,
      message: "User data not found",
    });
  } catch (error) {
    console.log("error fetching user data", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

import { jwtDecode } from "jwt-decode";

import UserCollection from "@/repositories/userCollection";

const authMiddleware = async (req: any, res: any, next: any) => {
  console.log("auth middleware");
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decodedToken = jwtDecode(token);
    console.log("decoded token", decodedToken);

    req.token = token;
    req.authenticated = {
      //@ts-ignore
      userId: decodedToken?.user_id,
    };

    //@ts-ignore
    await UserCollection.updateLastActiveAt(decodedToken?.user_id);

    next();
  } catch (error) {
    console.log("error decoding token", error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

export default authMiddleware;

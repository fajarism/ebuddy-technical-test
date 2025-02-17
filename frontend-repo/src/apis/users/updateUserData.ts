export interface User {
  name: string;
  email: string;
  password: string;
  userId: string;
}

const updateUserData = async (
  token?: string,
  user?: User
): Promise<User | undefined> => {
  if (!token) throw new Error("Token is required");
  if (!user) throw new Error("User is required");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/users/update-user-data`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  const data = await response.json();
  return data?.data as User;
};

export default updateUserData;

export interface User {
  name: string;
  email: string;
  password: string;
  userId: string;
}

const fetchUserData = async (token?: string): Promise<User | undefined> => {
  if (!token) throw new Error("Token is required");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/users/fetch-user-data`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data?.data as User;
};

export default fetchUserData;

const registerUser = async (name: string, email: string, userId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/register`,
    {
      body: JSON.stringify({ name, email, userId }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
};

export default registerUser;

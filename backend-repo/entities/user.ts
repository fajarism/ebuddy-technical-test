export type User = {
  userId: string;
  name: string;
  email: string;
  lastUpdatedAt?: Date;
  lastActiveAt?: Date;
};

export const createUserFromJSON = (json: any): User => {
  return {
    userId: json?.userId,
    name: json?.name,
    email: json?.email,
  };
};

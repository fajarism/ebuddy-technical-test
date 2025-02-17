import { User } from "entities/user";
import { getFirestore } from "firebase-admin/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { firebaseAdminApp, firebaseApp } from "@/configs/firebaseConfig";

const app = firebaseAdminApp;
const firestoreDb = getFirestore(app);

const USER_COLLECTION = "users";

const getUserById = async (docId: string): Promise<User | null> => {
  try {
    const userCollection = firestoreDb.collection(USER_COLLECTION);
    const userDoc = await userCollection.doc(docId).get();

    if (userDoc.exists) {
      return userDoc.data() as User;
    }

    return null;
  } catch (error) {
    console.log("error fetching user data", error);
    return null;
  }
};

const updateUser = async (
  userId: string,
  userData: User
): Promise<User | null> => {
  try {
    const userCollection = firestoreDb.collection(USER_COLLECTION);
    const userDoc = await userCollection.doc(userId).update({
      name: userData.name,
      lastUpdatedAt: new Date().valueOf(),
    });

    const latestUserData = await userCollection.doc(userId).get();

    console.log("user data updated successfully", userDoc);

    return latestUserData.data() as User;
  } catch (error) {
    console.log("error updating user data", error);
    return null;
  }
};

const registerUser = async (userData: User): Promise<User | null> => {
  console.log("registering user", userData);
  try {
    const existingUser = await getUserById(userData.userId);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const registeredUser = await updateUser(userData?.userId, userData);
    return registeredUser;
  } catch (error) {
    console.log("error registering user", error);
    return null;
  }
};

const updateLastActiveAt = async (userId: string): Promise<null> => {
  try {
    const userCollection = firestoreDb.collection(USER_COLLECTION);
    const userDoc = await userCollection.doc(userId).update({
      lastActiveAt: new Date().valueOf(),
    });

    const latestUserData = await userCollection.doc(userId).get();

    console.log("user data updated successfully", userDoc);

    return null;
  } catch (error) {
    console.log("error updating user data", error);
    return null;
  }
};

const UserCollection = {
  getUserById,
  updateUser,
  registerUser,
  updateLastActiveAt,
};

export default UserCollection;

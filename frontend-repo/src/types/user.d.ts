import { UserCredential } from "firebase/auth";

export type CustomFirebaseCredentialUser = UserCredential.user & {
  accessToken: string;
};

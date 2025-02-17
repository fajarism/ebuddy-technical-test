"use client";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import app from "@/configs/firebaseConfig";
import { useAppSelector } from "@/store/hooks";
import {
  setFormLogin,
  setIsLoginLoading,
  setToken,
} from "@/store/reducers/authReducer";
import { CustomFirebaseCredentialUser } from "@/types/user";

const useLoginScreenHooks = () => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const { formLoginEmail, formLoginPassword } = authState;

  const login = async () => {
    dispatch(setIsLoginLoading(true));
    const auth = getAuth(app);
    try {
      const loginData = await signInWithEmailAndPassword(
        auth,
        formLoginEmail,
        formLoginPassword
      );

      if (loginData?.user) {
        dispatch(
          setToken(
            (loginData?.user as CustomFirebaseCredentialUser)?.accessToken
          )
        );
        router.replace("/main");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password");
    } finally {
      dispatch(setIsLoginLoading(false));
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFormLogin({
        key: "Email",
        value: event.target.value,
      })
    );
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFormLogin({
        key: "Password",
        value: event.target.value,
      })
    );
  };

  return { authState, login, handleEmailChange, handlePasswordChange };
};

export default useLoginScreenHooks;

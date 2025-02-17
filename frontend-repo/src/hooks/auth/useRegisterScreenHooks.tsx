"use client";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import registerUser from "@/apis/register/registerUser";
import app from "@/configs/firebaseConfig";
import { useAppSelector } from "@/store/hooks";
import {
  setFormRegister,
  setIsRegisterLoading,
  setToken,
} from "@/store/reducers/authReducer";
import { CustomFirebaseCredentialUser } from "@/types/user";

const useRegisterScreenHooks = () => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    formRegisterEmail,
    formRegisterConfirmPassword,
    formRegisterName,
    formRegisterPassword,
    isRegisterLoading,
  } = authState;

  const isEmailValid = authState?.formRegisterEmail?.match(
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  );

  const isRegisterButtonActive =
    !isRegisterLoading &&
    formRegisterName.length > 0 &&
    formRegisterEmail.length > 0 &&
    isEmailValid &&
    formRegisterConfirmPassword === formRegisterPassword &&
    formRegisterPassword.length > 0;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFormRegister({
        key: "Email",
        value: event.target.value,
      })
    );
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFormRegister({
        key: "Password",
        value: event.target.value,
      })
    );
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      setFormRegister({
        key: "ConfirmPassword",
        value: event.target.value,
      })
    );
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFormRegister({
        key: "Name",
        value: event.target.value,
      })
    );
  };

  const register = async () => {
    dispatch(setIsRegisterLoading(true));
    setTimeout(() => dispatch(setIsRegisterLoading(false)), 3000);
    const auth = getAuth(app);
    const userDetail = await createUserWithEmailAndPassword(
      auth,
      formRegisterEmail,
      formRegisterPassword
    );

    const response = await registerUser(
      formRegisterName,
      formRegisterEmail,
      userDetail.user.uid
    );
    if (response.success) {
      dispatch(
        setToken(
          await (userDetail?.user as CustomFirebaseCredentialUser)?.accessToken
        )
      );
      router.replace("/main");
    }

    dispatch(setIsRegisterLoading(false));
  };

  return {
    authState,
    isRegisterButtonActive,

    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleNameChange,
    register,
  };
};

export default useRegisterScreenHooks;

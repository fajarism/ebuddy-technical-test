import { useEffect } from "react";
import { useDispatch } from "react-redux";

import fetchUserData from "@/apis/users/fetchUserData";
import updateUserData from "@/apis/users/updateUserData";
import { useAppSelector } from "@/store/hooks";
import { setAlert } from "@/store/reducers/commonComponentReducer";
import {
  setFormMainPage,
  setIsFetchingUserData,
  setUserData,
} from "@/store/reducers/mainPageReducer";

const useMainScreenHooks = () => {
  const mainPageState = useAppSelector((state) => state.mainPage);
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const doFetchUserData = async () => {
    dispatch(setIsFetchingUserData(true));
    try {
      const userData = await fetchUserData(authState?.token);
      if (userData) {
        dispatch(
          setAlert({
            severity: "success",
            message: "User Data Fetched",
            alertId: new Date().valueOf().toString(),
          })
        );
        dispatch(setUserData(userData));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsFetchingUserData(false));
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFormMainPage({
        key: "name",
        value: event.target.value,
      })
    );
  };

  const doUpdateUserData = async () => {
    if (!mainPageState?.userData) return;

    dispatch(setIsFetchingUserData(true));
    try {
      const response = await updateUserData(
        authState?.token,
        mainPageState?.userData
      );
      if (response) {
        dispatch(
          setAlert({
            severity: "success",
            message: "User Data Updated",
            alertId: new Date().valueOf().toString(),
          })
        );
        dispatch(setUserData(response));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsFetchingUserData(false));
    }
  };

  useEffect(() => {
    doFetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    mainPageState,
    handleNameChange,
    updateUser: doUpdateUserData,
    reload: doFetchUserData,
  };
};

export default useMainScreenHooks;

import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  AlertState,
  removeAlert,
} from "@/store/reducers/commonComponentReducer";
import { Alert, AlertProps, Fade } from "@mui/material";

const CommonAlert: React.FC<AlertProps & AlertState> = (props) => {
  const { alertId } = props;
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();

  const setRemoveTimer = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
    setTimeout(() => {
      dispatch(removeAlert(alertId));
    }, 3500);
  };

  return (
    <Fade
      in={isOpen}
      timeout={{ enter: 500, exit: 500 }}
      addEndListener={setRemoveTimer}
    >
      <Alert {...props}>{props?.message}</Alert>
    </Fade>
  );
};

export default CommonAlert;

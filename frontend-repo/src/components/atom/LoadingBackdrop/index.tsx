import { Backdrop, CircularProgress } from "@mui/material";

const LoadingBackdrop = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Backdrop
      open={isLoading}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;

import CommonAlert from "@/components/atom/Alert";
import { useAppSelector } from "@/store/hooks";
import { Grid } from "@mui/material";

const AlertList = () => {
  const commonComponentState = useAppSelector((state) => state.commonComponent);
  const { alerts } = commonComponentState;

  return (
    <Grid direction={"column"} spacing={1} container>
      {alerts?.map((alert) => (
        <Grid item key={alert.alertId}>
          <CommonAlert {...alert} alertId={alert?.alertId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AlertList;

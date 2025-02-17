"use client";

import LoadingBackdrop from "@/components/atom/LoadingBackdrop";
import AlertList from "@/components/molecule/AlertList";
import useMainScreenHooks from "@/hooks/main/useMainScreenHooks";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Grid, TextField, Typography } from "@mui/material";

import styles from "../page.module.css";

export default function MainPage() {
  const {
    mainPageState: { userData, isFetchingUserData },
    reload,
    updateUser,
    handleNameChange,
  } = useMainScreenHooks();
  if (!userData) return <></>;
  return (
    <div className={styles.page}>
      <LoadingBackdrop isLoading={isFetchingUserData} />
      <main className={styles.main}>
        <Grid
          container
          spacing={2}
          xs={12}
          sm={6}
          md={6}
          xl={4}
          direction={"column"}
          alignSelf={"center"}
          justifyContent={"center"}
        >
          <Grid item>
            <Typography variant="h5">🙋 Welcome to Main Page</Typography>
          </Grid>
          <Grid item alignSelf={"flex-end"}>
            <Button variant="text" color="primary" fullWidth onClick={reload}>
              Reload <RefreshIcon sx={{ ml: 1 }} />
            </Button>
          </Grid>
          <Grid item alignSelf={"center"}>
            <AlertList />
          </Grid>
          <Grid item>
            <TextField
              label="User ID"
              fullWidth
              disabled
              value={userData?.userId}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              fullWidth
              value={userData?.email}
              disabled
            />
          </Grid>
          <Grid item>
            <TextField
              label="Name"
              fullWidth
              value={userData?.name}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item alignSelf={"flex-end"}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={updateUser}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

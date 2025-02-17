"use client";

import Link from "next/link";

import useRegisterScreenHooks from "@/hooks/auth/useRegisterScreenHooks";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import styles from "../page.module.css";

export default function RegisterScreen() {
  const {
    authState: {
      formRegisterConfirmPassword,
      formRegisterEmail,
      formRegisterName,
      formRegisterPassword,
      isRegisterLoading,
    },
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleNameChange,

    isRegisterButtonActive,
    register,
  } = useRegisterScreenHooks();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Grid
          container
          spacing={2}
          direction={"column"}
          xs={12}
          sm={6}
          md={6}
          xl={4}
          justifyContent={"center"}
          alignSelf={"center"}
        >
          <Typography variant="h5" sx={{ pl: 2 }}>
            👋 Register New Account
          </Typography>
          <Grid item>
            <TextField
              value={formRegisterName}
              onChange={handleNameChange}
              label="Name"
              variant="outlined"
              type="text"
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <TextField
              value={formRegisterEmail}
              onChange={handleEmailChange}
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <TextField
              value={formRegisterPassword}
              onChange={handlePasswordChange}
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              required
            />
          </Grid>
          <Grid item>
            <TextField
              value={formRegisterConfirmPassword}
              onChange={handleConfirmPasswordChange}
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              required
            />
          </Grid>
          <Grid item alignSelf={"flex-end"}>
            <Link href="/">
              <Button variant="text" sx={{ mr: 1 }}>
                Sign In
              </Button>
            </Link>
            {isRegisterLoading ? (
              <CircularProgress
                color="primary"
                size={20}
                sx={{ minWidth: 20 }}
              />
            ) : (
              <Button
                variant="contained"
                disabled={!isRegisterButtonActive}
                onClick={register}
              >
                Register
              </Button>
            )}
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

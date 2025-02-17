"use client";

import Link from "next/link";

import useLoginScreenHooks from "@/hooks/auth/useLoginScreenHooks";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import styles from "./page.module.css";

export default function Home() {
  const {
    authState: { formLoginEmail, formLoginPassword, isLoginLoading },
    handleEmailChange,
    handlePasswordChange,
    login,
  } = useLoginScreenHooks();
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
            🚀 Login
          </Typography>
          <Grid item>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={formLoginEmail}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              required
              value={formLoginPassword}
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item alignSelf={"flex-end"}>
            <Link href="/register">
              <Button variant="text" sx={{ mr: 1 }}>
                Create Account
              </Button>
            </Link>
            {isLoginLoading ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              <Button variant="contained" onClick={login}>
                Login
              </Button>
            )}
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

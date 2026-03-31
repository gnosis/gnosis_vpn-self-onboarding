import {
  Container,
  Box,
  TextField,
  Typography,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import Button from "../components/onboarding/Button";
import { useAppStore } from "../store/appStore";
import { fetchFundingCode } from "../functions";

interface LoginProps {
  className?: string;
}

export default function Login({ className }: LoginProps) {
  const [loadingButton, setLoadingButton] = useState<"anon" | "login" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [password, setPassword] = useState("");
  const username = useAppStore((state) => state.username);
  const setUsername = useAppStore((state) => state.setUsername);
  const setToken = useAppStore((state) => state.setToken);
  const setOnboardingData = useAppStore((state) => state.setOnboardingData);
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  const setAnonymous = useAppStore((state) => state.setAnonymous);

  /**
   * Login to gnosis-vpn-self-onboarding
   * @param {string} loginCredential - The login credential (username/email)
   * @param {string} password - The user's password
   * @returns {Promise<{success: boolean, jsonData?: Object, isFirstLogin?: boolean, error?: string}>}
   */
  async function loginUser(loginCredential: string, password: string, anonymous: boolean = false): Promise<void> {
    setError(null);
    setLoadingButton(anonymous ? "anon" : "login");
    setAnonymous(anonymous);
    try {
      const response = await fetch(`${import.meta.env.VITE_WEBAPI_URL}/api/gnosisvpn-self-onboarding/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginCredential,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || `HTTP Error: ${response.status}`);
        setShowErrorModal(true);
        return;
      }

      const data = await response.json();
      const token = data.token;
      if (!anonymous && token) {
        localStorage.setItem('gvso_authToken', token);
        setToken(token);
      }
      console.log('Login successful:', data);
      if (!anonymous && data.jsonData) {
        setOnboardingData(data.jsonData as Parameters<typeof setOnboardingData>[0]);
      }
      if(anonymous) {
        setUsername('Anonymous');
      }
      fetchFundingCode(token);
      if (!anonymous && data.isFirstLogin) {
        setCurrentView("changePassword");
      } else {
        setCurrentView("landing");
      }
    } catch (error) {
      setError((error instanceof Error ? error.message : String(error)) || 'Network error occurred');
      setShowErrorModal(true);
    } finally {
      setLoadingButton(null);
    }
  }



  return (
    <Container className={`Login${className ? ` ${className}` : ""}`} maxWidth={false}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          py: { xs: 3, sm: 4, md: 6 },
        }}
      >
        {/* Login Form */}
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: { xs: 2.5, sm: 3, md: 4 },
              fontSize: "1.75rem",
              lineHeight: 1.2,
            }}
          >
            Login
          </Typography>

          {/* Username Field */}
          <TextField
            fullWidth
            label="Username"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              mb: { xs: 2, sm: 2.5, md: 3 },
              "& .MuiInputBase-input": {
                fontSize: "0.95rem",
              },
              "& .MuiFormLabel-root": {
                fontSize: "0.9rem",
              },
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Please enter your password"
            type="password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: { xs: 2.5, sm: 3, md: 4 },
              "& .MuiInputBase-input": {
                fontSize: "0.95rem",
              },
              "& .MuiFormLabel-root": {
                fontSize: "0.9rem",
              },
            }}
          />

          {/* Privacy Policy Section */}
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#f5f5f5",
              p: { xs: 1.5, sm: 2, md: 2.5 },
              mb: { xs: 2, sm: 2.5, md: 3 },
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: { xs: 1, sm: 1.25, md: 1.5 },
                fontSize: "0.85rem",
                lineHeight: 1.4,
              }}
            >
              We're committed to making onboarding as private as possible
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                lineHeight: 1.4,
              }}
            >
              This tool will help you onboard to Gnosis VPN.
              To do so, we'll need to store minimal data which will let you resume your session, switch devices, contact support and submit feedback.
              This data will only be used to facilitate the onboarding and testing process.
              Although the onboarding uses your IP address to test connectivity, it is not sent to us or stored.
            </Typography>
          </Paper>

          {/* Onboarding Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1.5, sm: 2, md: 2 }}
            sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}
          >
            <Button
              label="Stay anonymous"
              loading={loadingButton === "anon"}
              disabled={loadingButton === "login"}
              onClick={() => {
                loginUser(username, password, true);
              }}
            />
            <Button
              label="I understand. Log me in!"
              loading={loadingButton === "login"}
              disabled={loadingButton === "anon"}
              onClick={() => loginUser(username, password)}
            />
            <Dialog open={showErrorModal} onClose={() => setShowErrorModal(false)}>
              <DialogTitle sx={{ fontWeight: 600 }}>Login Error</DialogTitle>
              <DialogContent>
                <Typography>{error}</Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  label="OK"
                  onClick={() => setShowErrorModal(false)}
                />
              </DialogActions>
            </Dialog>
          </Stack>

        </Box>
      </Box>
    </Container>
  );
}

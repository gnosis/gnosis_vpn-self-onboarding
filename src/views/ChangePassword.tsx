import {
  Container,
  Box,
  TextField,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import Button from "../components/onboarding/Button";
import { useAppStore } from "../store/appStore";

interface ChangePasswordProps {
  className?: string;
}

export default function ChangePassword({ className }: ChangePasswordProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const token = useAppStore((state) => state.token);
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  const resetStore = useAppStore((state) => state.resetStore);

  const handleLogout = () => {
    localStorage.removeItem('gvso_authToken');
    resetStore();
    setCurrentView("login");
  };

  const validatePasswords = (): boolean => {
    if (!newPassword) {
      setError("New password is required");
      return false;
    }
    if (!confirmPassword) {
      setError("Please confirm your new password");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return false;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  async function changePassword(): Promise<void> {
    if (!validatePasswords()) {
      setShowErrorModal(true);
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_WEBAPI_URL}/api/gnosisvpn-self-onboarding/setPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || `HTTP Error: ${response.status}`);
        setShowErrorModal(true);
        return;
      }

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to change password');
        setShowErrorModal(true);
        return;
      }
      
      setSuccess(true);
      setShowSuccessModal(true);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError((error instanceof Error ? error.message : String(error)) || 'Network error occurred');
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  }


  return (
    <Container className={`ChangePassword${className ? ` ${className}` : ""}`} maxWidth={false}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          py: { xs: 3, sm: 4, md: 6 },
        }}
      >
        {/* Change Password Form */}
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: { xs: 2.5, sm: 3, md: 4 },
              fontSize: "1.75rem",
              lineHeight: 1.2,
            }}
            style={{marginBottom: "0"}}
          >
            Change Password
          </Typography>
            <Typography
            variant="body1"
            sx={{
              lineHeight: 1.2,
              fontSize: "0.85rem",
              marginBottom: { xs: 2.5, sm: 3, md: 4 },
              color: "#555",
            }}
          >
            Password must be at least 8 characters long
          </Typography>

          {/* New Password Field */}
          <TextField
            fullWidth
            label="New Password"
            type="password"
            variant="standard"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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

          {/* Confirm Password Field */}
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            variant="standard"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

          {/* Action Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1.5, sm: 2, md: 2 }}
            sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}
          >
            <Button
              label="Logout"
              onClick={handleLogout}
            />
            <Button
              label="Continue"
              loading={loading}
              onClick={changePassword}
            />

            {/* Error Dialog */}
            <Dialog open={showErrorModal} onClose={() => setShowErrorModal(false)}>
              <DialogTitle sx={{ fontWeight: 600 }}>Error</DialogTitle>
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

            {/* Success Dialog */}
            <Dialog open={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
              <DialogTitle sx={{ fontWeight: 600 }}>Success</DialogTitle>
              <DialogContent>
                <Typography>Your password has been changed successfully.</Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  label="OK"
                  onClick={() => {
                    setShowSuccessModal(false);
                    setCurrentView("landing");
                  }}
                />
              </DialogActions>
            </Dialog>
          </Stack>

        </Box>
      </Box>
    </Container>
  );
}

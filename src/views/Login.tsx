import {
  Container,
  Box,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import Button from "../components/onboarding/Button";
import { useAppStore } from "../store/appStore";

export default function Login() {
  const username = useAppStore((state) => state.username);
  const password = useAppStore((state) => state.password);
  const userPreference = useAppStore((state) => state.userPreference);
  const setUsername = useAppStore((state) => state.setUsername);
  const setPassword = useAppStore((state) => state.setPassword);
  const setUserPreference = useAppStore((state) => state.setUserPreference);
  const setCurrentView = useAppStore((state) => state.setCurrentView);

  const handleLogin = () => {
    console.log({
      username,
      password,
      preference: userPreference,
    });
    setCurrentView("onboarding");
  };

  return (
    <Container maxWidth={false}>
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
              Please read our privacy policy to understand how we're keeping
              this experience private.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: { xs: 0.75, sm: 1, md: 1 },
                fontSize: "0.85rem",
              }}
            >
              In brief:
            </Typography>

            <Box
              component="ul"
              sx={{
                pl: { xs: 1.5, sm: 2, md: 2 },
                m: 0,
                mb: { xs: 1, sm: 1.25, md: 1.5 },
              }}
            >
              <Typography
                component="li"
                variant="body2"
                sx={{
                  mb: { xs: 0.6, sm: 0.8, md: 0.8 },
                  fontSize: "0.8rem",
                  lineHeight: 1.4,
                }}
              >
                <strong>"Share minimal data"</strong> will let you store login,
                easily switch devices, and resume your session. You can contact
                support and submit feedback through this tool.
              </Typography>
              <Typography
                component="li"
                variant="body2"
                sx={{
                  fontSize: "0.8rem",
                  lineHeight: 1.4,
                }}
              >
                If you choose to stay anonymous, data will only be stored
                locally, including your feedback.
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                lineHeight: 1.4,
              }}
            >
              We respect your choice, but if you'd be willing to share minimal
              data with us it would greatly help the development process.
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
              isActive={userPreference === "anonymous"}
              onClick={() => setUserPreference("anonymous")}
            />
            <Button
              label="Share minimal data"
              isActive={userPreference === "share_data"}
              onClick={() => setCurrentView("landing")}
            />
          </Stack>

        </Box>
      </Box>
    </Container>
  );
}

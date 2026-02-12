import { Typography, Stack, Box, TextField } from "@mui/material";
import Button from "../../components/onboarding/Button";
import { useAppStore } from "../../store/appStore";

export default function Download() {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const handleMoveOn = () => {
    // Move to next step
    setOnboardingStep(4);
  };

  const handleNeedHelp = () => {
    console.log("User needs help");
    // Handle help request
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Stack spacing={3} sx={{ flex: 1 }}>
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: "1.75rem",
            lineHeight: 1.2,
          }}
        >
          Download the app
        </Typography>

        {/* Main Content */}
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Get Gnosis VPN from the official download page.
        </Typography>

        {/* Download Link */}
        <Box>
          <Typography
            component="a"
            href="#"
            sx={{
              fontSize: "0.95rem",
              color: "#0066cc",
              textDecoration: "none",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Open download page ↗
          </Typography>
        </Box>

        {/* Additional Info */}
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.85rem",
            lineHeight: 1.6,
            color: "#666",
          }}
        >
          And if you're on your second, here's the domain:{" "}
          <Typography
            component="span"
            sx={{
              fontFamily: "monospace",
              fontSize: "0.8rem",
              backgroundColor: "#f5f5f5",
              px: 1,
              py: 0.5,
              borderRadius: 0.5,
            }}
          >
            https://vpn.gnosis.eth.lm/releases/MacOS
          </Typography>{" "}
          (NOT FINAL URL)
        </Typography>

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* Feedback Section */}
        <Box
          sx={{
            backgroundColor: "#f9f9f9",
            p: 2.5,
            borderRadius: 1,
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.85rem",
              color: "#666",
              mb: 1.5,
              fontWeight: 500,
            }}
          >
            Share any blockers, questions, or notes for this step.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Your feedback..."
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "0.9rem",
              },
            }}
          />
        </Box>
      </Stack>

      {/* Action Buttons */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Button
          label="I need more help"
          onClick={handleNeedHelp}
        />
        <Button
          label="I'm ok to move on"
          onClick={handleMoveOn}
        />
      </Box>
    </Box>
  );
}

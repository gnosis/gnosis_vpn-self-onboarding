import { Typography, Box, TextField } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 7;

interface DownloadProps {
  className?: string;
}

export default function Download({ className }: DownloadProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need some help";
  const DOWNLOADED_LABEL = "Downloaded!";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("7_download", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`Download${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Download the app"
      text={
        <>
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Great! Now head to
          </Typography>

          <Box>
            <Typography
              component="a"
              href="https://github.com/gnosis/gnosis_vpn-client/releases"
              target="_blank"
              rel="noreferrer noopener"
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
              https://github.com/gnosis/gnosis_vpn-client/releases 
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            and download the installer
          </Typography>

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
        </>
      }
      buttons={
        onboardingStep === STEP ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP)} />
            <Button label={DOWNLOADED_LABEL} onClick={() => handleAnswer(DOWNLOADED_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}

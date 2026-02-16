import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 7;

interface DownloadProps {
  className?: string;
  lastEntry?: boolean;}

export default function Download({ className, lastEntry }: DownloadProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

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

        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 1)} />
            <Button label={DOWNLOADED_LABEL} onClick={() => handleAnswer(DOWNLOADED_LABEL, STEP + 2)} />
          </>
        ) : null
      }
    />
  );
}

import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 26;

interface CheckIPProps {
  className?: string;
  lastEntry?: boolean;}

export default function CheckIP({ className, lastEntry }: CheckIPProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const NEED_HELP_LABEL = "I need help";
  const GOT_IT_LABEL = "I've got it";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("26_CheckIP", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`CheckIP${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Check your IP"
      text={
        <>
          {/* <VideoPlaceholder title="IP Check" /> */}

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Gnosis VPN works by routing traffic through the HOPR mixnet. Every device has an IP address, so we'll know it's working if your IP address changes.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            First, we need to see what your IP address is normally. Go to{" "}
            <Box
              component="a"
              href="https://radar.cloudflare.com/ip"
              target="_blank"
              rel="noreferrer noopener"
              sx={{
                color: "#0066cc",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              https://radar.cloudflare.com/ip
            </Box>
            {" "}and note down what it says. I don't want to know it! I just need to see if it changes.
          </Typography>
        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP+0.25)} />
            <Button label={GOT_IT_LABEL} onClick={() => handleAnswer(GOT_IT_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}

import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 42;

interface CheckIPLastTimeProps {
  className?: string;
  lastEntry?: boolean;}

export default function CheckIPLastTime({ className, lastEntry }: CheckIPLastTimeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const NEED_HELP_LABEL = "I need help";
  const DONE_LABEL = "I've done that";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("42_CheckIPLastTime", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`CheckIPLastTime${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Check IP one last time"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Amazing! We're almost done. Let's just check the IP one last time. Go back to{" "}
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
        </Typography>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 0.25)} />
            <Button label={DONE_LABEL} onClick={() => handleAnswer(DONE_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}

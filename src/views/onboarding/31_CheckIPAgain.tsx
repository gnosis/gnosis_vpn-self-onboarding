import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 31;

interface CheckIPAgainProps {
  className?: string;
  lastEntry?: boolean;}

export default function CheckIPAgain({ className, lastEntry }: CheckIPAgainProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const NEED_HELP_LABEL = "I need help";
  const DONE_LABEL = "Done";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("31_CheckIPAgain", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`CheckIPAgain${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Check your IP again"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Great! Now return to{" "}
          <Box
            component="a"
            href="https:/ifconfig.me/ip"
            target="_blank"
            rel="noreferrer noopener"
            sx={{
              color: "#0066cc",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            https:/ifconfig.me/ip
          </Box>
          {" "}and check the IP address
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

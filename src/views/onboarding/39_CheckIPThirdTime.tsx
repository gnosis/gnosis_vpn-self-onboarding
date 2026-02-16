import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 39;

interface CheckIPThirdTimeProps {
  className?: string;
}

export default function CheckIPThirdTime({ className }: CheckIPThirdTimeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need help";
  const SAME_LABEL = "It's the same as last time";
  const WRONG_LABEL = "Something's gone wrong";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("39_CheckIPThirdTime", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`CheckIPThirdTime${className ? ` ${className}` : ""}`}
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
          Let's check in on the connection. Go back to{" "}
          <Box
            component="a"
            href="https://whatismyipaddress.com"
            target="_blank"
            rel="noreferrer noopener"
            sx={{
              color: "#0066cc",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            https://whatismyipaddress.com
          </Box>
          {" "}and check your IP
        </Typography>
      }
      buttons={
        onboardingStep === STEP ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP)} />
            <Button label={SAME_LABEL} onClick={() => handleAnswer(SAME_LABEL, STEP + 1)} />
            <Button label={WRONG_LABEL} onClick={() => handleAnswer(WRONG_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}

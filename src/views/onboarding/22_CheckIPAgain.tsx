import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface CheckIPAgainProps {
  className?: string;
}

export default function CheckIPAgain({ className }: CheckIPAgainProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need help";
  const DONE_LABEL = "Done";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("22_CheckIPAgain", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`CheckIPAgain${className ? ` ${className}` : ""}`}
      onboardingStep={23}
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
          {" "}and check the IP address
        </Typography>
      }
      buttons={
        onboardingStep === 23 ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, 23)} />
            <Button label={DONE_LABEL} onClick={() => handleAnswer(DONE_LABEL, 24)} />
          </>
        ) : null
      }
    />
  );
}

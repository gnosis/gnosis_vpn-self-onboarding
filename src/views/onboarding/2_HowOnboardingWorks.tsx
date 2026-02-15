import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 2;

interface HowOnboardingWorksProps {
  className?: string;
}

export default function HowOnboardingWorks({ className }: HowOnboardingWorksProps) {
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("2_HowOnboardingWorks", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`HowOnboardingWorks${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="How Onboarding Works"
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
            As one of our first datanauts, you'll be shaping how Gnosis VPN looks and
            feels for all future users. To do this, this tool will both onboard you and
            assess how intuitive our VPN is. We'll also be on the hunt for bugs.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            At each step, I'll give you a short instruction for what to do next. Try to
            complete it on your own. But if you can't, click the "More info" button and
            I'll show you what to do in more detail.
          </Typography>
        </>
      }
      buttons={
        onboardingStep === STEP ? (
          <Button
            label={CONTINUE_LABEL}
            onClick={() => handleAnswer(CONTINUE_LABEL, STEP + 1)}
          />
        ) : null
      }
    />
  );
}

import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 2;

interface HowOnboardingWorksProps {
  className?: string;
  lastEntry?: boolean;}

export default function HowOnboardingWorks({ className, lastEntry }: HowOnboardingWorksProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`2_HowOnboardingWorks-ANON_${exitNodeIteration}`, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`HowOnboardingWorks ANON${className ? ` ${className}` : ""}`}
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
            As a datanaut, you'll be shaping how Gnosis VPN looks and feels. This tool will both onboard you and assess how intuitive our VPN is. We'll also be on the hunt for bugs.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            At each step, I'll give you a short instruction. Try to complete it on your own. If you can't, you can ask for help and I'll show you more.
          </Typography>
        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button
              label={CONTINUE_LABEL}
              onClick={() => handleAnswer(CONTINUE_LABEL, STEP + 1)}
            />
          </>
        ) : null
      }
    />
  );
}

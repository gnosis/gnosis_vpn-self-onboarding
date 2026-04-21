import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 3;

interface GettingHelpProps {
  className?: string;
  lastEntry?: boolean;}

export default function GettingHelp({ className, lastEntry }: GettingHelpProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`3_GettingHelp-ANON_${exitNodeIteration}`, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`GettingHelp ANON${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Getting Help"
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
            If you're stuck, please send us a message using your chosen contact method and a team member will respond as soon as possible.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Depending on what's not working, you might be asked to join 1-on-1 call for live debugging.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            You can write notes about your problem in the provided boxes. Since you're anonymous mode I won't be able to see what you write, but you can refer to it when our support contacts you. The team is fully trained on how to handle anonymous datanauts.
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

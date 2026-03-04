import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 32;

interface PleaseRestartProps {
  className?: string;
  lastEntry?: boolean;}

export default function PleaseRestart({ className, lastEntry }: PleaseRestartProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const WORKING_LABEL = "It's working now";
  const NOT_WORKING_LABEL = "It's still not working";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("32_PleaseRestart", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`PleaseRestart${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Uh oh! Please restart your testing device and try again"
      buttons={
        lastEntry ? (
          <>
            <Button label={NOT_WORKING_LABEL} onClick={() => handleAnswer(NOT_WORKING_LABEL, STEP + 0.25)} />
            <Button label={WORKING_LABEL} onClick={() => handleAnswer(WORKING_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}

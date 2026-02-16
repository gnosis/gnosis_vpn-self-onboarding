import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 9;

interface RunInstallerProps {
  className?: string;
}

export default function RunInstaller({ className }: RunInstallerProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need some help";
  const DONE_IT_LABEL = "Done it!";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("9_RunInstaller", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`RunInstaller${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Now run the installer"
   //   text={<VideoPlaceholder title="Installer" />}
      buttons={
        onboardingStep === STEP ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 1)} />
            <Button label={DONE_IT_LABEL} onClick={() => handleAnswer(DONE_IT_LABEL, STEP + 2)} />
          </>
        ) : null
      }
    />
  );
}

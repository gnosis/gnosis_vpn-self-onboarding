import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface RunInstallerProps {
  className?: string;
}

export default function RunInstaller({ className }: RunInstallerProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`RunInstaller${className ? ` ${className}` : ""}`}
      onboardingStep={8}
      title="Now run the installer"
      text={null}
      buttons={
        onboardingStep === 8 ? (
          <>
            <Button label="I need some help" onClick={() => console.log("User needs help")} />
            <Button label="Done it!" onClick={() => setOnboardingStep(9)} />
          </>
        ) : null
      }
    />
  );
}

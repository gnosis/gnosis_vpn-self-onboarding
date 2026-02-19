import { useEffect } from "react";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 31;

interface WaitTillYouAreConnectedProps {
  className?: string;
  lastEntry?: boolean;}

export default function WaitTillYouAreConnected({ className, lastEntry }: WaitTillYouAreConnectedProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const isVpn = useAppStore((state) => state.isVpn);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  useEffect(() => {
    if(isVpn && STEP === onboardingStep) {
      setOnboardingStep(onboardingStep + 2);
      saveAnswer(`X${onboardingStep}_STEP`, 'I connected to the VPN');
    } 
  }, [isVpn, onboardingStep, setOnboardingStep, saveAnswer]);

  return (
    <Step
      className={`WaitTillYouAreConnected${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Let's wait a moment to see if you are connected to the VPN"
      buttons={
        lastEntry ? (
          <>
            {/* <Button label={NOT_WORKING_LABEL} onClick={() => handleAnswer(NOT_WORKING_LABEL, STEP + 0.25)} /> */}
          </>
        ) : null
      }
    />
  );
}

import { useEffect, useState } from "react";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import Button from "../../components/onboarding/Button";
import { getVpnCountry } from "../../functions";

const STEP = 31;

interface WaitTillYouAreConnectedProps {
  className?: string;
  lastEntry?: boolean;
}

const css = `
  .interstitial-wrapper.instructions {
    display: none;
  }
  canvas {
    border-bottom: 1px #535353 solid;
  }
`

const NOT_WORKING_LABEL = "VPN not working?";
const I_AM_CONNECTED_LABEL = 'I am connected to the VPN';


export default function WaitTillYouAreConnected({ className, lastEntry }: WaitTillYouAreConnectedProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const currentIP = useAppStore((state) => state.currentIP);
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const isSameDevice = useAppStore((state) => state.isSameDevice);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);
  const [waitTimeIsOver, setWaitTimeIsOver] = useState(false);

  useEffect(() => {
    const isVpn = currentIP?.startsWith("185.9.1.") || false;
    if(isSameDevice && isVpn && STEP === onboardingStep) {
      const vpnCountry = getVpnCountry(currentIP);
      setOnboardingStep(onboardingStep + 2);
      saveAnswer(`${STEP}_WaitTillYouAreConnected_${exitNodeIteration}`, `${I_AM_CONNECTED_LABEL} ${vpnCountry ? `(${vpnCountry})` : ''}`);
    } 
  }, [isSameDevice, currentIP, onboardingStep, setOnboardingStep, saveAnswer, exitNodeIteration]);

  useEffect(() => {
    if(!lastEntry) {
      setWaitTimeIsOver(true);
    }
    const timeout = setTimeout(() => {
      setWaitTimeIsOver(true);
    }, 15_000);
    return () => clearTimeout(timeout);
  }, [lastEntry]);

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`${STEP}_WaitTillYouAreConnected_${exitNodeIteration}`, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`WaitTillYouAreConnected${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Let's wait a moment to see if you are connected to the VPN"
      buttons={
        lastEntry && isSameDevice ? ( 
          <Button 
            label={waitTimeIsOver ? NOT_WORKING_LABEL : "\u200B"} 
            onClick={() => handleAnswer(NOT_WORKING_LABEL, STEP + 1)} 
            disabled={!waitTimeIsOver}
          />
        ) : lastEntry && !isSameDevice ? (
          <>
            <Button
              label={NOT_WORKING_LABEL}
              onClick={() => handleAnswer(NOT_WORKING_LABEL, STEP + 1)}
            />
            <Button
              label={I_AM_CONNECTED_LABEL}
              onClick={() => handleAnswer(I_AM_CONNECTED_LABEL, STEP + 2)}
            />
          </>
        ) : null
      }
    />
  );
}

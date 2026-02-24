import { useEffect, useState } from "react";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import Button from "../../components/onboarding/Button";
import DinoGame from 'react-chrome-dino-ts'
import 'react-chrome-dino-ts/index.css'

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

const NOT_WORKING_LABEL = "VPN Not working?";

export default function WaitTillYouAreConnected({ className, lastEntry }: WaitTillYouAreConnectedProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const isVpn = useAppStore((state) => state.isVpn);
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const [waitTimeIsOver, setWaitTimeIsOver] = useState(false);

  useEffect(() => {
    if(isVpn && STEP === onboardingStep) {
      setOnboardingStep(onboardingStep + 2);
      saveAnswer(`X${onboardingStep}_STEP`, 'I connected to the VPN');
    } 
  }, [isVpn, onboardingStep, setOnboardingStep, saveAnswer]);

  useEffect(() => {
    if(!lastEntry) {
      setWaitTimeIsOver(true);
    }
    const timeout = setTimeout(() => {
      setWaitTimeIsOver(true);
    }, 30_000);
    return () => clearTimeout(timeout);
  }, [lastEntry]);

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`${STEP}_PleaseRestart`, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`WaitTillYouAreConnected${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Let's wait a moment to see if you are connected to the VPN"
      text={
        <>
        <p>In the mean time, you can play a game. Press the spacebar to start the game and to jump.</p>
        <DinoGame />
        <style>
          {css}
        </style>
        </>
      }
      buttons={
        lastEntry ? ( 
          <>
            <Button 
              label={waitTimeIsOver ? NOT_WORKING_LABEL : "\u200B"} 
              onClick={() => handleAnswer(NOT_WORKING_LABEL, STEP + 1)} 
              disabled={!waitTimeIsOver}
            />
          </>
        ) : null
      }
    />
  );
}

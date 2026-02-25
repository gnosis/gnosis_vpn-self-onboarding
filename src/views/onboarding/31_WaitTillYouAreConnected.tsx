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

const NOT_WORKING_LABEL = "VPN not working?";
const I_AM_CONNECTED_LABEL = 'I am connected to the VPN';


export default function WaitTillYouAreConnected({ className, lastEntry }: WaitTillYouAreConnectedProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const isVpn = useAppStore((state) => state.isVpn);
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const isSameDevice = useAppStore((state) => state.isSameDevice);
  const [waitTimeIsOver, setWaitTimeIsOver] = useState(false);
  const [gameReady, setGameReady] = useState(false);

  useEffect(() => {
    if (!isSameDevice) return;
    const id = requestAnimationFrame(() => setGameReady(true));
    return () => cancelAnimationFrame(id);
  }, [isSameDevice]);

  useEffect(() => {
    if (!gameReady) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).Runner?.keycodes?.JUMP?.[38];
    const preventScroll = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;
      const canvas = document.querySelector('canvas.runner-canvas');
      if (!canvas) return;
      const { top, bottom } = canvas.getBoundingClientRect();
      const isVisible = top < window.innerHeight && bottom > 0;
      if (isVisible) {
        e.preventDefault();
      } else {
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener('keydown', preventScroll, true);
    return () => window.removeEventListener('keydown', preventScroll, true);
  }, [gameReady]);

  useEffect(() => {
    if(isSameDevice &&isVpn && STEP === onboardingStep) {
      setOnboardingStep(onboardingStep + 2);
      saveAnswer(`${STEP}_WaitTillYouAreConnected`, I_AM_CONNECTED_LABEL);
    } 
  }, [isSameDevice, isVpn, onboardingStep, setOnboardingStep, saveAnswer]);

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
    saveAnswer(`${STEP}_WaitTillYouAreConnected`, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`WaitTillYouAreConnected${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Let's wait a moment to see if you are connected to the VPN"
      text={
        isSameDevice ? (
          <>
            <p>In the mean time, you can play a game. Press the spacebar to start the game and to jump.</p>
            <div className="game-container">
              {gameReady && <DinoGame />}
            </div>
            <style>
              {css}
            </style>
          </>
        ) : null
      }
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

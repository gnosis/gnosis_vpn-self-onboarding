import { useEffect, Fragment, useRef } from "react";
import { Container, Box } from "@mui/material";
import TopBar from "../components/onboarding/TopBar";
import { useAppStore } from "../store/appStore";
import MessageBubble from "../components/MessageBubble";

import { uploadData } from "../functions";
import { STEP_COMPONENTS } from "./onboarding/index";
import X_WhatCanIHelpYouWith from "./onboarding/X_WhatCanIHelpYouWith";
import X_KeepAnEye from "./onboarding/X_KeepAnEye";
import X_iCal from "./onboarding/X_iCal";
import X_YouWereDisconnected from "./onboarding/X_YouWereDisconnected";
import X_YouAreConnected from "./onboarding/X_YouAreConnected";
import X_ConnectedTooEarly from "./onboarding/X_ConnectedTooEarly";

interface OnboardingProps {
  className?: string;
}

export default function Onboarding({ className }: OnboardingProps) {
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const stepLog = useAppStore((state) => state.stepLog);
  const feedback = useAppStore((state) => state.feedback);
  const survey = useAppStore((state) => state.survey);
  const token = useAppStore((state) => state.token);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);
  const onboardingAnswers = useAppStore((state) => state.onboardingAnswers);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const numberOfSteps = Object.keys(STEP_COMPONENTS).length;
  const isMacOs = useAppStore((state) => state.isMacOs);
  const isSameDevice = useAppStore((state) => state.isSameDevice);
  const anonymous = useAppStore((state) => state.anonymous);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await new Promise((r) => setTimeout(r, 50));
      while (!cancelled) {
        let el 
        if (onboardingStep === 99) {
          el = document.getElementsByClassName(`Feedback`);
        } else {
          el = document.getElementsByClassName(`StepButtons`);
        }
         
        if (el && el.length > 0) {
          const offset = onboardingStep === 99 ? 60 : 0;
          const target = el[0].getBoundingClientRect().top + window.scrollY - offset;
          const start = window.scrollY;
          const distance = target - start;
          const duration = 1000;
          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (cancelled) return;
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress < 0.5
              ? 2 * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            window.scrollTo(0, start + distance * ease);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          break;
        }
        await new Promise((r) => setTimeout(r, 50));
      }
    })();
    return () => { cancelled = true; };
  }, [onboardingStep]);

  useEffect(() => {
    if (anonymous) return;
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      uploadData(token, { exitNodeIteration, onboardingStep, stepLog, feedback, survey, onboardingAnswers, isMacOs, isSameDevice });
    }, 4000);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [anonymous, exitNodeIteration, onboardingStep, stepLog, feedback, survey, onboardingAnswers, isMacOs, isSameDevice]);

  useEffect(() => {
      console.log(JSON.stringify({ stepLog }, null, 2));
  }, [stepLog]);


  const CurrentComponent = STEP_COMPONENTS[onboardingStep] ?? null;

  return (
    <Box className={`Onboarding${className ? ` ${className}` : ""}`} sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", pt: "57px" }}>
      {/* Top Bar */}
      <TopBar currentStep={onboardingStep} totalSteps={numberOfSteps} />

      {/* Main Content */}
      <Container maxWidth={false} sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "900px", margin: "0 auto", px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            py: { xs: 3, sm: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {/* Completed steps from stepLog */}
          {stepLog.map((entry, mN) => {
            const [key, answer] = entry.split(':');
            if (!key) return null;
            if (key.startsWith("X")) {
              const stepData = key.split('_');
              const step = parseFloat(stepData[0].substring(1));
              const exitNodeIteration = stepData.length > 2 ? parseInt(stepData[2]) : 0;

              return (
                <Fragment key={`${key}-${mN}`}>
                  { Math.round((step % 1) * 100) / 100 === 0.1 && <X_ConnectedTooEarly onboardingStep={step} messageNumber={mN} exitNodeIteration={exitNodeIteration} />}
                  { Math.round((step % 1) * 100) / 100 === 0.25 && <X_WhatCanIHelpYouWith onboardingStep={step} messageNumber={mN} exitNodeIteration={exitNodeIteration} />}
                  { Math.round((step % 1) * 100) / 100 === 0.5 && <X_KeepAnEye onboardingStep={step} messageNumber={mN} exitNodeIteration={exitNodeIteration} />}
                  { Math.round((step % 1) * 100) / 100 === 0.75 && <X_iCal onboardingStep={step} messageNumber={mN} exitNodeIteration={exitNodeIteration} />}
                  { Math.round((step % 1) * 100) / 100 === 0.9 && <X_YouAreConnected onboardingStep={step} messageNumber={mN} exitNodeIteration={exitNodeIteration} /> }
                  { Math.round((step % 1) * 100) / 100 === 0.95 && <X_YouWereDisconnected onboardingStep={step} messageNumber={mN} exitNodeIteration={exitNodeIteration} /> }
                  { answer && <MessageBubble text={answer} /> }
                </Fragment>
              ); 
            }
            
            const stepNum = parseInt(key);
            const Component = STEP_COMPONENTS[stepNum];
            if (!Component) return null;
            return (
              <Fragment key={`${key}-${mN}`}>
                <Component messageNumber={mN} exitNodeIteration={exitNodeIteration}/>
                { answer && <MessageBubble text={answer} /> }
              </Fragment>
            );
          })}

          {/* Current active step */}
          {onboardingStep % 1 === 0 && CurrentComponent && <CurrentComponent lastEntry={true} messageNumber={stepLog.length} exitNodeIteration={exitNodeIteration} />}
          {Math.round((onboardingStep % 1) * 100) / 100 === 0.1 && <X_ConnectedTooEarly lastEntry={true} messageNumber={stepLog.length} exitNodeIteration={exitNodeIteration} />}
          {Math.round((onboardingStep % 1) * 100) / 100 === 0.25 && <X_WhatCanIHelpYouWith lastEntry={true} messageNumber={stepLog.length} exitNodeIteration={exitNodeIteration} />}
          {Math.round((onboardingStep % 1) * 100) / 100 === 0.5 && <X_KeepAnEye lastEntry={true} messageNumber={stepLog.length} exitNodeIteration={exitNodeIteration} />}
          {Math.round((onboardingStep % 1) * 100) / 100 === 0.75 && <X_iCal lastEntry={true} messageNumber={stepLog.length} exitNodeIteration={exitNodeIteration} />}
          {Math.round((onboardingStep % 1) * 100) / 100 === 0.9 && <X_YouAreConnected lastEntry={true} messageNumber={stepLog.length} exitNodeIteration={exitNodeIteration} />}
          {Math.round((onboardingStep % 1) * 100) / 100 === 0.95 && <X_YouWereDisconnected lastEntry={true} messageNumber={stepLog.length} exitNodeIteration={exitNodeIteration} /> }

        </Box>
      </Container>
    </Box>
  );
}
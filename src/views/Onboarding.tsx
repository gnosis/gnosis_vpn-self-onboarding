import { useEffect, Fragment, useRef } from "react";
import { Container, Box } from "@mui/material";
import TopBar from "../components/onboarding/TopBar";
import { useAppStore } from "../store/appStore";
import MessageBubble from "../components/MessageBubble";

import { STEP_COMPONENTS } from "./onboarding/index";
import X_WhatCanIHelpYouWith from "./onboarding/X_WhatCanIHelpYouWith";
import X_KeepAnEye from "./onboarding/X_KeepAnEye";
import X_iCal from "./onboarding/X_iCal";

interface OnboardingProps {
  className?: string;
}

export default function Onboarding({ className }: OnboardingProps) {
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const stepLog = useAppStore((state) => state.stepLog);
  const notes = useAppStore((state) => state.notes);
  const feedback = useAppStore((state) => state.feedback);
  const token = useAppStore((state) => state.token);
  const onboardingAnswers = useAppStore((state) => state.onboardingAnswers);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await new Promise((r) => setTimeout(r, 50));
      while (!cancelled) {
        const el = document.getElementsByClassName(`StepButtons`);
        if (el.length > 0) {
          const target = el[0].getBoundingClientRect().top + window.scrollY;
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
    const uploadData = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_WEBAPI_URL}/api/gnosisvpn-self-onboarding/updateJsonData`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({jsonData:{
              onboardingStep,
              stepLog,
              notes,
              feedback,
              onboardingAnswers
            }}),
          }
        );

        if (!response.ok) {
          console.error('Failed to upload data:', response.statusText);
        } else {
          console.log('Data uploaded successfully');
        }
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    };

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      uploadData();
    }, 5000);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [onboardingStep, stepLog, notes, feedback, onboardingAnswers]);


  const CurrentComponent = STEP_COMPONENTS[onboardingStep] ?? null;

  return (
    <Box className={`Onboarding${className ? ` ${className}` : ""}`} sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", pt: "57px" }}>
      {/* Top Bar */}
      <TopBar currentStep={onboardingStep} totalSteps={47} />

      {/* Main Content */}
      <Container maxWidth={false} sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Box
          sx={{
            py: { xs: 3, sm: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {/* Completed steps from stepLog */}
          {stepLog.map((entry, i) => {
            const [key, answer] = entry.split(':');
            if (!key) return null;
            if (key.startsWith("X") && key.endsWith("_WhatCanIHelpYouWith")) {
              const step = parseFloat(key.split('_')[0].substring(1));
              return (
                <Fragment key={`${key}-${i}`}>
                  { step % 1 === 0.25 && <X_WhatCanIHelpYouWith onboardingStep={step} />}
                  { step % 1 === 0.5 && <X_KeepAnEye onboardingStep={step} />}
                  { step % 1 === 0.75 && <X_iCal onboardingStep={step} />}
                  { answer && <MessageBubble text={answer} /> }
                </Fragment>
              ); 
            }
            
            const stepNum = parseInt(key);
            const Component = STEP_COMPONENTS[stepNum];
            if (!Component) return null;
            return (
              <Fragment key={`${key}-${i}`}>
                <Component />
                { answer && <MessageBubble text={answer} /> }
              </Fragment>
            );
          })}

          {/* Current active step */}
          {onboardingStep % 1 === 0 && CurrentComponent && <CurrentComponent lastEntry={true} />}
          {onboardingStep % 1 === 0.25 && <X_WhatCanIHelpYouWith lastEntry={true} />}
          {onboardingStep % 1 === 0.5 && <X_KeepAnEye lastEntry={true} />}
          {onboardingStep % 1 === 0.75 && <X_iCal lastEntry={true} />}

        </Box>
      </Container>
    </Box>
  );
}
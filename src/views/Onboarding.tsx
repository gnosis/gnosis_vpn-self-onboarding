import { useEffect } from "react";
import { Container, Box } from "@mui/material";
import TopBar from "../components/onboarding/TopBar";
import { useAppStore } from "../store/appStore";
import MessageBubble from "../components/MessageBubble";

// Steps
import Welcome from "./onboarding/1_welcome";
import HowOnboardingWorks from "./onboarding/2_HowOnboardingWorks";



import GettingHelp from "./onboarding/3_GettingHelp";
import SwitchingDevices from "./onboarding/4_SwitchingDevices";
import SessionSummary from "./onboarding/5_SessionSummary";
import Os from "./onboarding/6_os";
import Download from "./onboarding/7_download";



interface OnboardingProps {
  className?: string;
}

export default function Onboarding({ className }: OnboardingProps) {
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const selectedOS = useAppStore((state) => state.selectedOS);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      while (!cancelled) {
        const el = document.getElementById(`onboardingStep-${onboardingStep}`);
        if (el) {
          const target = el.getBoundingClientRect().top + window.scrollY;
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

  return (
    <Box className={`Onboarding${className ? ` ${className}` : ""}`} sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", pt: "57px" }}>
      {/* Top Bar */}
      <TopBar currentStep={onboardingStep} totalSteps={16} />

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
          { onboardingStep >= 1 && <Welcome /> }
          { onboardingStep >= 2 && <MessageBubble text="Start onboarding" /> }
          { onboardingStep >= 2 && <HowOnboardingWorks /> }
          { onboardingStep >= 3 && <MessageBubble text="Continue" /> }
          { onboardingStep >= 3 && <GettingHelp /> }
          { onboardingStep >= 4 && <MessageBubble text="Continue" /> }
          { onboardingStep >= 4 && <SwitchingDevices /> }
          { onboardingStep >= 5 && <MessageBubble text="Continue" /> }
          { onboardingStep >= 5 && <SessionSummary /> }
          { onboardingStep >= 6 && <MessageBubble text="Continue" /> }
          { onboardingStep >= 6 && <Os /> }
          { onboardingStep >= 7 && <MessageBubble text={selectedOS} /> }
          { onboardingStep >= 7 && <Download /> }
        </Box>
      </Container>
    </Box>
  );
}

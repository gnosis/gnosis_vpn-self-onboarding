import React from "react";
import { Container, Box } from "@mui/material";
import TopBar from "../components/onboarding/TopBar";
import { useAppStore } from "../store/appStore";

// Steps
import Welcome from "./onboarding/1_welcome";
import Os from "./onboarding/2_os";
import Download from "./onboarding/3_download";
import MessageBubble from "../components/MessageBubble";


export default function Onboarding() {
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const selectedOS = useAppStore((state) => state.selectedOS);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
          { onboardingStep >= 2 && <MessageBubble text="Continue" /> }
          { onboardingStep >= 2 && <Os /> }
          { onboardingStep >= 3 && <MessageBubble text={selectedOS} /> }
          { onboardingStep >= 3 && <Download /> }
        </Box>
      </Container>
    </Box>
  );
}

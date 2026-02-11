import React from "react";
import { Container, Box } from "@mui/material";
import TopBar from "../components/onboarding/TopBar";
import Button from "../components/onboarding/Button";
import Welcome from "./onboarding/1_welcome";
import { useAppStore } from "../store/appStore";

export default function Onboarding() {
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);

  const handleContinue = () => {
    // Move to next step
    setOnboardingStep(onboardingStep + 1);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top Bar */}
      <TopBar currentStep={onboardingStep} totalSteps={16} />

      {/* Main Content */}
      <Container maxWidth={false} sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Box sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
          <Welcome />
        </Box>
      </Container>

      {/* Bottom Button */}
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 3, sm: 4, md: 6 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          label="Continue"
          onClick={handleContinue}
        />
      </Box>
    </Box>
  );
}

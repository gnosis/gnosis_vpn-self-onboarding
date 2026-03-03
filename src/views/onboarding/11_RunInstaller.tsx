import { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 11;

interface RunInstallerProps {
  className?: string;
  lastEntry?: boolean;
}

export default function RunInstaller({ className, lastEntry }: RunInstallerProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const macOS = useAppStore((state) => state.isMacOs);

  const NEED_HELP_LABEL = "I need some help";
  const DONE_IT_LABEL = "It's installed";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("11_RunInstaller", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`RunInstaller${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Great! Now run the installer from your downloads folder"
      text={
        macOS ?
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Double click to run the installer.
          </Typography>
          :
          <>
          <Box
            sx={{
              backgroundColor: "#1e1e1e",
              borderRadius: "8px",
              padding: "16px",
              fontFamily: "'Courier New', Consolas, monospace",
              fontSize: "0.85rem",
              lineHeight: 1.8,
              color: "#d4d4d4",
              overflow: "auto",
            }}
          >
            <Box component="span" sx={{ color: "#6a9955" }}>$</Box>{" "}
            <Box component="span" sx={{ color: "#d4d4d4" }}>cd ~/Downloads</Box>
            <br />
            <Box component="span" sx={{ color: "#6a9955" }}>$</Box>{" "}
            <Box component="span" sx={{ color: "#d4d4d4" }}>sudo apt install ./gnosisvpn_&lt;version&gt;_amd64.deb</Box>
          </Box>
          </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 1)} />
            <Button label={DONE_IT_LABEL} onClick={() => handleAnswer(DONE_IT_LABEL, STEP + 2)} />
          </>
        ) : null
      }
    />
  );
}

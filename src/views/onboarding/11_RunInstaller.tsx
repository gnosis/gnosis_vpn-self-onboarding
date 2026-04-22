import { Typography, Box, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import { InstallerName, installerLabel } from "../../functions";

const STEP = 11;

interface RunInstallerProps {
  className?: string;
  lastEntry?: boolean;
}

export default function RunInstaller({ className, lastEntry }: RunInstallerProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const macOS = useAppStore((state) => state.isMacOs);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);
  const isSameDevice = useAppStore((state) => state.isSameDevice);
  const systemSpec = useAppStore((state) => state.systemSpec);
  const currentVersion = useAppStore((state) => state.currentVersion);
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);
  const systemArchitectureAvailable = isSameDevice && systemSpec.architecture && ["arm64", "arm", "x86_64", "x86"].includes(systemSpec.architecture)

  const NEED_HELP_LABEL = "I need some help";
  const DONE_IT_LABEL = "It's installed";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`11_RunInstaller_${exitNodeIteration}`, answer);
    setOnboardingStep(nextStep);
  };

  const handleCopy1 = () => {
    navigator.clipboard.writeText(`cd ~/Downloads`);
    setCopied2(false);
    setCopied1(true);
    setTimeout(() => setCopied1(false), 2000);
  };

  const handleCopy2 = () => {
    navigator.clipboard.writeText(`sudo apt install ./${installerLabel({ macOS, systemArchitectureAvailable, systemSpec })}`);
    setCopied1(false);
    setCopied2(true);
    setTimeout(() => setCopied2(false), 2000);
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
            <Typography
              variant="body1"
              sx={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "#333",
              }}
            >
               Open your terminal and move into the directory where the file was saved:
            </Typography>
           
            <Box sx={{ position: "relative" }}>
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
                <Box component="span" sx={{ color: "#6a9955", userSelect: "none" }}>${" "}</Box>
                <Box component="span" sx={{ color: "#d4d4d4" }}>cd ~/Downloads</Box>
              </Box>
              <Tooltip title={copied1 ? "Copied!" : "Copy"} placement="top">
                <IconButton
                  onClick={handleCopy1}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    color: copied1 ? "#6a9955" : "#888",
                    "&:hover": { color: "#d4d4d4" },
                  }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "#333",
              }}
            >
               Copy the command below into your terminal. 
               Note: Replace  {!systemArchitectureAvailable && <> <span style={{ color: "darkblue", fontWeight: 800 }}>&lt;architecture&gt;</span> (e.g. amd64)</>} with the data of the file you just downloaded
            </Typography>
           
            <Box sx={{ position: "relative" }}>
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
                <Box component="span" sx={{ color: "#6a9955", userSelect: "none" }}>${" "}</Box>
                <Box component="span" sx={{ color: "#d4d4d4" }}>sudo apt install ./<InstallerName macOS={macOS} systemArchitectureAvailable={systemArchitectureAvailable} systemSpec={systemSpec} /></Box>
              </Box>
              <Tooltip title={copied2 ? "Copied!" : "Copy"} placement="top">
                <IconButton
                  onClick={handleCopy2}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    color: copied2 ? "#6a9955" : "#888",
                    "&:hover": { color: "#d4d4d4" },
                  }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
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

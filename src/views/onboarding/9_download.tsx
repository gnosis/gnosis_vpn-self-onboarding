import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import ButtonGrayCta from "../../components/ButtonGrayCta";
import { useEffect } from "react";

const STEP = 9;

interface DownloadProps {
  className?: string;
  lastEntry?: boolean;
}

export default function Download({ className, lastEntry }: DownloadProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const macOS = useAppStore((state) => state.isMacOs);
  const isSameDevice = useAppStore((state) => state.isSameDevice);
  const setSystemSpec = useAppStore((state) => state.setSystemSpec);
  const systemSpec = useAppStore((state) => state.systemSpec);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);
  const systemArchitectureAvailable = isSameDevice && systemSpec.architecture && ["arm64", "arm", "x86_64", "x86"].includes(systemSpec.architecture)

  const NEED_HELP_LABEL = "I need some help";
  const DOWNLOADED_LABEL = "Downloaded!";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`9_download_${exitNodeIteration}`, answer);
    setOnboardingStep(nextStep);
  };


  useEffect(() => {
    // Detect system information
    const userAgent = navigator.userAgent.toLowerCase();
    let system: "Windows" | "macOS" | "Linux" | "Unknown" | null = null;
    let architecture: "x86_64" | "x86" | "arm64" | "arm" | null = null;

    // Detect OS type
    if (userAgent.includes("win")) {
      system = "Windows";
    } else if (userAgent.includes("mac")) {
      system = "macOS";
    } else if (userAgent.includes("linux")) {
      system = "Linux";
    } else if (userAgent.includes("x11")) {
      system = "Linux";
    }

    // Detect CPU architecture from userAgent
    if (userAgent.includes("x86_64") || userAgent.includes("amd64")) {
      architecture = "x86_64";
    } else if (userAgent.includes("x86") || userAgent.includes("i386")) {
      architecture = "x86";
    } else if (userAgent.includes("arm64") || userAgent.includes("aarch64")) {
      architecture = "arm64";
    } else if (userAgent.includes("armv7") || userAgent.includes("arm")) {
      architecture = "arm";
    }

    setSystemSpec(architecture, system);
  }, [setSystemSpec]);


  function InstallerName () {
    // mac OS
    if (macOS) return <>GnosisVPN-Installer-<span style={{color:"darkorange", fontWeight: 800}}>&lt;version&gt;</span><span style={{color:"darkred", fontWeight: 800}}>.pkg</span></>

    // Linux
    if(systemArchitectureAvailable) {
      if (systemSpec.architecture === "arm64" || systemSpec.architecture === "arm") {
        return <>gnosisvpn_<span style={{color:"darkorange", fontWeight: 800}}>&lt;version&gt;</span>_<span style={{color:"darkblue", fontWeight: 800}}>arm64</span><span style={{color:"darkred", fontWeight: 800}}>.deb</span></>
      }
      if (systemSpec.architecture === "x86_64" || systemSpec.architecture === "x86") {
        return <>gnosisvpn_<span style={{color:"darkorange", fontWeight: 800}}>&lt;version&gt;</span>_<span style={{color:"darkblue", fontWeight: 800}}>amd64</span><span style={{color:"darkred", fontWeight: 800}}>.deb</span></>
      }
    }

    return <>gnosisvpn_<span style={{color:"darkorange", fontWeight: 800}}>&lt;version&gt;</span>_<span style={{color:"darkblue", fontWeight: 800}}>&lt;architecture&gt;</span><span style={{color:"darkred", fontWeight: 800}}>.deb</span></>
  }

  return (
    <Step
      className={`Download${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Download The App"
      text={
        <>
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Great! Now head to {" "}
            <ButtonGrayCta
              href="https://github.com/gnosis/gnosis_vpn/releases/latest"
              label="https://github.com/gnosis/gnosis_vpn/releases/latest" 
            />
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            and download the installer {" "}
            <span style={{fontWeight:600}}>
              <InstallerName />
            </span>.
          </Typography>

        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 1)} />
            <Button label={DOWNLOADED_LABEL} onClick={() => handleAnswer(DOWNLOADED_LABEL, STEP + 2)} />
          </>
        ) : null
      }
    />
  );
}

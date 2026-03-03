import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import ButtonGrayCta from "../../components/ButtonGrayCta";

const STEP = 9;

interface DownloadProps {
  className?: string;
  lastEntry?: boolean;
}

export default function Download({ className, lastEntry }: DownloadProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const macOS = useAppStore((state) => state.isMacOs);

  const NEED_HELP_LABEL = "I need some help";
  const DOWNLOADED_LABEL = "Downloaded!";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("9_download", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`Download${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Download the app"
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
              {
                macOS ? 
                <>GnosisVPN-Installer-***<span style={{color:"darkorange", fontWeight: 800}}>.pkg</span></> : 
                <>GnosisVPN-Installer-***<span style={{color:"darkorange", fontWeight: 800}}>.deb</span></>
              }
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

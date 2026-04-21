import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import ButtonGrayCta from "../../components/ButtonGrayCta";

const STEP = 9;

const DOWNLOAD_PORTAL_HREF = "https://downloads.vpn.gnosis.eth.limo";
const DOWNLOAD_PORTAL_LABEL = "downloads.vpn.gnosis.eth.limo";

interface DownloadProps {
  className?: string;
  lastEntry?: boolean;
}

export default function Download({ className, lastEntry }: DownloadProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);

  const NEED_HELP_LABEL = "I need some help";
  const DOWNLOADED_LABEL = "Downloaded!";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`9_download_${exitNodeIteration}`, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`Download${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Download The App"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Great! Open our download page and grab the installer for your system:{" "}
          <ButtonGrayCta href={DOWNLOAD_PORTAL_HREF} label={DOWNLOAD_PORTAL_LABEL} />
        </Typography>
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

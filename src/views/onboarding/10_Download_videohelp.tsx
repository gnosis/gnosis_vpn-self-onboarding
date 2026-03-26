import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import VideoPlaceholder from "../../components/VideoPlaceholder";
import { useAppStore } from "../../store/appStore";

const STEP = 10;

interface DownloadVideohelpProps {
  className?: string;
  lastEntry?: boolean;
}

export default function DownloadVideohelp({ className, lastEntry }: DownloadVideohelpProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const macOS = useAppStore((state) => state.isMacOs);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);

  const I_NEED_MORE_HELP = "I need more help";
  const THANKS_LABEL = "Done it!";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`10_Download_videohelp_${exitNodeIteration}`, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`DownloadVideohelp${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Video support"
      text={
        <>
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
              marginBottom: "1rem",
            }}
          >
            No problem! Just follow the video below and you should get back on track.
          </Typography>
          <VideoPlaceholder 
            title="Download" 
            videoUrl= {macOS ? "./videos/MacOS/01_Visit Github, Download Installer.webm" : "./videos/Linux/01_github,download binary-Linux.webm"}
          />
        </>
      }
      buttons={
        lastEntry
          ? (
            <>
              <Button label={I_NEED_MORE_HELP} onClick={() => handleAnswer(I_NEED_MORE_HELP, STEP + 0.25)} />
              <Button label={THANKS_LABEL} onClick={() => handleAnswer(THANKS_LABEL, STEP + 1)} />
            </>
          )
          : null
      }
    />
  );
}

import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import VideoPlaceholder from "../../components/VideoPlaceholder";
import { useAppStore } from "../../store/appStore";

const STEP = 14;

interface RunGnosisVPNVideohelpProps {
  className?: string;
  lastEntry?: boolean;
}

export default function RunGnosisVPNVideohelp({ className, lastEntry }: RunGnosisVPNVideohelpProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const macOS = useAppStore((state) => state.isMacOs);

  const I_NEED_MORE_HELP = "I need more help";
  const THANKS_LABEL = "Done it!";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("14_RunGnosisVPN_videohelp", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`RunGnosisVPNVideohelp${className ? ` ${className}` : ""}`}
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
            title="Run Gnosis VPN"
            videoUrl= {macOS ? "./videos/MacOS/Launch_Run_MacOS_FHD.webm" : "./videos/Linux/gnosis_vpn_launch_Linux.webm"}
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
              marginBottom: "1rem",
            }}
          >
            You can find the app in your Finder or applications folder and double click to open it.
          </Typography>
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

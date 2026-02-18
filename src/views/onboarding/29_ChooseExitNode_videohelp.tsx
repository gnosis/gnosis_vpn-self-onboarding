import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import VideoPlaceholder from "../../components/VideoPlaceholder";
import { useAppStore } from "../../store/appStore";

const STEP = 29;

interface ChooseExitNodeVideohelpProps {
  className?: string;
  lastEntry?: boolean;
}

export default function ChooseExitNodeVideohelp({ className, lastEntry }: ChooseExitNodeVideohelpProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const selectedOS = useAppStore((state) => state.onboardingAnswers["8_os"]);
  const macOS = selectedOS === "Mac OS";

  const I_NEED_MORE_HELP = "I need more help";
  const THANKS_LABEL = "Thanks, continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("29_ChooseExitNode_videohelp", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`ChooseExitNodeVideohelp${className ? ` ${className}` : ""}`}
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
            No problem! Just follow the video below and you should get back on track
          </Typography>
          <VideoPlaceholder 
            title="Choose Exit Node" 
            videoUrl={macOS ? "./videos/MacOS/04_Connecting-MacOS_FHD.webm" : "./videos/Linux/04_connecting_new_Linux.webm"}
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

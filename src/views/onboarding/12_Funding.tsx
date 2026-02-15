import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import VideoPlaceholder from "../../components/VideoPlaceholder";
import { useAppStore } from "../../store/appStore";

const STEP = 12;

interface FundingProps {
  className?: string;
}

export default function Funding({ className }: FundingProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need some help";
  const FUNDED_LABEL = "It's funded";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("12_Funding", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`Funding${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Funding"
      text={
        <>
          {/* <VideoPlaceholder title="Funding" /> */}

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Great! We now need to fund the edge node which will connect you to the mixnet. Of course I'll be covering the cost!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            You should have received a secret funding code when we contacted you. Please visit the funding tool at{" "}
            <Box
              component="a"
              href="#"
              sx={{
                color: "#0066cc",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              funding tool link
            </Box>
            {" "}and use the code there.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            If you'd prefer to fund it yourself, you can find instructions{" "}
            <Box
              component="a"
              href="#"
              sx={{
                color: "#0066cc",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              here
            </Box>
            .
          </Typography>
        </>
      }
      buttons={
        onboardingStep === STEP ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP)} />
            <Button label={FUNDED_LABEL} onClick={() => handleAnswer(FUNDED_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}

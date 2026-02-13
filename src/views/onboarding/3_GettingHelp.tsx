import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface GettingHelpProps {
  className?: string;
}

export default function GettingHelp({ className }: GettingHelpProps) {
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("3_GettingHelp", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`GettingHelp${className ? ` ${className}` : ""}`}
      onboardingStep={3}
      title="Getting Help"
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
            If you still can't work out what to do, or something is broken, I can put you
            in touch with the team for more help.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            The first line of support is to briefly describe your problem in one of these
            boxes. A team member will get back to you via your chosen contact method as
            soon as possible.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            If you're still stuck, I can book you a 1-on-1 call with a member of the team.
          </Typography>
        </>
      }
      buttons={
        onboardingStep === 3 ? (
          <Button
            label={CONTINUE_LABEL}
            onClick={() => handleAnswer(CONTINUE_LABEL, 4)}
          />
        ) : null
      }
    />
  );
}

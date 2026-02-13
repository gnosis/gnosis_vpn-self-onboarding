import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface ChooseExitNodeProps {
  className?: string;
}

export default function ChooseExitNode({ className }: ChooseExitNodeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`ChooseExitNode${className ? ` ${className}` : ""}`}
      onboardingStep={19}
      title="Choose an exit node"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Next, choose and exit node and connect the VPN
        </Typography>
      }
      buttons={
        onboardingStep === 19 ? (
          <>
            <Button label="I need help" onClick={() => console.log("User needs help")} />
            <Button label="That's done" onClick={() => setOnboardingStep(20)} />
          </>
        ) : null
      }
    />
  );
}

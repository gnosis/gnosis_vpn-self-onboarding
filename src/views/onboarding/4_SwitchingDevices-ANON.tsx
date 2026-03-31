import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 4;

interface SwitchingDevicesProps {
  className?: string;
  lastEntry?: boolean;}

export default function SwitchingDevices({ className, lastEntry }: SwitchingDevicesProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`4_SwitchingDevices-ANON_${exitNodeIteration}`, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`SwitchingDevices ANON${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Switching Devices"
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
            You can use this onboarding tool on any device. However, Gnosis VPN must be set up on a desktop device.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Remember, if you decide to switch devices using the onboarding tool, I can't track where you are in your journey. But I am sure you'll be able to quickly navigate to where you need to pick up your onboarding journey.
          </Typography>
        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button
              label={CONTINUE_LABEL}
              onClick={() => handleAnswer(CONTINUE_LABEL, STEP + 4)}
            />
          </>
        ) : null
      }
    />
  );
}

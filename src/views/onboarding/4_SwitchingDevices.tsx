import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 4;

interface SwitchingDevicesProps {
  className?: string;
}

export default function SwitchingDevices({ className }: SwitchingDevicesProps) {
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("4_SwitchingDevices", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`SwitchingDevices${className ? ` ${className}` : ""}`}
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
            You can use this onboarding tool on any device, but you'll need to test on a
            desktop device. Sometimes we might ask you to switch to the device you're
            testing so you can send us logs from your VPN.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            If you want to switch devices, just close the session here so I know where to
            resume from when you log in again.
          </Typography>
        </>
      }
      buttons={
        onboardingStep === STEP ? (
          <Button
            label={CONTINUE_LABEL}
            onClick={() => handleAnswer(CONTINUE_LABEL, STEP + 1)}
          />
        ) : null
      }
    />
  );
}

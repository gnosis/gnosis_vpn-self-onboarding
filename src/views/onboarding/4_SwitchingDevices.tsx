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
  const setSameDevice = useAppStore((state) => state.setIsSameDevice);

  const SAME_DEVICE_LABEL = "Same device";
  const DIFFERENT_DEVICE_LABEL = "different device";

  const handleAnswer = (answer: string, nextStep: number) => {
    setSameDevice(answer === SAME_DEVICE_LABEL);
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
            You can use this onboarding tool on any device, but you’ll need to test on a desktop device. If you want to switch devices, just close the session here so I know where to resume from when you log in again.
          </Typography>
        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button
              label={DIFFERENT_DEVICE_LABEL}
              onClick={() => handleAnswer(DIFFERENT_DEVICE_LABEL, STEP + 1)}
            />
            <Button
              label={SAME_DEVICE_LABEL}
              onClick={() => handleAnswer(SAME_DEVICE_LABEL, STEP + 1)}
            />
          </>
        ) : null
      }
    />
  );
}

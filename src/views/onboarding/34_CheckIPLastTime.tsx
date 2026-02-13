import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface CheckIPLastTimeProps {
  className?: string;
}

export default function CheckIPLastTime({ className }: CheckIPLastTimeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`CheckIPLastTime${className ? ` ${className}` : ""}`}
      onboardingStep={34}
      title="Check IP one last time"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Amazing! We're almost done. Let's just check the IP one last time. Go back to{" "}
          <Box
            component="a"
            href="https://whatismyipaddress.com"
            target="_blank"
            rel="noreferrer noopener"
            sx={{
              color: "#0066cc",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            https://whatismyipaddress.com
          </Box>
        </Typography>
      }
      buttons={
        onboardingStep === 34 ? (
          <>
            <Button label="I need help" onClick={() => console.log("User needs help")} />
            <Button label="I've done that" onClick={() => setOnboardingStep(35)} />
          </>
        ) : null
      }
    />
  );
}

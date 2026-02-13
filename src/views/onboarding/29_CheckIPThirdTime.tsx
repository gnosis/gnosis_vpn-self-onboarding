import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface CheckIPThirdTimeProps {
  className?: string;
}

export default function CheckIPThirdTime({ className }: CheckIPThirdTimeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`CheckIPThirdTime${className ? ` ${className}` : ""}`}
      onboardingStep={29}
      title="Check your IP again"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Let's check in on the connection. Go back to{" "}
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
          {" "}and check your IP
        </Typography>
      }
      buttons={
        onboardingStep === 29 ? (
          <>
            <Button label="I need help" onClick={() => console.log("User needs help")} />
            <Button label="It's the same as last time" onClick={() => setOnboardingStep(30)} />
            <Button label="Something's gone wrong" onClick={() => setOnboardingStep(30)} />
          </>
        ) : null
      }
    />
  );
}

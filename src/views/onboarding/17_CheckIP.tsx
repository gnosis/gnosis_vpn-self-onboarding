import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface CheckIPProps {
  className?: string;
}

export default function CheckIP({ className }: CheckIPProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`CheckIP${className ? ` ${className}` : ""}`}
      onboardingStep={17}
      title="Check your IP"
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
            Gnosis VPN works by routing traffic through the HOPR mixnet. Every device has an IP address, so we'll know it's working if your IP address changes.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            First, we need to see what your IP address is normally. Go to{" "}
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
            {" "}and note down what it says. I don't want to know it! I just need to see if it changes.
          </Typography>
        </>
      }
      buttons={
        onboardingStep === 17 ? (
          <>
            <Button label="I need help" onClick={() => console.log("User needs help")} />
            <Button label="I've got it" onClick={() => setOnboardingStep(18)} />
          </>
        ) : null
      }
    />
  );
}

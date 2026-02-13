import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface CheckIPAgainProps {
  className?: string;
}

export default function CheckIPAgain({ className }: CheckIPAgainProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`CheckIPAgain${className ? ` ${className}` : ""}`}
      onboardingStep={21}
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
          Great! Now return to{" "}
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
          {" "}and check the IP address
        </Typography>
      }
      buttons={
        onboardingStep === 21 ? (
          <>
            <Button label="I need help" onClick={() => console.log("User needs help")} />
            <Button label="Done" onClick={() => setOnboardingStep(22)} />
          </>
        ) : null
      }
    />
  );
}

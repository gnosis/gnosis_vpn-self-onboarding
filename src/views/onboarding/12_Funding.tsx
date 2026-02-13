import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface FundingProps {
  className?: string;
}

export default function Funding({ className }: FundingProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`Funding${className ? ` ${className}` : ""}`}
      onboardingStep={12}
      title="Funding"
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
        onboardingStep === 12 ? (
          <>
            <Button label="I need some help" onClick={() => console.log("User needs help")} />
            <Button label="It's funded" onClick={() => setOnboardingStep(13)} />
          </>
        ) : null
      }
    />
  );
}

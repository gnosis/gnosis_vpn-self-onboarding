import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface HoprBasicsProps {
  className?: string;
}

export default function HoprBasics({ className }: HoprBasicsProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`HoprBasics${className ? ` ${className}` : ""}`}
      onboardingStep={9}
      title="HOPR Basics"
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
            While we're waiting, I'll explain a little about the VPN. Gnosis VPN runs over the HOPR mixnet, which means we'll be sending your data via multiple nodes run by people like you. Don't worry, they can't see anything you send or learn anything about you. It's fully private!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            But to join the network you'll need a node of your own that runs in the background. You don't need to know how any of this works, but if you're interested you can learn more at
          </Typography>

          <Box>
            <Typography
              component="a"
              href="https://github.com/hoprnet/hoprnet"
              target="_blank"
              rel="noreferrer noopener"
              sx={{
                fontSize: "0.95rem",
                color: "#0066cc",
                textDecoration: "none",
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              https://github.com/hoprnet/hoprnet
            </Typography>
          </Box>
        </>
      }
      buttons={
        onboardingStep === 9 ? (
          <>
            <Button label="I need some help" onClick={() => console.log("User needs help")} />
            <Button label="It's installed" onClick={() => setOnboardingStep(10)} />
          </>
        ) : null
      }
    />
  );
}

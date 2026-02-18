import { Typography, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 19;

interface SyncingProps {
  className?: string;
  lastEntry?: boolean;}

export default function Syncing({ className, lastEntry }: SyncingProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const NEED_HELP_LABEL = "I need some help";
  const SYNCED_LABEL = "It's synced";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("19_Syncing", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`Syncing${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Syncing"
      text={
        <>
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
              marginBottom: "1rem",
            }}
          >
            Next we need to wait for the node to sync. It would be great if you could take note of when this process started.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
              marginBottom: "1rem",
            }}
          >
            While we're waiting, I'll explain a little about the VPN. Gnosis VPN runs over the HOPR mixnet, which means we'll be sending your data via multiple nodes run by people like you. Don't worry, they can't see anything you send or learn anything about you. It's fully private! But to join the network you'll need a node of your own that runs in the background. You don't need to know how any of this works, but if you're interested you can learn more at{" "}
            <Box
              component="a"
              href="https://github.com/hoprnet/hoprnet"
              target="_blank"
              rel="noreferrer noopener"
              sx={{
                color: "#0066cc",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              https://github.com/hoprnet/hoprnet
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Let me know when it's synced!
          </Typography>
        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 1)} />
            <Button label={SYNCED_LABEL} onClick={() => handleAnswer(SYNCED_LABEL, STEP + 2)} />
          </>
        ) : null
      }
    />
  );
}

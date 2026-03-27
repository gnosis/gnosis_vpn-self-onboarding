import {
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import { STEP_NAMES } from "./index";

interface FeedbackItem {
  step: number;
  title: string;
  content: string;
}

interface SummaryProps {
  className?: string;
  lastEntry?: boolean;
}

const STEP = 98;
const CONTINUE_LABEL = "Continue";

export default function Summary({ className, lastEntry }: SummaryProps) {
  const feedback = useAppStore((state) => state.feedback);
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);

  const feedbackItems: FeedbackItem[] = Object.entries(feedback)
    .map(([stepKey, note]) => {
      if (!stepKey || !note) return null;
      const stepKeyParts = stepKey.split('_');
      const stepNum = parseInt(stepKeyParts[0].replace('X',''));
      const iterNum = parseInt(stepKeyParts[2]);
      const title = STEP_NAMES[stepNum];
      if (stepNum > 28 && exitNodeIteration !== iterNum) return null; // only include feedback from the current exit node iteration
      return { 
        step: iterNum * 100 + stepNum, 
        title: title, 
        content: note 
      };
    })
    .filter((item): item is FeedbackItem => item !== null)
    .sort((a, b) => {
      return a.step - b.step
    });

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`98_summary_${exitNodeIteration}`, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`Summary${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Summary"
      text={
        <>
          <Typography variant="body1" sx={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#333" }}>
            Thanks for all your help! It's been a hoot!
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#333" }}>
            Below you'll see a summary of your onboarding journey using the last exit node iteration, including every time you needed help and the feedback you gave me. When you press submit, this data will be sent to the team for analysis. We'll only use it to bug fix and improve the VPN. You can also download it locally.
          </Typography>
          <Stack spacing={1.5} sx={{ flex: 1, overflowY: "auto", pr: 1, gap: 2 }}>
            {feedbackItems.map((item, index) => (
              <Accordion
                key={index}
                defaultExpanded={true}
                id={`feedback-item-id-${item.step}`}
                sx={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #e0e0e0",
                  boxShadow: "none",
                  "&.Mui-expanded": { margin: 0 },
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderBottom: "1px solid #e0e0e0",
                    minHeight: "48px",
                    "&.Mui-expanded": {
                      minHeight: "48px",
                    },
                    "& .MuiAccordionSummary-content": {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: 0,
                      gap: 1,
                    },
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: "0.95rem", fontWeight: 600, color: "#333" }}>
                      {item.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 2, pb: 2, backgroundColor: "#fff" }}>
                  <Typography sx={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#555" }}>
                    {item.content}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </>
      }
      buttons={
        lastEntry ? (
          <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, STEP + 1)} />
        ) : null
      }
    />
  );
}

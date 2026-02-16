import {
  Typography,
  Stack,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Button from "../../components/onboarding/Button";
import { useAppStore } from "../../store/appStore";
import { STEP_NAMES } from "./index";

interface SummaryItem {
  step: number;
  title: string;
  content: string;
}

interface SummaryProps {
  className?: string;
  lastEntry?: boolean;
}

const CONTINUE_LABEL = "Continue";

export default function Summary({ className, lastEntry }: SummaryProps) {
  const notes = useAppStore((state) => state.notes);
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);


  const summaryItems: SummaryItem[] = Object.entries(notes)
    .map(([stepKey, note]) => {
      if (!stepKey || !note) return null;
      
      const stepNum = parseInt(stepKey.replace('X',''));
      const title = STEP_NAMES[stepNum];

      return {
        step: stepNum,
        title,
        content: note,
      };
    })
    .filter((item): item is SummaryItem => item !== null);

  const handleEditStep = () => {
   // Edit step
  };

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("98_summary", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Box className={`Summary${className ? ` ${className}` : ""}`} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Stack spacing={3} sx={{ flex: 1 }}>
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: "1.75rem",
            lineHeight: 1.2,
          }}
        >
          Summary
        </Typography>

        {/* Summary Accordions */}
        <Stack spacing={1.5} sx={{ flex: 1, overflowY: "auto", pr: 1, gap: 2 }}>
          {summaryItems.map((item, index) => (
            <Accordion
              key={index}
              defaultExpanded={true}
              sx={{
                backgroundColor: "#f9f9f9",
                border: "1px solid #e0e0e0",
                boxShadow: "none",
                "&.Mui-expanded": {
                  margin: 0,
                },
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                sx={{
                  backgroundColor: "#f0f0f0",
                  borderBottom: "1px solid #e0e0e0",
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
                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#333",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  disabled
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditStep();
                  }}
                  sx={{
                    color: "#666",
                    "&:hover": {
                      color: "#333",
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  pt: 2,
                  pb: 2,
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    color: "#555",
                  }}
                >
                  {item.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />
      </Stack>

      {/* Action Buttons */}
      {lastEntry && (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <>
            <Button
              label="Continue"
              onClick={() => handleAnswer(CONTINUE_LABEL, 99)}
            />
          </>
        </Box>
      )}
    </Box>
  );
}

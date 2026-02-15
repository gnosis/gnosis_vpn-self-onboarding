import {
  Typography,
  Stack,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import Button from "../../components/onboarding/Button";
import { useAppStore } from "../../store/appStore";

interface SummaryItem {
  step: number;
  title: string;
  content: string;
  timestamp: string;
}

interface SummaryProps {
  className?: string;
}

export default function Summary({ className }: SummaryProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);

  const summaryItems: SummaryItem[] = [
    {
      step: 3,
      title: "Fund your Gnosis VPN installment",
      content: "It was all clear, but a written out link really would be sth.",
      timestamp: "Friday 2 July 2026, 13:30",
    },
    {
      step: 4,
      title: "Fund your Gnosis VPN installment",
      content: "It was all clear, but a written out link really would be sth.",
      timestamp: "Friday 2 July 2026, 13:30",
    },
    {
      step: 5,
      title: "Fund your Gnosis VPN installment",
      content: "It was all clear, but a written out link really would be sth.",
      timestamp: "Friday 2 July 2026, 13:30",
    },
  ];

  const handleEditStep = (stepNumber: number) => {
    setOnboardingStep(stepNumber);
  };

  const handleContinue = () => {
    // Continue to next step after summary
    setOnboardingStep(6);
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
        <Stack spacing={1.5}>
          {summaryItems.map((item, index) => (
            <Accordion
              key={index}
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
                expandIcon={<ExpandMoreIcon />}
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
                    {item.step}/16: {item.title}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditStep(item.step);
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
                <Stack spacing={1.5}>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      color: "#555",
                    }}
                  >
                    {item.content}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      color: "#999",
                      fontStyle: "italic",
                    }}
                  >
                    {item.timestamp}
                  </Typography>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />
      </Stack>

      {/* Action Buttons */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <>
          <Button
            label="Continue Onboarding"
            onClick={handleContinue}
          />
        </>
      </Box>
    </Box>
  );
}

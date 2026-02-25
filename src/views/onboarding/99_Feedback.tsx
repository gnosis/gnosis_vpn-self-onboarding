import { useState } from "react";
import { Box, TextField, Typography, Stack } from "@mui/material";
import Button from "../../components/onboarding/Button";
import { useAppStore } from "../../store/appStore";
import { uploadData } from "../../functions";

interface FeedbackProps {
  className?: string;
}

export default function Feedback({ className }: FeedbackProps) {
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const stepLog = useAppStore((state) => state.stepLog);
  const notes = useAppStore((state) => state.notes);
  const feedback = useAppStore((state) => state.feedback);
  const onboardingAnswers = useAppStore((state) => state.onboardingAnswers);
  const token = useAppStore((state) => state.token);
  const isMacOs = useAppStore((state) => state.isMacOs);
  const isSameDevice = useAppStore((state) => state.isSameDevice);
  const saveFeedback = useAppStore((state) => state.saveFeedback);
  const resetStore = useAppStore((state) => state.resetStore);
  const [loading, setLoading] = useState(false);
  

  const questions = [
    { key: "feel", label: "How did the product feel to use?" },
    { key: "aspects", label: "What aspects of the product matter most to you, and why?" },
    { key: "changes", label: "What should change in future versions?" },
    { key: "features", label: "What features would you want in future versions?" },
    { key: "other", label: "Anything else?" },
  ];

  const handleTheEnd = async () => {
    setLoading(true);
    await uploadData(token, { onboardingStep, stepLog, notes, feedback, onboardingAnswers, isMacOs, isSameDevice });
    localStorage.removeItem('gvso_authToken');
    resetStore();
  };

  return (
    <Box
      className={`Feedback${className ? ` ${className}` : ""}`}
      id={`the-feedback-step`}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        p: 3,
        gap: 3,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: "1.75rem",
          lineHeight: 1.2,
        }}
      >
        Thank You for Your Feedback
      </Typography>

      <Stack
        spacing={3}
        sx={{
          flex: 1,
          overflowY: "auto",
          pr: 1,
        }}
      >
        {questions.map((question) => (
          <Box key={question.key} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#333",
              }}
            >
              {question.label}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={feedback[question.key] || ""}
              onChange={(e) => saveFeedback(question.key, e.target.value)}
              placeholder="Your answer..."
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                },
              }}
            />
          </Box>
        ))}
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
        <Button label="The End" loading={loading} onClick={handleTheEnd} />
      </Box>
    </Box>
  );
}

import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton
} from "@mui/material";
import Button from "../../components/onboarding/Button";
import { useAppStore } from "../../store/appStore";
import { uploadData } from "../../functions";

interface FeedbackProps {
  className?: string;
}

export default function Feedback({ className }: FeedbackProps) {
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const stepLog = useAppStore((state) => state.stepLog);
  const feedback = useAppStore((state) => state.feedback);
  const survey = useAppStore((state) => state.survey);
  const onboardingAnswers = useAppStore((state) => state.onboardingAnswers);
  const token = useAppStore((state) => state.token);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);
  const isMacOs = useAppStore((state) => state.isMacOs);
  const isSameDevice = useAppStore((state) => state.isSameDevice);
  const saveSurvey = useAppStore((state) => state.saveSurvey);
  const resetStore = useAppStore((state) => state.resetStore);
  const anonymous = useAppStore((state) => state.anonymous);

  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const questions = [
    { key: "feel", label: "How did the product feel to use?" },
    { key: "aspects", label: "What aspects of the product matter most to you, and why?" },
    { key: "changes", label: "What should change in future versions?" },
    { key: "features", label: "What features would you want in future versions?" },
    { key: "other", label: "Anything else?" },
  ];

  const handleTheEnd = async () => {
    setLoading(true);
    await uploadData(token, { exitNodeIteration, onboardingStep, stepLog, feedback, survey, onboardingAnswers, isMacOs, isSameDevice });
    setLoading(false);
    setShowThankYou(true);
  };

  const handleDownload = () => {
    const data = { exitNodeIteration, onboardingStep, feedback, survey, onboardingAnswers, isMacOs };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gnosisvpn-onboarding-feedback.json";
    a.click();
    URL.revokeObjectURL(url);
    setShowThankYou(true);
  };

  const handleCloseDialog = () => {
    setShowThankYou(false);
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
        Thank You for Your Feedback.
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
              value={survey[question.key] || ""}
              onChange={(e) => saveSurvey(question.key, e.target.value)}
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
        {
          anonymous ?
            <Button
              label="Download your feedback"
              loading={loading}
              onClick={handleDownload}
              style={{ maxHeight: '52px' }}
            />
            :
            <Button
              label="The End"
              loading={loading}
              onClick={handleTheEnd}
              style={{ maxHeight: '52px' }}
            />
        }
      </Stack>

      {/* Thank You Popup */}
      <Dialog
        open={showThankYou}
        onClose={(_event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }
          handleCloseDialog();
        }}
        aria-labelledby="thank-you-dialog-title"
        aria-describedby="thank-you-dialog-description"
        PaperProps={{
          sx: { p: 1, borderRadius: 2 }
        }}
      >
        <DialogTitle id="thank-you-dialog-title" sx={{ fontWeight: 700 }}>
          You made it to the end!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="thank-you-dialog-description" sx={{ color: "text.primary" }}>
            Thank you for completing the onboarding and helping test this release.
            Your time and feedback help us improve the VPN and make it better for everyone.
            { anonymous && " Since you were in anonymous mode, we couldn't save your feedback on our end, but it has been downloaded to your device! Feel free to share it with us via e-mail or other channels." }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleCloseDialog} variant="contained" disableElevation>
            Close
          </MuiButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

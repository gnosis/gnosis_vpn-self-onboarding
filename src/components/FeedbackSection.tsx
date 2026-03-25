import { Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { useAppStore } from "../store/appStore";

interface FeedbackSectionProps {
  stepKey: string;
  label?: string;
  disabled?: boolean;
}

export default function FeedbackSection({
  stepKey,
  label = "Share any blockers, questions, or notes for this step.",
  disabled = false,
}: FeedbackSectionProps) {
  const [localValue, setLocalValue] = useState("");
  const saveFeedback = useAppStore((state) => state.saveFeedback);
  const feedback = useAppStore((state) => state.feedback);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    saveFeedback(stepKey, value);
  };

  const displayValue = localValue || feedback[stepKey] || "";

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        p: 2.5,
        borderRadius: 1,
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: "0.85rem",
          color: "#666",
          mb: 1.5,
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder={"Your feedback..."}
        variant="outlined"
        size="small"
        value={displayValue}
        onChange={handleChange}
        disabled={disabled}
        sx={{
          "& .MuiOutlinedInput-root": {
            fontSize: "0.9rem",
          },
        }}
      />
    </Box>
  );
}

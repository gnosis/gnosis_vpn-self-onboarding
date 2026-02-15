import { Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { useAppStore } from "../store/appStore";

interface FeedbackSectionProps {
  stepKey: string;
  label?: string;
}

export default function FeedbackSection({
  stepKey,
  label = "Share any blockers, questions, or notes for this step.",
}: FeedbackSectionProps) {
  const [feedback, setFeedback] = useState("");
  const saveNote = useAppStore((state) => state.saveNote);
  const notes = useAppStore((state) => state.notes);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFeedback(value);
    saveNote(stepKey, value);
  };

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
        placeholder="Your feedback..."
        variant="outlined"
        size="small"
        value={feedback || notes[stepKey] || ""}
        onChange={handleChange}
        sx={{
          "& .MuiOutlinedInput-root": {
            fontSize: "0.9rem",
          },
        }}
      />
    </Box>
  );
}

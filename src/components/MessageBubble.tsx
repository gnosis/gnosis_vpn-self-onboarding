import { Box, Typography } from "@mui/material";

interface MessageBubbleProps {
  text?: string | null;
}

export default function MessageBubble({ text }: MessageBubbleProps) {
  if (!text) return null;

  return (
    <Box
      sx={{
        backgroundColor: "#e8e8e8",
        borderRadius: "8px",
        padding: "20px 24px",
        textAlign: "center",
        minWidth: "32px",
        maxWidth: "80%",
        display: "inline-block",
        marginLeft: "auto",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.95rem",
          lineHeight: 1.6,
          color: "#666",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

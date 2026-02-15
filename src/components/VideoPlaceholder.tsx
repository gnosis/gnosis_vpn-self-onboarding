import { Box, Typography } from "@mui/material";

interface VideoPlaceholderProps {
  title?: string;
}

export default function VideoPlaceholder({ title = "Video" }: VideoPlaceholderProps) {
  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: "16 / 9",
        backgroundColor: "#f0f0f0",
        border: "2px solid #ddd",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        sx={{
          fontSize: "3rem",
          opacity: 0.5,
        }}
      >
        ▶
      </Box>
      <Typography
        sx={{
          fontSize: "0.95rem",
          color: "#999",
        }}
      >
        {title} Video Placeholder
      </Typography>
    </Box>
  );
}

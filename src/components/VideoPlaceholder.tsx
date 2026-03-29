import { Box, Typography } from "@mui/material";

interface VideoPlaceholderProps {
  title?: string;
  videoUrl?: string;
}

export default function VideoPlaceholder({ title = "Video", videoUrl }: VideoPlaceholderProps) {
  if (videoUrl) {
    return (
      <Box
        sx={{
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <video
          width="100%"
          height="100%"
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "100%" }}
          controls
        >
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </Box>
    );
  }

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

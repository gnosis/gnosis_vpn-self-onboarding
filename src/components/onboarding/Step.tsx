import { Typography, Stack, Box, Avatar } from "@mui/material";
import { ReactNode } from "react";

interface StepProps {
  title: string;
  text: ReactNode;
  buttons: ReactNode;
  onboardingStep?: number | null;
  className?: string;
}

export default function Step({ title, text, buttons, onboardingStep, className }: StepProps) {
  return (
    <Box
      className={`Step${className ? ` ${className}` : ""}`}
      {...(onboardingStep != null ? { id: `onboardingStep-${onboardingStep}` } : {})}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ mr: 8 }}>
        {/* Title with Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#e0e0e0",
              flexShrink: 0,
            }}
          >
            {/* Placeholder for avatar image */}
          </Avatar>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: "1.75rem",
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Content */}
        <Stack spacing={3} sx={{ pl: "72px" }}>
          {text}
        </Stack>
      </Box>

      {/* Buttons */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          gap: 2
        }}
      >
        {buttons}
      </Box>
    </Box>
  );
}

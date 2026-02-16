import { Typography, Stack, Box } from "@mui/material";
import type { ReactNode } from "react";

interface StepProps {
  title: string;
  text?: ReactNode;
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
          <img
            src="/images/avatar.png"
            alt="Avatar"
            style={{
              width: 56,
              height: 56,
              flexShrink: 0,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: "1.75rem",
              lineHeight: 1.2,
            }}
          >
            {/* {onboardingStep}  */} {title}
          </Typography>
        </Box>

        {/* Content */}
        {
          text &&
          <Stack spacing={3} sx={{ pl: "72px" }}>
            {text}
          </Stack>
        }
      </Box>

      {/* Buttons */}
      {
        buttons &&
        <Box
          className={`StepButtons`}
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2
          }}
        >
          {buttons}
        </Box>
      }
    </Box>
  );
}

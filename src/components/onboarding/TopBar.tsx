import { Box, Stack, Typography, Button } from "@mui/material";
import LogoutButton from "./LogoutButton";

interface TopBarProps {
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}

export default function TopBar({ currentStep = 1, totalSteps = 16, className }: TopBarProps) {

  return (
    <Box
      className={`TopBar${className ? ` ${className}` : ""}`}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2, sm: 3, md: 4 },
        py: 2,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      {/* Logo */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: "1rem",
        }}
      >
        Gnosis VPN
      </Typography>

      {/* Right Side Buttons */}
      <Stack direction="row" spacing={1}>
        <Button
          variant="text"
          size="small"
          sx={{
            fontSize: "0.85rem",
            color: "#333",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          {currentStep}/{totalSteps}
        </Button>

        <Button
          variant="text"
          size="small"
          sx={{
            fontSize: "0.85rem",
            color: "#333",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          Upload Logs
        </Button>
        <LogoutButton />
      </Stack>
    </Box>
  );
}

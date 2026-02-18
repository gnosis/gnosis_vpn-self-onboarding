import { useEffect } from "react";
import { Box, Stack, Button } from "@mui/material";
import LogoutButton from "./LogoutButton";
import { useAppStore } from "../../store/appStore";
import { getPublicIP } from "../../functions";

interface TopBarProps {
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}

export default function TopBar({ currentStep = 1, totalSteps = 16, className }: TopBarProps) {
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  const setCurrentIP = useAppStore((state) => state.setCurrentIP);
  const currentIP = useAppStore((state) => state.currentIP);

  useEffect(() => {
    const checkIP = () => {
      getPublicIP().then((ip) => setCurrentIP(ip));
    };
    checkIP();
    const interval = setInterval(checkIP, 15000);
    return () => clearInterval(interval);
  }, [setCurrentIP]);

  const isHoprIP = currentIP?.startsWith("185.9.1.");
  const ipColor = isHoprIP ? "#2e7d32" : "#e53935";

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
      <Box
        component="img"
        src={'./images/GnosisVPN_logo.svg'}
        onClick={() => setCurrentView('landing')}
        sx={{
          height: 32,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          "&:hover": {
            opacity: 0.8,
          },
        }}
      />

      {/* IP Display */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: ipColor,
          }}
        />
        <Box
          sx={{
            fontSize: "0.85rem",
            color: ipColor,
            fontFamily: "'Courier New', Consolas, monospace",
            fontWeight: 700,
          }}
        >
          Your IP: {currentIP ?? "..."}
        </Box>
      </Box>

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

import { useEffect, useRef, useState } from "react";
import { Box, Stack, Button } from "@mui/material";
import LogoutButton from "./LogoutButton";
import { useAppStore } from "../../store/appStore";
import { getPublicIP, uploadData } from "../../functions";
import { getVpnCountry } from "../../functions";

interface TopBarProps {
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}

export default function TopBar({ currentStep = 1, totalSteps = 16, className }: TopBarProps) {
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  const setCurrentIP = useAppStore((state) => state.setCurrentIP);
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const resetOnboarding = useAppStore((state) => state.resetOnboarding);
  const currentIP = useAppStore((state) => state.currentIP);
  const isVpn = useAppStore((state) => state.isVpn);
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const isSameDevice = useAppStore((state) => state.isSameDevice);
  const token = useAppStore((state) => state.token);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);
  const ipColor = isVpn ? "#2e7d32" : "#e53935";
  const [lastIPIsVpn, setLastIPIsVpn] = useState<boolean | null>(null);
  const [lastIp, setLastIp] = useState<string | null>(null);
  const anonymous = useAppStore((state) => state.anonymous);
  
  const isCheckingRef = useRef(false);

  // IP checker
  useEffect(() => {
    if(anonymous) return;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (isSameDevice === false) {
      setCurrentIP(null);
      if (timeoutId) clearTimeout(timeoutId);
      return;
    }


    const checkIP = async () => {
      if (isCheckingRef.current) return;
      isCheckingRef.current = true;
      const ip = await getPublicIP();
      if (ip) setCurrentIP(ip);
      isCheckingRef.current = false;
      timeoutId = setTimeout(checkIP, 3000);
    };

    checkIP();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isSameDevice, setCurrentIP, anonymous]);

  // First found IP
  useEffect(() => {
    const isVpnIp = currentIP?.startsWith("185.9.1.") || false;
    if (lastIPIsVpn === null) {
      setLastIPIsVpn(isVpnIp);
    }
    if (lastIp === null && currentIP) {
      setLastIp(currentIP);
    }
  }, [currentIP, lastIp, lastIPIsVpn, setLastIPIsVpn, setLastIp]);

  useEffect(() => {
    if (currentIP === null || !isSameDevice) return;
    const isVpnIp = currentIP?.startsWith("185.9.1.") || false;
    const vpnCountry = getVpnCountry(currentIP);

    if(isVpnIp && onboardingStep < 25 && Math.round((onboardingStep % 1) * 100) / 100 !== 0.1) {
      console.log("Connected too early", onboardingStep);
      saveAnswer(`${onboardingStep}_STEP_${exitNodeIteration}`, `I connected too early to the VPN${vpnCountry ? ` (${vpnCountry})` : ''}`);
      setOnboardingStep(33);
    } 

    if (!isVpnIp && Math.round((onboardingStep % 1) * 100) / 100 === 0.1) {
      saveAnswer(`X${onboardingStep}_STEP_${exitNodeIteration}`, 'Disconnected');
      setOnboardingStep(onboardingStep - 0.1);
    }

    console.log(JSON.stringify({ onboardingStep, currentIP, isVpnIp }));

    if(onboardingStep >= 33 && onboardingStep < 43 && onboardingStep % 1 === 0) {
      if (!isVpnIp && onboardingStep % 1 === 0) {
        saveAnswer(`${onboardingStep}_STEP_${exitNodeIteration}`, 'I disconnected from the VPN');
        setOnboardingStep(parseFloat((onboardingStep + 0.95).toFixed(2)));
      }
    }

    if (onboardingStep > 33 && isVpnIp && Math.round((onboardingStep % 1) * 100) / 100 === 0.95) {
      saveAnswer(`X${onboardingStep}_STEP_${exitNodeIteration}`, `I connected to the VPN again ${vpnCountry ? `(${vpnCountry})` : ''}`);
      setOnboardingStep(parseInt(onboardingStep.toString()));
    }

  }, [currentIP, onboardingStep, isSameDevice, exitNodeIteration, setOnboardingStep]);

  const handleResetOnboarding = async () => {
    if (!anonymous) {
      await uploadData(token, {});
    }
    resetOnboarding();
  }

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
      {
        !anonymous && isSameDevice !== false && currentIP && 
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
              textAlign: "center",
            }}
          >
            Your IP: {currentIP}
            <Box
              sx={{
                fontSize: "0.7rem",
              }}
            >
              {isVpn ? "Gnosis VPN connected" : "Gnosis VPN not connected"}
            </Box>
          </Box>
        </Box>
      }
      
      {/* Right Side Buttons */}
      <Stack direction="row" spacing={1}>
        <Button
          variant="text"
          size="small"
          sx={{
            fontSize: "0.85rem",
            color: "white!important",
            textTransform: "none",
            fontWeight: 500,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          }}
          disabled
        >
          {parseInt((Math.min(currentStep/totalSteps, 1) * 100 - 1).toString())}% Complete
        </Button>

        <Button
          onClick={handleResetOnboarding}
          variant="text"
          size="small"
          sx={{
            fontSize: "0.85rem",
            color: "rgb(229, 57, 53)!important",
            textTransform: "none",
            textDecoration: "none",
            fontWeight: 500,
            "&:hover": {
              color: "darkred!important",
              backgroundColor: "rgba(229, 57, 53, 0.5)",
            },
          }}
        >
          Reset onboarding
        </Button>

        <Button
          component="a"
          href="https://log-uploader.gnosisvpn.com/"
          target="_blank"
          rel="noreferrer noopener"
          variant="text"
          size="small"
          sx={{
            fontSize: "0.85rem",
            color: "#333",
            textTransform: "none",
            textDecoration: "none",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          Upload Logs
        </Button>
        {!anonymous && <LogoutButton />}
      </Stack>
    </Box>
  );
}

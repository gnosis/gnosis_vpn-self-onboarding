import { Typography, Stack, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import { useAppStore } from "../../store/appStore";

export default function Welcome() {
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack spacing={3} >
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: "1.75rem",
            lineHeight: 1.2,
          }}
        >
          Welcome to Gnosis VPN Onboarding
        </Typography>

        {/* Content */}
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Thanks for agreeing to share some information with us – it will really help
          shape how the VPN is developed. It also means you can switch devices and your
          progress will be restored once you log back in.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          No data will be shared until you submit feedback or close the session. Until
          then I'll store everything locally if I can. If you're using something like
          incognito mode – well done on being private! – then you'll need to make sure
          to submit your progress before you close the browser.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
            fontWeight: 600,
          }}
        >
          Ready? Let's get started!
        </Typography>
      </Stack>

      {/* Continue Button */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button 
            label="Continue" 
            onClick={()=> setOnboardingStep(2)} 
            disabled={onboardingStep !== 1}
            isActive={onboardingStep !== 1}
        />
      </Box>
    </Box>
  );
}

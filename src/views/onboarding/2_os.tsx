import { Typography, Stack, Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import { useAppStore } from "../../store/appStore";

export default function OS() {
    const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
    const setSelectedOS = useAppStore((state) => state.setSelectedOS);
    const onboardingStep = useAppStore((state) => state.onboardingStep);
    const selectedOS = useAppStore((state) => state.selectedOS);


    const handleSelectOS = (os: 'debian' | 'macos') => {
        setSelectedOS(os);
        setOnboardingStep(3);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Stack spacing={3} sx={{ flex: 1 }}>
                {/* Title */}
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        fontSize: "1.75rem",
                        lineHeight: 1.2,
                    }}
                >
                    Which OS?
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
                    First, you'll need to select which operating system you're using.
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        color: "#333",
                    }}
                >
                    Now head to [link] and download the latest installer.
                </Typography>
            </Stack>

            {/* OS Selection Buttons */}
            <Box
                sx={{
                    mt: 4,
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                }}
            >
                <Button
                    label="Debian"
                    isActive={selectedOS === 'debian'}
                    onClick={() => handleSelectOS("debian")}
                    disabled={onboardingStep !== 2}
                />
                <Button
                    label="Mac OS"
                    isActive={selectedOS === 'macos'}
                    onClick={() => handleSelectOS("macos")}
                    disabled={onboardingStep !== 2}
                />
            </Box>
        </Box>
    );
}
import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
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
        <Step
            title="Which OS?"
            text={
                <>
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
                </>
            }
            buttons={
                onboardingStep === 2 ? (
                    <>
                        <Button
                            label="Debian"
                            isActive={selectedOS === 'debian'}
                            onClick={() => handleSelectOS("debian")}
                        />
                        <Button
                            label="Mac OS"
                            isActive={selectedOS === 'macos'}
                            onClick={() => handleSelectOS("macos")}
                        />
                    </>
                ) : null
            }
        />
    );
}
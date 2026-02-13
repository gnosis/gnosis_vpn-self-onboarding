import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface OSProps {
    className?: string;
}

export default function OS({ className }: OSProps) {
    const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
    const setSelectedOS = useAppStore((state) => state.setSelectedOS);
    const onboardingStep = useAppStore((state) => state.onboardingStep);
    const selectedOS = useAppStore((state) => state.selectedOS);

    const handleSelectOS = (os: 'linux' | 'macos') => {
        setSelectedOS(os);
        setOnboardingStep(7);
    };

    return (
        <Step
            className={`OS${className ? ` ${className}` : ""}`}
            onboardingStep={6}
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
                        Before we start, I need to know what operating system you're running
                    </Typography>

                </>
            }
            buttons={
                onboardingStep === 6 ? (
                    <>
                        <Button
                            label="Linux"
                            isActive={selectedOS === 'linux'}
                            onClick={() => handleSelectOS("linux")}
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
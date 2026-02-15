import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 6;

interface OSProps {
    className?: string;
}

export default function OS({ className }: OSProps) {
    const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
    const saveAnswer = useAppStore((state) => state.saveAnswer);
    const onboardingStep = useAppStore((state) => state.onboardingStep);

    const LINUX_LABEL = "Linux";
    const MACOS_LABEL = "Mac OS";

    const handleAnswer = (answer: string, nextStep: number) => {
        saveAnswer("6_os", answer);
        setOnboardingStep(nextStep);
    };

    return (
        <Step
            className={`OS${className ? ` ${className}` : ""}`}
            onboardingStep={STEP}
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
                onboardingStep === STEP ? (
                    <>
                        <Button
                            label={LINUX_LABEL}
                            onClick={() => handleAnswer(LINUX_LABEL, STEP + 1)}
                        />
                        <Button
                            label={MACOS_LABEL}
                            onClick={() => handleAnswer(MACOS_LABEL, STEP + 1)}
                        />
                    </>
                ) : null
            }
        />
    );
}
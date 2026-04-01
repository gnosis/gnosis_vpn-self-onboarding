import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 8;

interface OSProps {
    className?: string;
  lastEntry?: boolean;}

export default function OS({ className, lastEntry }: OSProps) {
    const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
    const saveAnswer = useAppStore((state) => state.saveAnswer);
    const setIsMacOs = useAppStore((state) => state.setIsMacOs);
    const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);

    const LINUX_LABEL = "Linux";
    const MACOS_LABEL = "Mac OS";

    const handleAnswer = (answer: string, nextStep: number) => {
        if(answer === MACOS_LABEL) {
            setIsMacOs(true);
        }
        saveAnswer(`8_os_${exitNodeIteration}`, answer);
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
                        Before we start, I need to know what operating system you're running.
                    </Typography>

                </>
            }
            buttons={
                lastEntry ? (
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
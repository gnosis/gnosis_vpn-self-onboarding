import { Button as MuiButton, type ButtonProps } from "@mui/material";

interface OnboardingButtonProps extends ButtonProps {
    label: string;
    isActive?: boolean;
}

export default function Button({
    label,
    isActive = false,
    className,
    ...props
}: OnboardingButtonProps) {
    return (
        <MuiButton
            className={`Button${className ? ` ${className}` : ""}`}
            variant={isActive ? "contained" : "outlined"}
            sx={{
                flex: 1,
                py: { xs: 1.25, sm: 1.5, md: 1.75 },
                px: { xs: 1.5, sm: 2, md: 2 },
                border: "2px solid #000",
                backgroundColor: isActive ? "#000" : "transparent",
                color: isActive ? "#fff" : "#000",
                fontWeight: 600,
                minWidth: "200px",
                fontSize: "0.85rem",
                transition: "all 0.3s ease",
                "&:hover": {
                    backgroundColor: isActive ? "#333" : "#f5f5f5",
                    transform: { xs: "none", sm: "translateY(-2px)" },
                },
            }}
            {...props}
        >
            {label}
        </MuiButton>
    );
}

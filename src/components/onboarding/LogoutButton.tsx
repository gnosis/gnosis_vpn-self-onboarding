import { Button, type ButtonProps } from "@mui/material";
import { useAppStore } from "../../store/appStore";

interface LogoutButtonProps extends ButtonProps {
  label?: string;
}

export default function LogoutButton({ label = "Logout", sx, ...props }: LogoutButtonProps) {
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  const resetStore = useAppStore((state) => state.resetStore);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    resetStore();
    setCurrentView("login");
  };

  return (
    <Button
      variant="text"
      size="small"
      {...props}
      onClick={handleLogout}
      sx={{
        fontSize: "0.85rem",
        color: "#999",
        textTransform: "none",
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
        ...sx,
      }}
    >
      {label}
    </Button>
  );
}

import { Backdrop, CircularProgress } from "@mui/material";
import { useAppStore } from "../store/appStore";

export default function LoadingOverlay() {
  const isAutoLoading = useAppStore((state) => state.isAutoLoading);

  return (
    <Backdrop
      sx={{
        zIndex: 1300,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
      open={isAutoLoading}
    >
      <CircularProgress size={50} sx={{ color: "#000" }} />
    </Backdrop>
  );
}

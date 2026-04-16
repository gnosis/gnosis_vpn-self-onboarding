import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PrivacyPolicyProps {
  open: boolean;
  onClose: () => void;
}

const simpleSections = [
  {
    heading: "1) What the app is for",
    body: "The app helps you onboard to Gnosis VPN and helps us test whether onboarding is understandable, stable, and useful.",
  },
  {
    heading: "5) Third-party interactions",
    body: "To check whether your VPN connection changed your visible network identity, the client may query external IP-check endpoints. Those requests come from your browser/app context to those endpoint providers.",
  },
  {
    heading: "6) Retention",
    body: "We keep data only for as long as needed to operate onboarding, support users, improve service quality, and comply with legal obligations. Data is automatically deleted after 30 days, or sooner upon request. Anonymous mode is intentionally less persistent.",
  },
  {
    heading: "7) Security",
    body: "We use standard transport and authentication controls to protect onboarding data. No system is perfect; if you suspect a security issue, contact support immediately.",
  },
  {
    heading: "8) Your choices and requests",
    body: "You can choose Anonymous mode for lower persistence. You can also contact support to request access, correction, or deletion of your data, subject to legal and operational constraints.",
  },
  {
    heading: "9) Policy changes",
    body: 'If our data practices materially change, we will update this policy and its "last updated" date.',
  },
];

export default function PrivacyPolicy({ open, onClose }: PrivacyPolicyProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 560 },
          maxHeight: "80vh",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box sx={{ p: "24px 32px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={600}>
            Privacy Policy
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Scrollable body */}
        <Box
          sx={{
            overflowY: "scroll",
            px: "32px",
            pb: "32px",
            scrollbarWidth: "thin",
            scrollbarColor: "#bbb transparent",
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#bbb",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#999" },
          }}
        >
          <Typography variant="caption" color="text.disabled" display="block" sx={{ mb: 2 }}>
            Last updated: April 15, 2026
          </Typography>

          <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 1.5 }}>
            HOPR believes in privacy for everyone, so here is the human-readable summary: we collect as little of your data as possible. We don't want it.
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 1.5 }}>
            Where we do have to collect your data, we collect the minimum possible to make our apps, services and websites function. If you are kind enough to voluntarily share more than the minimum, we do our best to protect it, never share it with anyone else, and only use it to make our apps, services, and websites better.
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 1.5 }}>
            We never sell personal data and denounce those who do.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            Regulation requires us to also produce a less human readable version of this policy. You can find it below:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            This policy explains what data this Gnosis VPN Onboarding tool ("the app") processes, why, and what changes between Anonymous mode and Minimal data modes.
          </Typography>

          {/* Section 1 */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
              1) What the app is for
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              The app helps you onboard to Gnosis VPN and helps us test whether onboarding is understandable, stable, and useful.
            </Typography>
          </Box>

          {/* Section 2 */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
              2) Data we process
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 1 }}>
              Depending on the mode you choose, the app may process:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 3 }}>
              {[
                "login credential input (username and password)",
                "authentication token",
                "onboarding progress (step state and answers)",
                "optional feedback and survey text you submit",
                "basic technical flow flags (for example device/OS path selection)",
              ].map((item) => (
                <Typography key={item} component="li" variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Section 3 */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
              3) Differences between usage modes
            </Typography>
            <Typography variant="body2" fontWeight={500} sx={{ mt: 1, mb: 0.5 }}>
              A) Anonymous mode
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 3 }}>
              {[
                "We avoid persistent account-linked onboarding storage in this flow.",
                "Session progress is temporary and may be lost across restarts/devices.",
              ].map((item) => (
                <Typography key={item} component="li" variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {item}
                </Typography>
              ))}
            </Box>
            <Typography variant="body2" fontWeight={500} sx={{ mt: 1.5, mb: 0.5 }}>
              B) Minimal data mode ("I understand. Log me in!")
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 3 }}>
              {[
                "We store an auth token in browser local storage so your session can continue after refresh.",
                "We sync onboarding progress and submitted responses with onboarding backend endpoints.",
                "We use this only to run onboarding, support troubleshooting, and improve onboarding quality.",
              ].map((item) => (
                <Typography key={item} component="li" variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Section 4 */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
              4) Why we process data
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 1 }}>
              We process data for three reasons only:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 3 }}>
              {[
                "to deliver onboarding",
                "to support you when onboarding fails or gets confusing",
                "to improve the usability and reliability of Gnosis VPN",
              ].map((item) => (
                <Typography key={item} component="li" variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Sections 5–9 */}
          {simpleSections.map(({ heading, body }) => (
            <Box key={heading} sx={{ mb: 2.5 }}>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                {heading}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {body}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}

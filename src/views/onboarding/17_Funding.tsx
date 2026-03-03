import { Typography, Box, TextField, Button as MuiButton, Tooltip, CircularProgress } from "@mui/material";
import { useState } from "react";
import { isAddress } from "viem";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import ButtonGrayCta from "../../components/ButtonGrayCta";
import styled from "@emotion/styled";

const STEP = 17;

interface FundingProps {
  className?: string;
  lastEntry?: boolean;
}

const FundingResult = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  inset: 0;
  z-index: 10;
  color: white;
  &.error {
    background: rgba(180, 0, 0, 0.95);
  }
  &.message {
    background: rgba(0, 53, 0, 0.95);
  }

  p {
    display: flex;
    align-items: center;
    color: white;
    font-size: 23px;
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    padding: 8px;
    word-break: break-word;
    @media (max-width: 760px) {
      font-size: 12px;
    }
  }
`

export default function Funding({ className, lastEntry }: FundingProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const fundingCode = useAppStore((state) => state.fundingCode);
  const [vpnAddress, setVpnAddress] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const NEED_HELP_LABEL = "I need some help";
  const FUNDED_LABEL = "It's funded";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("17_Funding", answer);
    setOnboardingStep(nextStep);
  };

  async function getAirdrop(address: string) {
    setPending(true);
    setError('');
    setMessage('');
    let rez = null;
    try {
      const body = {
        address: address,
        code: fundingCode
      };
      const response = await fetch(`${import.meta.env.VITE_WEBAPI_URL}/api/cfp-funding-tool/airdrop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      rez = await response.json();
      if (rez.error) {
        setError(rez.error);
      } else if (rez.message) {
        setMessage(rez.message);
      }
    } catch (error) {
      setError('Network error. Please try again later.');
    } finally {
      setPending(false);
    }
    return rez;
  }

  return (
    <Step
      className={`Funding${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Funding and syncing your node takes place now"
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
            We now need to fund your Edge Node so it can connect to the mixnet. I’ll cover the cost.
          </Typography>

          {fundingCode && lastEntry &&
            <div style={{ position: "relative" }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  color: "#333",
                }}
              >
                <strong>Enter your Gnosis VPN address, so we can fund your VPN.</strong> We will not store this address.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mt: { xs: 2, sm: 2.5 } }}>
                <TextField
                  fullWidth
                  label="Gnosis VPN address"
                  variant="outlined"
                  value={vpnAddress}
                  onChange={(e) => {
                    setVpnAddress(e.target.value);
                    setError('');
                  }}
                  sx={{
                    "& .MuiInputBase-input": { fontSize: "0.95rem" },
                    "& .MuiFormLabel-root": { fontSize: "0.9rem" },
                  }}
                  disabled={pending}
                  error={!!error}
                  helperText={error ? error : " "}
                />
                <Tooltip
                  title={!isAddress(vpnAddress) ? "Please enter a valid Gnosis VPN address" : ""}
                  arrow
                >
                  <span>
                    <MuiButton
                      variant="contained"
                      sx={{
                        height: 56,
                        px: 2.5,
                        width: 76,
                        fontSize: "0.95rem",
                        color: "white",
                        backgroundColor: "darkgreen",
                        "&:hover": { backgroundColor: "#005000" },
                        "&.Mui-disabled": { backgroundColor: "#4a7c4a", color: "rgba(255,255,255,0.5)" },
                        whiteSpace: "nowrap",
                        textTransform: "none",
                      }}
                      disabled={!isAddress(vpnAddress) || pending}
                      onClick={() => getAirdrop(vpnAddress)}
                    >
                      {pending ? <CircularProgress size={20} sx={{ color: "rgba(255,255,255,0.7)" }} /> : "Fund"}
                    </MuiButton>
                  </span>
                </Tooltip>
              </Box>
              {
                 message &&
                <FundingResult className={`FundingResult ${error ? "error" : ""} ${message ? "message" : ""}`}>
                  {message && <Typography color="primary">{message}</Typography>}
                </FundingResult>
              }

            </div>
          }



          {!fundingCode &&
            <Typography
              variant="body1"
              sx={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "#333",
              }}
            >
              Use the secret funding code we sent you and redeem it here: {" "}
              <ButtonGrayCta
                href="https://faucet.vpn.gnosis.eth.limo/"
                label="https://faucet.vpn.gnosis.eth.limo/" />
              {" "}and use the code there.
            </Typography>
          }

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            If you prefer to fund it yourself, you can follow the instructions here{" "}
            <Box
              component="a"
              href="https://github.com/gnosis/gnosis_vpn/wiki#how-do-i-fund-or-top-up-my-gnosis-vpn-account"
              target="_blank"
              rel="noreferrer noopener"
              sx={{
                color: "#0066cc",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              here
            </Box>
            <br/><br/>
            <Typography
                variant="body1"
                sx={{
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  color: "#333",
                }}
              >
                After funding, the node needs a few minutes to sync. This is normal, nothing is broken. Please note the time when syncing starts and let me know how long it took.
              </Typography>

          </Typography>
        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 1)} />
            <Button label={FUNDED_LABEL} onClick={() => handleAnswer(FUNDED_LABEL, STEP + 4)} />
          </>
        ) : null
      }
    />
  );
}

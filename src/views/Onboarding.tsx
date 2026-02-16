import { useEffect, Fragment } from "react";
import { Container, Box } from "@mui/material";
import TopBar from "../components/onboarding/TopBar";
import { useAppStore } from "../store/appStore";
import MessageBubble from "../components/MessageBubble";

// Steps
import Welcome from "./onboarding/1_welcome";
import HowOnboardingWorks from "./onboarding/2_HowOnboardingWorks";
import GettingHelp from "./onboarding/3_GettingHelp";
import SwitchingDevices from "./onboarding/4_SwitchingDevices";
import SessionSummary from "./onboarding/5_SessionSummary";
import Os from "./onboarding/6_os";
import Download from "./onboarding/7_download";
import DownloadVideohelp from "./onboarding/8_Download_videohelp";
import RunInstaller from "./onboarding/9_RunInstaller";
import RunInstallerVideohelp from "./onboarding/10_RunInstaller_videohelp";
import HoprBasics from "./onboarding/11_HoprBasics";
import HoprBasicsVideohelp from "./onboarding/12_HoprBasics_videohelp";
import RunGnosisVPN from "./onboarding/13_RunGnosisVPN";
import RunGnosisVPNVideohelp from "./onboarding/14_RunGnosisVPN_videohelp";
import GetStarted from "./onboarding/15_GetStarted";
import GetStartedVideohelp from "./onboarding/16_GetStarted_videohelp";
import Funding from "./onboarding/17_Funding";
import FundingVideohelp from "./onboarding/18_Funding_videohelp";
import Syncing from "./onboarding/19_Syncing";
import SyncingVideohelp from "./onboarding/20_Syncing_videohelp";
import SyncingFeedback from "./onboarding/21_SyncingFeedback";
import ReadyToTest from "./onboarding/22_ReadyToTest";
import AlreadyConnected from "./onboarding/23_AlreadyConnected";
import ReadyTimeout from "./onboarding/24_Great";
import CheckIP from "./onboarding/25_CheckIP";
import CloseIPSite from "./onboarding/26_CloseIPSite";
import ChooseExitNode from "./onboarding/27_ChooseExitNode";
import TellChoice from "./onboarding/28_TellChoice";
import CheckIPAgain from "./onboarding/29_CheckIPAgain";
import DidIPChange from "./onboarding/30_DidIPChange";
import IPChangeResponse from "./onboarding/31_IPChangeResponse";
import IPChangeResponseVideohelp from "./onboarding/32_IPChangeResponse_videohelp";
import NoIPChangeResponse from "./onboarding/33_NoIPChangeResponse";
import VisitWebsite from "./onboarding/34_VisitWebsite";
import VisitYoutube from "./onboarding/35_VisitYoutube";
import YouTubeFeedback from "./onboarding/36_YouTubeFeedback";
import CheckYoutubeStats from "./onboarding/37_CheckYoutubeStats";
import CheckIPThirdTime from "./onboarding/38_CheckIPThirdTime";
import OpenChatApp from "./onboarding/39_OpenChatApp";
import TellChatApp from "./onboarding/40_TellChatApp";
import UseChatApp from "./onboarding/41_UseChatApp";
import AppFeedback from "./onboarding/42_AppFeedback";
import CheckIPLastTime from "./onboarding/43_CheckIPLastTime";
import DidIPChangeLast from "./onboarding/44_DidIPChangeLast";
import TryDifferentExitNode from "./onboarding/45_TryDifferentExitNode";
import WrapUp from "./onboarding/46_WrapUp";
import X_WhatCanIHelpYouWith from "./onboarding/X_WhatCanIHelpYouWith";
import X_iCal from "./onboarding/X_iCal";
import X_KeepAnEye from "./onboarding/X_KeepAnEye";
import Z_Summary from "./onboarding/Z_summary";

const STEP_COMPONENTS: Record<number, React.ComponentType<any>> = {
  1: Welcome,
  2: HowOnboardingWorks,
  3: GettingHelp,
  4: SwitchingDevices,
  5: SessionSummary,
  6: Os,
  7: Download,
  8: DownloadVideohelp,
  9: RunInstaller,
  10: RunInstallerVideohelp,
  11: HoprBasics,
  12: HoprBasicsVideohelp,
  13: RunGnosisVPN,
  14: RunGnosisVPNVideohelp,
  15: GetStarted,
  16: GetStartedVideohelp,
  17: Funding,
  18: FundingVideohelp,
  19: Syncing,
  20: SyncingVideohelp,
  21: SyncingFeedback,
  22: ReadyToTest,
  23: AlreadyConnected,
  24: ReadyTimeout,
  25: CheckIP,
  26: CloseIPSite,
  27: ChooseExitNode,
  28: TellChoice,
  29: CheckIPAgain,
  30: DidIPChange,
  31: IPChangeResponse,
  32: IPChangeResponseVideohelp,
  33: NoIPChangeResponse,
  34: VisitWebsite,
  35: VisitYoutube,
  36: YouTubeFeedback,
  37: CheckYoutubeStats,
  38: CheckIPThirdTime,
  39: OpenChatApp,
  40: TellChatApp,
  41: UseChatApp,
  42: AppFeedback,
  43: CheckIPLastTime,
  44: DidIPChangeLast,
  45: TryDifferentExitNode,
  46: WrapUp,
};

interface OnboardingProps {
  className?: string;
}

export default function Onboarding({ className }: OnboardingProps) {
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const stepLog = useAppStore((state) => state.stepLog);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      while (!cancelled) {
        const el = document.getElementById(`onboardingStep-${onboardingStep}`);
        if (el) {
          const target = el.getBoundingClientRect().top + window.scrollY;
          const start = window.scrollY;
          const distance = target - start;
          const duration = 1000;
          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (cancelled) return;
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress < 0.5
              ? 2 * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            window.scrollTo(0, start + distance * ease);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          break;
        }
        await new Promise((r) => setTimeout(r, 50));
      }
    })();
    return () => { cancelled = true; };
  }, [onboardingStep]);

  const CurrentComponent = STEP_COMPONENTS[onboardingStep] ?? null;

  return (
    <Box className={`Onboarding${className ? ` ${className}` : ""}`} sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", pt: "57px" }}>
      {/* Top Bar */}
      <TopBar currentStep={onboardingStep} totalSteps={48} />

      {/* Main Content */}
      <Container maxWidth={false} sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Box
          sx={{
            py: { xs: 3, sm: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {/* Completed steps from stepLog */}
          {stepLog.map((entry, i) => {
            const [key, answer] = entry.split(':');
            if (!key) return null;
            if (key.startsWith("X") && key.endsWith("_WhatCanIHelpYouWith")) {
              const step = parseFloat(key.split('_')[0].substring(1));
              return (
                <Fragment key={`${key}-${i}`}>
                  { step % 1 === 0.25 && <X_WhatCanIHelpYouWith onboardingStep={step} />}
                  { step % 1 === 0.5 && <X_KeepAnEye onboardingStep={step} />}
                  { step % 1 === 0.75 && <X_iCal onboardingStep={step} />}
                  { answer && <MessageBubble text={answer} /> }
                </Fragment>
              ); 
            }
            
            const stepNum = parseInt(key);
            const Component = STEP_COMPONENTS[stepNum];
            if (!Component) return null;
            return (
              <Fragment key={`${key}-${i}`}>
                <Component />
                { answer && <MessageBubble text={answer} /> }
              </Fragment>
            );
          })}

          {/* Current active step */}
          {onboardingStep % 1 === 0 && CurrentComponent && <CurrentComponent lastEntry={true} />}
          {onboardingStep % 1 === 0.25 && <X_WhatCanIHelpYouWith lastEntry={true} />}
          {onboardingStep % 1 === 0.5 && <X_KeepAnEye lastEntry={true} />}
          {onboardingStep % 1 === 0.75 && <X_iCal lastEntry={true} />}
        </Box>
      </Container>
    </Box>
  );
}
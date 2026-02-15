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
import RunInstaller from "./onboarding/8_RunInstaller";
import HoprBasics from "./onboarding/9_HoprBasics";
import RunGnosisVPN from "./onboarding/10_RunGnosisVPN";
import GetStarted from "./onboarding/11_GetStarted";
import Funding from "./onboarding/12_Funding";
import Syncing from "./onboarding/13_Syncing";
import SyncingFeedback from "./onboarding/14_SyncingFeedback";
import ReadyToTest from "./onboarding/15_ReadyToTest";
import AlreadyConnected from "./onboarding/16_AlreadyConnected";
import ReadyTimeout from "./onboarding/17_Great";
import CheckIP from "./onboarding/18_CheckIP";
import CloseIPSite from "./onboarding/19_CloseIPSite";
import ChooseExitNode from "./onboarding/20_ChooseExitNode";
import TellChoice from "./onboarding/21_TellChoice";
import CheckIPAgain from "./onboarding/22_CheckIPAgain";
import DidIPChange from "./onboarding/23_DidIPChange";
import IPChangeResponse from "./onboarding/24_IPChangeResponse";
import NoIPChangeResponse from "./onboarding/25_NoIPChangeResponse";
import VisitWebsite from "./onboarding/26_VisitWebsite";
import VisitYoutube from "./onboarding/27_VisitYoutube";
import YouTubeFeedback from "./onboarding/28_YouTubeFeedback";
import CheckYoutubeStats from "./onboarding/29_CheckYoutubeStats";
import CheckIPThirdTime from "./onboarding/30_CheckIPThirdTime";
import OpenChatApp from "./onboarding/31_OpenChatApp";
import TellChatApp from "./onboarding/32_TellChatApp";
import UseChatApp from "./onboarding/33_UseChatApp";
import AppFeedback from "./onboarding/34_AppFeedback";
import CheckIPLastTime from "./onboarding/35_CheckIPLastTime";
import DidIPChangeLast from "./onboarding/36_DidIPChangeLast";
import TryDifferentExitNode from "./onboarding/37_TryDifferentExitNode";
import WrapUp from "./onboarding/38_WrapUp";

const STEP_COMPONENTS: Record<number, React.ComponentType<any>> = {
  1: Welcome,
  2: HowOnboardingWorks,
  3: GettingHelp,
  4: SwitchingDevices,
  5: SessionSummary,
  6: Os,
  7: Download,
  8: RunInstaller,
  9: HoprBasics,
  10: RunGnosisVPN,
  11: GetStarted,
  12: Funding,
  13: Syncing,
  14: SyncingFeedback,
  15: ReadyToTest,
  16: AlreadyConnected,
  17: ReadyTimeout,
  18: CheckIP,
  19: CloseIPSite,
  20: ChooseExitNode,
  21: TellChoice,
  22: CheckIPAgain,
  23: DidIPChange,
  24: IPChangeResponse,
  25: NoIPChangeResponse,
  26: VisitWebsite,
  27: VisitYoutube,
  28: YouTubeFeedback,
  29: CheckYoutubeStats,
  30: CheckIPThirdTime,
  31: OpenChatApp,
  32: TellChatApp,
  33: UseChatApp,
  34: AppFeedback,
  35: CheckIPLastTime,
  36: DidIPChangeLast,
  37: TryDifferentExitNode,
  38: WrapUp,
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
      <TopBar currentStep={onboardingStep} totalSteps={39} />

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
          {CurrentComponent && <CurrentComponent lastEntry={true} />}
        </Box>
      </Container>
    </Box>
  );
}
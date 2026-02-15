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

const STEP_COMPONENTS: Record<string, React.ComponentType<any>> = {
  "1_welcome": Welcome,
  "2_HowOnboardingWorks": HowOnboardingWorks,
  "3_GettingHelp": GettingHelp,
  "4_SwitchingDevices": SwitchingDevices,
  "5_SessionSummary": SessionSummary,
  "6_os": Os,
  "7_download": Download,
  "8_RunInstaller": RunInstaller,
  "9_HoprBasics": HoprBasics,
  "10_RunGnosisVPN": RunGnosisVPN,
  "11_GetStarted": GetStarted,
  "12_Funding": Funding,
  "13_Syncing": Syncing,
  "14_SyncingFeedback": SyncingFeedback,
  "15_ReadyToTest": ReadyToTest,
  "16_AlreadyConnected": AlreadyConnected,
  "17_Great": ReadyTimeout,
  "18_CheckIP": CheckIP,
  "19_CloseIPSite": CloseIPSite,
  "20_ChooseExitNode": ChooseExitNode,
  "21_TellChoice": TellChoice,
  "22_CheckIPAgain": CheckIPAgain,
  "23_DidIPChange": DidIPChange,
  "24_IPChangeResponse": IPChangeResponse,
  "25_NoIPChangeResponse": NoIPChangeResponse,
  "26_VisitWebsite": VisitWebsite,
  "27_VisitYoutube": VisitYoutube,
  "28_YouTubeFeedback": YouTubeFeedback,
  "29_CheckYoutubeStats": CheckYoutubeStats,
  "30_CheckIPThirdTime": CheckIPThirdTime,
  "31_OpenChatApp": OpenChatApp,
  "32_TellChatApp": TellChatApp,
  "33_UseChatApp": UseChatApp,
  "34_AppFeedback": AppFeedback,
  "35_CheckIPLastTime": CheckIPLastTime,
  "36_DidIPChangeLast": DidIPChangeLast,
  "37_TryDifferentExitNode": TryDifferentExitNode,
  "38_WrapUp": WrapUp,
};

const STEP_NUMBER_TO_KEY: Record<number, string> = {
  1: "1_welcome",
  2: "2_HowOnboardingWorks",
  3: "3_GettingHelp",
  4: "4_SwitchingDevices",
  5: "5_SessionSummary",
  6: "6_os",
  7: "7_download",
  8: "8_RunInstaller",
  9: "9_HoprBasics",
  10: "10_RunGnosisVPN",
  11: "11_GetStarted",
  12: "12_Funding",
  13: "13_Syncing",
  14: "14_SyncingFeedback",
  15: "15_ReadyToTest",
  16: "16_AlreadyConnected",
  17: "17_Great",
  18: "18_CheckIP",
  19: "19_CloseIPSite",
  20: "20_ChooseExitNode",
  21: "21_TellChoice",
  22: "22_CheckIPAgain",
  23: "23_DidIPChange",
  24: "24_IPChangeResponse",
  25: "25_NoIPChangeResponse",
  26: "26_VisitWebsite",
  27: "27_VisitYoutube",
  28: "28_YouTubeFeedback",
  29: "29_CheckYoutubeStats",
  30: "30_CheckIPThirdTime",
  31: "31_OpenChatApp",
  32: "32_TellChatApp",
  33: "33_UseChatApp",
  34: "34_AppFeedback",
  35: "35_CheckIPLastTime",
  36: "36_DidIPChangeLast",
  37: "37_TryDifferentExitNode",
  38: "38_WrapUp",
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

  const disconnectHappen = onboardingStep === 15 && stepLog.some(e => e.startsWith("16_AlreadyConnected:"));
  const currentKey = STEP_NUMBER_TO_KEY[onboardingStep];
  const CurrentComponent = currentKey ? STEP_COMPONENTS[currentKey] : null;

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
            const Component = STEP_COMPONENTS[key];
            if (!Component) return null;
            const extraProps = key === "15_ReadyToTest" && disconnectHappen ? { disconnectHappen: true } : {};
            return (
              <Fragment key={`${key}-${i}`}>
                <Component {...extraProps} />
                {answer && <MessageBubble text={answer} />}
              </Fragment>
            );
          })}

          {/* Current active step */}
          {CurrentComponent && <CurrentComponent />}
        </Box>
      </Container>
    </Box>
  );
}
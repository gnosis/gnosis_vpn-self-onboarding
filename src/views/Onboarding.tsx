import { useEffect } from "react";
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
import ReadyTimeout from "./onboarding/16_ReadyTimeout";
import CheckIP from "./onboarding/17_CheckIP";
import CloseIPSite from "./onboarding/18_CloseIPSite";
import ChooseExitNode from "./onboarding/19_ChooseExitNode";
import TellChoice from "./onboarding/20_TellChoice";
import CheckIPAgain from "./onboarding/21_CheckIPAgain";
import DidIPChange from "./onboarding/22_DidIPChange";
import IPChangeResponse from "./onboarding/23_IPChangeResponse";
import NoIPChangeResponse from "./onboarding/24_NoIPChangeResponse";
import VisitWebsite from "./onboarding/25_VisitWebsite";
import VisitYoutube from "./onboarding/26_VisitYoutube";
import YouTubeFeedback from "./onboarding/27_YouTubeFeedback";
import CheckYoutubeStats from "./onboarding/28_CheckYoutubeStats";
import CheckIPThirdTime from "./onboarding/29_CheckIPThirdTime";
import OpenChatApp from "./onboarding/30_OpenChatApp";
import TellChatApp from "./onboarding/31_TellChatApp";
import UseChatApp from "./onboarding/32_UseChatApp";
import AppFeedback from "./onboarding/33_AppFeedback";
import CheckIPLastTime from "./onboarding/34_CheckIPLastTime";
import DidIPChangeLast from "./onboarding/35_DidIPChangeLast";
import TryDifferentExitNode from "./onboarding/36_TryDifferentExitNode";
import WrapUp from "./onboarding/37_WrapUp";



interface OnboardingProps {
  className?: string;
}

export default function Onboarding({ className }: OnboardingProps) {
  const onboardingStep = useAppStore((state) => state.onboardingStep);
  const onboardingAnswers = useAppStore((state) => state.onboardingAnswers);

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

  return (
    <Box className={`Onboarding${className ? ` ${className}` : ""}`} sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", pt: "57px" }}>
      {/* Top Bar */}
      <TopBar currentStep={onboardingStep} totalSteps={37} />

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
          {onboardingStep >= 1 && <Welcome />} 
          {onboardingStep >= 2 && <MessageBubble text={onboardingAnswers["1_welcome"]} />}
          {onboardingStep >= 2 && <HowOnboardingWorks />}
          {onboardingStep >= 3 && <MessageBubble text={onboardingAnswers["2_HowOnboardingWorks"]} />}
          {onboardingStep >= 3 && <GettingHelp />}
          {onboardingStep >= 4 && <MessageBubble text={onboardingAnswers["3_GettingHelp"]} />}
          {onboardingStep >= 4 && <SwitchingDevices />}
          {onboardingStep >= 5 && <MessageBubble text={onboardingAnswers["4_SwitchingDevices"]} />}
          {onboardingStep >= 5 && <SessionSummary />}
          {onboardingStep >= 6 && <MessageBubble text={onboardingAnswers["5_SessionSummary"]} />}
          {onboardingStep >= 6 && <Os />}
          {onboardingStep >= 7 && <MessageBubble text={onboardingAnswers["6_os"]} />}
          {onboardingStep >= 7 && <Download />}
          {onboardingStep >= 8 && <MessageBubble text={onboardingAnswers["7_download"]} />}
          {onboardingStep >= 8 && <RunInstaller />}
          {onboardingStep >= 9 && <MessageBubble text={onboardingAnswers["8_RunInstaller"]} />}
          {onboardingStep >= 9 && <HoprBasics />}
          {onboardingStep >= 9 && <MessageBubble text={onboardingAnswers["9_HoprBasics"]} />}
          {onboardingStep >= 10 && <RunGnosisVPN />}
          {onboardingStep >= 11 && <MessageBubble text={onboardingAnswers["10_RunGnosisVPN"]} />}
          {onboardingStep >= 11 && <GetStarted />}
          {onboardingStep >= 12 && <MessageBubble text={onboardingAnswers["11_GetStarted"]} />}
          {onboardingStep >= 12 && <Funding />}
          {onboardingStep >= 13 && <MessageBubble text={onboardingAnswers["12_Funding"]} />}
          {onboardingStep >= 13 && <Syncing />}
          {onboardingStep >= 14 && <MessageBubble text={onboardingAnswers["13_Syncing"]} />}
          {onboardingStep >= 14 && <SyncingFeedback />}
          {onboardingStep >= 15 && <MessageBubble text={onboardingAnswers["14_SyncingFeedback"]} />}
          {onboardingStep >= 15 && <ReadyToTest />}
          {onboardingStep >= 16 && <MessageBubble text={onboardingAnswers["15_ReadyToTest"]} />}
          {onboardingStep >= 16 && <ReadyTimeout />}
          {onboardingStep >= 17 && <MessageBubble text={onboardingAnswers["16_ReadyTimeout"]} />}
          {onboardingStep >= 17 && <CheckIP />}
          {onboardingStep >= 18 && <MessageBubble text={onboardingAnswers["17_CheckIP"]} />}
          {onboardingStep >= 18 && <CloseIPSite />}
          {onboardingStep >= 19 && <MessageBubble text={onboardingAnswers["18_CloseIPSite"]} />}
          {onboardingStep >= 19 && <ChooseExitNode />}
          {onboardingStep >= 20 && <MessageBubble text={onboardingAnswers["19_ChooseExitNode"]} />}
          {onboardingStep >= 20 && <TellChoice />}
          {onboardingStep >= 21 && <MessageBubble text={onboardingAnswers["20_TellChoice"]} />}
          {onboardingStep >= 21 && <CheckIPAgain />}
          {onboardingStep >= 22 && <MessageBubble text={onboardingAnswers["21_CheckIPAgain"]} />}
          {onboardingStep >= 22 && <DidIPChange />}
          {onboardingStep >= 23 && <MessageBubble text={onboardingAnswers["22_DidIPChange"]} />}
          {onboardingStep >= 23 && <IPChangeResponse />}
          {onboardingStep >= 24 && <MessageBubble text={onboardingAnswers["23_IPChangeResponse"]} />}
          {onboardingStep >= 24 && <NoIPChangeResponse />}
          {onboardingStep >= 25 && <MessageBubble text={onboardingAnswers["24_NoIPChangeResponse"]} />}
          {onboardingStep >= 25 && <VisitWebsite />}
          {onboardingStep >= 26 && <MessageBubble text={onboardingAnswers["25_VisitWebsite"]} />}
          {onboardingStep >= 26 && <VisitYoutube />}
          {onboardingStep >= 27 && <MessageBubble text={onboardingAnswers["26_VisitYoutube"]} />}
          {onboardingStep >= 27 && <YouTubeFeedback />}
          {onboardingStep >= 28 && <MessageBubble text={onboardingAnswers["27_YouTubeFeedback"]} />}
          {onboardingStep >= 28 && <CheckYoutubeStats />}
          {onboardingStep >= 29 && <MessageBubble text={onboardingAnswers["28_CheckYoutubeStats"]} />}
          {onboardingStep >= 29 && <CheckIPThirdTime />}
          {onboardingStep >= 30 && <MessageBubble text={onboardingAnswers["29_CheckIPThirdTime"]} />}
          {onboardingStep >= 30 && <OpenChatApp />}
          {onboardingStep >= 31 && <MessageBubble text={onboardingAnswers["30_OpenChatApp"]} />}
          {onboardingStep >= 31 && <TellChatApp />}
          {onboardingStep >= 32 && <MessageBubble text={onboardingAnswers["31_TellChatApp"]} />}
          {onboardingStep >= 32 && <UseChatApp />}
          {onboardingStep >= 33 && <MessageBubble text={onboardingAnswers["32_UseChatApp"]} />}
          {onboardingStep >= 33 && <AppFeedback />}
          {onboardingStep >= 34 && <MessageBubble text={onboardingAnswers["33_AppFeedback"]} />}
          {onboardingStep >= 34 && <CheckIPLastTime />}
          {onboardingStep >= 35 && <MessageBubble text={onboardingAnswers["34_CheckIPLastTime"]} />}
          {onboardingStep >= 35 && <DidIPChangeLast />}
          {onboardingStep >= 36 && <MessageBubble text={onboardingAnswers["35_DidIPChangeLast"]} />}
          {onboardingStep >= 36 && <TryDifferentExitNode />}
          {onboardingStep >= 37 && <MessageBubble text={onboardingAnswers["36_TryDifferentExitNode"]} />}
          {onboardingStep >= 37 && <WrapUp />} 
        </Box>
      </Container>
    </Box>
  );
}
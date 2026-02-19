// Steps
import Welcome from "./1_welcome";
import HowOnboardingWorks from "./2_HowOnboardingWorks";
import GettingHelp from "./3_GettingHelp";
import SwitchingDevices from "./4_SwitchingDevices";
import SessionSummary from "./5_SessionSummary";
import CheckIP from "./6_CheckIP";
import CloseIPSite from "./7_CloseIPSite";
import Os from "./8_os";
import Download from "./9_download";
import DownloadVideohelp from "./10_Download_videohelp";
import RunInstaller from "./11_RunInstaller";
import RunInstallerVideohelp from "./12_RunInstaller_videohelp";
import RunGnosisVPN from "./13_RunGnosisVPN";
import RunGnosisVPNVideohelp from "./14_RunGnosisVPN_videohelp";
import GetStarted from "./15_GetStarted";
import GetStartedVideohelp from "./16_GetStarted_videohelp";
import Funding from "./17_Funding";
import FundingVideohelp from "./18_Funding_videohelp";
import Syncing from "./19_Syncing";
import SyncingVideohelp from "./20_Syncing_videohelp";
import SyncingFeedback from "./21_SyncingFeedback";
import ReadyToTest from "./22_ReadyToTest";
import AlreadyConnected from "./23_AlreadyConnected";
import AlreadyConnectedVideohelp from "./24_AlreadyConnected_videohelp";
import ReadyTimeout from "./25_Great";
import ChooseExitNode from "./26_ChooseExitNode";
import ChooseExitNodeVideohelp from "./27_ChooseExitNode_videohelp";
import TellChoice from "./28_TellChoice";
import CheckIPAgain from "./29_CheckIPAgain";
import DidIPChange from "./30_DidIPChange";
import WaitTillYouAreConnected from "./31_WaitTillYouAreConnected";
import PleaseRestart from "./32_PleaseRestart";
import VisitWebsite from "./33_VisitWebsite";
import VisitYoutube from "./34_VisitYoutube";
import YouTubeFeedback from "./35_YouTubeFeedback";
import CheckIPThirdTime from "./36_CheckIPThirdTime";
import OpenChatApp from "./37_OpenChatApp";
import TellChatApp from "./38_TellChatApp";
import UseChatApp from "./39_UseChatApp";
import AppFeedback from "./40_AppFeedback";
import CheckIPLastTime from "./41_CheckIPLastTime";
import DidIPChangeLast from "./42_DidIPChangeLast";
import TryDifferentExitNode from "./43_TryDifferentExitNode";
import WrapUp from "./44_WrapUp";
import Summary from "./98_summary";
import Feedback from "./99_Feedback";

export const STEP_NAMES: Record<number, string> = {
  1: "Welcome",
  2: "How Onboarding Works",
  3: "Getting Help",
  4: "Switching Devices",
  5: "Session Summary",
  6: "Check IP",
  7: "Close IP Site",
  8: "OS",
  9: "Download",
  10: "Download Videohelp",
  11: "Run Installer",
  12: "Run Installer Videohelp",
  13: "Run Gnosis VPN",
  14: "Run Gnosis VPN Videohelp",
  15: "Get Started",
  16: "Get Started Videohelp",
  17: "Funding",
  18: "Funding Videohelp",
  19: "Syncing",
  20: "Syncing Videohelp",
  21: "Syncing Feedback",
  22: "Ready to Test",
  23: "Already Connected",
  24: "Already Connected Videohelp",
  25: "Ready Timeout",
  26: "Choose Exit Node",
  27: "Choose Exit Node Videohelp",
  28: "Tell Choice",
  29: "Check IP Again",
  30: "Did IP Change",
  31: "Wait Till You Are Connected",
  32: "Please Restart",
  33: "Visit Website",
  34: "Visit Youtube",
  35: "YouTube Feedback",
  36: "Check IP Third Time",
  37: "Open Chat App",
  38: "Tell Chat App",
  39: "Use Chat App",
  40: "App Feedback",
  41: "Check IP Last Time",
  42: "Did IP Change Last",
  43: "Try Different Exit Node",
  44: "Wrap Up",
  98: "Summary",
  99: "Feedback Form"
};

export const STEP_COMPONENTS: Record<number, React.ComponentType<any>> = {
  1: Welcome,
  2: HowOnboardingWorks,
  3: GettingHelp,
  4: SwitchingDevices,
  5: SessionSummary,
  6: CheckIP,
  7: CloseIPSite,
  8: Os,
  9: Download,
  10: DownloadVideohelp,
  11: RunInstaller,
  12: RunInstallerVideohelp,
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
  24: AlreadyConnectedVideohelp,
  25: ReadyTimeout,
  26: ChooseExitNode,
  27: ChooseExitNodeVideohelp,
  28: TellChoice,
  29: CheckIPAgain,
  30: DidIPChange,
  31: WaitTillYouAreConnected,
  32: PleaseRestart,
  33: VisitWebsite,
  34: VisitYoutube,
  35: YouTubeFeedback,
  36: CheckIPThirdTime,
  37: OpenChatApp,
  38: TellChatApp,
  39: UseChatApp,
  40: AppFeedback,
  41: CheckIPLastTime,
  42: DidIPChangeLast,
  43: TryDifferentExitNode,
  44: WrapUp,
  98: Summary,
  99: Feedback
};

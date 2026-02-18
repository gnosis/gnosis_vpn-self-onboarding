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
import PleaseRestart from "./31_PleaseRestart";
import VisitWebsite from "./32_VisitWebsite";
import VisitYoutube from "./33_VisitYoutube";
import YouTubeFeedback from "./34_YouTubeFeedback";
import CheckIPThirdTime from "./35_CheckIPThirdTime";
import OpenChatApp from "./36_OpenChatApp";
import TellChatApp from "./37_TellChatApp";
import UseChatApp from "./38_UseChatApp";
import AppFeedback from "./39_AppFeedback";
import CheckIPLastTime from "./40_CheckIPLastTime";
import DidIPChangeLast from "./41_DidIPChangeLast";
import TryDifferentExitNode from "./42_TryDifferentExitNode";
import WrapUp from "./43_WrapUp";
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
  31: "Please Restart",
  32: "Visit Website",
  33: "Visit Youtube",
  34: "YouTube Feedback",
  35: "Check IP Third Time",
  36: "Open Chat App",
  37: "Tell Chat App",
  38: "Use Chat App",
  39: "App Feedback",
  40: "Check IP Last Time",
  41: "Did IP Change Last",
  42: "Try Different Exit Node",
  43: "Wrap Up",
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
  31: PleaseRestart,
  32: VisitWebsite,
  33: VisitYoutube,
  34: YouTubeFeedback,
  35: CheckIPThirdTime,
  36: OpenChatApp,
  37: TellChatApp,
  38: UseChatApp,
  39: AppFeedback,
  40: CheckIPLastTime,
  41: DidIPChangeLast,
  42: TryDifferentExitNode,
  43: WrapUp,
  98: Summary,
  99: Feedback
};

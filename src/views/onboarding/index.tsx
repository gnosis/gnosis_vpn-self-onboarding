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
import HoprBasics from "./13_HoprBasics";
import HoprBasicsVideohelp from "./14_HoprBasics_videohelp";
import RunGnosisVPN from "./15_RunGnosisVPN";
import RunGnosisVPNVideohelp from "./16_RunGnosisVPN_videohelp";
import GetStarted from "./17_GetStarted";
import GetStartedVideohelp from "./18_GetStarted_videohelp";
import Funding from "./19_Funding";
import FundingVideohelp from "./20_Funding_videohelp";
import Syncing from "./21_Syncing";
import SyncingVideohelp from "./22_Syncing_videohelp";
import SyncingFeedback from "./23_SyncingFeedback";
import ReadyToTest from "./24_ReadyToTest";
import AlreadyConnected from "./25_AlreadyConnected";
import AlreadyConnectedVideohelp from "./26_AlreadyConnected_videohelp";
import ReadyTimeout from "./27_Great";
import ChooseExitNode from "./28_ChooseExitNode";
import ChooseExitNodeVideohelp from "./29_ChooseExitNode_videohelp";
import TellChoice from "./30_TellChoice";
import CheckIPAgain from "./31_CheckIPAgain";
import DidIPChange from "./32_DidIPChange";
import PleaseRestart from "./33_PleaseRestart";
import VisitWebsite from "./34_VisitWebsite";
import VisitYoutube from "./35_VisitYoutube";
import YouTubeFeedback from "./36_YouTubeFeedback";
import CheckIPThirdTime from "./37_CheckIPThirdTime";
import OpenChatApp from "./38_OpenChatApp";
import TellChatApp from "./39_TellChatApp";
import UseChatApp from "./40_UseChatApp";
import AppFeedback from "./41_AppFeedback";
import CheckIPLastTime from "./42_CheckIPLastTime";
import DidIPChangeLast from "./43_DidIPChangeLast";
import TryDifferentExitNode from "./44_TryDifferentExitNode";
import WrapUp from "./45_WrapUp";
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
  13: "HOPR Basics",
  14: "HOPR Basics Videohelp",
  15: "Run Gnosis VPN",
  16: "Run Gnosis VPN Videohelp",
  17: "Get Started",
  18: "Get Started Videohelp",
  19: "Funding",
  20: "Funding Videohelp",
  21: "Syncing",
  22: "Syncing Videohelp",
  23: "Syncing Feedback",
  24: "Ready to Test",
  25: "Already Connected",
  26: "Already Connected Videohelp",
  27: "Ready Timeout",
  28: "Choose Exit Node",
  29: "Choose Exit Node Videohelp",
  30: "Tell Choice",
  31: "Check IP Again",
  32: "Did IP Change",
  33: "Please Restart",
  34: "Visit Website",
  35: "Visit Youtube",
  36: "YouTube Feedback",
  37: "Check IP Third Time",
  38: "Open Chat App",
  39: "Tell Chat App",
  40: "Use Chat App",
  41: "App Feedback",
  42: "Check IP Last Time",
  43: "Did IP Change Last",
  44: "Try Different Exit Node",
  45: "Wrap Up",
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
  13: HoprBasics,
  14: HoprBasicsVideohelp,
  15: RunGnosisVPN,
  16: RunGnosisVPNVideohelp,
  17: GetStarted,
  18: GetStartedVideohelp,
  19: Funding,
  20: FundingVideohelp,
  21: Syncing,
  22: SyncingVideohelp,
  23: SyncingFeedback,
  24: ReadyToTest,
  25: AlreadyConnected,
  26: AlreadyConnectedVideohelp,
  27: ReadyTimeout,
  28: ChooseExitNode,
  29: ChooseExitNodeVideohelp,
  30: TellChoice,
  31: CheckIPAgain,
  32: DidIPChange,
  33: PleaseRestart,
  34: VisitWebsite,
  35: VisitYoutube,
  36: YouTubeFeedback,
  37: CheckIPThirdTime,
  38: OpenChatApp,
  39: TellChatApp,
  40: UseChatApp,
  41: AppFeedback,
  42: CheckIPLastTime,
  43: DidIPChangeLast,
  44: TryDifferentExitNode,
  45: WrapUp,
  98: Summary,
  99: Feedback
};

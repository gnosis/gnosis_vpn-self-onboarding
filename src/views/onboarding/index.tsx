// Steps
import Welcome from "./1_welcome";
import HowOnboardingWorks from "./2_HowOnboardingWorks";
import GettingHelp from "./3_GettingHelp";
import SwitchingDevices from "./4_SwitchingDevices";
import SessionSummary from "./5_SessionSummary";
import Os from "./6_os";
import Download from "./7_download";
import DownloadVideohelp from "./8_Download_videohelp";
import RunInstaller from "./9_RunInstaller";
import RunInstallerVideohelp from "./10_RunInstaller_videohelp";
import HoprBasics from "./11_HoprBasics";
import HoprBasicsVideohelp from "./12_HoprBasics_videohelp";
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
import CheckIP from "./26_CheckIP";
import CloseIPSite from "./27_CloseIPSite";
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
  6: "OS",
  7: "Download",
  8: "Download Videohelp",
  9: "Run Installer",
  10: "Run Installer Videohelp",
  11: "HOPR Basics",
  12: "HOPR Basics Videohelp",
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
  26: "Check IP",
  27: "Close IP Site",
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
  24: AlreadyConnectedVideohelp,
  25: ReadyTimeout,
  26: CheckIP,
  27: CloseIPSite,
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

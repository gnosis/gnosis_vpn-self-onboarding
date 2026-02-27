import { useAppStore } from './store/appStore';

const IP_CHECK_URLS = [
  // Plain text
  "https://api.ipify.org?format=text",
  "https://api64.ipify.org",
  "https://ifconfig.me/ip",
  "https://icanhazip.com",
  "https://ipv4.icanhazip.com",
  "https://checkip.amazonaws.com",
  "https://ipecho.net/plain",
  "https://ipinfo.io/ip",
  "https://wtfismyip.com/text",
  "https://ident.me",
  "https://v4.ident.me",
  "https://myexternalip.com/raw",
  "https://api.ip.sb/ip",
  "https://get.geojs.io/v1/ip",
  "https://ipv4.wtfismyip.com/text",
  "https://showip.net",
  "https://v4.ip.zxinc.org/getip",
  // JSON
  "https://api.ipify.org?format=json",
  "https://api64.ipify.org?format=json",
  "https://ipinfo.io/json",
  "https://json.geoiplookup.io",
  "https://wtfismyip.com/json",
  "https://httpbin.org/ip",
  "https://geolocation-db.com/json/",
  "https://api.db-ip.com/v2/free/self",
  "https://api.seeip.org/jsonip",
  "https://get.geojs.io/v1/ip.json",
  "https://www.myexternalip.com/json",
  "https://api.ipgeolocation.io/getip",
  "https://surfshark.com/api/v1/server/user",
  "https://api.ipbase.com/v1/json/",
  "https://api-bdc.net/data/client-ip",
  "https://api.bigdatacloud.net/data/client-ip",
  // Cloudflare trace (key=value format)
  "https://cloudflare.com/cdn-cgi/trace",
  "https://1.1.1.1/cdn-cgi/trace",
  "https://www.cloudflare.com/cdn-cgi/trace",
];

function isValidPublicIP(ip: string): boolean {
  const ipv4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = ip.match(ipv4);
  if (match) {
    const parts = [+match[1], +match[2], +match[3], +match[4]];
    if (parts.some((p) => p > 255)) return false;
    if (parts[0] === 10) return false;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return false;
    if (parts[0] === 192 && parts[1] === 168) return false;
    if (parts[0] === 127) return false;
    if (parts[0] === 0) return false;
    if (parts[0] === 169 && parts[1] === 254) return false;
    return true;
  }
  const ipv6 = /^[0-9a-fA-F:]+$/;
  if (ipv6.test(ip) && ip.includes(":")) {
    if (ip === "::1") return false;
    if (ip.toLowerCase().startsWith("fe80")) return false;
    if (ip.toLowerCase().startsWith("fc") || ip.toLowerCase().startsWith("fd")) return false;
    return true;
  }
  return false;
}

export async function fetchFundingCode(token: string | null): Promise<void> {
  if (!token) return;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_WEBAPI_URL}/api/gnosisvpn-self-onboarding/getFundingCode`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch funding code:', response.statusText);
      return;
    }

    const data = await response.json();
    useAppStore.getState().setFundingCode(data.fundingCode ?? null);
  } catch (error) {
    console.error('Error fetching funding code:', error);
  }
}

export async function uploadData(
  token: string | null,
  data: {
    onboardingStep?: number;
    stepLog?: string[];
    notes?: Record<string, string>;
    feedback?: Record<string, string>;
    onboardingAnswers?: Record<string, string | null>;
    isMacOs?: boolean;
    isSameDevice?: boolean | null;
  }
): Promise<void> {
  if (!token) return;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_WEBAPI_URL}/api/gnosisvpn-self-onboarding/updateJsonData`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ jsonData: data }),
      }
    );

    if (!response.ok) {
      console.error('Failed to upload data:', response.statusText);
    } else {
      console.log('Data uploaded successfully');
    }
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

const IP_JSON_FIELDS = [
  "ip", "IP", "ipAddress", "IPv4", "origin",
  "ipString", "YourFuckingIPAddress", "query",
];

const IPV4_REGEX = /\b(\d{1,3}(?:\.\d{1,3}){3})\b/;

function preferIPv4(value: string): string {
  const match = value.match(IPV4_REGEX);
  return match ? match[1] : value;
}

function extractIP(text: string): string | null {
  // Try JSON
  try {
    const json = JSON.parse(text);
    let fallback: string | null = null;
    for (const field of IP_JSON_FIELDS) {
      if (typeof json[field] === "string" && json[field].trim()) {
        const val = json[field].trim();
        const ipv4Match = val.match(IPV4_REGEX);
        if (ipv4Match) return ipv4Match[1];
        if (!fallback) fallback = val;
      }
    }
    if (fallback) return fallback;
  } catch {
    // Not JSON
  }

  // Try Cloudflare trace format (ip=x.x.x.x)
  const traceMatch = text.match(/^ip=(.+)$/m);
  if (traceMatch) {
    return preferIPv4(traceMatch[1].trim());
  }

  // Plain text
  return preferIPv4(text.trim());
}

let ipCheckIndex = 0;

export async function getPublicIP(): Promise<string | null> {
  const len = IP_CHECK_URLS.length;
  for (let i = 0; i < len; i++) {
    const url = IP_CHECK_URLS[(ipCheckIndex + i) % len];
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (response.ok) {
        const text = await response.text();
        const ip = extractIP(text);
        if (ip && isValidPublicIP(ip)) {
          ipCheckIndex = (ipCheckIndex + i + 1) % len;
          return ip;
        }
      }
    } catch {
      continue;
    }
  }
  return null;
}

const VPN_IP_COUNTRIES: Record<string, string> = {
  "185.9.1.2":  "Australia",
  "185.9.1.17": "South Korea",
  "185.9.1.33": "India",
  "185.9.1.49": "UK",
  "185.9.1.65": "USA",
  "185.9.1.81": "Brazil",
};

export function getVpnCountry(ip: string | null): string | null {
  return (ip && VPN_IP_COUNTRIES[ip]) || null;
}

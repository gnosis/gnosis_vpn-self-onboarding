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
  "https://ip.tyk.nu",
  "https://wgetip.com",
  "https://eth0.me",
  "https://ipaddr.site",
  "https://ifconfig.co/ip",
  "https://curlmyip.net",
  "https://l2.io/ip",
  "https://api.seeip.org",

  "https://trackip.net/ip",
  "https://api.ip.sb/ip",
  "https://ipof.in/txt",
  "https://get.geojs.io/v1/ip",

  "https://am.i.mullvad.net/ip",
  "https://ipv4.wtfismyip.com/text",
  "https://showip.net",
  "https://v4.ip.zxinc.org/getip",
  // JSON
  "https://api.ipify.org?format=json",
  "https://api64.ipify.org?format=json",
  "https://ipinfo.io/json",
  "https://freegeoip.app/json/",
  "https://json.geoiplookup.io",
  "https://wtfismyip.com/json",
  "https://api.myip.com",
  "https://ifconfig.co/json",
  "https://httpbin.org/ip",
  "https://www.trackip.net/ip?json",
  "https://geolocation-db.com/json/",
  "https://api.db-ip.com/v2/free/self",
  "https://ipwhois.app/json/",
  "https://freeipapi.com/api/json",
  "https://reallyfreegeoip.org/json/",
  "https://api.seeip.org/jsonip",
  "https://ipwho.is/",
  "https://get.geojs.io/v1/ip.json",
  "https://www.myexternalip.com/json",
  "https://api.ipgeolocation.io/getip",
  "https://surfshark.com/api/v1/server/user",
  "https://api.ip2location.io/",
  "https://api.ipbase.com/v1/json/",
  "https://api-bdc.net/data/client-ip",
  "https://api.bigdatacloud.net/data/client-ip",
  "https://check.torproject.org/api/ip",
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

export async function uploadData(
  token: string | null,
  data: {
    onboardingStep: number;
    stepLog: string[];
    notes: Record<string, string>;
    feedback: Record<string, string>;
    onboardingAnswers: Record<string, string | null>;
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

function extractIP(text: string): string | null {
  // Try JSON
  try {
    const json = JSON.parse(text);
    for (const field of IP_JSON_FIELDS) {
      if (typeof json[field] === "string" && json[field].trim()) {
        return json[field].trim();
      }
    }
  } catch {
    // Not JSON
  }

  // Try Cloudflare trace format (ip=x.x.x.x)
  const traceMatch = text.match(/^ip=(.+)$/m);
  if (traceMatch) {
    return traceMatch[1].trim();
  }

  // Plain text
  return text.trim();
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

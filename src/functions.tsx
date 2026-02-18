const IP_CHECK_URLS = [
  "https://api.ipify.org?format=text",
  "https://ifconfig.me/ip",
  "https://icanhazip.com",
  "https://checkip.amazonaws.com",
  "https://api.my-ip.io/v2/ip.txt",
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

export async function getPublicIP(): Promise<string | null> {
  for (const url of IP_CHECK_URLS) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (response.ok) {
        const ip = (await response.text()).trim();
        if (ip && isValidPublicIP(ip)) return ip;
      }
    } catch {
      continue;
    }
  }
  return null;
}

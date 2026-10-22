export function isInAppBrowser(): boolean {
  if (typeof window === "undefined") return false;

  const ua = navigator.userAgent || navigator.vendor || (window as any).opera || "";
  return (
    /FBAN|FBAV|Instagram|Messenger|Line|Twitter|MicroMessenger|Snapchat|BytedanceWebview/i.test(
      ua
    )
  );
}

export function isAndroid(): boolean {
  if (typeof window === "undefined") return false;
  return /Android/i.test(navigator.userAgent || "");
}

export function isIOS(): boolean {
  if (typeof window === "undefined") return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent || "");
}

/**
 * Opens current URL in Chrome (Android intent) or prompts external browser
 */
export function openInExternalBrowser(): void {
  if (typeof window === "undefined") return;

  const currentUrl = window.location.href;
  const isHttp = currentUrl.startsWith("http://");
  const noProtocol = currentUrl.replace(/^https?:\/\//i, "");
  const scheme = isHttp ? "http" : "https";

  if (isAndroid()) {
    // Android Chrome Intent
    const chromeIntent = `intent://${noProtocol}#Intent;scheme=${scheme};package=com.android.chrome;end`;
    window.location.href = chromeIntent;
  } else {
    // On iOS or other systems, prompt user to copy or open in external browser
    window.open(currentUrl, "_blank");
  }
}

/**
 * Robust clipboard copy function that works across in-app browsers, iOS, Android, and webviews.
 * Copies purely the exact window.location.href without adding anything.
 */
export async function copyCurrentUrlToClipboard(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  const currentUrl = window.location.href;

  // 1. Try modern navigator.clipboard API
  if (navigator?.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(currentUrl);
      return true;
    } catch {
      // In-app browsers frequently block async clipboard; fallback below
    }
  }

  // 2. Reliable fallback: temporary textarea with execCommand('copy')
  try {
    const textArea = document.createElement("textarea");
    textArea.value = currentUrl;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    textArea.style.opacity = "0";
    textArea.style.pointerEvents = "none";
    document.body.appendChild(textArea);

    // iOS and mobile selection
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, textArea.value.length);

    const success = document.execCommand("copy");
    document.body.removeChild(textArea);
    return success;
  } catch (err) {
    console.error("Clipboard copy error:", err);
    return false;
  }
}

import * as React from "react";

export function useClipboard({ timeout = 2000 } = {}) {
  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
        return;
      }
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
      });
    },
    [timeout]
  );

  return { copy, copied };
}

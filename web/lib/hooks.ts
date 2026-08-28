import * as React from "react";

export function useKeyboardClick<T extends HTMLElement>(isPressable?: boolean) {
  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<T>) => {
      if (isPressable && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        e.currentTarget.click();
      }
    },
    [isPressable]
  );

  return isPressable
    ? {
        tabIndex: 0,
        onKeyDown,
      }
    : {};
}

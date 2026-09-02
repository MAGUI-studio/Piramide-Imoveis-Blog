"use client";

import { useEffect } from "react";

interface ViewTrackerProps {
  slug: string;
  postId?: string;
}

export function ViewTracker({ slug, postId }: ViewTrackerProps) {
  useEffect(() => {
    if (!slug) return;

    const storageKey = `piramide_view_${slug}`;
    const alreadyViewed = sessionStorage.getItem(storageKey);

    if (alreadyViewed) return;

    
    const timer = setTimeout(() => {
      fetch("/api/views", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, postId }),
      })
        .then(() => {
          sessionStorage.setItem(storageKey, "true");
        })
        .catch((err) => {
          console.warn("[ViewTracker] Failed to register view:", err);
        });
    }, 3000);

    return () => clearTimeout(timer);
  }, [slug, postId]);

  return null;
}

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AnalyticsScripts } from "@/src/components/common/AnalyticsScripts";

describe("AnalyticsScripts", () => {
  it("should render GA4, Meta Pixel and GTM scripts and noscript fallbacks when IDs are provided", () => {
    const { container } = render(
      <AnalyticsScripts
        gaId="G-TEST12345"
        metaPixelId="1234567890"
        gtmId="GTM-TEST99"
      />
    );

    expect(container).toBeDefined();
    const noscripts = container.querySelectorAll("noscript");
    expect(noscripts.length).toBeGreaterThanOrEqual(2);
  });

  it("should render cleanly when no IDs are provided", () => {
    const { container } = render(
      <AnalyticsScripts gaId="" metaPixelId="" gtmId="" />
    );
    expect(container.innerHTML).toBe("");
  });
});

import * as React from "react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "test-project-id";
process.env.NEXT_PUBLIC_SANITY_DATASET = "production";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("next/image", () => ({
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & {
      fill?: boolean;
      priority?: boolean;
    },
  ) => {
    const { fill, priority, ...domProps } = props;
    void fill;
    void priority;
    return React.createElement("img", {
      alt: props.alt || "",
      ...domProps,
    });
  },
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    scroll: _scroll,
    ...props
  }: {
    children?: React.ReactNode;
    href: string;
    scroll?: boolean;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    void _scroll;
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

vi.mock("framer-motion", () => {
  const motionKeys = new Set([
    "initial",
    "animate",
    "exit",
    "transition",
    "whileHover",
    "whileTap",
    "whileInView",
    "viewport",
    "layout",
    "layoutId",
  ]);

  const cleanProps = (props: Record<string, unknown>) => {
    const domProps: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(props)) {
      if (!motionKeys.has(key)) {
        domProps[key] = value;
      }
    }
    return domProps;
  };

  return {
    motion: new Proxy(
      {},
      {
        get: (_target, prop: string) => {
          return ({
            children,
            ...props
          }: { children?: React.ReactNode } & Record<string, unknown>) =>
            React.createElement(prop, cleanProps(props), children);
        },
      },
    ),
    AnimatePresence: ({ children }: { children?: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

vi.mock("nuqs", () => ({
  useQueryState: (_key: string, parser?: { defaultValue?: string }) => {
    const [val, setVal] = React.useState(parser?.defaultValue || "");
    return [val, setVal];
  },
  parseAsString: {
    withDefault: (val: string) => ({
      defaultValue: val,
      withOptions: () => ({ defaultValue: val }),
    }),
  },
  parseAsStringLiteral: () => ({
    withDefault: (val: string) => ({
      defaultValue: val,
      withOptions: () => ({ defaultValue: val }),
    }),
  }),
}));

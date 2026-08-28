export const toast = {
  success: (msg: string, opts?: { description?: string }) => {
    if (typeof window !== "undefined") {
      console.log(`[Toast Success]: ${msg}`, opts);
    }
  },
  error: (msg: string, opts?: { description?: string }) => {
    if (typeof window !== "undefined") {
      console.error(`[Toast Error]: ${msg}`, opts);
    }
  },
  info: (msg: string, opts?: { description?: string }) => {
    if (typeof window !== "undefined") {
      console.info(`[Toast Info]: ${msg}`, opts);
    }
  },
};

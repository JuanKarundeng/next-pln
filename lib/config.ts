// config.ts
const Config: { ipPUBLIC: string | undefined } = {
  ipPUBLIC: process.env.NEXT_PUBLIC_API_URL, // Ensure the environment variable has the NEXT_PUBLIC_ prefix
};

export default Config;

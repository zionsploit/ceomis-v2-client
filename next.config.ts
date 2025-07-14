import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: [
      '@mantine/core', 
      '@mantine/hooks', 
      '@mantine/dates', 
      '@mantine/modals', 
      '@mantine/charts', 
      '@mantine/colors-generator',
      '@mantine/dropzone',
      'formik',
    ]
  }
};

export default nextConfig;

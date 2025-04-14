import react from '@vitejs/plugin-react'
import { UserConfig } from "vite";

export const testConfig = {
  plugins: [react()],
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: 'jsdom',
    // hey! 👋 over here
    globals: true,
    setupFiles: './src/tests/setup.ts', // assuming the test folder is in the root of our project
  }
} as UserConfig;
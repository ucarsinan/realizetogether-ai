import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.{test,spec}.{js,ts}'],
    // We remove the jsdom requirement for now to fix the ESM loading error in this environment
    // If you need browser-like unit tests, use @vitest/browser or fix the ESM chain
  },
});

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // motion's useReducedMotion reads the media query on the first client
      // render, which the server cannot match: hydration errors for every
      // visitor with "reduce motion" on. The shared hook is hydration-safe.
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "motion/react",
              importNames: ["useReducedMotion"],
              message:
                "Use useReducedMotionSafe from @/lib/use-reduced-motion-safe (hydration-safe).",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

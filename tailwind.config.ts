import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary) / <alpha-value>)",
        "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",

        secondary: "hsl(var(--secondary) / <alpha-value>)",
        "secondary-foreground":
          "hsl(var(--secondary-foreground) / <alpha-value>)",

        accent: "hsl(var(--accent) / <alpha-value>)",
        "accent-foreground": "hsl(var(--accent-foreground) / <alpha-value>)",

        destructive: "hsl(var(--destructive) / <alpha-value>)",
        "destructive-foreground":
          "hsl(var(--destructive-foreground) / <alpha-value>)",

        background: "hsl(var(--background) / <alpha-value>)",

        foreground: "hsl(var(--foreground) / <alpha-value>)",

        muted: "hsl(var(--muted) / <alpha-value>)",

        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",

        card: "hsl(var(--card) / <alpha-value>)",
        "card-foreground": "hsl(var(--card-foreground) / <alpha-value>)",

        popover: "hsl(var(--popover) / <alpha-value>)",
        "popover-foreground": "hsl(var(--popover-foreground) / <alpha-value>)",

        border: "hsl(var(--border) / <alpha-value>)",

        input: "hsl(var(--input) / <alpha-value>)",

        ring: "hsl(var(--ring) / <alpha-value>)",
      },
    },
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".--orange-500": {
          outline: "2px solid",
          outlineColor: "#f97316",
        },
        ".--orange-600": {
          outline: "2px solid",
          outlineColor: "#ea580c",
        },

        ".--amber-500": {
          outline: "2px solid",
          outlineColor: "#f59e0b",
        },
        ".--amber-600": {
          outline: "2px solid",
          outlineColor: "#d97706",
        },
        ".--lime-500": {
          outline: "2px solid",
          outlineColor: "#84cc16",
        },
        ".--lime-600": {
          outline: "2px solid",
          outlineColor: "#65a30d",
        },
        ".--emerald-500": {
          outline: "2px solid",
          outlineColor: "#10b981",
        },
        ".--emerald-600": {
          outline: "2px solid",
          outlineColor: "#059669",
        },
        ".--sky-500": {
          outline: "2px solid",
          outlineColor: "#0ea5e9",
        },
        ".--sky-600": {
          outline: "2px solid",
          outlineColor: "#0284c7",
        },
        ".--blue-500": {
          outline: "2px solid",
          outlineColor: "#3b82f6",
        },
        ".--blue-600": {
          outline: "2px solid",
          outlineColor: "#2563eb",
        },
        ".--purple-500": {
          outline: "2px solid",
          outlineColor: "#a855f7",
        },
        ".--purple-600": {
          outline: "2px solid",
          outlineColor: "#9333ea",
        },
        ".--pink-500": {
          outline: "2px solid",
          outlineColor: "#ec4899",
        },
        ".--pink-600": {
          outline: "2px solid",
          outlineColor: "#db2777",
        },
      });
    }),
  ],
} satisfies Config;

import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            mobile: "412px",
            tablet: "820px",
            laptop: "1240px",
            desktop: "1500px",
        },
        colors: {
            white: "#ffffff",
            black: "#1B1C1E",
            gray: "#7c7c7c",
            lightGray: "#f5f5f5",
        },
    },
    darkMode: "class",
    plugins: [
        heroui({
            themes: {
                light: {
                    colors: {
                        primary: {
                            DEFAULT: "#b33049",
                            foreground: "#ffffff",
                        },
                        secondary: {
                            DEFAULT: "#282136",
                            foreground: "#ffffff",
                        },
                        success: {
                            DEFAULT: "#02c697",
                        },
                        danger: {
                            DEFAULT: "#c53030",
                            foreground: "#fff",
                        },
                        overlay: {
                            DEFAULT: "#dddddd",
                        },
                    },
                },
            },
        }),
    ],
};

export default config;

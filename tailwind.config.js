/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./_layout.tsx",
    "./app/**/*.{js,jsx,ts,tsx}", // root layout and other files under app/
    "./(tabs)/**/*.{js,jsx,ts,tsx}", // all tab screens (expo-router grouping)
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};

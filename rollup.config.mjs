const config =  {
  input: "build/winstan-plugin-express-perf.js",
  output: {
    name: "winstan-plugin-express-perf",
    file: "build/winstan-plugin-express-perf.mjs",
    format: "es"
  },
  external: [
    "@dwtechs/winstan",
  ],
  plugins: []
};

export default config;

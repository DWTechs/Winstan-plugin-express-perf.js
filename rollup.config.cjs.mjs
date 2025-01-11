import resolve from "@rollup/plugin-node-resolve";

const config =  {
  input: "build/es6/winstan-plugin-express-perf.js",
  output: {
    name: "winstan",
    file: "build/winstan-plugin-express-perf.cjs.js",
    format: "cjs"
  },
  external: [
  ],
  plugins: [
    resolve({
      mainFields: ['module', 'main']
    }),
  ]
};

export default config;
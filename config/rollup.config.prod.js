import { plugins, globals, external, resolvePath } from "./rollup.config.base";

export default {
  input: resolvePath("../src/index.ts"),
  output: [
    {
      format: "esm", // esm格式
      file: resolvePath("../lib/index.esm.js"), // 输出文件
      globals,
      assetFileNames: "assets/[name].[hash][extname]",
    },
    {
      format: "iife", // IIFE
      file: resolvePath("../lib/index.browser.js"),
      name: "ui",
      globals,
      exports: "named",
    },
    {
      format: "umd", // umd格式
      file: resolvePath("../lib/index.umd.js"), // 输出文件
      name: "new-ui", // 指定name
      exports: "named",
      globals,
      assetFileNames: "assets/[name].[hash][extname]",
    },
  ],
  plugins,
  external,
};

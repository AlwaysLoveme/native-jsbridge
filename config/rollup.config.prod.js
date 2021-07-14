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
      name: "native-jsbridge",
      extend: true,
      globals,
      exports: "named",
    },
    {
      format: "umd", // umd格式
      file: resolvePath("../lib/index.umd.js"), // 输出文件
      name: "native-jsbridge", // 指定name
      exports: "named",
      extend: true,
      globals,
      assetFileNames: "assets/[name].[hash][extname]",
    },
  ],
  plugins,
  external,
};

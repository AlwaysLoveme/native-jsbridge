import { getWindow } from "ssr-window";

const window = getWindow();
const u = window.navigator.userAgent;
const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

type Device = "android" | "ios";

export function getDevice(): Device | undefined {
  if (isAndroid) return "android";
  if (isIOS) return "ios";
}

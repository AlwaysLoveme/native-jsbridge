import { getDevice } from "./getDevice";
import { Callback, CallNativeOption, CustomWindow } from "../types/bridge";

declare const window: CustomWindow;

const jsbridge = function (callback: Callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      "WebViewJavascriptBridgeReady",
      function () {
        callback(window.WebViewJavascriptBridge);
      },
      false
    );
  }
  if (getDevice() === "ios") {
    // old ios method
    setTimeout(function () {
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
    }, 500);
    window.WVJBCallbacks = [callback];
    const WVJBIframe = document.createElement("iframe");
    WVJBIframe.style.display = "none";
    WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
    // new ios method ---> for WKWebview
    // if (window.WKWebViewJavascriptBridge) {
    //   return callback(window.WKWebViewJavascriptBridge);
    // }
    // if (window.WKWVJBCallbacks) {
    //   return window.WKWVJBCallbacks.push(callback);
    // }
    // window.WKWVJBCallbacks = [callback];
    // window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null);
  }
};

if (getDevice() === "android") {
  jsbridge(function (bridge) {
    bridge.init?.(function (
      message: unknown,
      responseCallback: (arg: any) => void
    ) {
      const data = {};
      responseCallback(data);
    });
  });
}

/**
 * @param  {option对象}
 * method: 调用的方法
 * data: 传递的参数
 * callback: 回掉方法
 * @return {[type]}
 */
function bridgeCallHandler(option: CallNativeOption) {
  jsbridge(function (bridge) {
    bridge.callHandler?.(
      option.method,
      option.data || {},
      function (responseData) {
        if (option.callback) {
          option.callback(responseData);
        }
      }
    );
  });
}

//原生调js
export const bridgeRegisterHandler = function (option: CallNativeOption) {
  jsbridge(function (bridge) {
    bridge.registerHandler?.(option.method, function (data, responseCallback) {
      if (option.callback) {
        option.callback(data);
      }
      responseCallback(option.data || {});
    });
  });
};

/**
 * 传入的option对象格式
 * {
 *    method:[String],
 *    data:[Object],
 *    callback:[Function]
 * }
 */
export const callNative = function (option: CallNativeOption) {
  bridgeCallHandler({
    method: option.method,
    data: option.data,
    callback: function (responseData: unknown) {
      if (option.callback) {
        option.callback(responseData);
      }
    },
  });
};

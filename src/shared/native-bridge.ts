import { getDevice } from "./getDevice";

const jsbridge = function (callback: JSBridge.Callback) {
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
    // if ((window as any).WKWebViewJavascriptBridge) {
    //   return callback((window as any).WKWebViewJavascriptBridge);
    // }
    // if ((window as any).WKWVJBCallbacks) {
    //   return (window as any).WKWVJBCallbacks.push(callback);
    // }
    // (window as any).WKWVJBCallbacks = [callback];
    // (
    //   window as any
    // ).webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null);
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
function bridgeCallHandler(option: JSBridge.CallNativeOption) {
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
export const bridgeRegisterHandler = function (
  option: JSBridge.CallNativeOption
) {
  window.jsbridge(function (bridge) {
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
export const callNative = function (option: JSBridge.CallNativeOption) {
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

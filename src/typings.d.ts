interface Window {
  jsbridge: (callback: JSBridge.Callback) => void;
  WVJBCallbacks: any[];
  WebViewJavascriptBridge: JSBridge.CallbackArgs;
}

declare namespace JSBridge {
  export interface Callback {
    (args: CallbackArgs): void;
  }
  export interface CallbackArgs {
    init?: (arg: any) => void;
    registerHandler?: (
      method: string,
      args: (
        arg1: unknown,
        arg2: (options: Record<string, any>) => void
      ) => void
    ) => void;
    callHandler?: (
      method: string,
      data: Record<string, unknown>,
      callback: (option: unknown) => void
    ) => void;
  }
  export interface CallNativeOption {
    method: string;
    data: Record<string, unknown>;
    callback: (arg: unknown) => void;
  }
}

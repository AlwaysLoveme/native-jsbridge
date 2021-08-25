export interface Callback {
  (args: CallbackArgs): void;
}
export interface CallbackArgs {
  init?: (arg: any) => void;
  registerHandler?: (
    method: string,
    args: (arg1: any, arg2: (options: Record<string, any>) => void) => void
  ) => void;
  callHandler?: (
    method: string,
    data: Record<string, any>,
    callback: (option: any) => void
  ) => void;
}
export interface CallNativeOption {
  method: string;
  data?: Record<string, any>;
  callback?: (arg: any) => void;
}
export interface CustomWindow extends Window {
  WebViewJavascriptBridge: any;
  WKWebViewJavascriptBridge: any;
  WVJBCallbacks: Callback[];
  WKWVJBCallbacks: Callback[];
  webkit: any;
}

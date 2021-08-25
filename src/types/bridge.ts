export interface Callback {
  (args: CallbackArgs): void;
}
export interface CallbackArgs {
  init?: (arg: any) => void;
  registerHandler?: (
    method: string,
    args: (arg1: unknown, arg2: (options: Record<string, any>) => void) => void
  ) => void;
  callHandler?: (
    method: string,
    data: Record<string, unknown>,
    callback: (option: unknown) => void
  ) => void;
}
export interface CallNativeOption {
  method: string;
  data?: Record<string, unknown>;
  callback?: (arg: unknown) => void;
}
export interface CustomWindow extends Window {
  WebViewJavascriptBridge: any;
  WKWebViewJavascriptBridge: any;
  WVJBCallbacks: Callback[];
  WKWVJBCallbacks: Callback[];
  webkit: any;
}

# native-jsbridge
用于H5和native之间通信的JS插件，支持Typescript

#### Native需要集成的配套插件
1. IOS(UIWebview): [https://github.com/marcuswestin/WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)
2. IOS(WKWebview): [https://github.com/Lision/WKWebViewJavascriptBridge](https://github.com/Lision/WKWebViewJavascriptBridge)
3. Android: [https://github.com/lzyzsd/JsBridge
](https://github.com/lzyzsd/JsBridge
)

#### 安装
推荐使用npm安装：
```
npm i native-jsbridge
```
#### 使用
1. js调用原生方法
```js
import { callNative } from "native-jsbridge";

callNative({
    method: "exampleMethod",
    data: { id: 5 },
    callback(response){
        console.log("来源于原生的反馈信息: " + response);
    }
})
```
2. 原生调用JS方法
```js
import { bridgeRegisterHandler } from "native-jsbridge";

bridgeRegisterHandler({
    method: "exampleMethod",
    callback(data){
        console.log("原生传递给前端的data: " + data);
    }
})
```
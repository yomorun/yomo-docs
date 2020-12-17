# yomo-docs

如果遇到：
```bash
(node:66930) UnhandledPromiseRejectionWarning: TypeError: Cannot read property '1' of null
    at removeExtension (/Users/ivyg/Desktop/yomo-docs/node_modules/nextra/dist/loader.js:70:32)
    at /Users/ivyg/Desktop/yomo-docs/node_modules/nextra/dist/loader.js:90:42
    at Array.map (<anonymous>)
    at getFiles (/Users/ivyg/Desktop/yomo-docs/node_modules/nextra/dist/loader.js:88:44)
    at async getPageMap (/Users/ivyg/Desktop/yomo-docs/node_modules/nextra/dist/loader.js:143:11)
    at async Object.loader (/Users/ivyg/Desktop/yomo-docs/node_modules/nextra/dist/loader.js:177:26)
(node:66930) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 5)
(node:66930) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

可以把 `node_modules/nextra/dist/loader.js` 第 70 行的
```javascript
return name.match(/^([^.]+)/)[1];
```
改成
```javascript
const arr = name.match(/^([^.]+)/);
return !arr ? '' : arr[1];
```
(没有 `.DS_Store` 应该不会出现这个问题)

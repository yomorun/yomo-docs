---
title: yomo-sink
position: 4
category: Overview
---

## yomo-sink 是什么？

`yomo-sink` 是 streaming 数据经过 YoMo 实时计算之后的数据输出，基于 `QUIC` 协议接收数据并使用 [Y3 Codec](https://github.com/yomorun/y3-codec-golang) 进行 `decode`，即可拿到实时计算之后的数据。

![sink](/sink/sink.png)

## yomo-sink 能做什么？

`yomo-sink` 可以将 YoMo 实时计算之后的数据输出到 `Web` 页面，或者持久化存储到 `DB`，或者输出到 `StdOut`，或者做为其他地区 `yomo-zipper` 的 `yomo-source`。只要基于 `QUIC` 协议接收数据并使用 [Y3 Codec](https://github.com/yomorun/y3-codec-golang) 进行 `decode`，您就可以实现自己的 `yomo-sink` 并自由的处理和展示 YoMo 输出的实时数据。

YoMo 支持同时使用多个 `yomo-sink`，例如您可以把传感器的数据实时显示到 `Web` 大屏，并持久化存储到 `DB`。YoMo 将计算后的数据**并行**输出给各个 `yomo-sink`。

## 如何编写 yomo-sink？

- 使用 [Y3 Codec](https://github.com/yomorun/y3-codec) 解码数据。[Y3](https://github.com/yomorun/y3-codec-golang) 提供 Golang SDK，并将提供多语言 SDK，助力用户使用高性能的编解码器传输数据，您只需通过 `Y3` SDK 对数据进行 `decode`。
- 基于 `QUIC` 协议传输数据。[YoMo](https://github.com/yomorun/yomo) 提供 Golang 版本的 `QUIC` SDK，只需几行代码即可使用 `QUIC` 安全、高效的接收数据。如果您使用其他编程，可以在 [quicwg](https://github.com/quicwg/base-drafts/wiki/Implementations) 找到各语言的开源 QUIC 实现。

恭喜！您只需完成上面 2 步即可获取到 YoMo 实时计算之后的数据，然后把数据根据实际业务需求写入 DB 或者显示到 WEB 页面，即可完成 `yomo-sink` 编写。

### 示例

#### yomo-sink-faunadb-example

[yomo-sink-faunadb-example](https://github.com/yomorun/yomo-sink-faunadb-example) 提供将数据保存到 `FaunaDB` 的示例。您可以参考本示例实现您自己的 `yomo-sink` 保存数据到 `DB`。

#### yomo-sink-socket-io

- [yomo-sink-socketio-server-example](https://github.com/yomorun/yomo-sink-socketio-server-example) 提供接收噪声分贝数据并通过 `socket.io server` 提供数据给 `Web` 页面展示的示例。如果您想要通过 socket.io 实时显示数据到 `Web` 页面，您可以参考本示例实现自己的 `yomo-sink`。
- [yomo-sink-socket-io-example](https://github.com/yomorun/yomo-sink-socket-io-example) 提供前端 `React` 页面接收并显示 `socket.io server` 噪声分贝数据的示例。如果您想显示基于 `socket.io` 的实时数据到网页中，您可以参考本示例的实现，编写自己的 app。

YoMo 将提供更多的示例、并封装成 SDK，方便您编写 `yomo-sink`，敬请期待！

# yomo-source

## yomo-source 是什么？能做什么？

`yomo-source` 提供 YoMo 生态的数据源。您的物联网设备、智能设备等产生的海量实时数据，使用 [Y3 Codec](https://github.com/yomorun/y3-codec-golang) 进行编码，并基于 `QUIC` 传输数据，即可做为 `yomo-source`  接入 YoMo 生态，享受 YoMo 带来的完美低时延流式计算体验。

![source](/source/source.png)

## 如何编写 yomo-source？

- [Y3](https://github.com/yomorun/y3-codec-golang) 提供 Golang SDK，并将提供多语言 SDK，助力用户使用高性能的编解码器传输数据，您只需通过 `Y3` SDK 对数据进行 `encode`。
- [YoMo](https://github.com/yomorun/yomo) 提供 Golang 版本的 `QUIC` SDK，只需几行代码即可使用 `QUIC` 安全、高效的传输数据给 YoMo。如果您使用其他编程，可以在 [quicwg](https://github.com/quicwg/base-drafts/wiki/Implementations) 找到各语言的开源 QUIC 实现。

恭喜！您只需完成上面2步即可把当前数据作为 `yomo-source` 接入 YoMo 生态。

### 示例

#### yomo-source-example

[yomo-source-example](https://github.com/yomorun/yomo-source-example) 提供生成模拟噪声数据并发送给 YoMo 的示例。您可以参考本示例实现您自己的 `yomo-source`。

#### yomo-source-mqtt-broker-starter

[yomo-source-mqtt-broker-starter](https://github.com/yomorun/yomo-source-mqtt-broker-starter) 提供接收 `MQTT` 协议的消息并发送给 YoMo 的示例。如果您正在使用基于 `MQTT` 协议的 IoT 设备，您可以参考本示例简单方便的将 MQTT 消息数据当成 `yomo-source`。

YoMo 将提供更多物联网协议的 `yomo-source` 的示例、并封装成 SDK，方便您把数据接入 YoMo 生态，敬请期待！

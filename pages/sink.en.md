# yomo-sink

## What is yomo-sink?

`yomo-sink` is the data output after real-time streaming processing by YoMo. Receive data based on `QUIC` protocol and use [Y3 Codec](https://github.com/yomorun/y3-codec-golang) to `decode`, then you can get the real-time data after YoMo's streaming processing.

![sink](/sink/sink.png)

## What can yomo-sink do?

`yomo-sink` can output the real-time data to the `Web` page after YoMo's streaming processing, or persist it to `DB`, or output it to `StdOut`，or as a `yomo-source` of `yomo-zipper` in other regions. If receive data based on `QUIC` protocol and use [Y3 Codec](https://github.com/yomorun/y3-codec-golang) to `decode` it, you can implement your `yomo-sink` to persist or show the real-time data.

YoMo supports multi `yomo-sink` at the same time, for example, you can show the sensor data in real-time on the `Web` page and store it in `DB` as well. YoMo outputs the real-time data **in parallel** to each `yomo-sink`.

## How to write yomo-sink?

- [Y3](https://github.com/yomorun/y3-codec-golang) provides Golang SDK, and `Y3` will provide other languages' SDK soon, help users use high-performance codec to transfer data easily, you only need to use `Y3` SDK to `decode` data.
- [YoMo](https://github.com/yomorun/yomo) provides Golang `QUIC` SDK, just a few lines of code can receive data from YoMo safely and efficiently over `QUIC`. If you are using other programming language, you can find the open-source `QUIC` implementations in [quicwg](https://github.com/quicwg/base-drafts/wiki/Implementations).

Congratulations! You only need to complete the above two steps to get the real-time data from YoMo, and then store the data to DB or show it to the web page according to the business requirements.

### Examples

#### yomo-sink-faunadb-example

[yomo-sink-faunadb-example](https://github.com/yomorun/yomo-sink-faunadb-example) provides an example of storing the data in `FaunaDB`. You can refer to this example to implement your `yomo-sink` and store the data in `DB`.

#### yomo-sink-socket-io

- [yomo-sink-socketio-server-example](https://github.com/yomorun/yomo-sink-socketio-server-example) provides an example of receiving the real-time noise decibel value and use `socket.io server` to broadcast it to `Web` page. If you want to show the real-time data on `Web` page by socket.io，you can refer to this example to implement your `yomo-sink`.
- [yomo-sink-socket-io-example](https://github.com/yomorun/yomo-sink-socket-io-example) provides an example of receiving the noise decibel value from `socket.io server` and show it on a `React` page. If you want to show the real-time data on a page by `socket.io`, you can refer to this example and write your app.

YoMo will provide more examples and SDKs, then you can write your `yomo-sink` easily.

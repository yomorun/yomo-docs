---
title: YoMo
position: 1
category: Overview
---

YoMo 是一个为边缘计算领域打造的低时延流式数据处理框架，基于 QUIC 协议通讯，以 Functional Reactive Programming 为编程范式，构建可靠、安全的低时延实时计算应用，挖掘 5G 潜力，释放实时计算价值。

## 快速入门

### 先决条件

确保已安装 Go 编译运行环境，参考 [安装 Go](https://golang.org/doc/install)

### 1. 安装 CLI

可以通过以下的命令全局安装最新发布的 YoMo CLI：

```sh
go install github.com/yomorun/cli/yomo@latest
```

或者也可以将 CLI 安装在不同的目录：

```sh
env GOBIN=/bin go install github.com/yomorun/cli/yomo@latest
```

#### 验证 CLI 是否成功安装

```bash
$ yomo -V

YoMo CLI version: v0.0.6
```

### 2. 创建一个 Serverless 应用

```bash
$ yomo init yomo-app-demo

⌛  Initializing the Serverless app...
✅  Congratulations! You have initialized the serverless function successfully.
ℹ️   You can enjoy the YoMo Serverless via the command: 
ℹ️   	DEV: 	yomo dev -n Noise yomo-app-demo/app.go
ℹ️   	PROD: 	First run source application, eg: go run example/source/main.go
		Second: yomo run -n yomo-app-demo yomo-app-demo/app.go

$ cd yomo-app-demo
```

YoMo CLI 会自动创建带有以下内容的 `app.go` 文件：

```go
package main

import (
	"context"
	"fmt"
	"time"

	y3 "github.com/yomorun/y3-codec-golang"
	"github.com/yomorun/yomo/pkg/rx"
)

// NoiseDataKey 用于通知YoMo只订阅Y3序列化后Tag为0x10的value
const NoiseDataKey = 0x10

// NoiseData 描述了Y3序列化后的Tag为0x10的Value所对应的反序列化数据结构
type NoiseData struct {
	Noise float32 `y3:"0x11"`
	Time  int64   `y3:"0x12"`
	From  string  `y3:"0x13"`
}

var printer = func(_ context.Context, i interface{}) (interface{}, error) {
	value := i.(NoiseData)
	rightNow := time.Now().UnixNano() / int64(time.Millisecond)
	fmt.Println(fmt.Sprintf("[%s] %d > value: %f ⚡️=%dms", value.From, value.Time, value.Noise, rightNow-value.Time))
	return value.Noise, nil
}

var callback = func(v []byte) (interface{}, error) {
	var mold NoiseData
	err := y3.ToObject(v, &mold)
	if err != nil {
		return nil, err
	}
	mold.Noise = mold.Noise / 10
	return mold, nil
}

// Handler will handle data in Rx way
func Handler(rxstream rx.RxStream) rx.RxStream {
	stream := rxstream.
		Subscribe(NoiseDataKey).
		OnObserve(callback).
		Debounce(50).
		Map(printer).
		StdOut().
		Encode(0x11)

	return stream
}
```

### 3. 编译并运行

从 terminal 运行 yomo dev，可以看到：

```sh
$ yomo dev

ℹ️   YoMo serverless function file: app.go
⌛  Create YoMo serverless instance...
⌛  YoMo serverless function building...
✅  Success! YoMo serverless function build.
ℹ️   YoMo serverless function is running...
ℹ️   Run: /Users/xiaojianhong/Downloads/yomo-app-demo/sl.yomo
2021/06/07 12:00:06 Connecting to zipper dev.yomo.run:9000 ...
2021/06/07 12:00:07 ✅ Connected to zipper dev.yomo.run:9000
[10.10.79.50] 1623038407236 > value: 1.919251 ⚡️=-25ms
[StdOut]:  1.9192511
[10.10.79.50] 1623038407336 > value: 11.370256 ⚡️=-25ms
[StdOut]:  11.370256
[10.10.79.50] 1623038407436 > value: 8.672209 ⚡️=-25ms
[StdOut]:  8.672209
[10.10.79.50] 1623038407536 > value: 4.826996 ⚡️=-25ms
[StdOut]:  4.826996
[10.10.79.50] 1623038407636 > value: 16.201773 ⚡️=-25ms
[StdOut]:  16.201773
[10.10.79.50] 1623038407737 > value: 13.875483 ⚡️=-26ms
[StdOut]:  13.875483

```

## 示意图

![yomo-arch](/yomo-arch-v0.7.png)

## 🎯 YoMo 专注于边缘计算

适合用来：

- 开发对延迟敏感的应用程序。
- 处理高网络延迟和数据包丢失的情况。
- 通过流式编程处理连续的高频数据。
- 使用流式 Serverless 架构构建复杂的系统。

## 贡献代码

首先，感谢你想要为 YoMo 做出贡献，是你这样的人使 YoMo 变得更好。你可以通过多种方式参与这个项目，例如：

- 提交 [bug](https://github.com/yomorun/yomo/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D)。请包括 YoMo 的版本、你的操作系统以及如何复现 bug 等信息。
- 提出一项新功能。
- 阅读我们的 [代码贡献说明](https://github.com/yomorun/yomo/blob/master/CONTRIBUTING.md)，了解我们需要什么类型的贡献。
- 我们还采用了 [这些行为准则](https://github.com/yomorun/yomo/blob/master/CODE_OF_CONDUCT.md)，希望项目参与者能够遵守。

## 反馈

如果你有疑问，可以随时到我们的 [GitHub 讨论区](https://github.com/yomorun/yomo/discussions) 留言，任何反馈都很欢迎。

## 开源协议

[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

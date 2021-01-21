import ScrollDown from '../components/ScrollDown'
import HeadImg from '../components/HeadImg'

# YoMo

YoMo 是一个为边缘计算领域打造的低时延流式数据处理框架，基于 QUIC 协议通讯，以 Functional Reactive Programming 为编程范式，构建可靠、安全的低时延实时计算应用，挖掘 5G 潜力，释放实时计算价值。

<HeadImg></HeadImg>

<div className='plate violet'>

## 快速入门 👨‍💻

### 1. 安装 CLI

```bash
# 请使用 $GOPATH，因为 go 语言需要 plugin 和 main 的高度耦合
$ echo $GOPATH
```

如果未设置 `$GOPATH`，请先看这一节：[设置 $GOPATH 和 $GOBIN](#optional-set-gopath-and-gobin)。

```bash
$ GO111MODULE=off go get github.com/yomorun/yomo
$ cd $GOPATH/src/github.com/yomorun/yomo
$ make install
```

![YoMo 教程 1](/tutorial-1.png)

### 2. 创建一个 Serverless 应用

```bash
$ mkdir -p $GOPATH/src/github.com/{YOUR_GITHUB_USERNAME} && cd $_
$ yomo init yomo-app-demo
2020/12/29 13:03:57 Initializing the Serverless app...
2020/12/29 13:04:00 ✅ Congratulations! You have initialized the serverless app successfully.
2020/12/29 13:04:00 🎉 You can enjoy the YoMo Serverless via the command: yomo dev
$ cd yomo-app-demo
```

![YoMo 教程 2](/tutorial-2.png)

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

type NoiseData struct {
	Noise float32 `yomo:"0x11"`
	Time  int64   `yomo:"0x12"`
	From  string  `yomo:"0x13"`
}

var printer = func(_ context.Context, i interface{}) (interface{}, error) {
	value := i.(NoiseData)
	fmt.Println("serverless get value:", value.Noise)
	return value, nil
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
		Subscribe(0x10).
		OnObserve(callback).
		AuditTime(100 * time.Millisecond).
		Map(printer).
		StdOut()

	return stream
}
```

### 3. 编译并运行

从 terminal 运行 `yomo dev`，可以看到：

![YoMo 教程 3](/tutorial-3.png)

恭喜你！你创建了你的第一个 YoMo 应用。

### Optional: 设置 $GOPATH 和 $GOBIN

针对当前 session：

```bash
export GOPATH=~/.go
export PATH=$GOPATH/bin:$PATH
```

要永久设置这些变量，需要编辑 `.zshrc` 或 `.bashrc`：

`zsh` 用户：

```bash
echo "export GOPATH=~/.go" >> .zshrc
echo "path+=$GOPATH/bin" >> .zshrc
```

`bash` 用户：

```bash
echo 'export GOPATH=~/.go' >> .bashrc
echo 'export PATH="$GOPATH/bin:$PATH"' >> ~/.bashrc
```

<ScrollDown content="了解更多"></ScrollDown>

</div>

<div id="tip1" className="cut_line"></div>

<div className='plate blue'>

## 示意图

![yomo-arch](https://yomo.run/yomo-arch-v0.7.png)

</div>

<div id="tip1" className="cut_line"></div>

<div className='plate blue'>

## 🎯 YoMo 专注于边缘计算

适合用来：

- 开发对延迟敏感的应用程序。
- 处理高网络延迟和数据包丢失的情况。
- 通过流式编程处理连续的高频数据。
- 使用流式 Serverless 架构构建复杂的系统。

</div>

<div id="tip1" className="cut_line"></div>

<div className='plate violet'>

## 贡献代码

首先，感谢你想要为 YoMo 做出贡献，是你这样的人使 YoMo 变得更好。你可以通过多种方式参与这个项目，例如：

- 提交 [bug](https://github.com/yomorun/yomo/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D)。请包括 YoMo 的版本、你的操作系统以及如何复现 bug 等信息。
- 提出一项新功能。
- 阅读我们的 [代码贡献说明](https://github.com/yomorun/yomo/blob/master/CONTRIBUTING.md)，了解我们需要什么类型的贡献。
- 我们还采用了 [这些行为准则](https://github.com/yomorun/yomo/blob/master/CODE_OF_CONDUCT.md)，希望项目参与者能够遵守。

</div>

<div id="tip1" className="cut_line"></div>

<div className='plate blue'>

## 反馈

如果你有疑问，可以随时到我们的 [GitHub 讨论区](https://github.com/yomorun/yomo/discussions) 留言，任何反馈都很欢迎。

</div>

<div id="tip1" className="cut_line"></div>

<div className='plate violet'>

## 开源协议

[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

</div>

import ScrollDown from '../components/ScrollDown'
import HeadImg from '../components/HeadImg'

# YoMo

YoMoは、低レイテンシのエッジコンピューティングアプリケーションを構築するためのオープンソースのストリーミングサーバーレスフレームワークです。QUICトランスポートプロトコルと機能的なリアクティブプログラミングインターフェースをベースに構築されており、信頼性が高く、安全で、簡単にリアルタイムのデータ処理を行うことができます。

<HeadImg></HeadImg>

<div className='plate violet'>

## はじめに 👨‍💻

### 1. Install CLI

```bash
# Make sure to use $GOPATH since golang requires the plugin and the main
# application to be highly coupled
$ echo $GOPATH
```

`$GOPATH` が設定されていない場合は、まずここをチェックする。: [Setting $GOPATH and $GOBIN](#optional-set-gopath-and-gobin).

```bash
$ GO111MODULE=off go get github.com/yomorun/yomo
$ cd $GOPATH/src/github.com/yomorun/yomo
$ make install
```

![YoMo Tutorial 1](/tutorial-1.png)

### 2. Create a Serverless App

```bash
$ mkdir -p $GOPATH/src/github.com/{YOUR_GITHUB_USERNAME} && cd $_
$ yomo init yomo-app-demo
2020/12/29 13:03:57 Initializing the Serverless app...
2020/12/29 13:04:00 ✅ Congratulations! You have initialized the serverless app successfully.
2020/12/29 13:04:00 🎉 You can enjoy the YoMo Serverless via the command: yomo dev
$ cd yomo-app-demo
```

![YoMo Tutorial 2](/tutorial-2.png)

YoMo CLIは自動的に以下の内容の`app.go`を作成します。

```go
package main

import (
	"context"
	"fmt"
	"time"

	"github.com/yomorun/yomo/pkg/rx"
)

var printer = func(_ context.Context, i interface{}) (interface{}, error) {
	value := i.(float32)
	fmt.Println("serverless get value:", value)
	return value, nil
}

// Handler will handle data in a reactive way
func Handler(rxstream rx.RxStream) rx.RxStream {
	stream := rxstream.
		Y3Decoder("0x10", float32(0)).
		AuditTime(100 * time.Millisecond).
		Map(printer).
		StdOut()

	return stream
}
```

### 3. Build and Run

ターミナルから `yomo dev` を実行する。以下のようなメッセージが表示されるはずです。

![YoMo Tutorial 3](/tutorial-3.png)

おめでとうございます。初めてのYoMoアプリケーションを作成しました。

### Optional: Setting $GOPATH and $GOBIN

現在のセッションのみ:

```bash
export GOPATH=~/.go
export PATH=$GOPATH/bin:$PATH
```

これらの変数を恒久的に設定するには、`.zshrc` か `.bashrc` を編集する必要があります。:

For `zsh` users:

```bash
echo "export GOPATH=~/.go" >> .zshrc
echo "path+=$GOPATH/bin" >> .zshrc
```

For `bash` users:

```bash
echo 'export GOPATH=~/.go' >> .bashrc
echo 'export PATH="$GOPATH/bin:$PATH"' >> ~/.bashrc
```

<ScrollDown content="Scroll down to learn more"></ScrollDown>

</div>

<div id="tip1" className="cut_line"></div>

<div className='plate blue'>

## Demo

![yomo-arch](https://yomo.run/yomo-arch-v0.7.png)

</div>

<div id="tip1" className="cut_line"></div>

<div className='plate blue'>

## 🎯 Edge Computingに焦点を当てて

YoMoが最適です。:
- 遅延に敏感なアプリケーションの作成
- 高いネットワーク遅延やパケットロスへの対応
- ストリーム処理による連続的な高周波データへの対応
- ストリーミングサーバレスアーキテクチャによる複雑なシステムの構築
</div>

<div id="tip1" className="cut_line"></div>

<div className='plate violet'>

## 貢献

まず最初に 貢献を考えてくれてありがとう YoMoをより良いものにしてくれるのは、あなたのような人たちのおかげです。このプロジェクトに参加できる方法はたくさんあります。

- File a [bug report](https://github.com/yomorun/yomo/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D). 使用している YoMo のバージョン、OS、バグを再現するための手順などの情報を必ず記載してください。
- 新機能の提案。
- [貢献のガイドラインを読む](https://github.com/yomorun/yomo/blob/master/CONTRIBUTING.md) どのような投稿を求めているのかを知ることができます。
- また、[行動規範](https://github.com/yomorun/yomo/blob/master/CODE_OF_CONDUCT.md)を採用しています。

</div>

<div id="tip1" className="cut_line"></div>

<div className='plate blue'>

## フィードバック

ご不明な点がありましたら、お気軽に[掲示板](https://github.com/yomorun/yomo/discussions)までお越しください。ご意見をお聞かせください。

</div>

<div id="tip1" className="cut_line"></div>

<div className='plate violet'>

## License

[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

</div>

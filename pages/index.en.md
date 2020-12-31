import ScrollDown from '../components/ScrollDown'
import HeadImg from '../components/HeadImg'

# YoMo

YoMo is an open-source Streaming Serverless Framework for building low-latency edge computing applications. Built atop QUIC transport protocol and functional reactive programming interface, it makes real-time data processing reliable, secure, and easy.

<HeadImg></HeadImg>

<div className='plate violet'>

## Getting Started 👨‍💻

### 1. Install CLI

```bash
# Make sure to use $GOPATH since golang requires the plugin and the main
# application to be highly coupled
$ echo $GOPATH
```

If `$GOPATH` is not set, check here first: [Setting $GOPATH and $GOBIN](#optional-set-gopath-and-gobin).

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

YoMo CLI will automatically create an `app.go` with the following content:

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

Run `yomo dev` from the terminal. You should see the following message:

![YoMo Tutorial 3](/tutorial-3.png)

Congratulations! You have created your first YoMo application.

### Optional: Setting $GOPATH and $GOBIN

For the current session only:

```bash
export GOPATH=~/.go
export PATH=$GOPATH/bin:$PATH
```

To permanently set these variables, you need to edit `.zshrc` or `.bashrc`:

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

## 🎯 Focuses on computing at the edge

YoMo is best for:
- Making latency-sensitive applications.
- Dealing with high network latency and packet loss.
- Handling continuous high-frequency data with stream processing.
- Building complex systems with streaming serverless architecture.

</div>

<div id="tip1" className="cut_line"></div>

<div className='plate violet'>

## Contributing

First off, thank you for considering making contributions. It's people like you that make YoMo better. There are many ways in which you can participate in this project, for example:

- File a [bug report](https://github.com/yomorun/yomo/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D). Be sure to include information like what version of YoMo you are using, what your operating system is, and steps to recreate the bug.
- Suggest a new feature.
- Read our [contributing guidelines](https://github.com/yomorun/yomo/blob/master/CONTRIBUTING.md) to learn about what types of contributions we are looking for.
- We have also adopted a [code of conduct](https://github.com/yomorun/yomo/blob/master/CODE_OF_CONDUCT.md) that we expect project participants to adhere to.

</div>

<div id="tip1" className="cut_line"></div>

<div className='plate blue'>

## Feedback

If you have any questions, please feel free to come to our [discussion board](https://github.com/yomorun/yomo/discussions). Any feedback would be greatly appreciated!

</div>

<div id="tip1" className="cut_line"></div>

<div className='plate violet'>

## License

[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

</div>

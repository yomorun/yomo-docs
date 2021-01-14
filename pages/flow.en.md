# yomo-flow

## What is yomo-flow?

`yomo-flow` is a `Streaming Serverless` function, the users only need to write the business logic code in this function to process the stream data.
For example:

```go
func Handler(rxstream rx.RxStream) rx.RxStream {
	stream := rxstream.
		Y3Decoder("0x10", float32(0)).
		AuditTime(100 * time.Millisecond).
		Map(printer).
		StdOut()

	return stream
}
```

## What can yomo-flow do?

YoMo uses [Functional Reactive Programming](https://en.wikipedia.org/wiki/Functional_reactive_programming) for programming paradigm, the input parameter of `yomo-flow` is an `RxStream`, the users can use the [operators](http://reactivex.io/documentation/operators.html) in [Rx](http://reactivex.io/) to process the stream data.

![Rx](/flow/rx.png)

### Examples

#### Use [Map](http://reactivex.io/documentation/operators/map.html) to transform data

![Map](/flow/map.png)

#### Use [TakeLast](http://reactivex.io/documentation/operators/takelast.html) to take last n items

![TakeLast](/flow/takeLast.png)

## How to write yomo-flow?

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

### 2. Create a yomo-flow App

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

Congratulations! You have created your first yomo-flow.

> **BTW:** `yomo dev` automatically uses the mocking 'noise' data，`yomo run` uses the real data from `yomo-source`.

### 4. Modify the code to your business code

1) YoMo encodes the data via [Y3 Codec](https://github.com/yomorun/y3-codec-golang), the `Handler` method in `yomo-flow`, the first step is decoding the data via `Y3`, the first parameter of `Y3Decoder` is the observe `key`, the second parameter uses to store the `decode` value.

2) Use [operators](http://reactivex.io/documentation/operators.html) to process the stream data.

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

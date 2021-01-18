# yomo-zipper

## What is yomo-zipper?

`yomo-zipper` is the `workflow` in YoMo Ecosystem, you can use `yomo-zipper` to manage the sequence of [yomo-flow](/flow), and manage the [yomo-sink](/sink) which the real-time streaming data will output to.

![zipper](/zipper/zipper.png)

## What can yomo-zipper do?

`yomo-zipper` receives the data from [yomo-source](/source), and transfers it to [yomo-flow](/flow) to run the real-time streaming computing. After the computing of each [yomo-flow](/flow) in **pipeline**, the data will be output to each [yomo-sink](/sink) in **parallel**.

`yomo-zipper` connects the `yomo-source`, `yomo-flow` and `yomo-sink` in YoMo Ecosystem, you can configure and run `yomo-zipper` to experience the real-time streaming computing in YoMo. The data transmission is based on `QUIC` and the high performance encoding and decoding by [Y3 Codec](https://github.com/yomorun/y3-codec-golang).

## How to config and run yomo-zipper?

### Config yomo-zipper

The configuration of `yomo-zipper` is a `yaml` file, you can config the `name`, `host` and `port` of `yomo-zipper`, and add multiple `yomo-flow` and `yomo-sink`.

#### Example

```yaml
name: Service
host: localhost
port: 9999
flows:
  - name: Noise Serverless
    host: localhost
    port: 4242
sinks:
  - name: Mock DB
    host: localhost
    port: 4141
```

### Run yomo-zipper

#### 1. Install CLI

```bash
# Make sure to use $GOPATH since golang requires the plugin and the main
# application to be highly coupled
$ echo $GOPATH
```

If `$GOPATH` is not set, check here first: [Setting $GOPATH and $GOBIN](#optional-set-gopath-and-gobin).

```bash
$ GO111MODULE=off go get -u github.com/yomorun/yomo
$ cd $GOPATH/src/github.com/yomorun/yomo
$ make install
```

![YoMo Tutorial 1](/tutorial-1.png)

#### 2. Run yomo-zipper

Use the example in YoMo project:

```bash
$ yomo wf run example/workflow.yaml
2021/01/15 16:04:52 Running YoMo workflow...
2021/01/15 16:04:52 ✅ Listening on 0.0.0.0:9999
```

After running the above command, YoMo will start `yomo-zipper` and listen on the specified port `9999`.

> **BTW:** You can also run `yomo wf dev` to start yomo-zipper, it will automatically use the noise decibel value (from CELLA office) as `yomo-source`, for example: `yomo wf dev example/workflow.yaml`. In this case, you can ignore the step 4.

#### 3. Run yomo-flow and yomo-sink

The following are using the examples in YoMo project, you can change them to the actual `yomo-flow` and `yomo-sink` which you want to run.

Run `yomo-flow`:

```bash
$ yomo run example/flow/app.go
2021/01/15 16:10:13 Building the Serverless Function File...
2021/01/15 16:10:21 ✅ Listening on 0.0.0.0:4242
```

Run `yomo-sink`:

```bash
$ yomo run example/sink/app.go -p 4141
2021/01/15 16:13:29 Building the Serverless Function File...
2021/01/15 16:13:31 ✅ Listening on 0.0.0.0:4141
```

YoMo also provides the following examples for `yomo-sink`, you can choose one to experience a more realistic scene.

- [yomo-sink-faunadb-example](https://github.com/yomorun/yomo-sink-faunadb-example) provides an example of storing the data in `FaunaDB`.
- [yomo-sink-socketio-server-example](https://github.com/yomorun/yomo-sink-socketio-server-example) provides an example of receiving the real-time noise decibel value and use `socket.io server` to broadcast it to `Web` page.
- [yomo-sink-socket-io-example](https://github.com/yomorun/yomo-sink-socket-io-example) provides an example of receiving the noise decibel value from `socket.io server` and show it on a `React` page.

#### 4. Run yomo-source

Use [yomo-source-example](https://github.com/yomorun/yomo-source-example) as an example to send the mocking noise decibel value. You can change it to the actual `yomo-source` which you want to run.

Download [yomo-source-example](https://github.com/yomorun/yomo-source-example) to local and run the following command:

```bash
$ go run main.go
2021/01/15 16:18:10 ✅ Connected to yomo-zipper localhost:9999
2021/01/15 16:18:10 ✅ Emit 119.512955 to yomo-zipper
2021/01/15 16:18:11 ✅ Emit 82.569893 to yomo-zipper
2021/01/15 16:18:11 ✅ Emit 160.101456 to yomo-zipper
2021/01/15 16:18:11 ✅ Emit 170.802765 to yomo-zipper
2021/01/15 16:18:11 ✅ Emit 86.156288 to yomo-zipper
2021/01/15 16:18:11 ✅ Emit 114.443230 to yomo-zipper
2021/01/15 16:18:11 ✅ Emit 17.846315 to yomo-zipper
2021/01/15 16:18:11 ✅ Emit 166.903183 to yomo-zipper
```

YoMo also provides the following example:

[yomo-source-mqtt-broker-starter](https://github.com/yomorun/yomo-source-mqtt-broker-starter) provides an example of receive `MQTT` messages and connect to YoMo over `QUIC`. If you are using IoT devices based on the `MQTT` protocol, you can refer to this example to connect the MQTT messages as a `yomo-source`.

#### 5. yomo-zipper receiving data and performing real-time streaming computing

```bash
2021/01/15 16:04:52 ✅ Listening on 0.0.0.0:9999
2021/01/15 16:18:10 ✅ Connect to Noise Serverless (localhost:4242) successfully.
2021/01/15 16:18:11 ✅ Connect to Mock DB (localhost:4141) successfully.
```

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

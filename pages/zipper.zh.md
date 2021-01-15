# yomo-zipper

## yomo-zipper 是什么？

`yomo-zipper` 是 YoMo 生态的 `workflow`，您可以使用 `yomo-zipper` 编排 [yomo-flow](/flow) 的执行顺序，以及数据实时计算完之后输出给哪些 [yomo-sink](/sink)。

![zipper](/zipper/zipper.png)

## yomo-zipper 能做什么？

`yomo-zipper` 接收 [yomo-source](/source) 数据源发送的数据，并将数据传给编排串联好的 [yomo-flow](/flow)，进行实时流式计算。数据经过各个 [yomo-flow](/flow) **串行**计算之后，会**并行**输出给各个 [yomo-sink](/sink)。

`yomo-zipper` 将 YoMo 生态的 `yomo-source`、`yomo-flow` 和 `yomo-sink` 整合在一起，您可以通过配置和运行 `yomo-zipper` 体验 YoMo 全流程的实时流式计算。数据传输全程基于 `QUIC`，并使用 [Y3 Codec](https://github.com/yomorun/y3-codec-golang) 进行高性能编解码。

## 如何配置和运行 yomo-zipper？

### 配置 yomo-zipper

`yomo-zipper` 的配置文件为 `yaml` 文件，您可以配置 `yomo-zipper` 的 `name`、`host` 和 `port`，并添加多个 `yomo-flow` 和 `yomo-sink`。

#### 示例

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

### 运行 yomo-zipper

#### 1. 安装 CLI

```bash
# 请使用 $GOPATH，因为 go 语言需要 plugin 和 main 的高度耦合
$ echo $GOPATH
```

如果未设置 `$GOPATH`，请先看这一节：[设置 $GOPATH 和 $GOBIN](#optional-set-gopath-and-gobin)。

```bash
$ GO111MODULE=off go get -u github.com/yomorun/yomo
$ cd $GOPATH/src/github.com/yomorun/yomo
$ make install
```

![YoMo 教程 1](/tutorial-1.png)

#### 2. 运行 yomo-zipper

以 YoMo 项目的 example 为例：

```bash
$ yomo wf run example/workflow.yaml
2021/01/15 16:04:52 Running YoMo workflow...
2021/01/15 16:04:52 ✅ Listening on 0.0.0.0:9999
```

运行上述命令之后，YoMo 将会启动 `yomo-zipper`，并监听配置好的端口。

> **注意：** 您还可以选择通过运行 `yomo wf dev` 启动 yomo-zipper，它将自动使用 CELLA 办公室的真实噪声分贝值作为 `yomo-source`，例如：`yomo wf dev example/workflow.yaml`，您可以忽略第4步下载和运行 `yomo-source-example`。

#### 3. 运行 yomo-flow 和 yomo-sink

以下是以 YoMo 项目的 example 为例，运行 `yomo-flow` 和 `yomo-sink`。您也可以修改该步骤为您实际想运行的 `yomo-flow` 和 `yomo-sink`。

运行 `yomo-flow`：

```bash
$ yomo run example/flow/app.go
2021/01/15 16:10:13 Building the Serverless Function File...
2021/01/15 16:10:21 ✅ Listening on 0.0.0.0:4242
```

运行 `yomo-sink`：

```bash
$ yomo run example/sink/app.go -p 4141
2021/01/15 16:13:29 Building the Serverless Function File...
2021/01/15 16:13:31 ✅ Listening on 0.0.0.0:4141
```

#### 4. 运行 yomo-source

以 [yomo-source-example](https://github.com/yomorun/yomo-source-example) 为例，运行 `yomo-source` 发送模拟噪声分贝值给 `yomo-zipper`。您也可以修改该步骤为运行您实际想运行的 `yomo-source`。

当您下载 [yomo-source-example](https://github.com/yomorun/yomo-source-example) 到本地之后，可以运行以下命令启动：

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

#### 5. yomo-zipper 接收数据并执行全流程实时计算

```bash
2021/01/15 16:04:52 ✅ Listening on 0.0.0.0:9999
2021/01/15 16:18:10 ✅ Connect to Noise Serverless (localhost:4242) successfully.
2021/01/15 16:18:11 ✅ Connect to Mock DB (localhost:4141) successfully.
```

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

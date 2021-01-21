# Rx

## Rx 是什么？

`Rx` 是 [ReactiveX](http://reactivex.io/) 的简写。`ReactiveX` 是一个库，用于使用可观察（observable）序列来编写异步和 event-based 的程序。它扩展了 [observer 模式](http://en.wikipedia.org/wiki/Observer_pattern) 以支持数据和/或事件的序列，并添加了一些 `operators`，这些 `operators` 允许您以声明方式将序列组合在一起，同时将诸如 low-level 线程、同步、线程安全、并发数据结构和非阻塞 I/O 之类的问题抽象出来。

Rx 库支持几乎全部的主流编程语言，YoMo 使用 [RxGo](https://github.com/ReactiveX/RxGo) 库，并添加了部分自定义 `operators`。YoMo 以 [Functional Reactive Programming](https://en.wikipedia.org/wiki/Functional_reactive_programming) 为编程范式，旨在降低面向 `streaming` 编程的难度。

![Rx](/flow/rx.png)

## 为什么使用 Rx？

针对连续产生高频数据的场景，例如 IoT 设备24小时不间断的产生数据，需要通过流式编程对数据进行实时处理，而流式编程的学习成本较高。

`Rx` 的目标是提供一致的编程接口，帮助开发者更方便的处理异步数据流。`Rx` 提供多种 `operators`，支持对 stream 进行筛选、选择、转换、合并等操作。使用 `Rx` 您可以与操作数组等数据集合相同的，用简单、可组合的操作来处理流式数据。

```js
getDataFromNetwork()
  .skip(10)
  .take(5)
  .map(s => s + " transformed")
  .subscribe(it => { console.log("onNext => " + it) })
```

YoMo 全程使用 `QUIC` 协议传输数据，并在 [yomo-flow](/flow) 将 `QUIC Stream` 抽象为 `RxStream`，它支持 [RxGo](https://github.com/ReactiveX/RxGo) 库提供的所有 `operators`，并针对 YoMo 的场景添加了多个自定义 `operators`。

## RxStream 支持的 operators

### New Operators in YoMo

* AuditTime - ignore for given time then emit most recent item
* StdOut - print the item in standard output
* Subscribe - observe the key of streaming data via [Y3 Codec](https://github.com/yomorun/y3-codec-golang)
* Y3Decoder - trigger the callback function and decode the data while the key is observed by [Y3 Codec](https://github.com/yomorun/y3-codec-golang)

### Transforming Observables

* [Buffer](https://github.com/ReactiveX/RxGo/blob/master/doc/buffer.md) — periodically gather items from an Observable into bundles and emit these bundles rather than emitting the items one at a time
* [FlatMap](https://github.com/ReactiveX/RxGo/blob/master/doc/flatmap.md) — transform the items emitted by an Observable into Observables, then flatten the emissions from those into a single Observable
* [GroupBy](https://github.com/ReactiveX/RxGo/blob/master/doc/groupby.md) — divide an Observable into a set of Observables that each emit a different group of items from the original Observable, organized by key
* [GroupByDynamic](https://github.com/ReactiveX/RxGo/blob/master/doc/groupbydynamic.md) — divide an Observable into a dynamic set of Observables that each emit GroupedObservables from the original Observable, organized by key
* [Map](https://github.com/ReactiveX/RxGo/blob/master/doc/map.md) — transform the items emitted by an Observable by applying a function to each item
* [Marshal](https://github.com/ReactiveX/RxGo/blob/master/doc/marshal.md) — transform the items emitted by an Observable by applying a marshalling function to each item
* [Scan](https://github.com/ReactiveX/RxGo/blob/master/doc/scan.md) — apply a function to each item emitted by an Observable, sequentially, and emit each successive value
* [Unmarshal](https://github.com/ReactiveX/RxGo/blob/master/doc/unmarshal.md) — transform the items emitted by an Observable by applying an unmarshalling function to each item
* [Window](https://github.com/ReactiveX/RxGo/blob/master/doc/window.md) — apply a function to each item emitted by an Observable, sequentially, and emit each successive value

### Filtering Observables

* [Debounce](https://github.com/ReactiveX/RxGo/blob/master/doc/debounce.md) — only emit an item from an Observable if a particular timespan has passed without it emitting another item
* [Distinct](https://github.com/ReactiveX/RxGo/blob/master/doc/distinct.md)/[DistinctUntilChanged](https://github.com/ReactiveX/RxGo/blob/master/doc/distinctuntilchanged.md) — suppress duplicate items emitted by an Observable
* [ElementAt](https://github.com/ReactiveX/RxGo/blob/master/doc/elementat.md) — emit only item n emitted by an Observable
* [Filter](https://github.com/ReactiveX/RxGo/blob/master/doc/filter.md) — emit only those items from an Observable that pass a predicate test
* [Find](https://github.com/ReactiveX/RxGo/blob/master/doc/find.md) — emit the first item passing a predicate then complete
* [First](https://github.com/ReactiveX/RxGo/blob/master/doc/first.md)/[FirstOrDefault](https://github.com/ReactiveX/RxGo/blob/master/doc/firstordefault.md) — emit only the first item or the first item that meets a condition, from an Observable
* [IgnoreElements](https://github.com/ReactiveX/RxGo/blob/master/doc/ignoreelements.md) — do not emit any items from an Observable but mirror its termination notification
* [Last](https://github.com/ReactiveX/RxGo/blob/master/doc/last.md)/[LastOrDefault](https://github.com/ReactiveX/RxGo/blob/master/doc/lastordefault.md) — emit only the last item emitted by an Observable
* [Sample](https://github.com/ReactiveX/RxGo/blob/master/doc/sample.md) — emit the most recent item emitted by an Observable within periodic time intervals
* [Skip](https://github.com/ReactiveX/RxGo/blob/master/doc/skip.md) — suppress the first n items emitted by an Observable
* [SkipLast](https://github.com/ReactiveX/RxGo/blob/master/doc/skiplast.md) — suppress the last n items emitted by an Observable
* [Take](https://github.com/ReactiveX/RxGo/blob/master/doc/take.md) — emit only the first n items emitted by an Observable
* [TakeLast](https://github.com/ReactiveX/RxGo/blob/master/doc/takelast.md) — emit only the last n items emitted by an Observable

### Combining Observables

* [CombineLatest](https://github.com/ReactiveX/RxGo/blob/master/doc/combinelatest.md) — when an item is emitted by either of two Observables, combine the latest item emitted by each Observable via a specified function and emit items based on the results of this function
* [Join](https://github.com/ReactiveX/RxGo/blob/master/doc/join.md) — combine items emitted by two Observables whenever an item from one Observable is emitted during a time window defined according to an item emitted by the other Observable
* [Merge](https://github.com/ReactiveX/RxGo/blob/master/doc/merge.md) — combine multiple Observables into one by merging their emissions
* [StartWithIterable](https://github.com/ReactiveX/RxGo/blob/master/doc/startwithiterable.md) — emit a specified sequence of items before beginning to emit the items from the source Iterable
* [ZipFromIterable](https://github.com/ReactiveX/RxGo/blob/master/doc/zipfromiterable.md) — combine the emissions of multiple Observables together via a specified function and emit single items for each combination based on the results of this function

### Error Handling Operators

* [Catch](https://github.com/ReactiveX/RxGo/blob/master/doc/catch.md) — recover from an onError notification by continuing the sequence without error
* [Retry](https://github.com/ReactiveX/RxGo/blob/master/doc/retry.md)/[BackOffRetry](https://github.com/ReactiveX/RxGo/blob/master/doc/backoffretry.md) — if a source Observable sends an onError notification, resubscribe to it in the hopes that it will complete without error

### Observable Utility Operators

* [Do](https://github.com/ReactiveX/RxGo/blob/master/doc/do.md) - register an action to take upon a variety of Observable lifecycle events
* [Run](https://github.com/ReactiveX/RxGo/blob/master/doc/run.md) — create an Observer without consuming the emitted items
* [Send](https://github.com/ReactiveX/RxGo/blob/master/doc/send.md) — send the Observable items in a specific channel
* [Serialize](https://github.com/ReactiveX/RxGo/blob/master/doc/serialize.md) — force an Observable to make serialized calls and to be well-behaved
* [TimeInterval](https://github.com/ReactiveX/RxGo/blob/master/doc/timeinterval.md) — convert an Observable that emits items into one that emits indications of the amount of time elapsed between those emissions
* [Timestamp](https://github.com/ReactiveX/RxGo/blob/master/doc/timestamp.md) — attach a timestamp to each item emitted by an Observable

### Conditional and Boolean Operators

* [All](https://github.com/ReactiveX/RxGo/blob/master/doc/all.md) — determine whether all items emitted by an Observable meet some criteria
* [Amb](https://github.com/ReactiveX/RxGo/blob/master/doc/amb.md) — given two or more source Observables, emit all of the items from only the first of these Observables to emit an item
* [Contains](https://github.com/ReactiveX/RxGo/blob/master/doc/contains.md) — determine whether an Observable emits a particular item or not
* [DefaultIfEmpty](https://github.com/ReactiveX/RxGo/blob/master/doc/defaultifempty.md) — emit items from the source Observable, or a default item if the source Observable emits nothing
* [SequenceEqual](https://github.com/ReactiveX/RxGo/blob/master/doc/sequenceequal.md) — determine whether two Observables emit the same sequence of items
* [SkipWhile](https://github.com/ReactiveX/RxGo/blob/master/doc/skipwhile.md) — discard items emitted by an Observable until a specified condition becomes false
* [TakeUntil](https://github.com/ReactiveX/RxGo/blob/master/doc/takeuntil.md) — discard items emitted by an Observable after a second Observable emits an item or terminates
* [TakeWhile](https://github.com/ReactiveX/RxGo/blob/master/doc/takewhile.md) — discard items emitted by an Observable after a specified condition becomes false

### Mathematical and Aggregate Operators

* [Average](https://github.com/ReactiveX/RxGo/blob/master/doc/average.md) — calculates the average of numbers emitted by an Observable and emits this average
* [Concat](https://github.com/ReactiveX/RxGo/blob/master/doc/concat.md) — emit the emissions from two or more Observables without interleaving them
* [Count](https://github.com/ReactiveX/RxGo/blob/master/doc/count.md) — count the number of items emitted by the source Observable and emit only this value
* [Max](https://github.com/ReactiveX/RxGo/blob/master/doc/max.md) — determine, and emit, the maximum-valued item emitted by an Observable
* [Min](https://github.com/ReactiveX/RxGo/blob/master/doc/min.md) — determine, and emit, the minimum-valued item emitted by an Observable
* [Reduce](https://github.com/ReactiveX/RxGo/blob/master/doc/reduce.md) — apply a function to each item emitted by an Observable, sequentially, and emit the final value
* [Sum](https://github.com/ReactiveX/RxGo/blob/master/doc/sum.md) — calculate the sum of numbers emitted by an Observable and emit this sum

### Operators to Convert Observables

* [Error](https://github.com/ReactiveX/RxGo/blob/master/doc/error.md) — return the first error thrown by an observable
* [Errors](https://github.com/ReactiveX/RxGo/blob/master/doc/errors.md) — return all the errors thrown by an observable
* [ToMap](https://github.com/ReactiveX/RxGo/blob/master/doc/tomap.md)/[ToMapWithValueSelector](https://github.com/ReactiveX/RxGo/blob/master/doc/tomapwithvalueselector.md)/[ToSlice](https://github.com/ReactiveX/RxGo/blob/master/doc/toslice.md) — convert an Observable into another object or data structure

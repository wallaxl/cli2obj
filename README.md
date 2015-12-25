# cli2obj

### A simple cli args parser with multi format

> 多种格式的命令行解析器

A good util for cli application develope

## install

```
npm install cli2obj
```

## usage

### include

```
var cli = require("cli2obj")
```

该类库支持4种命令行格式

> This lib has 4 format args parser.

### 横线两参数
> Line type

CLI like `node app -p 80 --host google.com name foo`

```javascript
var args = cli.parseLine()
```

This result is

```json
{"p": 80, "host": "google.com", "name": "foo"}
```

### 等号赋值
> Equal type

CLI like `node app -port=80 --dir=/root name=foo`

```javascript
var args = cli.parseEqual()
```

This result is

```json
{"port": 80, "dir": "/root", "name": "foo"}
```

### 按位置键值对

> Flat type

CLI like `node app install foobar`

if you want to parse "operate" as "install" and "name" as "foobar",

use this

```javascript
var args = cli.parseFlat(["operate", "name"])
```

This result is

```json
{"operate": "install", "name": "foo"}
```

### 以上3种混合
> Mix type

CLI mix all format like `node app install --dir=/root -log foo.log t=dev`,

and you want to parse "operate" as "install",

use this

```javascript
var args = cli.parseMix(["operate"])
```

This result is

```json
{"operate": "install", "dir": "/root", "log": "foo.log", "t": "dev"}
```

## Others

本类库为本人业余时间开发，难免存在各种错漏bug，如有发现bug或有更好的建议，欢迎向本人提出，互相交流。[Email](mailto://wallax@126.com)

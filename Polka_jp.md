![Polkaっぽい画像](./polka.png)
<h1 align="center">Polka</h1>

<div align="center">このマイクロウェブサーバが速すぎてあなたは踊るでしょう！:dancers:</div>



Polka は、非常に最小限でハイパフォーマンスな Express.js の代替です。そう、あなたが思っている通り Express.js はすでに超高速でそこまで大きくありません :thinking: &mdash; しかし Polka は（どういうわけか）改善の余地があったことを示しています！

基本的に、Polka は、ルーティング、ミドルウェア、およびサブアプリケーションのサポートが追加された単なる [native HTTP server](https://nodejs.org/dist/latest-v9.x/docs/api/http.html#http_class_http_server) です。それだけ！:tada:

そしてもちろん、必須の箇条書き:

- 単純なアプリケーションの場合、Expressより33〜50％高速
- あなたがすでに知っていて大好きな Express middleware を含むミドルウェアのサポート
- ほぼ同一のアプリケーションAPIとルートパターンの定義
- Polka の場合最大90LOC、[このルーター](https://github.com/lukeed/trouter)を含めても120LOC

##インストール

```npm
$ npm install --save polka
```

```yarn
$ yarn add --dev polka
```

##使用法

```
const polka = require('polka');

function one(req, res, next) {
  req.hello = 'world';
  next();
}

function two(req, res, next) {
  req.foo = '...needs better demo 😔';
  next();
}

polka()
  .use(one, two)
  .get('/users/:id', (req, res) => {
    console.log(`~> Hello, ${req.hello}`);
    res.end(`User: ${req.params.id}`);
  })
  .listen(3000, err => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
  });
```

##API

Polka は [Trouter](https://github.com/lukeed/trouter) を拡張しています。つまり、APIも継承します!

###polka(options)

Polka〜 のインスタンスを返します！

####options.server

Type:`Server`

Polkaインスタンスが`[ハンドラー]()`をアタッチする必要があるカスタムのインスタンス化されたサーバー。これは、アプリケーションの他の場所でサーバーを初期化し、新しい`http.Server`を作成する代わりにPolkaでサーバーを使用する場合に役立ちます。

Polkaは、`[polka.listen]()`が呼び出されたときに*のみ*サーバーを更新します。その際、サーバが`options.server`を介して提供されていなかった場合 Polka は`[http.Server]()`を作成します。
>重要 : サーバーが提供されていない限り、`server`キーは`polka.listen`が呼び出されるまで`undefined`になります。

####options.onError

Type: `Function`

ミドルウェアがエラーをスローするたびに catch-all errorHandler が実行されます。デフォルトの動作が気に入らない場合は、これを変更してください。

その引数は`（err, req, res, next）`です。ここで、`err`はミドルウェアによってスローされた`String`または`Error`です。
>注意 : `next()`を使用して、自分で特定のエラーを回避してください!<br />
>あなたは特定の例外が、他の場所で処理されるか安全に無視するか選択することができます。<br />
>そうしないとレスポンスが終了しません!

####options.onNoMatch

Type: `Function`

`404` status や `Not found` responseのルート定義が一致しなかった場合の処理を変更することができます。

その引数は`(req, res)`でレスポンスを終了する必要があります。

###use(base,...fn)

[middleware(s)]()やsub-application(s)をサーバーに接続します。これらは、ルート処理の前に実行されます。

#####重要: `base`のパス名が指定されている場合、同じ`use()`ブロック内の全ての関数は、`req, path`が`base`のパスと一致した場合`のみ`実行します。

####base

Type: `String`
Default: `undefined`

次の middleware(s) または sub-application をマウントする必要がある base パス。

####fn

Type: Function|Array

一度に1つ以上の関数を渡すことができます。各関数には、標準化された`(req, res, next)`引数が必要です。

sub-application に `base` パスを命名することで sub-application を渡すこともできます。

詳細については、`[Middleware]()`. [Express' middleware examples]()の例を参照してください。

###parse(req)

Returns: `Object` or `undefined`

これはv0.5.0以降での@ polka / urlモジュールのエイリアスです。ほとんどすべての場合において、変化はありません。

しかし、どんな理由であれ `parseurl` を素早く変更できます。

```
const app = polka();
app.parse = require('parseurl');
//=> 完了!
```

###listen()

Returns: `Polka`

`[http.Server]()`を初めて起動 ( または作成 ) したとき、すべての引数は変更なしで`[server.listen]()`に直接引き渡されます。

`v0.5.0`以降、このメソッドは Promise を返さなくなりました。代わりに、現在の Polka インスタンスが直接返され、連鎖操作が可能になります。
```
// 0.5.0以前ではこれができませんでした。
const { server, handler } = polka().listen();

// またはこれ!
const app = polka().listen(PORT, onAppStart);

app.use('users', require('./users'))
  .get('/', (req, res) => {
    res.end('Pretty cool!');
  });
```
###handler(req, res, parsed)

メインのPolka `IncomingMessage` ハンドラー。すべてのリクエストを受信し、受信したURLを既知のルートと照合しようとします。

`req.url` がすぐに一致しない場合、Polkaは `req.url` の `[base]()` パスに一致するサブアプリケーションまたはミドルウェアグループを探します。
>Note: サブアプリケーション内で定義されたミドルウェアはすべて、メインアプリ ( 別名、グローバル ) ミドルウェアの*後* 、サブアプリケーションのルートハンドラーの*前* に実行されます。

ループの終わりに、ミドルウェアがまだ応答を終了していない（またはエラーをスローしている）場合、ルートハンドラーが見つかった場合は実行されます。それ以外の場合は、 `(404) Not found` が返され、`[options.onNoMatch]()`で構成できます。

####req

Type: `IncomingMessage`

####res

Type: `ServerResponse`

####parsed

Type: `Object`

オプションで、パースされた [URL]() オブジェクトを提供します。入ってきたパスをすでにパースしている場合に便利です。それ以外の場合、`[app.parse]()` ( 別名 `[parseurl]()` ) がデフォルトで実行されます。

##Routing

ルートは、アプリケーションがさまざまな HTTP メソッドとエンドポイントにどのように応答するかを定義するために使用されます。
>Expressからお越しの場合、ここに新しいものはありません!<br />
>ただし、いくつかのパターンの変更については、`[比較]()` を確認してください。

####基本
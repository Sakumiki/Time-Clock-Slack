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

####use(base,...fn)
[middleware(s)]()やsub-application(s)をサーバーに接続します。これらは、ルート処理の前に実行されます。

#####重要: `base`のパス名が指定されている場合、同じ`use()`ブロック内の全ての関数は、`req,path`が`base`のパスと一致した場合`のみ`実行します。

#####base
Type: `String`
Default: `undefined`

次の middleware(s) または sub-application をマウントする必要がある base パス。

#####fn
Type: Function|Array

一度に1つ以上の関数を渡すことができます。各関数には、標準化された`(req, res, next)`引数が必要です。

sub-application に `base` パスを命名することで sub-application を渡すこともできます。

詳細については、`[Middleware]()`. [Express' middleware examples]()の例を参照してください。

####parse(req)
Returns: `Object` or `undefined`

80 250 123
68 71 90
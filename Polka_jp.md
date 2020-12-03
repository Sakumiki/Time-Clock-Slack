![Polkaっぽい画像](./polka.png)
<h1 align="center">Polka</h1>

<div style="text-align: center;">このマイクロウェブサーバが速すぎてあなたは踊るでしょう！:dancers:</div>



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

その引数は`（err、req、res、next）`です。ここで、`err`はミドルウェアによってスローされた`String`または`Error`です。
>注意 : 
>
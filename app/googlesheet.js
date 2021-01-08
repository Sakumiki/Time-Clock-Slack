const { GoogleSpreadsheet } = require('google-spreadsheet');
// 認証情報jsonファイルを読み込む
const CREDIT = require('./googlesheet.json')
// スプレッドシートキー
const spreasheetKey = '1fjl0_LtZFlDpCOrZojpUIXkRkOillB6tcgsGvrCOr4Y'

const getSpreadsheetTitleByKey = async () => {
    // 一般ユーザーに公開していないスプレッドシートへアクセスしたい場合, 作成したサービスアカウントに対し
    // 閲覧権限を与えておく.
    const doc = new GoogleSpreadsheet(spreasheetKey);
    
    // サービスアカウントによる認証
/*    await doc.useServiceAccountAuth({
        client_email: CREDIT.client_email,
        private_key: CREDIT.private_key,
    });
*/
    await doc.useServiceAccountAuth(CREDIT); // 認証
    // スプレッドシートの情報を読み込みを行い, タイトルを取得
    await doc.loadInfo(); 
    console.log(doc.title);
}
module.exports = {
    getSpreadsheetTitleByKey
};


# NextAgendaDuplicator

Google Docs 用の Google Apps Script ライブラリです。
既存の Google Docs のコピーを、次回の日付をタイトルに付与した上で同じ階層に作成します。

# セットアップ方法

## NextAgendaDuplicator の配置

1. Google Drive の任意の位置に「新規＞Google Apps Script」で新しいスクリプトを作成（ここではタイトル `NextAgendaDuplicator` として作成）
2. 作成したスクリプトを開き、`next-agenda-duplicator.gs` を配置
3. スクリプトエディタのメニューから「ファイル＞版を管理」で最初のバージョンを作成
4. 「ファイル＞プロジェクトのプロパティ」でプロジェクトキーをメモしておく
5. 必要に応じて共有設定する

## アジェンダに機能追加

1. 機能を追加したいアジェンダ（ドキュメント）を開く
2. メニューの「ツール＞スクリプトエディタ」を実行
3. 開いたスクリプトエディタのメニュー「リソース＞ライブラリ」から先程メモした `NextAgendaDuplicator` のプロジェクトキーを入力して紐付ける
4. ライブラリを利用してメニューに機能を追加する

```js
function onOpen() {
  DocumentApp.getUi()
    .createMenu('スクリプト')
    .addItem('次回のアジェンダを作る', 'createNextAgenda')
    .addToUi();
}

function createNextAgenda() {
  NextAgendaDuplicator.createNextAgenda();
}
```

5. 保存してスクリプトエディタを閉じ、ドキュメントを再読込する

# 使い方

1. 次回の会議の日付を話し合って決めたら、Docsに記入
2. 記入した次回の日付を範囲選択して、メニューの「スクリプト＞次回のアジェンダを作る」を実行

`@date` を文末に付けるとその行の日付を新しい日付に置換します。（雑な正規表現のため不完全）

```
日時: 2017-04-21 @date
```
# まなび計算チャレンジ

小学校1〜6年生向けの計算練習Webアプリです。学年ごとの計算問題に挑戦して、その場で答え合わせができます。

## 使い方

`index.html` をブラウザーで開くと使えます。学年を選ぶと、その学年の新しい問題が出題されます。

- 1〜4年生：たし算、ひき算、かけ算、わり算
- 5年生：小数の計算
- 6年生：分数のたし算、ひき算（答えは `分子/分母` の形で入力できます）

## GitHub Pagesで公開

`main` ブランチに push すると、GitHub Actions が自動で GitHub Pages にデプロイします。リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に設定してください。デプロイ後のURLは、Actionsの実行結果または **Settings → Pages** で確認できます。

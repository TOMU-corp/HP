google.load("feeds", "1");
// 読込処理
function initialize() {
// 読み込むRSSのURLを設定する。
var feed = new google.feeds.Feed("http://couboutomu.blog.fc2.com/?xml");
// 取得件数を引数に設定。
feed.setNumEntries(5);
// 読込実行
feed.load(function(result) {
// 正常に読み込めたか判定
if (!result.error) {
// idがrssAreaのオブジェクトを取得
var container = document.getElementById("rssArea");
// 要素の削除
// （※ここでrssArea内の要素をすっきりきれいに削除。）
while ( container.firstChild ) {
container.removeChild( container.lastChild );
}
// 取得した記事情報が0件の場合は、記事情報が無い旨を出力して終了。
if (result.feed.entries.length == 0) {
var p = document.createElement("p");
var pStr = "現在、記事情報はありません。";
p.appendChild(document.createTextNode(pStr));
container.appendChild(p);
return;
}
// dlタグを生成
var dl = document.createElement("dl");
// 取得した記事情報分処理を実行
for (var i = 0; i < result.feed.entries.length; i++) {
// 取得した記事情報を取得。
var entry = result.feed.entries[i];
var dt = document.createElement("dt");
var dd = document.createElement("dd");
var a = document.createElement("a");
// 日付の書式設定
// （※ここで取得した記事情報から日付を取得。）
var date = new Date(entry.publishedDate);
var dateY = date.getFullYear();
var dateM = date.getMonth() + 1;
var dateD = date.getDate();
var dtStr = dateY + "年" + dateM + "月" + dateD + "日";
// dtの設定
dt.appendChild(document.createTextNode(dtStr));
// aの設定
// （※ここで取得した記事情報のURLを取得してリンク先に設定。）
a.setAttribute("href", entry.link);
a.setAttribute("target", "_blank");
// （※ここで取得した記事情報のタイトルを取得して、リンクを設定。）
a.appendChild(document.createTextNode(entry.title));
// ddの設定
dd.appendChild(a);
dl.appendChild(dt);
dl.appendChild(dd);
}
container.appendChild(dl);
}
});
}
// 作成した関数（initialize）が読込時に呼び出されるようにコールバック関数として登録。
google.setOnLoadCallback(initialize);

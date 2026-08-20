$.getJSON(
	"http://merce.co.jp/rss/rss-tomu.php?callback=?",
	{ rss_num : 5 },
	function(json) {
		//alert('b');
		//出力先要素(ID指定)を変数に格納
		var container = document.getElementById("feed");	      
		var htmlstr = "";

		//フィードの分だけループ
		for (var i = 0; i < json.length; i++) {
			//日付を表示
			htmlstr += '<dt>' + json[i]['date'] + '</dt>';
			//タイトルとリンクを表示
			htmlstr += '<dd><a href="' + json[i]['link'] + '" target="_blank">' + json[i]['desc'] + '</a></dd>';
		}
		// 要素に出力
		container.innerHTML = htmlstr;
	}
);

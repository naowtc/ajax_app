// memoという関数を定義しましょう。
// window.addEventListener("load", memo);で、既読機能と同様にwindow（ページ）をload（読み込み）時に実行されるように記述。
function memo() {
  // getElementByIdを用いて「投稿する」ボタンの情報を取得
  const submit = document.getElementById("submit");
  // addEventListenerを使用して、投稿するボタンを「click」した場合に実行される関数を定義
  submit.addEventListener("click", (e) => {
    // FormDataを使用して、メモ投稿のフォームに入力された情報を送信
    const formData = new FormData(document.getElementById("form"));
    // 非同期通信リクエスト送信を実装するために必要なXMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // openメソッドを使用して、リクエストの内容を引数へ追記。HTTPメソッドはPOST、パスは/posts、非同期通信はtrueと設定
    XHR.open("POST", "/posts", true);
    // 返却されるデータ形式はJSONになるので、jsonを指定
    XHR.responseType = "json";
    // sendを使用して、メモ投稿のフォームに入力された情報を送信
    XHR.send(formData);
    // サーバーサイドの処理が成功すればデータが返却されるので、そのデータを受け取り、「HTMLのメモ部分」を描画する処理を記述
    XHR.onload = () => {
      // 既読機能の実装時と同じように200以外のHTTPステータスが返却された場合の処理
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // itemは、レスポンスとして返却されたメモのレコードデータを取得しています
      const item = XHR.response.post;
      // listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      // 次にformTextを取得する理由は、メモの入力フォームをリセットするためです。この処理が終了した時に、入力フォームの文字は入力されたままになってしまうため、リセットする必要があります。ここではリセット対象の要素であるcontentという要素を取得
      const formText = document.getElementById("content");
      // 「メモとして描画する部分のHTML」を定義しています。HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画される
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // listという要素に対して、insertAdjacentHTMLでHTMLを追加します。第一引数にafterendを指定することで、要素listの直後に挿入できます。
      list.insertAdjacentHTML("afterend", HTML);
      // メモの入力フォームに入力されたままの文字」はリセットされます。正確には、空の文字列に上書きされるような仕組み
      formText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);
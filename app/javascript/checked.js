// メモをクリックした時に、何らかの処理を行う
function check() { 
  // 表示されているすべてのメモを取得している
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // メモをクリックした場合に実行する処理を定義している
    post.addEventListener("click", () => { 
    // ここにクリックした時に行う「何らかの処理」を記述していく
    // どのメモをクリックしたのか、カスタムデータを利用して取得している
     const postId = post.getAttribute("data-id");
    // エンドポイントを呼び出すために、XMLHttpRequestを使用してHTTPリクエストを行う
    // Ajaxに必要なオブジェクトを生成している
     const XHR = new XMLHttpRequest();
    //  openメソッドを使用してリクエストの詳細を指定
     XHR.open("GET", `/posts/${postId}`, true);
    //  レスポンスはJSON形式のデータを指定
     XHR.responseType = "json";
    //  XMLHttpRequestで定義されているsendメソッドで、リクエストを送信
     XHR.send();
     // レスポンスを受け取った時の処理を記述する
     XHR.onload = () => {
      if (XHR.status != 200) {
        // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // 処理を終了している
        return null;          
      }
      // レスポンスされたデータを変数itemに代入している
      const item = XHR.response.post;
      if (item.checked === true) {
        // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
        post.setAttribute("data-check", "true");
      } else if (item.checked === false) {
        // 未読状態であれば、カスタムデータを削除している
        post.removeAttribute("data-check");
      }
    };
   });
  }); 
}
setInterval(check, 1000);
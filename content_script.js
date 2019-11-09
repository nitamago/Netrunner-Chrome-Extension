// popup.jsからのメッセージがここにくるはず
chrome.runtime.onMessage.addListener(function(msg) {
  console.log("Reloaded");
  observer.disconnect();
  init();
});

// 動的ページが読み込まれるまで待つ
window.addEventListener("load", main, false);

function main(e) {
    const jsInitCheckTimer = setInterval(jsLoaded, 1000);
    
    function jsLoaded() {
        if (document.getElementsByClassName('card-zoom')[0] != null) {
            clearInterval(jsInitCheckTimer);
        }

	init();
    }
}

function init(){
  // For play
  // card-zoomクラスのノード取得
  target = document.getElementsByClassName('card-zoom')[0];
  // Mutation Observer設定
  observer = new MutationObserver(records => {
    // 変化が発生したときの処理を記述

    // 無限ループが起きないよう、ObserverをOFFにする
    observer.disconnect();

    // imgノードを挿入
    src = "https://res.cloudinary.com/hvtn93q21/image/upload/v1573265136/Netrunner/cards/";
    preview = $(".card-zoom").children(".card-preview");
    img_clone = preview.children("img").clone();
    src_name = img_clone.attr("src");
    if (src_name != null) {
      png_name = src_name.split("/")[3];
      console.log(src + png_name);
      img_clone.attr("src", src + png_name);
      preview.append(img_clone);
    }
  
    // ObserverをONにする
    observer.observe(target, {
      childList: true
    });
  });
  
  // DOM監視開始
  observer.observe(target, {
    childList: true
  });
}
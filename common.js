// ==UserScript==
// @name         One's Closet用共通処理
// @namespace    http://tampermonkey.net/
// @version      2024-12-04
// @description  try to take over the world!
// @author       Shigekatsu Sasaki
// @match        https://ones-closet.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ones-closet.com
// @grant        none
// ==/UserScript==

window.jp = {
    relivewear: {
        tm: {
            /**
             * メッセージを表示する。
             * @param メッセージ
             * @param panelWidth パネル幅(px)
             */
            showMessage: function(message, panelWidth = 400){
                let $el = $("#tm_message");

                if ($el.length) {
                    $el.text(message);
                    $el.show();
                }
                else {
                    const left = $(window).width() / 2 - panelWidth / 2 + "px";

                    $el = $("<div id='tm_message' class='alert alert-info' role='alert'></div>");
                    $el.css("position", "absolute")
                    .css("width", panelWidth + "px")
                    .css("top", "5px")
                    .css("left", left)
                    .css("z-index", "10000");
                    $el.text(message);

                    $("body").append($el);
                }
            },

            /**
             * メッセージを非表示にする。
             */
            hideMessage: function(){
                $("#tm_message").hide();
            },

            /**
             * 確認パネルを表示する。
             * @param メッセージ
             * @param callbackMap ボタン名とボタンクリック時に実行するコールバック関数の連想配列
             * @param panelWidth パネル幅(px)
             */
            confirm: function(message, callbackMap, panelWidth = 400){
                /*
<div id='tm_confirmdialog' class='panel panel-default' style='position:absolute;width:400px;top:5px;left:400px;font-size:90%;z-index:10000;'>
  <div class='panel-heading'>Chrome拡張によるカスタム処理実行</div>
  <div class='panel-body'>
    <span id='tm_confirmdialog_message'>自動集計を実行しますか？</span>
    <div style='text-align:right;'>
      <button type='button' id='tm_button_execute1' class='btn btn-sm btn-primary' style='margin-right:0.5em;'>はい（すべて）</button>
      <button type='button' id='tm_button_execute2' class='btn btn-sm btn-primary' style='margin-right:0.5em;'>はい（法人のみ）</button>
      <button type='button' id='tm_button_cancel' class='btn btn-sm btn-default'>キャンセル</button>
    </div>
  </div>
</div>
                */
                let $panel = $("#tm_confirmdialog");

                if ($panel.length) {
                    $("#tm_confirmdialog_message").text(message);

                    $panel.fadeTo(1000, 1); // 1000msで透明度100%まで
                }
                else {
                    const left = $(window).width() / 2 - panelWidth / 2 + "px";

                    $panel = $("<div id='tm_confirmdialog' class='panel panel-default'></div>");
                    $panel.css("position", "absolute")
                    .css("width", panelWidth + "px")
                    .css("top", "5px")
                    .css("left", left)
                    .css("font-size", "90%")
                    .css("z-index", "10000")
                    .css("display", "none");

                    const $panel_heading = $("<div class='panel-heading'>Chrome拡張によるカスタム処理実行</div>");
                    const $panel_body = $("<div class='panel-body'></div>");

                    const $panel_message = $("<span id='tm_confirmdialog_message'></span>");
                    const $div = $("<div></div>")
                    .css("text-align", "right")
                    .css("margin-top", "1em");

                    // callbackMapをループしてボタン名とコールバック関数を設定
                    let i = 1;
                    for (let key in callbackMap) {
                        const id = `tm_button_execute${i}`;
                        const $button = $(`<button type='button' id='${id}' class='btn btn-sm btn-primary'>${key}</button>`)
                            .css("margin-right", "0.5em");

                        $button.on("click", function(){
                            $("#tm_confirmdialog").hide();
                            callbackMap[key].call();
                        });

                        $div.append($button);
                    }

                    const $button_cancel = $("<button type='button' id='tm_button_cancel' class='btn btn-sm btn-default'>キャンセル</button>");
                    $button_cancel.on("click", function(){
                        $("#tm_confirmdialog").hide();
                    });

                    $div.append($button_cancel);

                    $panel_body.append($panel_message);
                    $panel_body.append($div);

                    $panel.append($panel_heading);
                    $panel.append($panel_body);

                    $("body").append($panel);

                    $panel.fadeTo(500, 1); // 500msで透明度100%まで

                    $("#tm_confirmdialog_message").text(message);
                }
            },
        }
    }
};

// ==UserScript==
// @name         One's Closet EC売上（半自動）
// @namespace    http://tampermonkey.net/
// @version      2024-12-04
// @description  try to take over the world!
// @author       Shigekatsu Sasaki
// @match        https://ones-closet.com/app/webRetail.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ones-closet.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // $.fn.jQuery => 1.11.0
    // 日付の処理にはmoment.jsを利用
    // @see https://qiita.com/taizo/items/3a5505308ca2e303c099

    const f1 = function(){
        setTimeout(function(){
            // えんぴつアイコンのクリックで明細を編集可に
            $("button.mod_dtl").each(function(i, el){
                $(el).click();
            });

            setTimeout(function(){
                // 拠点コードの変更（拠点名の取得のAjaxが動作するためchangeを発火）
                $("input.dtl_locationCode").each(function(i, el){
                    const $el = $(el);

                    if ($el.val() == "007") {
                        $el.val("001");
                        $el.change();
                    }
                });

                // 保存ボタンクリックは手動で
            }, 500);
        }, 500);
    };

    setTimeout(function(){
        jp.relivewear.tm.confirm(
            "自動拠点変更処理（007→001）を実行しますか？",
            {
                "はい": f1
            }
        );
    }, 500);
})();
// ==UserScript==
// @name         One's Closet EC売上（全自動）
// @namespace    http://tampermonkey.net/
// @version      2024-12-04
// @description  try to take over the world!
// @author       Shigekatsu Sasaki
// @match        https://ones-closet.com/app/webRetail.php?bulk
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ones-closet.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // $.fn.jQuery => 1.11.0
    // 日付の処理にはmoment.jsを利用
    // @see https://qiita.com/taizo/items/3a5505308ca2e303c099

    const f1 = function(){
        $("button.mod_dtl").each(function(i, el){
            $(el).click();
        });

        setTimeout(function(){
            $("input.dtl_locationCode").each(function(i, el){
                const $el = $(el);

                if ($el.val() == "007") {
                    $el.val("001");
                    $el.change();
                }
            });

            setTimeout(function(){
                $("#detail_save").click();

                setTimeout(function(){
                    if ($(".alert_message").is(":visible")) {
                        // 自動取得処理が実行中です。しばらくしてから再試行してください。
                    }
                    else {
                        window.close();
                    }

                }, 500);
            }, 1000);

        }, 500);
    };

    setTimeout(f1, 500);
})();
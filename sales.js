// ==UserScript==
// @name         One's Closet売上伝票
// @namespace    http://tampermonkey.net/
// @version      2025-04-16
// @description  try to take over the world!
// @author       Shigekatsu Sasaki
// @match        https://ones-closet.com/app/sales.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ones-closet.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // $.fn.jQuery => 1.11.0
    // 日付の処理にはmoment.jsを利用
    // @see https://qiita.com/taizo/items/3a5505308ca2e303c099

    const f1 = function() {
        // 検索ボタンクリック
        setTimeout(function(){
            $("#list_query").click();

            $("#query_field").val("billDate"); // 請求日付
            $("#query_field").change();

            setTimeout(function(){
                $("#query_way").val("between"); // の間の
                $("#query_way").change();

                setTimeout(function(){
                    // 前月の月初～月末
                    // const dateFrom = moment().add(-1, "months").startOf("month").format("YYYY/MM/DD");
                    // const dateTo = moment().add(-1, "months").endOf("month").format("YYYY/MM/DD");

                    // 当月の月初～前日
                    const dateFrom = moment().startOf("month").format("YYYY/MM/DD");
                    const dateTo = moment().add(-1, "days").format("YYYY/MM/DD");

                    $("#queryCondition_date").val(dateFrom);
                    $("#queryCondition_to").val(dateTo);

                    // 表示ボタンをクリック
                    $("#list_queryExec").click();
                }, 500);
            }, 500);
        }, 500);

        let count = 0;
        // 明細が表示されるまで待機
        const timerId = setInterval(function(){
            if ($("#list_result tbody tr").length) {
                $("#list_exp").click(); // 書き出しアイコンのクリック
                $("a.list_exportFormat")
                    .filter(function(i, el){
                        return $(el).text() == "営業部売上データ集計用"
                    })
                    .click();

                // CSVのダウンロードのダイアログが出てくるので手動で保存

                clearInterval(timerId);

                setTimeout(function(){
                    alert("書き出し処理 完了");
                }, 500);
            }

            // 500*100ミリ秒（50秒）待っても明細が表示されない場合は処理中断
            if (100 < count++) {
                alert("画面遷移に時間がかかりすぎたため処理を中断します。");
                clearInterval(timerId);
            }
        }, 500);
    };

    setTimeout(function(){
        jp.relivewear.tm.confirm(
            "自動書き出しを実行しますか？",
            {
                "はい（営業部売上データ集計）": f1,
            },
            600
        );
    }, 1000);
})();

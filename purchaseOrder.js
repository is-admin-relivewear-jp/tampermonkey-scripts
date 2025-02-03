// ==UserScript==
// @name         One's Closet発注伝票
// @namespace    http://tampermonkey.net/
// @version      2025-02-03
// @description  try to take over the world!
// @author       Shigekatsu Sasaki
// @match        https://ones-closet.com/app/purchaseOrder.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ones-closet.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // $.fn.jQuery => 1.11.0
    // 日付の処理にはmoment.jsを利用
    // @see https://qiita.com/taizo/items/3a5505308ca2e303c099

    const f1 = function() {
        // 表示ボタンクリック
        setTimeout(function(){
            $("#list_disp").click();

            // 残のある伝票クリック
            setTimeout(function(){
                $("#list_remain").click();
            }, 500);
        }, 500);

        let count = 0;
        // 明細が表示されるまで待機
        const timerId = setInterval(function(){
            if ($("#list_result tbody tr").length) {
                $("#list_exp").click(); // 書き出しアイコンのクリック
                $("a.list_exportFormat")
                    .filter(function(i, el){
                        return $(el).text() == "需要予測・発注・在庫管理シート用"
                    })
                    .click(); // 「需要予測・発注・在庫管理シート用」の選択

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

    const f2 = function() {
        // 表示ボタンクリック
        setTimeout(function(){
            $("#list_disp").click();

            // 残のある伝票クリック
            setTimeout(function(){
                $("#list_remain").click();
            }, 500);
        }, 500);

        let count = 0;
        // 明細が表示されるまで待機
        const timerId = setInterval(function(){
            if ($("#list_result tbody tr").length) {
                $("#list_exp").click(); // 書き出しアイコンのクリック
                $("a.list_exportFormat")
                    .filter(function(i, el){
                        return $(el).text() == "納品予定表用"
                    })
                    .click(); // 「納品予定表用」の選択

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

    const f3 = function() {
        setTimeout(function(){
            // 検索ボタンクリック
            $("#list_query").click();

            setTimeout(function(){
                // 検索条件追加の＋を2回クリック
                $("#add_queryCondition").click();
                $("#add_queryCondition").click();

                setTimeout(function(){
                    // 明細：商品コード
                    $("#query_field").val("goodsCode");
                    $("#query_fieldB").val("goodsCode");
                    $("#query_fieldC").val("goodsCode");

                    // 値
                    $("#query_word").val("TPC-007");
                    $("#query_wordB").val("SPL-002");
                    $("#query_wordC").val("SPM-003");

                    // である
                    $("#query_way").val("equal");
                    $("#query_wayB").val("equal");
                    $("#query_wayC").val("equal");

                    // もしくは
                    $("#query_plusB").val("or");
                    $("#query_plusC").val("or");

                    setTimeout(function(){
                        // 表示ボタンクリック
                        $("#list_queryExec").click();
                    }, 500);
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
                        return $(el).text() == "納品予定表用"
                    })
                    .click(); // 「納品予定表用」の選択

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
                "はい（需要予測・発注・在庫管理シート）": f1,
                "はい（納品予定表）": f2,
                "はい（α自主回収）": f3,
            },
            600
        );
    }, 1000);
})();
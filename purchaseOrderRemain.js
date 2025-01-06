// ==UserScript==
// @name         One's Closet発注残集計
// @namespace    http://tampermonkey.net/
// @version      2025-01-06
// @description  try to take over the world!
// @author       Shigekatsu Sasaki
// @match        https://ones-closet.com/app/purchaseOrderRemain.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ones-closet.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // $.fn.jQuery => 1.11.0
    // 日付の処理にはmoment.jsを利用
    // @see https://qiita.com/taizo/items/3a5505308ca2e303c099

    // 発注残集計（入荷予定日別）
    const f1 = function(){
        // 集計種別
        $("#condition_typeA").val("barcode"); // バーコード別
        $("#condition_typeB").val("date"); // 伝票日付別
        $("#condition_typeC").val("expectedDate"); // 入荷予定日別

        // 集計日付
        const to = moment().add(180, "day"); // 今日+180日
        $("#condition_to").val(to.format("YYYY/MM/DD"));

        // 集計開始ボタンクリック
        // （画面遷移はしないためURLに変化なし）
        setTimeout(function(){
            jp.relivewear.tm.showMessage("発注残集計（入荷予定日別）集計中...");

            $("#condition_start").click();
        }, 100);

        let count = 0;
        // タイマーで戻るボタンが表示されるまで待機
        const timerId = setInterval(function(){
            if ($("#result_return").is(":visible")) {
                jp.relivewear.tm.hideMessage();

                $("#list_exp").click(); // 書き出しアイコンのクリック
                $("#result_export").click(); // 書き出しメニューの選択
                $("#result_return").click(); // 戻るボタンのクリック

                // CSVのダウンロードのダイアログが出てくるので手動で保存

                setTimeout(f2, 500);

                clearInterval(timerId);
            }

            // 500*100ミリ秒（50秒）待っても戻るボタンが表示されない場合は処理中断
            if (100 < count++) {
                alert("画面遷移に時間がかかりすぎたため処理を中断します。");
                clearInterval(timerId);
            }
        }, 500);
    };

    // 発注残集計（伝票別）
    const f2 = function(){
        // 集計種別
        $("#condition_typeA").val("invoiceNo"); // 伝票番号別
        $("#condition_typeB").val("barcode"); // バーコード別
        $("#condition_typeC").val("subSupplier"); // 工場別

        // 集計日付
        const to = moment().add(-1, "day"); // 今日-1
        $("#condition_to").val(to.format("YYYY/MM/DD"));

        // 集計開始ボタンクリック
        // （画面遷移はしないためURLに変化なし）
        setTimeout(function(){
            jp.relivewear.tm.showMessage("発注残集計（伝票別）集計中...");

            $("#condition_start").click();
        }, 100);

        let count = 0;
        // タイマーで戻るボタンが表示されるまで待機
        const timerId = setInterval(function(){
            if ($("#result_return").is(":visible")) {
                jp.relivewear.tm.hideMessage();

                $("#list_exp").click(); // 書き出しアイコンのクリック
                $("#result_export").click(); // 書き出しメニューの選択
                $("#result_return").click(); // 戻るボタンのクリック

                // CSVのダウンロードのダイアログが出てくるので手動で保存

                clearInterval(timerId);

                setTimeout(function(){
                    alert("集計処理 完了");
                }, 500);
            }

            // 500*100ミリ秒（50秒）待っても戻るボタンが表示されない場合は処理中断
            if (100 < count++) {
                alert("画面遷移に時間がかかりすぎたため処理を中断します。");
                clearInterval(timerId);
            }
        }, 500);
    };

    setTimeout(function(){
        jp.relivewear.tm.confirm(
            "自動集計を実行しますか？",
            {
                "はい": f1
            }
        );
    }, 1000);
})();
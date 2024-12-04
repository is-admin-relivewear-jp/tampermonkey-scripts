// ==UserScript==
// @name         One's Closet在庫集計
// @namespace    http://tampermonkey.net/
// @version      2024-12-04
// @description  try to take over the world!
// @author       Shigekatsu Sasaki
// @match        https://ones-closet.com/app/stockReport.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ones-closet.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // $.fn.jQuery => 1.11.0
    // 日付の処理にはmoment.jsを利用
    // @see https://qiita.com/taizo/items/3a5505308ca2e303c099

    /**
     * 「はい（すべて）」クリック時の処理
     */
    const f1 = function(){
        // 集計種別
        $("#condition_type").val("locationGoodsColorSize"); // 拠点別商品別色サイズ別

        // 集計日付
        const to = moment().add(-1, "day"); // 今日-1
        $("#condition_to").val(to.format("YYYY/MM/DD"));

        // 集計開始ボタンクリック
        // （画面遷移はしないためURLに変化なし）
        setTimeout(function(){
            jp.relivewear.tm.showMessage("在庫集計 集計中...");

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

            // 1000*300ミリ秒（300秒）待っても戻るボタンが表示されない場合は処理中断
            if (300 < count++) {
                alert("画面遷移に時間がかかりすぎたため処理を中断します。");
                clearInterval(timerId);
            }
        }, 1000);
    };

    /**
     * 「はい（法人のみ）」クリック時の処理
     */
    const f2 = function(){
        // 集計種別
        $("#condition_type").val("locationGoodsColorSize"); // 拠点別商品別色サイズ別

        // 集計日付
        const to = moment().add(0, "day"); // 当日日付
        $("#condition_to").val(to.format("YYYY/MM/DD"));

        // 拠点指定をクリック
        $("#button_locationSpecify").click();

        // 拠点追加の＋ボタンを2回クリック
        $("#add_location").click();
        $("#add_location").click();

        const els = $(".location_code");
        $(els[0]).val("BB001");
        // $(els[1]).val("BB002");

        // 集計開始ボタンクリック
        // （画面遷移はしないためURLに変化なし）
        setTimeout(function(){
            jp.relivewear.tm.showMessage("在庫集計 集計中...");

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

            // 1000*300ミリ秒（300秒）待っても戻るボタンが表示されない場合は処理中断
            if (300 < count++) {
                alert("画面遷移に時間がかかりすぎたため処理を中断します。");
                clearInterval(timerId);
            }
        }, 1000);
    };

    setTimeout(function(){
        jp.relivewear.tm.confirm(
            "自動集計を実行しますか？",
            {
                "はい（すべて）": f1,
                "はい（法人のみ）": f2
            }
        );
    }, 1000);
})();
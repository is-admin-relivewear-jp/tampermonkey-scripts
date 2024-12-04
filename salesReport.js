// ==UserScript==
// @name         One's Closet売上集計
// @namespace    http://tampermonkey.net/
// @version      2024-12-04
// @description  try to take over the world!
// @author       Shigekatsu Sasaki
// @match        https://ones-closet.com/app/salesReport.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ones-closet.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // $.fn.jQuery => 1.11.0
    // 日付の処理にはmoment.jsを利用
    // @see https://qiita.com/taizo/items/3a5505308ca2e303c099

    // 売上集計（拠点別3ヶ月）
    const f1 = function(){
        // 集計対象の卸売上を選択解除
        $("#invoice_sales").removeClass("btn-primary").addClass("btn-default");
        // 集計対象のオンライン売上を選択
        $("#invoice_online").removeClass("btn-default").addClass("btn-primary");

        // 集計種別
        $("#condition_typeA").val("location"); // 拠点別
        $("#condition_typeB").val("month"); // 伝票日付（月）別
        $("#condition_typeC").val("barcode"); // バーコード別

        // 集計日付
        const now = moment();
        const from = moment().date(1).month(now.month() - 3); // 3か月前の1日
        const to = moment().date(1).month(now.month() - 1).endOf("month"); // 1ヶ月前の末日
        $("#condition_from").val(from.format("YYYY/MM/DD"));
        $("#condition_to").val(to.format("YYYY/MM/DD"));

        // 集計開始ボタンクリック
        // （画面遷移はしないためURLに変化なし）
        setTimeout(function(){
            jp.relivewear.tm.showMessage("売上集計（拠点別3ヶ月）集計中...");

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

    // 売上集計（拠点別直近30日）
    const f2 = function(){
        // 集計対象の卸売上を選択解除
        $("#invoice_sales").removeClass("btn-primary").addClass("btn-default");
        // 集計対象のオンライン売上を選択
        $("#invoice_online").removeClass("btn-default").addClass("btn-primary");

        $("#condition_typeA").val("location"); // 拠点別
        $("#condition_typeB").val("month"); // 伝票日付（月）別
        $("#condition_typeC").val("barcode"); // バーコード別

        const now = moment();
        const from = moment().add(-1, "month"); // 前月の今日
        const to = moment().add(-1, "day"); // 今月の今日-1
        $("#condition_from").val(from.format("YYYY/MM/DD"));
        $("#condition_to").val(to.format("YYYY/MM/DD"));

        // 集計開始ボタンクリック
        // （画面遷移はしないためURLに変化なし）
        setTimeout(function(){
            jp.relivewear.tm.showMessage("売上集計（拠点別直近30日）集計中...");

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

                setTimeout(f3, 500);

                clearInterval(timerId);
            }

            // 500*100ミリ秒（50秒）待っても戻るボタンが表示されない場合は処理中断
            if (100 < count++) {
                alert("画面遷移に時間がかかりすぎたため処理を中断します。");
                clearInterval(timerId);
            }
        }, 500);
    };

    // 売上集計（得意先別3ヶ月）
    const f3 = function(){
        // 集計対象の卸売上を選択
        $("#invoice_sales").removeClass("btn-default").addClass("btn-primary");
        // 集計対象のオンライン売上を選択解除
        $("#invoice_online").removeClass("btn-primary").addClass("btn-default");

        // 集計種別
        $("#condition_typeA").val("customer"); // 得意先別
        $("#condition_typeB").val("month"); // 伝票日付（月）別
        $("#condition_typeC").val("barcode"); // バーコード別

        // 集計日付
        const now = moment();
        const from = moment().date(1).month(now.month() - 3); // 3か月前の1日
        const to = moment().date(1).month(now.month() - 1).endOf("month"); // 1ヶ月前の末日
        $("#condition_from").val(from.format("YYYY/MM/DD"));
        $("#condition_to").val(to.format("YYYY/MM/DD"));

        // 集計開始ボタンクリック
        // （画面遷移はしないためURLに変化なし）
        setTimeout(function(){
            jp.relivewear.tm.showMessage("売上集計（得意先別3ヶ月）集計中...");

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

                setTimeout(f4, 500);

                clearInterval(timerId);
            }

            // 500*100ミリ秒（50秒）待っても戻るボタンが表示されない場合は処理中断
            if (100 < count++) {
                alert("画面遷移に時間がかかりすぎたため処理を中断します。");
                clearInterval(timerId);
            }
        }, 500);
    };

    // 売上集計（得意先別直近30日）
    const f4 = function(){
        // 集計対象の卸売上を選択
        $("#invoice_sales").removeClass("btn-default").addClass("btn-primary");
        // 集計対象のオンライン売上を選択解除
        $("#invoice_online").removeClass("btn-primary").addClass("btn-default");

        // 集計種別
        $("#condition_typeA").val("customer"); // 得意先別
        $("#condition_typeB").val("month"); // 伝票日付（月）別
        $("#condition_typeC").val("barcode"); // バーコード別

        const now = moment();
        const from = moment().add(-1, "month"); // 前月の今日
        const to = moment().add(-1, "day"); // 今月の今日-1
        $("#condition_from").val(from.format("YYYY/MM/DD"));
        $("#condition_to").val(to.format("YYYY/MM/DD"));

        // 集計開始ボタンクリック
        // （画面遷移はしないためURLに変化なし）
        setTimeout(function(){
            jp.relivewear.tm.showMessage("売上集計（得意先別直近30日）集計中...");

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
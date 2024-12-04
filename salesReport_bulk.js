// ==UserScript==
// @name         One's Closet売上集計（クロスモール自動拠点変更）
// @namespace    http://tampermonkey.net/
// @version      2024-12-04
// @description  try to take over the world!
// @author       Shigekatsu Sasaki
// @match        https://ones-closet.com/app/salesReport.php?bulk
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ones-closet.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // $.fn.jQuery => 1.11.0
    // 日付の処理にはmoment.jsを利用
    // @see https://qiita.com/taizo/items/3a5505308ca2e303c099

    //======================================== 検索条件（書き換え可） ========================================
    const BULK_COUNT = 10; // 一括実行件数
    const DATE_FROM = "2024/09/01"; // 集計日付（開始）
    const DATE_TO = "2024/10/31"; // 集計日付（終了）
    const LOCATION_CODE = "007"; // 拠点
    const WEBSITE_CODE = "001"; // webショップ
    const GOODS_CODE = "INU-001"; // 商品
    const COLOR_CODE = ""; // 色
    const SIZE_CODE = ""; // サイズ
    //======================================== 検索条件（書き換え可） ========================================

    /**
     * 一括実行
     * @param メッセージ
     * @param callbackMap ボタン名とボタンクリック時に実行するコールバック関数の連想配列
     */
    const tmBulkExecute = function(message, els){
        /*
<div id='tm_bulkexecutedialog' class='panel panel-default' style='position:absolute;width:400px;top:5px;left:400px;font-size:90%;z-index:10000;'>
  <div class='panel-heading'>Chrome拡張によるカスタム処理実行</div>
  <div class='panel-body'>
    <span id='tm_bulkexecutedialog_message'>自動集計を実行しますか？</span>
    <div style='text-align:right;'>
      <select id='tm_bulkexecutedialog_select' class='form-control' style='width:200px;'>
        <option value='0'>1-10件目</option>
        <option value='10'>11-20件目</option>
      </select>
      <button type='button' id='tm_button_execute1' class='btn btn-sm btn-primary' style='margin-right:0.5em;'>はい（すべて）</button>
      <button type='button' id='tm_button_cancel' class='btn btn-sm btn-default'>キャンセル</button>
    </div>
  </div>
</div>
        */
        let $panel = $("#tm_bulkexecutedialog");

        if ($panel.length) {
            $("#tm_bulkexecutedialog_message").text(message);

            $panel.fadeTo(1000, 1); // 1000msで透明度100%まで
        }
        else {
            const width = 400;
            const left = $(window).width() / 2 - width / 2 + "px";

            $panel = $("<div id='tm_bulkexecutedialog' class='panel panel-default'></div>");
            $panel.css("position", "absolute")
              .css("width", width + "px")
              .css("top", "5px")
              .css("left", left)
              .css("font-size", "90%")
              .css("z-index", "10000")
              .css("display", "none");

            const $panel_heading = $("<div class='panel-heading'>Chrome拡張によるカスタム処理実行</div>");
            const $panel_body = $("<div class='panel-body'></div>");

            const $panel_message = $("<span id='tm_bulkexecutedialog_message'></span>");
            const $div = $("<div></div>")
              .css("text-align", "right")
              .css("margin-top", "1em");

            const $select = $("<select id='tm_bulkexecutedialog_select' class='form-control'></select>")
              .css("width", "200px");

            const count = Math.ceil(els.length / BULK_COUNT);

            for (let i = 0 ; i < count ; i++) {
                const $option = $("<option></option>")
                  .attr("value", i * BULK_COUNT)
                  .text((i * BULK_COUNT + 1) + "-" + (i * BULK_COUNT + BULK_COUNT) + "件目");

                $select.append($option);
            }

            $div.append($select);

            const $button = $("<button type='button' id='tm_button_execute' class='btn btn-sm btn-primary'>一括実行</button>")
              .css("margin-right", "0.5em");

            $button.on("click", function(){
                const option_value = $("#tm_bulkexecutedialog_select").val() - 0;

                for (let i = 0 ; i < BULK_COUNT ; i++) {
                    if (els[option_value + i]) {
                        els[option_value + i].submit();
                    }
                }
            });

            $div.append($button);

            const $button_cancel = $("<button type='button' id='tm_button_cancel' class='btn btn-sm btn-default'>キャンセル</button>");
            $button_cancel.on("click", function(){
                $("#tm_bulkexecutedialog").hide();
            });

            $div.append($button_cancel);

            $panel_body.append($panel_message);
            $panel_body.append($div);

            $panel.append($panel_heading);
            $panel.append($panel_body);

            $("body").append($panel);

            $panel.fadeTo(500, 1); // 500msで透明度100%まで

            $("#tm_bulkexecutedialog_message").text(message);
        }
    };

    // 売上集計の集計開始
    const f1 = function(){
        $("#tm_confirmdialog").hide();


        // 集計対象の卸売上を選択解除
        $("#invoice_sales").removeClass("btn-primary").addClass("btn-default");
        // 集計対象のオンライン売上を選択
        $("#invoice_online").removeClass("btn-default").addClass("btn-primary");

        // 集計種別
        $("#condition_typeA").val("invoiceNo"); // 伝票番号別
        $("#condition_typeB").val("color"); // 色別
        $("#condition_typeC").val("size"); // サイズ別

        // 集計日付
        /*
        const now = moment();
        const from = moment().date(1).month(now.month() - 1); // 1か月前の1日
        const to = moment().date(1).month(now.month() - 1).endOf("month"); // 1ヶ月前の末日
        $("#condition_from").val(from.format("YYYY/MM/DD"));
        $("#condition_to").val(to.format("YYYY/MM/DD"));
        */
        $("#condition_from").val(DATE_FROM);
        $("#condition_to").val(DATE_TO);

        // 拠点
        $("#condition_fromlocationCode").val(LOCATION_CODE).change();
        $("#condition_tolocationCode").val(LOCATION_CODE).change();

        // webショップ
        $("#condition_fromwebSiteCode").val(WEBSITE_CODE).change();
        $("#condition_towebSiteCode").val(WEBSITE_CODE).change();

        // 商品
        $("#condition_fromgoodsCode").val(GOODS_CODE).change();
        $("#condition_togoodsCode").val(GOODS_CODE).change();

        // 色
        $("#condition_fromcolorCode").val(COLOR_CODE).change();
        $("#condition_tocolorCode").val(COLOR_CODE).change();

        // サイズ
        $("#condition_fromsizeCode").val(SIZE_CODE).change();
        $("#condition_tosizeCode").val(SIZE_CODE).change();

        // 集計開始ボタンクリック
        // （画面遷移はしないためURLに変化なし）
        setTimeout(function(){
            jp.relivewear.tm.showMessage("売上集計集計中...");

            $("#condition_start").click();
        }, 500);

        let count = 0;
        // タイマーで戻るボタンが表示されるまで待機
        const timerId = setInterval(function(){
            if ($("#result_return").is(":visible")) {
                jp.relivewear.tm.hideMessage();

                let els = $(".result_nameA form");

                for (let i = 0 ; i < els.length ; i++) {
                    // URLの書き換え
                    els[i].action += "?bulk";
                }

                clearInterval(timerId);

                tmBulkExecute("一括で実行する範囲を選択してください。（Chromeのポップアップを「許可する」必要があります）", els);
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
            `クロスモール自動拠点変更処理を実行します（${GOODS_CODE}${COLOR_CODE}${SIZE_CODE}）。集計開始ボタンで集計を開始してください。`,
            {
                "集計開始": f1
            }
        );
    }, 1000);
})();
function isSetBccSync(id, kind, url) 
{
    // ml_templ_idは選択された値、ml_templ_kindは固定でその他を指定
    var postData = {ml_templ_id : id, ml_templ_kind : kind};
    var retval;

    // 後から文言だけ表示されてもUI的によく分からないので、非同期にはせず同期処理とする。
    // タイムアウトは3秒(ms)
    $.ajax({
        type: 'POST',
        url: url,
        data : postData,
        dataType : 'json',
        async : false,
        timeout: 3000,
        success: function(result) {
            retval = result;
        },
        error: function(data) {
            retval = false;
        },
    });

    return retval;
}

// 申し送り事項の一括入力処理
// 2度押し防止フラグを初期化
var doAjaxTakeOverNoteFlg = false;
function execBulkInsertForTakeOverNote(url)
{
    // エラー初期化
    $('#notCheckId').removeClass('ycMdErrMsg');
    document.getElementById("notCheckId").innerHTML = "";

    // 2度押し防止フラグが"true"の場合、通信を行わない
    if (doAjaxTakeOverNoteFlg == true) {
        return;
    } else {
        doAjaxTakeOverNoteFlg = true;
    }

    var postData = {};
    postData['allTakeOverNotesText'] = document.getElementById("allTakeOverNotesText").value;
    postData['csrf'] = $('[name=csrf]').val();
    $.ajax({
        type: 'post',
        url:  url,
        data: postData,
        success: function(data){
            // レスポンスから","を外し、配列に変換
            var resData = data.split(',');
            // 異常
            if (resData[0] == 'NG') {
                // レスポンスから"="を外し、配列に変換
                var errItem = resData[1];

                $('#notCheckId').addClass('ycMdErrMsg');
                document.getElementById("notCheckId").innerHTML = "<p><strong>" + errItem + "<\/strong><\/p>";

                dateValid = "error";
                window.scroll(0,0);

                // 正常の場合
            } else {
                // チェックが付いている&空である申し送り事項に対して一括入力処理を適応
                var checkCount = $("select[name='SearchRecord']").val();
                for (var i = 0; i < checkCount; i++) {
                    if ($('#orderCheck' + i).prop('checked')) {
                        var target = $('#takeOverNote' + i);
                        if (target.val() === "") {
                            target.val($('#allTakeOverNotesText').val());
                        }
                    }
                }
            }
            doAjaxTakeOverNoteFlg = false;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // エラー時の処理
            doAjaxTakeOverNoteFlg = false;
        }
    });
};
function GetParams() {
    DeleteParams();
    var strData = {
        rptType: "getparam"
    };

    $.ajax({
        url: "Class/Ajax/AjaxParams.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson, textStatus) {
            AfterGetParams(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + " " + XMLHttpRequest.status + " " + errorThrown);
        }
    });
}
function AfterGetParams(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {
            RenderParams(responseJson);
        }
        else {
            RenderSearchFail(GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        document.getElementById('txtError').innerText = "no data";
    }
}

function RenderParams(responseJson) {
    document.getElementById('picturePath').innerText = responseJson.Params[0]['PICTURE_PATH'];
    document.getElementById('versionControl').innerText = responseJson.Params[0]['VERSION_CONTROL'];
    document.getElementById('manualPath').innerText = responseJson.Params[0]['MANUAL_PATH'];

}
function RenderSearchFail(strText) {
    document.getElementById('txtError').innerText = strText;
}

function DeleteParams() {
    document.getElementById('picturePath').innerText = "";
    document.getElementById('versionControl').innerText = "";
    document.getElementById('manualPath').innerText = "";
    document.getElementById('txtError').innerText = "";
}

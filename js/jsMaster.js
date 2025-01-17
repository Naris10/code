$(document).ready(function () {
    const userInfoElement = document.getElementById('UserInfo');
    const userId = sessionStorage.getItem("userId");
    const username = sessionStorage.getItem("username");

    if (userInfoElement) {
        userInfoElement.innerText = userId + "/" + username;
    }

    if (!userId || !username || userInfoElement.innerText === "null/null") {
        accessdenied(); 
        return;
    }

    getContact(); 
    getManual(); 

    highlightActiveNav();

});


function getContact() {
    var strData = {
        rptType: "getcontact"
    };

    $.ajax({
        url: "Class/Ajax/AjaxMaster.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterContact(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :getContact " + XMLHttpRequest.error);
        }
    });
}

function AfterContact(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {
            RenderAsContact(responseJson)
        }
        else {
            sweetAlert("Error function : AfterContact details  " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterContact no data.");
    }
}

function RenderAsContact(data) {
    const container = document.getElementById('DevContact');
    if (!container) {
        sweetAlert('DevContact : Container element not found!');
        return;
    }
    data.ResultTable.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.className = 'mb-1';

        const link = document.createElement('a');
        link.className = 'link text-decoration-none contact-name';
        link.href = entry.LINKCONTACT;
        link.target = '_blank';

        const div = document.createElement('div');
        div.id = entry.NID;

        const span = document.createElement('span');
        span.textContent = entry.NAME;

        div.appendChild(span);
        link.appendChild(div);
        listItem.appendChild(link);

        container.appendChild(listItem);
    });

}

//----------------------------get Manual------------------------------//
function getManual() {
    var strData = {
        rptType: "getmanual"
    };

    $.ajax({
        url: "Class/Ajax/AjaxMaster.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterGetManual(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :getManual" + XMLHttpRequest.error);
        }
    });
}

function AfterGetManual(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {
            RenderManualList(responseJson);
        }
        else {
            sweetAlert("Error function : AfterGetManual details  " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterGetManual no data.");
    }
}

function RenderManualList(jsonData) {
    const container = document.getElementById('ManualList'); // Ensure this ID matches your HTML

    // Check if container exists
    if (!container) {
        sweetAlert('ManualList : Container element not found!');
        return;
    }

    // Render the list
    jsonData.ResultTable.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'mb-1';

        const link = document.createElement('a');
        link.href = item.LINK || '#'; // Use '#' if the LINK is empty
        link.textContent = item.NAME;
        link.className = 'text-decoration-none manual-list';

        listItem.appendChild(link);
        container.appendChild(listItem);
    });
}

/*----------------------Logout-----------------*/

function login(userId, username) {
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("username", username);
    window.location.href = 'HomePage.aspx';
}


/*----------------------accessdenied-----------------*/

function accessdenied() {
    sessionStorage.setItem("username", "null");
    sessionStorage.setItem("userId", "null");
    window.location.href = 'accessdenied.aspx';
}


/*--------------------------- navber---------------------------------------------*/

const navMapping = {
    home: ['home.aspx', '/'],      
    product: ['product.aspx', 'productdetails.aspx'],  
    aboutus: ['about.aspx'],   
};

function setActive(selectedItem) {
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.classList.remove('active');
    });

    if (selectedItem) {
        selectedItem.classList.add('active');
    }
}

function highlightActiveNav() {
    const currentPath = window.location.pathname.toLowerCase().split('?')[0];
    console.log("Current Path:", currentPath);

    let activeLink = null;

    
    for (const [menuId, paths] of Object.entries(navMapping)) {
        if (paths.some(path => currentPath.endsWith(path))) {
            activeLink = document.getElementById(menuId); 
            break;
        }
    }

   
    if (activeLink) {
        setActive(activeLink);
    } else {
        console.warn("No matching nav link found for the current page:", currentPath);
        const defaultLink = document.getElementById('home'); 
        setActive(defaultLink);
    }
}

document.addEventListener('DOMContentLoaded', highlightActiveNav);


/*---------------------------insert comment at master page ---------------------*/

function InsertCommentMS(event) {

    if (event) event.preventDefault();

    // Your logic to handle the comment submission
    const commentMS = document.getElementById('txtInputCommentMS').value;
    if (commentMS.trim() === "") {
        alert("Please enter a comment.");
        return;
    }

    let UserID = sessionStorage.getItem("userId");
    if (!UserID) {
        sweetAlert("Error function :InsertComment error : Do not have User ID in sessionStorage.");
        return;
    }
    CallAjaxInsertCommentMS("", UserID, commentMS, "N", "");
}


function CallAjaxInsertCommentMS(ProjectID, UserID, Comment, ReplyFlg, ReplyCommentID) {
    var strData = {
        rptType: "insertcomment",
        strProjectID: ProjectID,
        strUserID: UserID,
        strComment: Comment,
        strPage: "Master",
        strReplyFlg: ReplyFlg,
        strReplyCommentID: ReplyCommentID
    };


    $.ajax({
        url: "Class/Ajax/AjaxMaster.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterCallAjaxInsertCommentMS(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :CallAjaxInsertComment " + XMLHttpRequest.error);
        }
    });

}

function AfterCallAjaxInsertCommentMS(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {


            document.getElementById("txtInputCommentMS").value = "";
            sweetAlert("Sent comment !!");

        }
        else {
            sweetAlert("Error function : AfterGetProjectFeedback details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterGetProjectFeedback no data.");
    }
}


/*-------------------Model------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    // ฟังก์ชันจัดการ serviceModal
    var serviceModal = document.getElementById('serviceModal');
    if (serviceModal) {
        var modalInstance = new bootstrap.Modal(serviceModal);
        var serviceButton = document.getElementById('service');

        if (serviceButton) {
            serviceButton.addEventListener('click', function () {
                modalInstance.show();
            });
        }
    }
});

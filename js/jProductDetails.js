$(document).ready(function () {

    getProjectDetails();

    getProjectFeedback();

    getComment();

});

//----------------------------getProjectID------------------------------//

function getProjectDetails() {
    let ProjectID = sessionStorage.getItem("ProjectID");
    if (ProjectID){
        var strData = {
            rptType: "getprojectdetails",
            strProjectID: ProjectID,
        };

  
        $.ajax({
            url: "Class/Ajax/AjaxProductDetails.ashx",
            data: strData,
            type: "GET",
            dataType: "json",
            success: function (responseJson) {

                AfterGetProjectDetails(responseJson);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                sweetAlert(XMLHttpRequest + "  Error function :getProjectDetails " + XMLHttpRequest.error);
            }
        });

   }else {
        alert("Error function :getProjectDetails no ProjectID.");
    }
 
}

function AfterGetProjectDetails(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            RenderProjectDetails(responseJson);
        }
        else {
            sweetAlert("Error function : AfterGetProjectDetails details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterGetProjectDetails no data.");
    }
}


function RenderProjectDetails(responseJson) {
    const projectDetails = responseJson.ResultTable[0];

    document.getElementById('NameProject').innerText = projectDetails['Projectname'];
    document.getElementById('ProjectType').innerText = projectDetails['AppType'];
    document.getElementById('KPI').innerText = projectDetails['KPI'];

    const reductTime = Number(projectDetails['ReductTime']);
    if (!isNaN(reductTime)) {
        document.getElementById('ReduceTime').innerText = reductTime.toLocaleString('en-US');
    } else {
        document.getElementById('ReduceTime').innerText = projectDetails['ReductTime']; // แสดงค่าเดิมถ้าไม่ใช่ตัวเลข
    }

    document.getElementById('Desc').innerText = projectDetails['Desc1'];
    document.getElementById('Incharge').innerText = projectDetails['Incharger'];
    document.getElementById('RelationDiv').innerText = projectDetails['RelationDiv'];

    const ProductID = projectDetails['ProjectID'];
    GetPicturePath(ProductID);

    // Render manual link
    GetLink(responseJson);
}



/*---------------------------------GetPicturePath--------------------------*/
//function GetPicturePath(ProductID) {
//    if (ProductID) {
//        RenderPicture(ProductID);
//    }
//    else {
//        RenderNoPictures();
//    }
//}
//function RenderPicture(ProductID) {
//    setImageWithFallback("PictureIcon", ProductID, "_Icon.png")
//    setImageWithFallback("Picture_01", ProductID, "_01.png")
//    setImageWithFallback("Picture_02", ProductID, "_02.png")
//    setImageWithFallback("Picture_03", ProductID, "_03.png")
//    setImageWithFallback("Picture_04", ProductID, "_04.png")
//    initializeModal();
//}

//function setImageWithFallback(elementId, ProductID, PictureNo) {
//    const picturePath = document.getElementById("Picturepath").getAttribute("value");
//    const noPicture = `${picturePath}/no_picture.png`;
//    const imgElement = document.getElementById(elementId);
//    if (picturePath) {
//        imgElement.setAttribute("src", picturePath + "/" + ProductID + PictureNo);
        

//    } else {
//        imgElement.setAttribute("src", noPicture);
//    }
//    imgElement.onerror = () => {
//        imgElement.setAttribute("src", noPicture);
//    };
//}

//function RenderNoPictures() {
//    const picturePath = document.getElementById("Picturepath").getAttribute("value");
//    const noPicture = `${picturePath}/no_picture.png`;
//    document.getElementById("PictureIcon").setAttribute("src", noPicture);
//    document.getElementById("Picture_01").setAttribute("src", noPicture);
//    document.getElementById("Picture_02").setAttribute("src", noPicture);
//    document.getElementById("Picture_03").setAttribute("src", noPicture);
//    document.getElementById("Picture_04").setAttribute("src", noPicture);
//}

function GetPicturePath(ProductID) {
    if (ProductID) {
        RenderPicture(ProductID);
    } else {
        RenderNoPictures();
    }
}

function RenderPicture(ProductID) {
    setImageWithFallback("PictureIcon", ProductID, "_Icon.png");
    setImageWithFallback("Picture_01", ProductID, "_01.png");
    setImageWithFallback("Picture_02", ProductID, "_02.png");
    setImageWithFallback("Picture_03", ProductID, "_03.png");
    setImageWithFallback("Picture_04", ProductID, "_04.png");
    initializeModal();
}

function setImageWithFallback(elementId, ProductID, PictureNo) {
    const picturePath = document.getElementById("Picturepath").getAttribute("value");
    const imgElement = document.getElementById(elementId);

    if (picturePath) {
        const pictureSrc = `${picturePath}/${ProductID}${PictureNo}`;
        imgElement.setAttribute("src", pictureSrc);

        imgElement.onerror = () => {
            imgElement.style.display = "none"; 
        };

        imgElement.style.display = "block";
    } else {
        imgElement.style.display = "none"; 
    }
}

function RenderNoPictures() {
    document.getElementById("PictureIcon").style.display = "none";
    document.getElementById("Picture_01").style.display = "none";
    document.getElementById("Picture_02").style.display = "none";
    document.getElementById("Picture_03").style.display = "none";
    document.getElementById("Picture_04").style.display = "none";
}

/*------------------------------RenderLink-------------------------------*/

function GetLink(responseJson) {
    const DashboardLink = responseJson.ResultTable[0]['DashboardLink'];
    const AppInstallLink = responseJson.ResultTable[0]['AppInstallLink'];
    const ProjectID = responseJson.ResultTable[0]['ProjectID'];
    const ManualPath = document.getElementById("Manualpath").getAttribute("value");

    const ManualApplication = `${ManualPath}/${ProjectID}/01.Manual_Application`;
    const ManualDashboard = `${ManualPath}/${ProjectID}/02.Manual_Dashboard`;


    if (ManualPath) {
   
       
        document.getElementById("ManualDashboard").setAttribute("href", ManualDashboard);
        document.getElementById("ManualApplication").setAttribute("href", ManualApplication);

        document.getElementById("Dashboard").setAttribute("href", DashboardLink);
        document.getElementById("Install").setAttribute("href", AppInstallLink);
        RenderProjectLink(DashboardLink,"Dashboard")
        RenderProjectLink(AppInstallLink, "Install")
  
    } else {
        $('#ManualDashboard').prop('disabled', true);
        $('#ManualApplication').prop('disabled', true);
    }

}

function RenderProjectLink(Path, ElementID) {
    const element = document.getElementById(ElementID);

    if (Path) {
        element.setAttribute("href", Path);  
        element.classList.remove('disabled'); 
        element.style.pointerEvents = 'auto'; 
    } else {
        element.setAttribute("href", "#");  
        element.classList.add('disabled'); 
        element.style.pointerEvents = 'none';  
    }
}
/*=============================SendScoreFeedback=========================*/

function SendScoreFeedback(score) {
    let ProjectID = sessionStorage.getItem("ProjectID");
    let UserID = sessionStorage.getItem("userId");
    if (!ProjectID) {
        sweetAlert("  Error function :SendScoreFeedback error : Do not have Project ID in sessionStorage.");
        return;
    }

    if (!score.value) {
        sweetAlert("  Error function :SendScoreFeedback error : no score.");
        return;
    }

    if (!UserID) {
        sweetAlert("  Error function :SendScoreFeedback error : no user ID in sessionStorage.");
        return;
    }

        var strData = {
            rptType: "insertscore",
            strScore: score.value,
            strProjectID: ProjectID,
            strUserID: UserID
        };
        $.ajax({
            url: "Class/Ajax/AjaxProductDetails.ashx",
            data: strData,
            type: "GET",
            dataType: "json",
            success: function (responseJson) {

                AfterSendScoreFeedback(responseJson);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                sweetAlert(XMLHttpRequest + "  Error function :SendScoreFeedback " + XMLHttpRequest.error);
            }
        });

}


function AfterSendScoreFeedback(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            sweetAlert("Send Feedback successful!");
            getProjectFeedback();
        }
        else {
            sweetAlert("Error function : AfterSendScoreFeedback details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        sweetAlert("Error function : AfterSendScoreFeedback no data.");
    }
}

/*==============================getProjectFeedback=========================*/
function getProjectFeedback() {
    let ProjectID = sessionStorage.getItem("ProjectID");
    if (ProjectID) {
        var strData = {
            rptType: "getprojectfeedback",
            strProjectID: ProjectID,
        };


        $.ajax({
            url: "Class/Ajax/AjaxProductDetails.ashx",
            data: strData,
            type: "GET",
            dataType: "json",
            success: function (responseJson) {

                AfterGetProjectFeedback(responseJson);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                sweetAlert(XMLHttpRequest + "  Error function :getProjectFeedback " + XMLHttpRequest.error);
            }
        });

    } else {
        alert("Error function :getProjectDetails no ProjectID.");
    }

}

function AfterGetProjectFeedback(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            RenderProjectFeedback(responseJson);
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

function RenderProjectFeedback(responseJson) {
    const score = responseJson.ResultTable[0]['Score']; // Get the score from the response


    // Loop through the stars and set their color based on the score
    for (let i = 1; i <= 5; i++) {
        const star = document.getElementById(`Start${i}`);
        if (i <= score) {
            star.style.color = 'rgb(215 95 7)'; // Set color to red for stars up to the score
        } else {
            star.style.color = '#bdbbb8'; // Reset color for other stars
        }
    }
}

/*==================================InsertComment=============================*/
function InsertComment() {
    let Comment = document.getElementById("txtComment").value;
    if (!Comment) {
        sweetAlert("Please input comment details");
        return;
    }

    let ProjectID = sessionStorage.getItem("ProjectID");
    if (!ProjectID) {
        sweetAlert("Error function :InsertComment error : Do not have Project ID in sessionStorage.");
        return;
    }

    let UserID = sessionStorage.getItem("userId");
    if (!UserID) {
        sweetAlert("Error function :InsertComment error : Do not have User ID in sessionStorage.");
        return;
    }

    CallAjaxInsertComment(ProjectID, UserID, Comment, "N", "");
}

function CallAjaxInsertComment(ProjectID, UserID, Comment, ReplyFlg, ReplyCommentID) {
    var strData = {
        rptType: "insertcomment",
        strProjectID: ProjectID,
        strUserID: UserID,
        strComment: Comment,
        strPage: "ProductDetails",
        strReplyFlg: ReplyFlg,
        strReplyCommentID: ReplyCommentID
    };


    $.ajax({
        url: "Class/Ajax/AjaxProductDetails.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterCallAjaxInsertComment(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :CallAjaxInsertComment " + XMLHttpRequest.error);
        }
    });

}

function AfterCallAjaxInsertComment(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

           
            document.getElementById("txtComment").value = "";
            getComment();
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
    /*================================================================*/

    /*==========================getComment=======================================*/
    function getComment() {
        let ProjectID = sessionStorage.getItem("ProjectID");
        if (ProjectID) {
            var strData = {
                rptType: "getcomment",
                strProjectID: ProjectID,
                strPage: "ProductDetails",
                strReplyFlg: "N",
            };


            $.ajax({
                url: "Class/Ajax/AjaxProductDetails.ashx",
                data: strData,
                type: "GET",
                dataType: "json",
                success: function (responseJson) {

                    AfterGetComment(responseJson);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    sweetAlert(XMLHttpRequest + "  Error function :getComment " + XMLHttpRequest.error);
                }
            });

        } else {
            sweetAlert("Error function :getComment no ProjectID.");
        }

    }

    function AfterGetComment(responseJson) {
        if (responseJson != "") {
            if (IsResponseJsonSuccess(responseJson)) {

                RenderComment(responseJson);
            }
            else {
                sweetAlert("Error function : AfterGetComment details >> " + GetResponseJSonDesc(responseJson));
            }
        }
        else {
            // no data
            sweetAlert("Error function : AfterGetComment no data.");
        }
    }

    function RenderComment(responseJson) {

        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = '';
        responseJson.ResultTable.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.classList.add('mt-3');
            commentElement.classList.add('comments-container');
            commentElement.classList.add('cm-grad');
            commentElement.id = `${comment.CommentID}`;
            


            commentElement.innerHTML = `
                <div class="comment-header" >
                    <div class="d-flex align-items-center" >
                        <i class="fa fa-user-circle avatar" aria-hidden="true"></i>
                        <span class="commenter-info mx-3 ">${comment.UserID}/${comment.Commenter}</span>
                        <span class="time">${comment.TimeDisplay}</span>
                    </div>
                </div>
                <div class="comment-body">
                    ${comment.Comment}
                </div>
                <div class="comment-actions">
                    <div class="like-reply d-flex align-items-center">
                            <button type="button" class="btn-plus btn" value="${comment.CommentID}" onclick="LikeUnLike(this);">
                                <i class="fa fa-heart heart" aria-hidden="true"></i>
                            </button>
                            <p class="count-link" value="${comment.CountLike}">${comment.CountLike} LIKED</p>

                            <button type="button" class="btn-plus btn" value="${comment.CommentID}" onclick="ReplyComment(this);">
                                <i class="fa fa-reply" aria-hidden="true"></i> 
                            </button>
                            <p class="count-reply" value="${comment.CountReply}">${comment.CountReply} REPLIED</p>
                    </div>
                </div>
            `;

  

            const ReplyElementArea = document.createElement('div');
            ReplyElementArea.classList.add('reply-area');
            ReplyElementArea.id = `area_reply_${comment.CommentID}`;
                       
            const ReplyElement = document.createElement('div');
            ReplyElement.classList.add('reply-header');
            ReplyElement.classList.add('reply-container');
            ReplyElement.id = `reply_${comment.CommentID}`;


          
            
  

            const Toggle = document.createElement('p');
            Toggle.id = `Toggle_${comment.CommentID}`;
            Toggle.setAttribute("data-Active-area", `area_reply_${comment.CommentID}`);
            Toggle.onclick = function () {ShowHideReplies(Toggle); };
            Toggle.innerHTML = "Show Replies."
            Toggle.classList.add('reply-toggle');

            
     


            commentsContainer.appendChild(commentElement);
             commentsContainer.appendChild(ReplyElement);
            commentsContainer.appendChild(Toggle);
            commentsContainer.appendChild(ReplyElementArea);
           
            
        });
        getReply();
        


}
/*=======================================ShowHideReplies=====================*/
function ShowHideReplies(toggleElement) {
    const activeAreaId = toggleElement.getAttribute("data-Active-area"); // Get the target area's ID
    const replyArea = document.getElementById(activeAreaId); // Find the target area

    if (replyArea) {
        const isVisible = window.getComputedStyle(replyArea).display !== 'none'; // Check visibility
        replyArea.style.display = isVisible ? 'none' : 'block'; // Toggle display
        toggleElement.innerHTML = isVisible ? "Show Replies" : "Hide Replies"; // Update text
    } else {
        sweetAlert(`Reply area with ID "${activeAreaId}" not found.`);
    }
}


/*=============================Like-UnLike===================================*/
function LikeUnLike(BtnLike) {
    console.log(BtnLike);
    const LikeID = BtnLike.getAttribute('data-likeid');
    if (LikeID) {
        UnLikeComment(BtnLike);
    }
    else {
        LikeComment(BtnLike);
    }
}
/*===========================UnlikeComment=================================*/
function UnLikeComment(BtnLike) {
    let ProjectID = sessionStorage.getItem("ProjectID");
    let CommentID = BtnLike.value;
    let LikeID = BtnLike.getAttribute('data-likeid');
    let UserID = sessionStorage.getItem("userId");

    if (!ProjectID) {
        sweetAlert("  Error function :LikeComment error : Do not have Project ID in sessionStorage.");
        return;
    }
    if (!CommentID) {
        sweetAlert("  Error function :LikeComment error : Do not have Comment ID.");
        return;
    }
    if (!LikeID) {
        sweetAlert("  Error function :LikeComment error : Do not have Like ID.");
        return;
    }
    if (!UserID) {
        sweetAlert("  Error function :LikeComment error : no user ID in sessionStorage.");
        return;
    }


    var strData = {
        rptType: "deletelike",
        strLikeID: LikeID
    };

    $.ajax({
        url: "Class/Ajax/AjaxProductDetails.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterUnLikeComment(responseJson, BtnLike);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :UnLikeComment " + XMLHttpRequest.error);
        }
    });

}


function AfterUnLikeComment(responseJson, BtnLike) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            BtnLike.setAttribute("data-likeid", "");
            const heartIcon = BtnLike.querySelector('i.fa-heart');
            heartIcon.style.color = 'gray';
            AciveCountLike(BtnLike,"Delete");
        }
        else {
            sweetAlert("Error function : AfterUnLikeComment details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        sweetAlert("Error function : AfterUnLikeComment no data.");
    }
}

function AciveCountLike(button, action) {
    const commentID = button.value;
    const commentDiv = document.getElementById(commentID);
    if (!commentDiv) {
        sweetAlert("Comment not found with ID: " + commentID);
        return;
    }

    const countLink = commentDiv.querySelector(".count-link");

    if (!countLink) {
        sweetAlert("Count link not found in comment: " + commentID);
        return;
    }

    const currentLikeCount = parseInt(countLink.getAttribute("value"), 10);
    if (!isNaN(currentLikeCount)) {
        let newLikeCount; 
        if (action === "Delete") {
            newLikeCount = currentLikeCount - 1;
        } else {
            newLikeCount = currentLikeCount + 1;
        }

        countLink.setAttribute("value", newLikeCount);
        countLink.textContent = newLikeCount + " LIKED";
    } else {
        sweetAlert("Invalid like count value.");
    }
}


/*===========================likeComment=================================*/
function LikeComment(BtnLike) {
    let ProjectID = sessionStorage.getItem("ProjectID");
    let CommentID = BtnLike.value;
    
    let UserID = sessionStorage.getItem("userId");
    if (!ProjectID) {
        sweetAlert("  Error function :LikeComment error : Do not have Project ID in sessionStorage.");
        return;
    }
    if (!CommentID) {
        sweetAlert("  Error function :LikeComment error : Do not have Comment ID.");
        return;
    }
    if (!UserID) {
        sweetAlert("  Error function :LikeComment error : no user ID in sessionStorage.");
        return;
    }

     
    var strData = {
        rptType: "insertlike",
        strProjectID: ProjectID,
        strUserID: UserID,
        strCommentID: CommentID
    };
    console.log(strData);
    $.ajax({
        url: "Class/Ajax/AjaxProductDetails.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterSendLikeComment(responseJson, BtnLike);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :SendLike " + XMLHttpRequest.error);
        }
    });

}


function AfterSendLikeComment(responseJson, BtnLike) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {
            BtnLike.setAttribute("data-likeid", responseJson.ResultTable[0]['@pSqlErr']);
            const heartIcon = BtnLike.querySelector('i.fa-heart');
            heartIcon.style.color = 'red';
            AciveCountLike(BtnLike, "Add");
        }
        else {
            sweetAlert("Error function : AfterSendLike details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        sweetAlert("Error function : AfterSendLike no data.");
    }
}

/*===============================GetMyLike===================================*/
function GetMyLike() {
    let ProjectID = sessionStorage.getItem("ProjectID");
    let UserID = sessionStorage.getItem("userId");
    if (!ProjectID) {
        sweetAlert("  Error function :LikeComment error : Do not have Project ID in sessionStorage.");
        return;
    }

    if (!UserID) {
        sweetAlert("  Error function :LikeComment error : no user ID in sessionStorage.");
        return;
    }


    var strData = {
        rptType: "getlike",
        strProjectID: ProjectID,
        strUserID: UserID
    };
    $.ajax({
        url: "Class/Ajax/AjaxProductDetails.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterSendGetLike(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :SendGetLike " + XMLHttpRequest.error);
        }
    });

}


function AfterSendGetLike(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            RenderLikedHearts(responseJson);
        }
        else {
            sweetAlert("Error function : AfterSendGetLike details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        sweetAlert("Error function : AfterSendGetLike no data.");
    }
}

function RenderLikedHearts(responseJson) {
    // Loop through the ResultTable
    responseJson.ResultTable.forEach(item => {
  
        const likeButton = document.querySelector(`button.btn-plus[value="${item.CommentID}"]`);

        if (likeButton) {
         
            const heartIcon = likeButton.querySelector('i.fa-heart');
            likeButton.setAttribute("data-likeid", `${item.LikeID}`);
            if (heartIcon) {
   
                heartIcon.style.color = 'red';
            }
        }
    });
}

/*===================================ReplyComment===============================*/

function ReplyComment(button) {

    let CommentID = button.value;
    let replyElement = document.getElementById(`reply_${button.value}`);
    let UserID = sessionStorage.getItem("userId");
    let UserName = sessionStorage.getItem("username");
    let formattedName = formatName(UserName);

    let html = `
   <div class="comment-container" style="position: relative;">
           <i class="fa fa-times close-icon close-toggle" aria-hidden="true" style="position: absolute; right: 0; top: 0; cursor: pointer;" onclick="CloseInputComment('${CommentID}');"></i>
        <div class="comment-header">
            <div class="d-flex align-items-center">
                <i class="fa fa-user-circle avatar" aria-hidden="true"></i>
                <span class="commenter-info mx-3">${UserID}/${formattedName}</span>
                <span class="time">Reply to Comment ID : ${button.value}</span>
            </div>
        </div>
        <div class="comment-body">
            <textarea class="form-control" id="txtReply_${CommentID}" placeholder="Reply..." style="height: 43px" rows="3"></textarea>
        </div>
        <div class="comment-actions">
            <button type="button" class="btn btn-dark justify-content-end align-items-end" data-replyTo="${CommentID}"" onclick="insertReply(this)">Send</button>
        </div>
    </div>
    `;


    replyElement.innerHTML = html;
    replyElement.style.display = 'block';  
}

function CloseInputComment(CommentID) {
    let replyElement = document.getElementById(`reply_${CommentID}`);
    replyElement.style.display = 'none';

}

function formatName(fullName) {
    let nameParts = fullName.split(' ');
    let firstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
    let lastName = nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1).toLowerCase();
    let formattedName = `${firstName} ${lastName.charAt(0)}.`;
    return formattedName;
}

function insertReply(BtnLike) {
   
    const CommentID = BtnLike.getAttribute('data-replyTo');
    const txtReply = document.getElementById(`txtReply_${CommentID}`).value;
    let UserID = sessionStorage.getItem("userId");
    let ProjectID = sessionStorage.getItem("ProjectID");
    if (!CommentID) {
        sweetAlert("Not found Comment ID.")
        return;
    }
    if (!txtReply) {
        sweetAlert("Please input text to reply.")
        return;
    }
    if (!UserID) {
        sweetAlert("Not found User ID.")
        return;
    }
    if (!ProjectID) {
        sweetAlert("Not found Project ID.")
        return;
    }
    CallAjaxInsertComment(ProjectID, UserID, txtReply, "Y", CommentID);
}

/*-------------------------------GetReply----------------------------*/
function getReply() {
    let ProjectID = sessionStorage.getItem("ProjectID");
    if (ProjectID) {
        var strData = {
            rptType: "getcomment",
            strProjectID: ProjectID,
            strPage: "ProductDetails",
            strReplyFlg: "Y",
        };


        $.ajax({
            url: "Class/Ajax/AjaxProductDetails.ashx",
            data: strData,
            type: "GET",
            dataType: "json",
            success: function (responseJson) {

                AfterGetReply(responseJson);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                sweetAlert(XMLHttpRequest + "  Error function :getComment " + XMLHttpRequest.error);
            }
        });

    } else {
        alert("Error function :getComment no ProjectID.");
    }

}

function AfterGetReply(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            RenderReplytoComment(responseJson);
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

function RenderReplytoComment(responseJson) {

    responseJson.ResultTable.forEach(comment => {
        const replyContainer = document.getElementById(`area_reply_${comment.ReplyCommentID}`);
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.classList.add('mt-3');
        commentElement.classList.add('comments-container');
        commentElement.classList.add('cm-grad-reply');
        commentElement.id = `${comment.CommentID}`;

        commentElement.innerHTML = `
                <div class="comment-header" >
                    <div class="d-flex align-items-center" >
                        <i class="fa fa-user-circle avatar" aria-hidden="true"></i>
                        <span class="commenter-info mx-3 ">${comment.UserID}/${comment.Commenter}</span>
                        <span class="time">${comment.TimeDisplay}</span>
                    </div>
                </div>
                <div class="comment-body">
                    ${comment.Comment}
                </div>
                <div class="comment-actions">
                    <div class="like-reply d-flex align-items-center">
                            <button type="button" class="btn-plus btn" value="${comment.CommentID}" onclick="LikeUnLike(this);">
                            <i class="fa fa-heart heart" aria-hidden="true"></i>
                        </button>
                            <p class="count-link" value="${comment.CountLike}">${comment.CountLike} LIKED</p>
                    </div>
                </div>
            `;
        replyContainer.appendChild(commentElement);
        const Toggle = document.getElementById(`Toggle_${comment.ReplyCommentID}`);
        Toggle.style.display = 'block';
    });
    GetMyLike();
}

/*--------------------------ShowImg-----------------------------*/
function setupServiceModal() {
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
}

function setupMyModal() {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("BigPicture");
    var closeModal = document.querySelector("#myModal .close");

    if (modal && modalImg && closeModal) {
        document.querySelectorAll('.clickable-image').forEach(function (image) {
            image.addEventListener('click', function () {
                modal.style.display = "block";
                modalImg.src = this.src;
            });
        });

        closeModal.onclick = function () {
            modal.style.display = "none";
        };

        window.addEventListener('click', function (event) {
            // ตรวจสอบว่า event.target เป็น myModal เท่านั้น
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
}


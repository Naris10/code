$(document).ready(function () {

    getIotContact();
    

});

//----------------------------get IotMember------------------------------//

function getIotContact() {
    var strData = {
        rptType: "getiotmember"
    };

    $.ajax({
        url: "Class/Ajax/AjaxAbout.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterGetContact(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :getIotMember" + XMLHttpRequest.error);
        }
    });
}

function AfterGetContact(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            RenderContact(responseJson);
        }
        else {
            sweetAlert("Error function : AfterGetIoTMember details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterGetIoTMember no data.");
    }
}

function RenderContact(data) {
    const container = document.getElementById("MemberPicture");
    container.innerHTML = "";
    let colDiv = '';
    data.ResultTable.forEach(member => {
        colDiv += `<div class="card" id="${member.NID}">
                  <div class="card-body d-flex">
                    <!-- Left Column: Image and Basic Details -->
                    <div class="col image-and-basic-details">
                      <div class="image-container">
                        <img src="../imgs/iot-members/${member.NID}.png" alt="photo" class="flip-image">
                      </div>
                      <p class="text-details">${member.NAME}</p>
                      <p class="text-details2">${member.POSITION_NAME}</p>
                    </div>

                    <!-- Right Column: Extra Details -->
                    <div class="col hidden extra-details">
                      <p class="text-details-extra">${member.NAME}</p>
                      <p class="text-details-extra">${member.POSITION_NAME}</p>
                      <p class="text-details-extra mt-5">Contact</p>
                      <p class="text-topic-extra">${member.EMAIL}</p>
                      <p class="text-details-extra">Main Job</p>
                      <p class="text-topic-extra">${member.MAINJOB}</p>
                    </div>
                  </div>
                </div>
                `
        
    });

    container.innerHTML = colDiv;

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });

    setupCardInteraction();

}
//---------------------------Flip picture------------------------------//

//function setupCardInteraction() {
//    // Get all card elements
//    var cards = document.querySelectorAll('.card');

//    // Add click event listener to each card
//    cards.forEach(function (card) {
//        card.addEventListener('click', function () {
//            // Remove the expanded class from other cards
//            cards.forEach(function (c) {
//                c.classList.remove('expanded');

//                // Show the text-details for non-expanded cards
//                var detailsname = c.querySelectorAll('.text-details');
//                detailsname.forEach(function (detail) {
//                    detail.style.display = ''; // Reset display to default
//                });

//                var detailsposition= c.querySelectorAll('.text-details2');
//                detailsposition.forEach(function (detail) {
//                    detail.style.display = ''; // Reset display to default
//                });



//            });

//            // Toggle the expanded class on the clicked card
//            card.classList.toggle('expanded');

//            // Hide or show the text-details on the clicked card
//            var detailsname = card.querySelectorAll('.text-details');
//            detailsname.forEach(function (detail) {
//                detail.style.display = card.classList.contains('expanded') ? 'none' : '';
//            });

//            var detailsposition = card.querySelectorAll('.text-details2');
//            detailsposition.forEach(function (detail) {
//                detail.style.display = card.classList.contains('expanded') ? 'none' : '';
//            });



//        });
//    });
//}





function setupCardInteraction() {
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            console.log('Card clicked:', card); // ดูว่า event ถูกเรียกหรือไม่

            var isAlreadyExpanded = card.classList.contains('expanded');
            cards.forEach(function (c) {
                c.classList.remove('expanded');
                var detailsname = c.querySelectorAll('.text-details');
                detailsname.forEach(function (detail) {
                    detail.style.display = '';
                });
                var detailsposition = c.querySelectorAll('.text-details2');
                detailsposition.forEach(function (detail) {
                    detail.style.display = '';
                });
            });

            if (!isAlreadyExpanded) {
                card.classList.add('expanded');
                var detailsname = card.querySelectorAll('.text-details');
                detailsname.forEach(function (detail) {
                    detail.style.display = 'none';
                });
                var detailsposition = card.querySelectorAll('.text-details2');
                detailsposition.forEach(function (detail) {
                    detail.style.display = 'none';
                });
                console.log('Card expanded:', card); // ดูสถานะการขยายของการ์ด
            }
        });
    });
}

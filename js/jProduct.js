$(document).ready(function () {
    getDivision();

    getKPI();

    getProjectList();

});


//----------------------------getDivision------------------------------//

function getDivision() {
    var strData = {
        rptType: "getdivision"
    };

    $.ajax({
        url: "Class/Ajax/AjaxProduct.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterGetDivision(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :getDivision" + XMLHttpRequest.error);
        }
    });
}

function AfterGetDivision(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            RenderDivision(responseJson);
        }
        else {
            sweetAlert("Error function : AfterGetDivision details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterGetDivision no data.");
    }
}

function RenderDivision(responseJson) {
    const dropdown = document.getElementById("Division");
    responseJson.ResultTable.forEach(item => {
        const option = document.createElement("option");
        option.value = item.Division;
        option.textContent = item.Division;
        dropdown.appendChild(option);
    });
}



/*------------------------------getKPI---------------------*/

function getKPI() {
    var strData = {
        rptType: "getkpi"
    };

    $.ajax({
        url: "Class/Ajax/AjaxProduct.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterGetKPIList(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :getKPI" + XMLHttpRequest.error);
        }
    });
}

function AfterGetKPIList(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            RenderKPI(responseJson);
        }
        else {
            sweetAlert("Error function : AfterGetKPIList details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterGetKPIList no data.");
    }
}

function RenderKPI(responseJson) {
    const dropdown = document.getElementById("KPI");
    responseJson.ResultTable.forEach(item => {
        const option = document.createElement("option");
        option.value = item.KPI;
        option.textContent = item.KPI;
        dropdown.appendChild(option);
    });
}


/*----------------------getProjectList-------------------*/
function getProjectList() {
    var selectedDiv = $('#Division').val();
    var selectedKip = $('#KPI').val();
    var strData = {
        rptType: "getprojectlist",
        strDivision: selectedDiv,
        strKPI: selectedKip
    };

    $.ajax({
        url: "Class/Ajax/AjaxProduct.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterGetProjectList(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :getKPI" + XMLHttpRequest.error);
        }
    });
}

function AfterGetProjectList(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

                RenderProjectList(responseJson);            
        }
        else {
            sweetAlert("Error function : AfterGetKPIList details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterGetKPIList no data.");
    }
}

// Define the loadFallbackImage function outside of RenderProjectList
function loadFallbackImage(imageElement, fallbackImage) {
    const fallback = new Image();
    fallback.onload = function () {
        imageElement.src = fallbackImage; // Set fallback image if it exists
    };
    fallback.onerror = function () {
        // If fallback image is also not available, set a solid color or alternative
        const picturePath = document.getElementById("Picturepath").getAttribute("value");
        imageElement.src = `${picturePath}/no_picture.png`; // Assuming you have a default image
    };
    fallback.src = fallbackImage;
}

function RenderProjectList(responseJson) {
    const itemsPerPage = 9; // Number of cards per page
    let currentPage = 1; // Initialize current page

    function renderPage(items, page) {
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
        const picturePath = document.getElementById("Picturepath").getAttribute("value");


        const html = paginatedItems.map(item => {
            const imageUrl = `${picturePath}/${item.ProjectID}_Icon.png`;
            const fallbackImage = `${picturePath}/no_picture.png`; // Path for fallback image

            return `
                <div class="col-md-3 m-3 card">
                    <div class="card-body">
                        <img src="${imageUrl}"
                            class="card-img-center" 
                            alt="Icon_${item.ProjectID}" onerror="this.onerror=null;loadFallbackImage(this, '${fallbackImage}');" />
                        <h5 class="card-title mt-4" id="${item.ProjectID}">
                            <h5 class="text-start">${item.Projectname || 'Unnamed Project'}</h5>
                        </h5>
                        <p class="card-text text-start mt-2">${item.Desc1 || 'No description available'}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <button type="button" class="btn-plus btn" value="${item.ProjectID}" onclick="ProjectDetail(this);">
                                <i class="fa fa-plus-circle" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        $("#CardSection").html(html);
        renderPagination(items.length, page);
    }

    function renderPagination(totalItems, currentPage) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const paginationHtml = Array.from({ length: totalPages }, (_, i) => {
            const pageNumber = i + 1;
            return `
                <li class="page-item ${pageNumber === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${pageNumber}">${pageNumber}</a>
                </li>
            `;
        }).join('');

        $("#pagination").html(`
            <nav>
                <ul class="pagination justify-content-center">
                    ${paginationHtml}
                </ul>
            </nav>
        `);

        $(".page-link").off("click").on("click", function (e) {
            e.preventDefault();
            const selectedPage = parseInt($(this).data("page"), 10);
            if (selectedPage !== currentPage) {
                currentPage = selectedPage;
                renderPage(responseJson.ResultTable, currentPage);
            }
        });
    }

    renderPage(responseJson.ResultTable, currentPage);
}


/*----------------------ProjectDetail(this)-------------------*/


function ProjectDetail(Data) {
    let ProjectID = Data.value;
    if (ProjectID) {
        sessionStorage.setItem("ProjectID", ProjectID);
        AfterHaveProjectID();
    } else {
        sweetAlert("Error function : ProjectDetail no ProjectID.");
    }
}

function AfterHaveProjectID() {
    let ProjectID = sessionStorage.getItem("ProjectID");

    if (ProjectID) {
        window.location.href = 'ProductDetails.aspx';
    }
    else {
        sweetAlert("Error function : AfterHaveProjectID no ProjectID.");
    }
}

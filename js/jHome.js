$(document).ready(function () {
    //document.getElementById('UserInfo').innerText = sessionStorage.getItem("userId") + "/" + sessionStorage.getItem("username");

    getIotMember();

    getProjectDeploy();

    getReduceTime();

    DrawPieChart();

    DrawBarChart();

    NewFeed();

    getVisitor();

    getDescription();
    
});

//----------------------------get IotMember------------------------------//

function getIotMember() {
    var strData = {
        rptType: "getiotmember"
    };

    $.ajax({
        url: "Class/Ajax/AjaxHome.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterGetIoTMember(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :getIotMember " + XMLHttpRequest.error);
        }
    });
}

function AfterGetIoTMember(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            RenderMember(responseJson);
        }
        else {
            sweetAlert("Error function : AfterGetIoTMember " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterGetIoTMember no data.");
    }
}

function RenderMember(data) {
    const container = document.getElementById("MemberPicture");

    data.ResultTable.forEach(member => {
        // Create the main col div
        const colDiv = document.createElement("div");
        colDiv.className = "col";

        // Create the inner p-3 div
        const innerDiv = document.createElement("div");
        innerDiv.className = "p-3";

        // Create the anchor element
        const anchor = document.createElement("a");
        anchor.setAttribute("data-bs-toggle", "tooltip");
        anchor.setAttribute("data-bs-placement", "bottom");
        anchor.setAttribute("data-bs-custom-class", "custom-tooltip");
        anchor.setAttribute("data-bs-title", member.NAME);

        // Create the circular portrait div
        const portraitDiv = document.createElement("div");
        portraitDiv.className = "circular-portrait";

        // Create the img element
        const img = document.createElement("img");
        img.src = `/imgs/iot-members/${member.NID}.png`;
        img.alt = member.NAME;
        img.height = 200;

        // Assemble the elements
        portraitDiv.appendChild(img);
        anchor.appendChild(portraitDiv);
        innerDiv.appendChild(anchor);
        colDiv.appendChild(innerDiv);

        // Append the col div to the container
        container.appendChild(colDiv);
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });

}








/*-------------------------------------getProjectDeploy--------------------------*/

function getProjectDeploy() {
    var strData = {
        rptType: "getprojectdeployed"
    };

    $.ajax({
        url: "Class/Ajax/AjaxHome.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterGetProjectDeployed(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :getIotMember " + XMLHttpRequest.error);
        }
    });
}

function AfterGetProjectDeployed(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            //
            RenderProjectDeployed(responseJson);
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

function RenderProjectDeployed(responseJson) {

    const total = responseJson.ResultTable[0]['Total'];
    document.getElementById('ProjectDeployed').innerText = total;
}



/*---------------------------------getReduceTime--------------------------*/

function getReduceTime() {
    var strData = {
        rptType: "getreducetime"
    };

    $.ajax({
        url: "Class/Ajax/AjaxHome.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterGetReduceTime(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :getReduceTime " + XMLHttpRequest.error);
        }
    });
}

function AfterGetReduceTime(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            RenderMinPerYesr(responseJson);
        }
        else {
            sweetAlert("Error function : AfterGetReduceTime details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterGetReduceTime no data.");
    }
}

//MinPerYesr

function RenderMinPerYesr(responseJson) {
    const total = responseJson.ResultTable[0]['MinPerYesr'];
    document.getElementById('MinPerYesr').innerText = total.toLocaleString('en-US') ;
}


/*---------------------------DrawPieChart---------------------*/
function DrawPieChart() {
    var strData = {
        rptType: "getpiedata"
    };

    $.ajax({
        url: "Class/Ajax/AjaxHome.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterGetPieData(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :DrawPieChart" + XMLHttpRequest.error);
        }
    });
}

function AfterGetPieData(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {
            RenderPieChart(responseJson);
        }
        else {
            sweetAlert("Error function : AfterGetPieData details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterGetPieData no data.");
    }
}

function RenderPieChart(data) {
    // Extract labels and data from the ResultTable
    const labels = data.ResultTable.map(item => item.ProjType);
    const chartData = data.ResultTable.map(item => item.Total);

    // Get the canvas context
    let ctx = document.getElementById("PieChart").getContext("2d");

    // Render the pie chart
    let myChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Improvement Category Ratio [ QCD ]",
                    data: chartData,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.6)", // Quality
                        "rgba(54, 162, 235, 0.6)", // Delivery
                        "rgba(75, 192, 192, 0.6)"  // Cost
                    ],
                }
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let total = chartData.reduce((a, b) => a + b, 0);
                            let percentage = ((tooltipItem.raw / total) * 100).toFixed(2);
                            return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

/*-----------------------------DrawBarChart------------------------------------*/
function DrawBarChart() {
    var strData = {
        rptType: "getbardata"
    };

    $.ajax({
        url: "Class/Ajax/AjaxHome.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterGetBarData(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :DrawBarChart" + XMLHttpRequest.error);
        }
    });
}

function AfterGetBarData(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {
            RenderBarChart(responseJson);
        }
        else {
            sweetAlert("Error function : AfterGetBarData details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterGetBarData no data.");
    }
}

function RenderBarChart(data) {
    // Extract labels and data from the ResultTable
    const labels = data.ResultTable.map(item => item.Year);
    const chartData = data.ResultTable.map(item => item.Total);

    // Get the canvas context
    let ctx = document.getElementById("BarChart").getContext("2d");

    // Render the pie chart
    let myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Yearly Project Status",
                    data: chartData,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.6)", // Quality
                        "rgba(54, 162, 235, 0.6)", // Delivery
                        "rgba(75, 192, 192, 0.6)", // Cost
                        "rgba(153, 102, 255, 0.6)", // New Color 1
                        "rgba(255, 206, 86, 0.6)"  // New Color 2
                    ],
                }
            ],
        },
        options: {
    legend: {display: false},
     plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let total = chartData.reduce((a, b) => a + b, 0);
                            let percentage = ((tooltipItem.raw / total) * 100).toFixed(2);
                            return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`;
                        }
                    }
                }
       }
  }
    });
}

/*---------------------------------------NewFeed---------------------------------*/


function NewFeed() {
    var strData = {
        rptType: "getfeeddata"
    };

    $.ajax({
        url: "Class/Ajax/AjaxHome.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterGetFeedData(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :NewFeed" + XMLHttpRequest.error);
        }
    });
}

function AfterGetFeedData(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            RenderNewFeed(responseJson);
        }
        else {
            sweetAlert("Error function : AfterGetFeedData details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterGetFeedData no data.");
    }
}


//function RenderNewFeed(data) {
//    // Get the container element where the data will be displayed
//    const container = document.getElementById("Newfeed");
//    container.innerHTML = ""; // Clear previous content

//    data.ResultTable.forEach(item => {
//        const card = document.createElement("div");
//        card.classList.add("card");

//        const topic = document.createElement("h3");
//        topic.textContent = item.Topic;

//        const description = document.createElement("p");
//        description.textContent = item.Desc1;
//        description.classList.add("text-start");

      

//        card.appendChild(topic);
//        card.appendChild(description);
//        container.appendChild(card);
    
//    });
//}

function RenderNewFeed(data) {
    const container = document.getElementById("Newfeed");
    container.innerHTML = "";

    data.ResultTable.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        const topic = document.createElement("h3");
        topic.textContent = item.Topic;

        const description = document.createElement("p");
        description.textContent = item.Desc1;
        description.classList.add("text-start");

        card.appendChild(topic);
        card.appendChild(description);

      
        if (item.LINK) {
            const link = document.createElement('a');
            link.href = item.LINK; 
            link.textContent = 'Link'; 
            link.classList.add("text-decoration-none", "link-list", "text-left");

            card.appendChild(link);
        }

        container.appendChild(card);
    });
}



/*---------------------------------------getVisitor---------------------------------*/
function getVisitor(){
    var strData = {
        rptType: "getvisitor"
    };

    $.ajax({
        url: "Class/Ajax/AjaxHome.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterGetVisitor(responseJson);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function :getVisitor" + XMLHttpRequest.error);
        }
    });
}

function AfterGetVisitor(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            RenderVisitor(responseJson);
        }
        else {
            sweetAlert("Error function : AfterGetVisitor details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : AfterGetVisitor no data.");
    }
}

function RenderVisitor(responseJson) {
    const total = responseJson.ResultTable[0]['Qty'];
    document.getElementById('visitor').innerText = total;
}


/*-------------------------getDescription--------------------------*/
function getDescription() {
    var strData = {
        rptType: "getdescription"
    };

    $.ajax({
        url: "Class/Ajax/AjaxHome.ashx",
        data: strData,
        type: "GET",
        dataType: "json",
        success: function (responseJson) {

            AfterGetDescription(responseJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert(XMLHttpRequest + "  Error function : getDescription" + XMLHttpRequest.error);
        }
    });
}

function AfterGetDescription(responseJson) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            RenderDescription(responseJson);
        }
        else {
            sweetAlert("Error function : RenderDescription details >> " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        // no data
        sweetAlert("Error function : RenderDescription no data.");
    }
}


function RenderDescription(data) {
    // Get the container element where the data will be displayed
    const container = document.getElementById("description");
    container.innerHTML = ""; // Clear previous content

    data.ResultTable.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        const topic = document.createElement("h3");
        topic.textContent = item.Topic;

        const description = document.createElement("p");
        description.textContent = item.Desc1;
        description.classList.add("text-start");

        card.appendChild(topic);
        card.appendChild(description);
        container.appendChild(card);

    });
}
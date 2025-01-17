<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/MasterPage.Master" CodeBehind="Home.aspx.cs" Inherits="mis.Home" %>
<%@Import Namespace="mis.Class.Model"%>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   
    <title>Home</title>

        <link href="css/cssHome.css<%= GlobalBean.VERSION_CONTROL %>"" rel="stylesheet" />
         <script src="chartJS/Chart.min.js<%= GlobalBean.VERSION_CONTROL %>""></script>
        <script type="text/javascript" src="js/jHome.js<%= GlobalBean.VERSION_CONTROL %>" ></script>

    
</asp:Content>
    
<asp:Content ID="Content2" ContentPlaceHolderID="BodyContent" runat="server">

    <div class="container-fluid bg-gray" style="margin-top:50px;">
        <div id="carouselExample" class="carousel slide " data-bs-ride="carousel" data-bs-interval="6000">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100 h-100" width="800" height="400" role="img" aria-label="Placeholder: First slide" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <image href="imgs/home_braner_01.png" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
                    </svg>
                </div>
                <div class="carousel-item">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100  h-100" width="800" height="400" role="img" aria-label="Placeholder: First slide" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <image href="imgs/home_braner_02.png" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
                    </svg>
                </div>
                  <div class="carousel-item">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100  h-100" width="800" height="400" role="img" aria-label="Placeholder: First slide" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <image href="imgs/home_braner_03.png" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
                    </svg>
                </div>
                <div class="carousel-item">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100 h-100" width="800" height="400" role="img" aria-label="Placeholder: First slide" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <image href="imgs/home_braner_04.png" x="0" y="0" height="100%" width="100%" preserveAspectRatio="xMidYMid slice" />
                    </svg>
                </div>

            </div>
        
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
    </div>




  
            <div class="container text-center chart-area">
                <p id="piemode1">Pie Mode</p>
                <div class="container text-center">
                    <div class="row justify-content-md-center">
                        <div class="col-md-6 mb-5">
                            <div class="col">
                                <div class="card-body  align-items-center  projectdeploy-card " style="background-color:#0970CD;">
                                        <span >Overall Project Deployed</span>
                                        <div class="row align-items-center mt-3">
                                            <div class="col text-center" id="ProjectDeployed"></div>
                                              <span style="font-size: 20px; font-weight:normal;">Projects</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-5">
                            <div class="col">
                                <div class="card-body projectreduce-card">
                                        <span >Total Reduce Time [AVG]</span>
                                        <div class="row align-items-center mt-3">
                                            <div class="col text-center" id="MinPerYesr"></div>
                                            <span style="font-size: 20px; font-weight:normal;">Min/Year</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="row d-flex justify-content-center">
                                <div class="col-12 d-flex justify-content-center" style="height: 350px">
                                    <canvas id="PieChart"></canvas>
                                </div>
                                <div class="col-12 d-flex justify-content-center">
                                    Improvement Category Ratio [QCD]
               
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="row d-flex justify-content-center">
                                <div class="col-12 d-flex justify-content-center" style="height: 350px">
                                    <canvas id="BarChart"></canvas>
                                </div>
                                <div class="col-12 d-flex justify-content-center">
                                    Yearly Project Status
               
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    


        <div class="container text-center feed-area" style="margin-top: 100px;" >
            <div class="row ">
                <div class="col-8">
                    <div class="news-feed" >
                        <h2>NewFeeds</h2>
                        <div id="Newfeed"></div>
                    </div>
                </div>
         
            <div class="col" >
                <div class="card-body align-self-start" id="cardvisitors">
                    <p >View</p>
                    <p id="visitor"></p>
                </div>
            </div>
        </div>




            <div class="row" style="margin-top: 80px;">
                <p class="department-desc ">IoTO Department</p>
                <div class="container text-center">
                    <div class="row">
                        <div class="col">
                            <span class="border border-white">
                                <img src="/imgs/logo.png" alt="iotologo" style="width: 100%">
                            </span>
                        </div>
                        <div class="col-8">
                            <div class="card-body carddescription">
                                <h3 class="text-start">Description</h3>
                                <div id="description"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div class="row" style="margin-top: 80px;">
                <p class="member-desc">IoTO Member</p>
                <div class="container text-center">
                    <div id="MemberPicture" class="row row-cols-5 row-cols-lg-5 g-2 g-lg-3 d-flex justify-content-start"></div>
                </div>
            </div>

</div>
   
</asp:Content>


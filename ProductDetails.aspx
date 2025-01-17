<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/MasterPage.Master" CodeBehind="ProductDetails.aspx.cs" Inherits="mis.ProductDetails" %>
<%@Import Namespace="mis.Class.Model"%>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   
    <title>Product Detail</title>
        <link href="css/Font-Awesome-4.7.0/css/font-awesome.min.css<%= GlobalBean.VERSION_CONTROL %>"" rel="stylesheet">
        <link href="bootstrap-5.3.3-dist/css/bootstrap.min.css<%= GlobalBean.VERSION_CONTROL %>"" rel="stylesheet" >
        <link href="css/sweetalert2.min.css<%=GlobalBean.VERSION_CONTROL%>"" rel="stylesheet" />
        <link href="css/cssProductDetails.css<%= GlobalBean.VERSION_CONTROL %>"" rel="stylesheet" />

        <script type="text/javascript" src="bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js<%= GlobalBean.VERSION_CONTROL %>"" ></script>
        <script type="text/javascript" src="js/jquery-1.11.1.min.js<%= GlobalBean.VERSION_CONTROL %>" ></script>
        <script type="text/javascript" src="jquery-ui-1.12.1/jquery-ui.min.js<%= GlobalBean.VERSION_CONTROL %>" ></script> 
        <script type="text/javascript" src="js/jUtil.js<%= GlobalBean.VERSION_CONTROL %>" ></script>
        <script type="text/javascript" src="js/sweetalert2.min.js<%= GlobalBean.VERSION_CONTROL %>" ></script>
        <script type="text/javascript" src="js/jProductDetails.js<%= GlobalBean.VERSION_CONTROL %>" ></script>

</asp:Content>
    
<asp:Content ID="Content2" ContentPlaceHolderID="BodyContent" runat="server">

    <div class="container-fluid text-center mt-5">
        <div class="row align-items-center">

            <div class="col-md-6 centered-container">

                <div class="col-12 text-end align-self-center" id="NameProject"></div>
                <div class="row mt-4">
                    <div class="col-10 text-end application-type d-flex align-items-center justify-content-end">
                        <i class="fa fa-code me-2 project-type-icon"></i>
                        <h6 id="ProjectType" class="mb-0"></h6>
                    </div>
                    <div class="col-2 text-end">
                        <img src="#" alt="Icon" id="PictureIcon" />
                    </div>
                </div>



               

                <div class="col">
                    <div class="detail-project">
                        <div class="container text-end">
                            <div class="row">
                                <div class="col-5 text-items-no">NTC KPI :</div>
                                <div class="col text-start" id="KPI"></div>
                            </div>
                            <div class="row">
                                <div class="col-5 text-items-no">Merit Time [Min/Year] :</div>
                                <div class="col text-start" id="ReduceTime"></div>
                            </div>
                            <div class="row">
                                <div class="col-5 text-items-no">Description :</div>
                                <div class="col text-start" id="Desc"></div>
                            </div>
                            <div class="row">
                                <div class="col-5 text-items-no">IoTO In-charge :</div>
                                <div class="col text-start" id="Incharge"></div>
                            </div>

                            <div class="row">
                                <div class="col-5 text-items-no">Owner App In-charge :</div>
                                <div class="col text-start" id="RelationDiv"></div>
                            </div>
                        </div>
                    </div>




                    <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                        <a href="#" target="_blank" class="btn btn-outline-dark text-center btn-link-manual" id="ManualDashboard">Manual Dashboard</a>
                        <a href="#" target="_blank" class="btn btn-outline-dark text-center btn-link-manual " id="ManualApplication">Manual Application</a>
                    </div>

                    <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                        <a href="#" target="_blank" class="btn btn-outline-dark text-center btn-link-manual" id="Dashboard">Dashboard </a>
                        <a href="#" target="_blank" class="btn btn-outline-dark text-center btn-link-manual" id="Install">Install</a>
                    </div>

                    <div class="d-flex justify-content-center mt-5">
                        <div class="container text-center">
                            <div class="row">

                                <div class="col-5 d-flex justify-content-end align-items-center text-items-no">
                                    Feedback Project
                                </div>
                                <div class="col-6  d-flex">
                                    <div class="stars">
                                         <i id="Start1" class="fa fa-star  star start-feed-pro" aria-hidden="true"></i>
                                         <i id="Start2" class="fa fa-star  star start-feed-pro" aria-hidden="true"></i>
                                         <i id="Start3" class="fa fa-star  star start-feed-pro" aria-hidden="true"></i>
                                         <i id="Start4" class="fa fa-star  star start-feed-pro" aria-hidden="true"></i>
                                         <i id="Start5" class="fa fa-star  star start-feed-pro" aria-hidden="true"></i>
                                   </div>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-5 d-flex justify-content-end align-items-center text-items-no">
                                    Feedback
                                </div>
                                <div class="col-6  d-flex">
                                    <div class="stars">
                                        <button type="button" class="btn-plus btn star" value="1" onclick="SendScoreFeedback(this);"><i class="fa fa-star-o start-hover" aria-hidden="true"></i></button>
                                        <button type="button" class="btn-plus btn star" value="2" onclick="SendScoreFeedback(this);"><i class="fa fa-star-o start-hover" aria-hidden="true"></i></button>
                                        <button type="button" class="btn-plus btn star" value="3" onclick="SendScoreFeedback(this);"><i class="fa fa-star-o start-hover" aria-hidden="true"></i></button>
                                        <button type="button" class="btn-plus btn star" value="4" onclick="SendScoreFeedback(this);"><i class="fa fa-star-o start-hover" aria-hidden="true"></i></button>
                                        <button type="button" class="btn-plus btn star" value="5" onclick="SendScoreFeedback(this);"><i class="fa fa-star-o start-hover" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div>



                            <div class="row  mt-2">
                                <div class="col-5 d-flex justify-content-end align-items-center text-items-no">Comment </div>
                                <div class="col-6">
                                    <textarea class="form-control" id="txtComment" placeholder="Comment" style="height: 43px" rows="3"></textarea>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-5"></div>
                                <div class="col-6  d-flex justify-content-end mt-3">
                                    <button type="button" class="btn btn-dark    justify-content-end align-items-end" onclick="InsertComment();">Send </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
             <div class="col-md-6 centered-container p-3">
                 <div class="col-12 text-center" ><img src="#" class="clickable-image" alt="Icon" id="Picture_01" /></div>
                 <div class="row mt-3">
                     <div class="col-4 text-center" ><img src="#" class="clickable-image" alt="Icon" id="Picture_02" /></div>
                     <div class="col-4 text-center" ><img src="#" class="clickable-image" alt="Icon" id="Picture_03" /></div>
                     <div class="col-4 text-center" ><img src="#" class="clickable-image" alt="Icon" id="Picture_04" /></div>
                 </div>
             </div>
        </div>
    </div>



    <div id="comments-container" class="container mt-5">  </div>
    <!-- The Modal -->
    <div id="myModal" class="modalpicture">
        <span class="close">&times;</span>
        <img class="modal-content" id="BigPicture">
    </div>


    <div id="Picturepath" value="<%= GlobalBean.PICTURES_PATH %>" hidden></div>
    <div id="Manualpath" value="<%= GlobalBean.MANUAL_PATH %>" hidden></div>
</asp:Content>


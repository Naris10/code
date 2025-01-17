<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/MasterPage.Master" CodeBehind="Product.aspx.cs" Inherits="mis.Product" %>
<%@Import Namespace="mis.Class.Model"%>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   
    <title>Product</title>

        <link href="css/cssProduct.css<%= GlobalBean.VERSION_CONTROL %>"" rel="stylesheet" />
        <script type="text/javascript" src="js/jProduct.js<%= GlobalBean.VERSION_CONTROL %>" ></script>

    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="BodyContent" runat="server">
    <div class="container" style="margin-top:50px;">

       <div class="text-center main-topic">
            <p>Over All IoTO Products</p>
        </div>

        <div class="d-flex justify-content-end mt-2">
            <div class="col-3 me-4">
                <select  class="form-select" aria-label="Default select"  id="Division" onchange="getProjectList();">
                    <option value="0">--Select Division--</option>
                </select>
            </div>
            <div class="col-3">
                <select class="form-select" aria-label="Default select"   id="KPI"  onchange="getProjectList();">
                    <option value="0" >--Select KPI--</option>
                </select>
            </div>
        </div>

    </div>
    <div class="container text-center " style="margin-top:50px;">
        <div class="row justify-content-center   " id="CardSection">Do not have project.
        </div>
        <div calss="pagination" id="pagination"></div>
    </div>




     <div id="Picturepath" value="<%= GlobalBean.PICTURES_PATH %>" hidden></div>
</asp:Content>
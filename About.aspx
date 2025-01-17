<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/MasterPage.Master" CodeBehind="About.aspx.cs" Inherits="mis.About" %>
<%@Import Namespace="mis.Class.Model"%>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   
    <title>About</title>

        <link href="css/cssAbout.css<%= GlobalBean.VERSION_CONTROL %>"" rel="stylesheet" />
        <script type="text/javascript" src="js/jAbout.js<%= GlobalBean.VERSION_CONTROL %>" ></script>

    
</asp:Content>
    
<asp:Content ID="Content2" ContentPlaceHolderID="BodyContent" runat="server">
    <div class =" container" style="padding-top: 50px;">
   
        <h2>  IoTO Developers</h2>
      
     <div id="MemberPicture" class="row row-cols-3 d-flex justify-content-center"></div>
 </div>
   
</asp:Content>

<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/MasterPage.Master" CodeBehind="accessdenied.aspx.cs" Inherits="mis.accessdenied" %>
<%@ Import Namespace="mis.Class.Model" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Access Denied</title>
    <link href="css/cssAccessdenied.css<%= GlobalBean.VERSION_CONTROL %>" rel="stylesheet" />
</asp:Content>
    
<asp:Content ID="Content2" ContentPlaceHolderID="BodyContent" runat="server">
    <div class="container access-denied-container">
        <div class="row">
            <div class="col-12 access-denied-message">
                <h1>Access Denied</h1>
                <hr />
                <p>You cannot access the website with this URL.</p>
                <p>Please open IoTO Devices Control application on your desktop.</p>
            </div>
        </div>
    </div>
</asp:Content>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Params.aspx.cs" Inherits="mis.RefreshParams" %>
<%@ Import Namespace="mis.Class.Model" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <link href="css/cssParams.css" rel="stylesheet" />

     <script src="js/jquery-1.11.1.min.js" type="text/javascript"></script>
     <script src="jquery-ui-1.12.1/jquery-ui.min.js" type="text/javascript"></script> 
     <script src="js/jUtil.js" type="text/javascript"></script>
     <script src="js/jParams.js" type="text/javascript"></script>

</head>
<body>
    <button type="button" onclick="GetParams();">GetParam</button>
    <p id="txtError"></p>
    <table id="tblParams">
       <tr>
        <th>PICTURE_PATH</th>
        <td id="picturePath"></td>
      </tr>
      <tr>
        <th>VERSION_CONTROL</th>
        <td id="versionControl"></td>
     </tr>
    <tr>
        <th>MANUAL_PATH</th>
        <td id="manualPath"></td>
     </tr>
    </table>
</body>
</html>

function IsResponseJsonSuccess(data)
{
    var boolSuccess = false;

    if (data != "")
    {
        if (data.Result.length > 0)
        {
            if (data.Result[0].Code == "0")
            {
                boolSuccess = true;
            }
        }
    }

    return boolSuccess;
}

function GetResponseJSonDesc(data)
{
    var strDesc = "";

    try
    {
        if (data.Result.length > 0)
        {
            strDesc = data.Result[0].Desc;
        }
    }
    catch
    { }

    return strDesc;
}

function ConvertToInt(strValue)
{
    var iValue = 0;

    try
    {
        if (strValue != "")
        {
            iValue = parseInt(strValue, 10);
        }
    }
    catch (e)
    {
        iValue = 0;
    }

    return iValue;
}


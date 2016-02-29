/**
 * Created by mpengelly on 2/29/2016.
 */
var testjson = "{\"error\":null,\"response\":{\"id\":\"f8bdcbc5-5fda-4446-bfe1-38b32ed948f3\",\"active\":true,\"text\":\"<%subject%>\\r\\n\\r\\nThis Email is a Reply to Your Inquiry Made on %DATE%\\r\\n\\r\\n%DEALERSHIP%\\r\\n\\r\\nThank You for Contacting %DEALERSHIP%.\\r\\n\\t\\t\\t<%body%>\\r\\n\\r\\nSincerely,\\r\\n\\r\\n%rep%\\r\\n\\r\\n%rep_role% @ %DEALERSHIP%\\r\\n\\r\\n%REP_PHONE% | %REP_EMAIL%\\r\\n\\r\\nSpecs for\\r\\n\\t\\t\\t\\t\\t\\t%car%\\r\\n\\r\\nPrice\\r\\n\\t\\t\\t\\t\\t\\t$ %price%\\r\\n\\t\\t\\t\\t\\t\\tStock #\\r\\n\\t\\t\\t\\t\\t\\t%stock_num%\\r\\n\\r\\nMileage\\r\\n\\t\\t\\t\\t\\t\\t%mileage%\\r\\n\\t\\t\\t\\t\\t\\tPassengers\\r\\n\\t\\t\\t\\t\\t\\t%passengers%\\r\\n\\r\\nTransmission\\r\\n\\t\\t\\t\\t\\t\\t%transmission%\\r\\n\\t\\t\\t\\t\\t\\tColours\\r\\n\\t\\t\\t\\t\\t\\tExterior: %ext_colour%\\r\\n\\r\\nInterior: %int_colour%\\r\\n\\r\\n%FB%\\r\\n\\t\\t\\t\\t\\t\\t%TW%\\r\\n\\t\\t\\t\\t\\t\\t%Gplus%\\r\\n\\t\\t\\t\\t\\t\\t%email%\\r\\n\\t\\t\\t\\t\\t\\t%WWW%\\r\\n\\r\\nThis Email is from:\\r\\n\\r\\n%DEALER_ADDRESS_FULL%\\r\\n\\r\\n%DEALERSHIP%\\r\\n\\r\\n%DEALER_PHONE%\",\"html\":\"<!DOCTYPE html PUBLIC \\\"-\/\/W3C\/\/DTD XHTML 1.0 Strict\/\/EN\\\" \\\"http:\/\/www.w3.org\/TR\/xhtml1\/DTD\/xhtml1-strict.dtd\\\">\\r\\n<html>\\r\\n<head>\\r\\n\\t<title>&lt;%subject%&gt;<\/title>\\r\\n<\/head>\\r\\n<body>\\r\\n<style type=\\\"text\/css\\\">#EmailTemplate td {\\r\\n padding: 5px 3px;\\r\\n vertical-align: top;\\r\\n text-align: left;\\r\\n\\r\\n }\\r\\n #EmailTemplate h3 {\\r\\n font-size: 1.6em;\\r\\n font-weight: 600;\\r\\n margin-top: 15px;\\r\\n margin-bottom: 20px;\\r\\n }\\r\\n #EmailTemplate h4 {\\r\\n font-size: 1.2em;\\r\\n font-weight: 600;\\r\\n margin-top: 22px;\\r\\n margin-bottom: 0;\\r\\n }\\r\\n #EmailTemplate h5 {\\r\\n font-size: 0.8em;\\r\\n font-weight: 400;\\r\\n margin-top: 5px;\\r\\n margin-bottom: 0;\\r\\n }\\r\\n #EmailTemplate p {\\r\\n font-size: 1.0em;\\r\\n font-weight: 200;\\r\\n margin-top: 8px;\\r\\n margin-bottom: 8px;\\r\\n }\\r\\n #EmailTemplate {\\r\\n font-family: \'sans-serif\', Arial;\\r\\n border-collapse: collapse;\\r\\n border-spacing: 0;\\r\\n }\\r\\n #EmailTemplate * {\\r\\n box-sizing: border-box;\\r\\n }\\r\\n<\/style>\\r\\n<table id=\\\"EmailTemplate\\\" style=\\\"margin: auto; width: 675px; min-width: 675px; font-size: 16px; border: solid black 1px; background-color: rgb(233, 233, 233)\\\" width=\\\"675\\\">\\r\\n\\t<tbody>\\r\\n\\t\\t<tr><!-- top -->\\r\\n\\t\\t\\t<td height=\\\"20\\\" style=\\\"height: 20px; font-size: 0.6em; text-align: center\\\">This Email is a Reply to Your Inquiry Made on %DATE%<\/td>\\r\\n\\t\\t<\/tr>\\r\\n\\t\\t<tr><!-- Header -->\\r\\n\\t\\t\\t<td height=\\\"108\\\" style=\\\"height: 108px; font-size: 1.8em; text-align: center; background-color: black; color: white; vertical-align: middle\\\">%DEALERSHIP%<\/td>\\r\\n\\t\\t<\/tr>\\r\\n\\t\\t<tr><!-- Body -->\\r\\n\\t\\t\\t<td height=\\\"200\\\" style=\\\"min-height: 200px; font-size: 1.0em; text-align: left; padding: 10px\\\">\\r\\n\\t\\t\\t<h3>Thank You for Contacting %DEALERSHIP%.<\/h3>\\r\\n\\t\\t\\t<%body%>\\r\\n\\r\\n\\t\\t\\t<p>Sincerely,<\/p>\\r\\n\\r\\n\\t\\t\\t<h4>%rep%<\/h4>\\r\\n\\r\\n\\t\\t\\t<h5>%rep_role% @ %DEALERSHIP%<\/h5>\\r\\n\\r\\n\\t\\t\\t<h5>%REP_PHONE% | %REP_EMAIL%<\/h5>\\r\\n\\t\\t\\t<\/td>\\r\\n\\t\\t<\/tr>\\r\\n\\t\\t<tr><!-- Specs -->\\r\\n\\t\\t\\t<td style=\\\"margin: 0; padding: 0\\\">\\r\\n\\t\\t\\t<table style=\\\"text-align: left; width: 672px; font-size: 14px; margin-top: 20px; font-family: \'sans-serif\', Arial; \\\">\\r\\n\\t\\t\\t\\t<tbody>\\r\\n\\t\\t\\t\\t\\t<tr style=\\\"text-align: left; width: 672px;\\\">\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"width: 10%\\\">&nbsp;<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"font-weight: 600; text-align: right\\\">Specs for<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td colspan=\\\"3\\\">%car%<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"width: 10%\\\">&nbsp;<\/td>\\r\\n\\t\\t\\t\\t\\t<\/tr>\\r\\n\\t\\t\\t\\t\\t<tr style=\\\"text-align: left; width: 672px;\\\">\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"width: 10%\\\">&nbsp;<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"font-weight: 600; text-align: right\\\">Price<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td>$ %price%<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"font-weight: 600; text-align: right\\\">Stock #<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td>%stock_num%<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"width: 10%\\\">&nbsp;<\/td>\\r\\n\\t\\t\\t\\t\\t<\/tr>\\r\\n\\t\\t\\t\\t\\t<tr style=\\\"text-align: left; width: 672px;\\\">\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"width: 10%\\\">&nbsp;<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"font-weight: 600; text-align: right\\\">Mileage<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td>%mileage%<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"font-weight: 600; text-align: right\\\">Passengers<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td>%passengers%<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"width: 10%\\\">&nbsp;<\/td>\\r\\n\\t\\t\\t\\t\\t<\/tr>\\r\\n\\t\\t\\t\\t\\t<tr style=\\\"text-align: left; width: 672px;\\\">\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"width: 10%\\\">&nbsp;<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"font-weight: 600; text-align: right\\\">Transmission<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td>%transmission%<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"font-weight: 600; text-align: right\\\">Colours<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td>Exterior: %ext_colour%<br \/>\\r\\n\\t\\t\\t\\t\\t\\tInterior: %int_colour%<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"width: 10%\\\">&nbsp;<\/td>\\r\\n\\t\\t\\t\\t\\t<\/tr>\\r\\n\\t\\t\\t\\t<\/tbody>\\r\\n\\t\\t\\t<\/table>\\r\\n\\t\\t\\t<\/td>\\r\\n\\t\\t<\/tr>\\r\\n\\t\\t<tr><!-- Footer -->\\r\\n\\t\\t\\t<td style=\\\"margin: 0; padding: 0\\\">\\r\\n\\t\\t\\t<table style=\\\"width: 672px; text-align: center; margin-top: 20px; font-family: \'sans-serif\', Arial;\\\">\\r\\n\\t\\t\\t\\t<tbody>\\r\\n\\t\\t\\t\\t\\t<tr style=\\\"height: 25px; width: 100%; margin: auto\\\">\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"width: 20%; text-align: center\\\">%FB%<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"width: 20%; text-align: center\\\">%TW%<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"width: 20%; text-align: center\\\">%Gplus%<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"width: 20%; text-align: center\\\">%email%<\/td>\\r\\n\\t\\t\\t\\t\\t\\t<td style=\\\"width: 20%; text-align: center\\\">%WWW%<\/td>\\r\\n\\t\\t\\t\\t\\t<\/tr>\\r\\n\\t\\t\\t\\t<\/tbody>\\r\\n\\t\\t\\t<\/table>\\r\\n\\r\\n\\t\\t\\t<table style=\\\"margin-top: 15px; font-family: \'sans-serif\', Arial;\\\">\\r\\n\\t\\t\\t\\t<tbody>\\r\\n\\t\\t\\t\\t\\t<tr style=\\\"height: 25px; width: 672px; font-size: 12px\\\">\\r\\n\\t\\t\\t\\t\\t\\t<td>\\r\\n\\t\\t\\t\\t\\t\\t<p><strong>This Email is from:<\/strong><\/p>\\r\\n\\r\\n\\t\\t\\t\\t\\t\\t<p>%DEALER_ADDRESS_FULL%<\/p>\\r\\n\\r\\n\\t\\t\\t\\t\\t\\t<p>%DEALERSHIP%<\/p>\\r\\n\\r\\n\\t\\t\\t\\t\\t\\t<p>%DEALER_PHONE%<\/p>\\r\\n\\t\\t\\t\\t\\t\\t<\/td>\\r\\n\\t\\t\\t\\t\\t<\/tr>\\r\\n\\t\\t\\t\\t<\/tbody>\\r\\n\\t\\t\\t<\/table>\\r\\n\\t\\t\\t<\/td>\\r\\n\\t\\t<\/tr>\\r\\n\\t<\/tbody>\\r\\n<\/table>\\r\\n<\/body>\\r\\n<\/html>\\r\\n\",\"subject\":\"<%subject%>\",\"name\":\"Basic Reply W\/O Images Version 1\",\"tags\":[]},\"request\":{\"method\":\"GET\",\"path\":\"\/api\/email\/templates\/f8bdcbc5-5fda-4446-bfe1-38b32ed948f3\",\"contentType\":\"application\/json\",\"data\":\"{}\"},\"statusCode\":200}";
var Data = {};

Data.json = testjson;
console.log("Original Object");
console.log(JSON.parse(Data.json));

GoodJSON(Data);

function GoodJSON (GoodObject) {
    var Object = JSON.parse(GoodObject.json);
    var Display = {
        Object: function (object) {
            Proc.ObjectData(object);
        },
        Array: function (object) {

        }

    };
    var Proc = {
      ObjectData: function (object){
            for (var item in object){
                var subitem = object[item];
                var type = typeof subitem;
                if (type != "object"){
                    console.log("%c---------------------------------", "color:black; font-size: 11pt; font-weight: bold");
                    console.log("%cType: " + type + " - Key: " + item + " - Value: " + subitem, "color:purple; font-size: 14pt; font-weight: bold");
                    console.log("%c---------------------------------", "color:black; font-size: 11pt; font-weight: bold");
                } else {
                    if (subitem != null){
                    if (!Array.isArray(subitem)){
                        console.log("%cType: object - Key: " + item, "color:white; background:blue; font-size: 14pt; font-weight: bold");
                        console.log("%cV-V-V-V-V-V-V-V-V-V-V-V-V-V-V-V-V", "color:blue; font-size: 11pt; font-weight: bold");
                        console.log("%c"+Proc.ObjectData(subitem),"color:blue; font-size: 11pt; font-weight: bold");
                        console.log("%c---------------------------------", "color:blue; font-size: 11pt; font-weight: bold");
                    } else {
                        console.log("%cA-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A", "color:green; font-size: 11pt; font-weight: bold");
                        console.log("%cType: array - Key: " + item, "color:white; background:green; font-size: 14pt; font-weight: bold");
                        //console.log(subitem);
                        console.log("%c---------------------------------", "color:green; font-size: 11pt; font-weight: bold");
                    }
                    } else {
                        console.log("%c---------------------------------", "color:red; font-size: 11pt; font-weight: bold");
                        console.log("%cType: NULL - Key: " + item, "color:red; font-size: 14pt; font-weight: bold");
                        console.log("%c---------------------------------", "color:red; font-size: 11pt; font-weight: bold");
                    }

                }
            }
          return "---------------------------------";
        },

        Validate: function (object){
            if (typeof Object != "object") {
                console.log(typeof Object + " != Object ... !!ERROR!! Not Valid JSON");
            } else {
                if (!Array.isArray(Object)) {
                    console.log("%c----- OBJECT -------", "color:white; background:blue; font-size: 24pt; font-weight: bold");
                    console.log("%cV-V-V-V-V-V-V-V-V-V-V-V-V-V-V-V-V", "color:blue; font-size: 11pt; font-weight: bold");
                    Display.Object(Object);
                    console.log("%c----- OBJECT -------", "color:white; background:black; font-size: 18pt; font-weight: bold");
                } else {
                    console.log("True .. Must Be Array");
                    Display.Array(Object);
                }
            }
        }

    };
    Proc.Validate(GoodObject);
}
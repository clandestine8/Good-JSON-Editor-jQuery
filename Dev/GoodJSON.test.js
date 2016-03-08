/**
 * Created by mpengelly on 2/29/2016.
 */
var testjson = "[ { \"id\": \"0001\", \"type\": \"donut\", \"name\": \"Cake\", \"ppu\": 0.55, \"batters\": { \"batter\": [ { \"id\": \"1001\", \"type\": \"Regular\" }, { \"id\": \"1002\", \"type\": \"Chocolate\" }, { \"id\": \"1003\", \"type\": \"Blueberry\" }, { \"id\": \"1004\", \"type\": \"Devil\'s Food\" } ] }, \"topping\": [ { \"id\": \"5001\", \"type\": \"None\" }, { \"id\": \"5002\", \"type\": \"Glazed\" }, { \"id\": \"5005\", \"type\": \"Sugar\" }, { \"id\": \"5007\", \"type\": \"Powdered Sugar\" }, { \"id\": \"5006\", \"type\": \"Chocolate with Sprinkles\" }, { \"id\": \"5003\", \"type\": \"Chocolate\" }, { \"id\": \"5004\", \"type\": \"Maple\" } ] }, { \"id\": \"0002\", \"type\": \"donut\", \"name\": \"Raised\", \"ppu\": 0.55, \"batters\": { \"batter\": [ { \"id\": \"1001\", \"type\": \"Regular\" } ] }, \"topping\": [ { \"id\": \"5001\", \"type\": \"None\" }, { \"id\": \"5002\", \"type\": \"Glazed\" }, { \"id\": \"5005\", \"type\": \"Sugar\" }, { \"id\": \"5003\", \"type\": \"Chocolate\" }, { \"id\": \"5004\", \"type\": \"Maple\" } ] }, { \"id\": \"0003\", \"type\": \"donut\", \"name\": \"Old Fashioned\", \"ppu\": 0.55, \"batters\": { \"batter\": [ { \"id\": \"1001\", \"type\": \"Regular\" }, { \"id\": \"1002\", \"type\": \"Chocolate\" } ] }, \"topping\": [ { \"id\": \"5001\", \"type\": \"None\" }, { \"id\": \"5002\", \"type\": \"Glazed\" }, { \"id\": \"5003\", \"type\": \"Chocolate\" }, { \"id\": \"5004\", \"type\": \"Maple\" } ] } ]";
var Data = {};
Data.json = testjson;
console.log("Original Object");
console.log(JSON.parse(Data.json));

GoodJSON(Data);

function GoodJSON (GoodObject) {
    var depth = 1;
    var Object = JSON.parse(GoodObject.json);
    var Display = {
        Object: function (object,guid) {
            Proc.ObjectData(object,guid);
        },
        Buttons: {
            all: function () {
                Display.Buttons.expand();
                            },
            expand: function () {
                $(".expand").bind("click",function () {

                    var id = $(this).attr("xguid");
                    console.log($(this).attr("xopen"));
                    if ($(this).attr("xopen") === "false") {
                        $(this).empty().text("remove_circle");
                        $(this).attr("xopen", "true");
                        console.log(id);
                        $("[xsub=" + id + "]").show();
                    } else {
                        $(this).empty().text("add_circle");
                        $(this).attr("xopen", "false");
                        console.log(id);
                        $("[xsub=" + id + "]").hide();
                    }

                });
            }
            }
        };

    var Proc = {
      ObjectData: function (object, sub){
            depth++;
            for (var item in object){
                var subitem = object[item];
                var type = typeof subitem;
                var bgColorAdd = 221 - (40*depth);
                var shift = 100 - (2*(depth-1));
                var guid = Proc.GUID();
                if (type != "object"){
                    //VALUE (NUMBER, STRING, ETC)
                    var $temp = $('<div />',{html:$("gjtemplate sub").html()});
                    console.log("SHIFT: "+ shift);
                    $temp.find(".sub").append($("gjtemplate value").html());
                    $temp.find(".GJcard").attr("xguid",guid);
                    $temp.find(".sub").attr('style',"width:"+ shift + "%;");
                    $temp.find(".sub").attr('xsub',sub);
                    if (bgColorAdd < 45){
                        $temp.find(".GJcard").css({"background-color": "rgb(" + bgColorAdd + ", " + bgColorAdd + "," + bgColorAdd + ")", "color": "rgb(221,221,221)"});
                    } else {
                        $temp.find(".GJcard").css({"background-color": "rgb(" + bgColorAdd + ", " + bgColorAdd + "," + bgColorAdd + ")"});
                    }
                    $temp.find(".GJtype").text(type);
                    $temp.find(".GJkey").text(item);
                    $temp.find(".GJvalue").text(subitem);
                    $("#GJObject").append($temp.html());
                } else {
                    if (subitem != null){
                    if (!Array.isArray(subitem)){
                        //CLASS OR OBJECT
                        var $temp = $('<div />',{html:$("gjtemplate sub").html()});
                        $temp.find(".sub").attr("style","width:"+ shift + "%;");
                        $temp.find(".sub").append($("gjtemplate object").html());

                        $temp.find(".sub").attr("xsub",sub);
                        $temp.find(".GJcard").attr("xguid",guid);
                        $temp.find(".expand").attr("xguid",guid);

                        if (bgColorAdd < 45){
                            $temp.find(".GJcard").css({"background-color": "rgb(" + bgColorAdd + ", " + bgColorAdd + "," + bgColorAdd + ")", "color": "rgb(221,221,221)"});
                        } else {
                            $temp.find(".GJcard").css({"background-color": "rgb(" + bgColorAdd + ", " + bgColorAdd + "," + bgColorAdd + ")"});
                        }
                        $temp.find(".GJtype").text("{Class}");
                        $temp.find(".GJkey").text(item);
                        $("#GJObject").append($temp.html());
                        Proc.ObjectData(subitem,guid);
                    } else {

                        //ARRAY
                        var $temp = $('<div />',{html:$("gjtemplate sub").html()});
                        $temp.find(".sub").attr("style","width:"+ shift + "%;");
                        $temp.find(".sub").append($("gjtemplate object").html());
                        $temp.find(".sub").attr("xsub",sub);
                        $temp.find(".GJcard").attr("xguid",guid);
                        $temp.find(".expand").attr("xguid",guid);
                        if (bgColorAdd < 45){
                            $temp.find(".GJcard").css({"background-color": "rgb(" + bgColorAdd + ", " + bgColorAdd + "," + bgColorAdd + ")", "color": "rgb(221,221,221)"});
                        } else {
                            $temp.find(".GJcard").css({"background-color": "rgb(" + bgColorAdd + ", " + bgColorAdd + "," + bgColorAdd + ")"});
                        }
                        $temp.find(".GJtype").text("[Array]");
                        $temp.find(".GJkey").text(item);
                        $temp.find(".GJvalue").text(subitem);
                        $("#GJObject").append($temp.html());
                        Proc.ObjectData(subitem,guid);
                    }
                    } else {

                        //NULL
                        var $temp = $('<div />',{html:$("gjtemplate sub").html()});
                        console.log("SHIFT: "+ shift);
                        $temp.find(".sub").attr("style","width:"+ shift + "%;");
                        $temp.find(".sub").append($("gjtemplate value").html());

                        $temp.find(".sub").attr("xsub",sub);
                        $temp.find(".GJcard").attr("xguid",guid);

                        if (bgColorAdd < 45){
                            $temp.find(".GJcard").css({"background-color": "rgb(" + bgColorAdd + ", " + bgColorAdd + "," + bgColorAdd + ")", "color": "rgb(221,221,221)"});
                        } else {
                            $temp.find(".GJcard").css({"background-color": "rgb(" + bgColorAdd + ", " + bgColorAdd + "," + bgColorAdd + ")"});
                        }
                        $temp.find(".GJtype").html('<i>null</i>');
                        $temp.find(".GJkey").text(item);
                        $temp.find(".GJvalue").html('<i>null</i>');
                        $("#GJObject").append($temp.html());
                    }

                }
            }
          depth--;
          //return  "---------------------------------";
        },

        Validate: function (object){
            if (typeof Object != "object") {
                console.log(typeof Object + " != Object ... !!ERROR!! Not Valid JSON");
            } else {
                if (!Array.isArray(Object)) {
                    var $temp = $('<div />',{html:$("gjtemplate object").html()});
                    var guid = Proc.GUID();
                    $temp.find(".GJcard").attr("xguid",guid);
                    $temp.find(".GJtype").text("{Class}");
                    $temp.find(".GJkey").text("-- JSON --");
                    $temp.find(".expand").attr("xguid",guid);
                    $("#GJObject").append($temp.html());
                    Display.Object(Object,guid);
                } else {
                    var $temp = $('<div />',{html:$("gjtemplate object").html()});
                    var guid = Proc.GUID();
                    $temp.find(".GJcard").attr("xguid",guid);
                    $temp.find(".GJtype").text("[Array]");
                    $temp.find(".GJkey").text("-- JSON --");
                    $temp.find(".expand").attr("xguid",guid);
                    $("#GJObject").append($temp.html());
                    Display.Object(Object,guid);
                }
            }
            $(".sub").hide();
            Display.Buttons.all();
        },
        GUID: function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

    };
    Proc.Validate(GoodObject);
}
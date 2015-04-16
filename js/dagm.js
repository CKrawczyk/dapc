var p=0;
var i=1;
$.getJSON("Alice_save.json", function(data){
    var tr_name=$("<tr></tr>").addClass("treegrid-"+i+" no-bot-line").appendTo($("#overview_body"));
    var td1=$("<td></td>").html(data["text"]["name"]).appendTo(tr_name);
    var td2=$("<td></td>").appendTo(tr_name);
    var td3=$("<td></td>").appendTo(tr_name);
    var init_box=$("<input>").addClass("form-control input-sm init").attr("type","text").appendTo(td3);
    var td4=$("<td></td>").appendTo(tr_name).html('<a class="close">&times;</a>');
    p=i
    i+=1

    var tr_stat=$("<tr></tr>").addClass("treegrid-"+i).appendTo($("#overview_body"));
    var td2=$("<td></td>").attr("colspan","4").appendTo(tr_stat);
    var com=stat_span(data).appendTo(td2);
    i+=1
    
    var tr_e1=$("<tr></tr>").addClass("treegrid-"+i+" treegrid-parent-"+p).appendTo($("#overview_body"));
    var td1=$("<td></td>").html("Class").appendTo(tr_e1);
    var td2=$("<td></td>").attr("colspan","3").html(data["select"]["class"]).appendTo(tr_e1);
    i+=1

    var tr_e2=$("<tr></tr>").addClass("treegrid-"+i+" treegrid-parent-"+p).appendTo($("#overview_body"));
    var td1=$("<td></td>").html("Gender").appendTo(tr_e2);
    var td2=$("<td></td>").attr("colspan","3").html(data["select"]["gender"]).appendTo(tr_e2);
    i+=1

    var tr_e3=$("<tr></tr>").addClass("treegrid-"+i+" treegrid-parent-"+p).appendTo($("#overview_body"));
    var td1=$("<td></td>").html("Age").appendTo(tr_e3);
    var td2=$("<td></td>").attr("colspan","3").html(data["text"]["age"]).appendTo(tr_e3);
    i+=1

    var tr_e4=$("<tr></tr>").addClass("treegrid-"+i+" treegrid-parent-"+p).appendTo($("#overview_body"));
    var td1=$("<td></td>").html("Race").appendTo(tr_e4);
    var td2=$("<td></td>").attr("colspan","3").html(data["select"]["race"]).appendTo(tr_e4);
    i+=1

    var tr_e5=$("<tr></tr>").addClass("treegrid-"+i+" treegrid-parent-"+p).appendTo($("#overview_body"));
    var td1=$("<td></td>").html("Talents").appendTo(tr_e5);
    var tal=[]
    $.each(talent_names, function(idx, value) {
        var v=value.toLowerCase();
        v=v.replace(".","");
        v=v.replace(" ","_");
        if (data["checkbox"][v]) {
            tal.push(value)
        }
    }); 
    var td2=$("<td></td>").attr("colspan","3").html(tal.join(", ")).appendTo(tr_e5);
    i+=1

    var tr_e6=$("<tr></tr>").addClass("treegrid-"+i+" treegrid-parent-"+p).appendTo($("#overview_body"));
    var td1=$("<td></td>").html("Powers").appendTo(tr_e6);
    var pow=[]
    for (var i=0; i<15; i++) {
        var v="class_power_"+pad(i+1);
        var value=data["text"][v];
        if (value) {
            pow.push(value)
        }
    } 
    var td2=$("<td></td>").attr("colspan","3").html(pow.join(", ")).appendTo(tr_e6);
    i+=1

    var tr_e7=$("<tr></tr>").addClass("treegrid-"+i+" treegrid-parent-"+p).appendTo($("#overview_body"));
    var td1=$("<td></td>").html("Lang.").appendTo(tr_e7);
    var lag=[]
    for (var i=0; i<12; i++) {
        var v="language_"+pad(i+1);
        var value=data["text"][v];
        if (value) {
            lag.push(value)
        }
    } 
    var td2=$("<td></td>").attr("colspan","3").html(lag.join(", ")).appendTo(tr_e7);
    i+=1
    
    $('#overview_tree').treegrid({
        'initialState': 'collapsed'
    });
});

var stat_name={
    "communication_value": "com",
    "constitution_value": "con",
    "cunning_value": "cun",
    "dexterity_value": "dex",
    "magic_value": "mag",
    "perception_value": "per",
    "strength_value": "str",
    "willpower_value": "wil"
}

var talent_names=["Axes", "Bludg.", "Bows", "Brawl","H blades", "L blades", "Spears", "Staves"]

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function stat_span(data) {
    var div=$("<div></div>").css("display","inline-table");
    $.each(stat_name, function(key,value) {
        var circle=$("<div></div>").addClass("stat-circle").css("display","inline-table").css("text-align","center").appendTo(div);
        var s1=$("<span></span>").addClass("stat-name").html(value).appendTo(circle);
        var br=$("<br>").appendTo(circle);
        var s2=$("<span></span>").addClass("stat-value").html(data["text"][key]).appendTo(circle);
    });
    return div
}

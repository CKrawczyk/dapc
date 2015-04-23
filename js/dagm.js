var i=1;
var p=0;
var all_spells;
$.getJSON("./js/spells.json", function(data) {
    all_spells=data;
    //$.getJSON("Alice_save.json", add_foe);
});
          
//$.getJSON("Alice_save.json", add_player);

function add_player(data) {
    var body=$("#overview_body_player")
    var tr_name=$("<tr></tr>").addClass("treegrid-"+i+" no-bot-line top-line").appendTo(body)
        .on("mouseover", row_mouse_over)
        .on("mouseout", row_mouse_out);
    var td1=$("<td></td>").appendTo(tr_name);
    var bold=$("<b></b>").appendTo(td1);
    var name_span=$("<span></span>").addClass("name").html(data["text"]["name"]).appendTo(bold);
    var td2=$("<td></td>").addClass("title").html(data["text"]["defense"]).appendTo(tr_name);
    var td2=$("<td></td>").addClass("title").html(data["text"]["armor"]).appendTo(tr_name);
    var td2=$("<td></td>").addClass("title").html(data["text"]["speed"]).appendTo(tr_name);
    var td3=$("<td></td>").appendTo(tr_name);
    var init_box=$("<input>").addClass("form-control input-sm init").attr("type","text").attr("id","player_init_"+p).appendTo(td3);
    var td4=$("<td></td>").appendTo(tr_name).html('<a onclick="remove_player(this);" class="close close-player">&times;</a>');
    p=i;
    i+=1;
    var tr_stat=$("<tr></tr>").addClass("treegrid-"+i+" stat-parent-"+p).appendTo(body)
        .on("mouseover", row_mouse_over)
        .on("mouseout", row_mouse_out);
    var td2=$("<td></td>").attr("colspan","6").appendTo(tr_stat);
    var com=stat_span(data).appendTo(td2);
    i+=1;
    grab(data,i,p,"Class","class","select").appendTo(body);
    i+=1;
    grab(data,i,p,"Level","level","text").appendTo(body);
    i+=1;
    grab(data,i,p,"Gender","gender","select").appendTo(body);
    i+=1;
    grab(data,i,p,"Age","age","text").appendTo(body);
    i+=1;
    grab(data,i,p,"Race","race","select").appendTo(body);
    i+=1;
    talent_grab(data,i,p).appendTo(body);
    i+=1;
    list_grab(data,i,p,"Powers","class_power_",15).appendTo(body);
    i+=1;
    list_grab(data,i,p,"Lang.","language_",12).appendTo(body);
    i+=1;
    $('#overview_tree_palyer').treegrid({
        'initialState': 'collapsed'
    });
}

function add_foe(data,number) {
    var body=$("#overview_body_foe")
    var tr_name=$("<tr></tr>").addClass("treegrid-"+i+" no-bot-line top-line").appendTo(body)
        .on("mouseover", row_mouse_over)
        .on("mouseout", row_mouse_out);
    var td1=$("<td></td>").appendTo(tr_name);
    var bold=$("<b></b>").appendTo(td1);
    var name_span=$("<span></span>").addClass("name").html(data["text"]["name"]).appendTo(bold);
    var td2=$("<td></td>").addClass("title").html(data["text"]["defense"]).appendTo(tr_name);
    var td2=$("<td></td>").addClass("title").html(data["text"]["armor"]).appendTo(tr_name);
    var td2=$("<td></td>").addClass("title").html(data["text"]["speed"]).appendTo(tr_name);
    var td3=$("<td></td>").appendTo(tr_name);
    var init_box=$("<input>").addClass("form-control input-sm init").attr("type","text").attr("id","player_init_"+p).appendTo(td3);
    var td4=$("<td></td>").appendTo(tr_name).html('<a onclick="remove_player(this);" class="close close-player">&times;</a>');
    p=i;
    i+=1;
    health_grab(data,i,p).appendTo(body);
    i+=1;
    if (data["text"]["mana_max"]) {
        mana_grab(data,i,p).appendTo(body);
        i+=1;
    }
    var tr_stat=$("<tr></tr>").addClass("treegrid-"+i+" stat-parent-"+p+" no-bot-line").appendTo(body)
        .on("mouseover", row_mouse_over)
        .on("mouseout", row_mouse_out);
    var td2=$("<td></td>").attr("colspan","6").appendTo(tr_stat);
    var com=stat_span(data).appendTo(td2);
    i+=1;
    grab_weapons(data,i,p,body);
    i+=1;
    if (data["select"]["class"]=="Mage") {
        grap_spells(data,i,p,body);
    }
    i+=1;
    grab(data,i,p,"Class","class","select").appendTo(body);
    i+=1;
    grab(data,i,p,"Level","level","text").appendTo(body);
    i+=1;
    grab(data,i,p,"Gender","gender","select").appendTo(body);
    i+=1;
    grab(data,i,p,"Age","age","text").appendTo(body);
    i+=1;
    grab(data,i,p,"Race","race","select").appendTo(body);
    i+=1;
    talent_grab(data,i,p).appendTo(body);
    i+=1;
    list_grab(data,i,p,"Powers","class_power_",15).appendTo(body);
    i+=1;
    list_grab(data,i,p,"Lang.","language_",12).appendTo(body);
    i+=1;
    list_grab(data,i,p,"Equip.","equipment_",18).appendTo(body);
    i+=1;
    note_grab(data,i,p,"Notes","notes").appendTo(body);
    i+=1;
    //var tr_blank=$("<tr></tr>").addClass("treegrid-"+i+" stat-parent-"+p).appendTo(body);
    //var td_blank=$("<td></td>").attr("colspan","6").appendTo(tr_blank).attr("height","1").css("line-height","1px");
    //i+=1;
    $('#overview_tree_foe').treegrid({
        'initialState': 'collapsed'
    });
}

var stat_name={
    "communication": "com",
    "constitution": "con",
    "cunning": "cun",
    "dexterity": "dex",
    "magic": "mag",
    "perception": "per",
    "strength": "str",
    "willpower": "wil"
}

var talent_names=["Axes", "Bludg.", "Bows", "Brawl","H blades", "L blades", "Spears", "Staves"]

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

// Upload save file (json)
$("#add_player").on("click", function() {
    $("#player_upload").click();
})

$("#player_upload").on("change", function() {
    $.each(this.files, function(idx,file) {
        if (file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                var dataText = evt.target.result;
                var input_json = JSON.parse(dataText);
                add_player(input_json);
            };
            reader.readAsText(file);
        };
    });
});

$("#add_foe").on("click", function() {
    $("#add_foe_value").val(1);
    if ($("#foe_multi").prop("checked")) {
        $("#foe_modal").modal("show");
    } else {
        $("#foe_upload").click();
    }
});

$("#upload_foe").on("click", function() {
    $("#foe_upload").click();
});

$("#foe_upload").on("change", function() {
    $.each(this.files, function(idx,file) {
        if (file) {
            var reader = new FileReader();
            var foe_number = $("#add_foe_value").val();
            reader.onloadend = function(evt) {
                var dataText = evt.target.result;
                var input_json = JSON.parse(dataText);
                if (foe_number>1) {
                    var original_name = input_json["text"]["name"]               
                    for (var f=0; f<foe_number; f++) {
                        input_json["text"]["name"]=original_name+" "+(f+1);
                        add_foe(input_json);
                    }
                } else {
                    add_foe(input_json);
                }
            };
            reader.readAsText(file);
        };
    });
    $("#add_foe_value").val(1);
});

function remove_player(el) {
    var me=$(el);
    var me_class=me.parent().parent().attr("class").split(" ")
    var i=me_class[0].split("-")[1];
    $(".treegrid-parent-"+i).remove();
    $(".stat-parent-"+i).remove();
    $(".treegrid-"+i).remove();
    if (init_list.length>0) {
        var value=init_list[0];
        $(".treegrid-"+value[2]).removeClass("active-row");
        $(".treegrid-parent-"+value[2]).removeClass("active-row");
        $(".stat-parent-"+value[2]).removeClass("active-row");
        
        var idx_remove="";
        $.each(init_list, function(idx,value2) {
            if (value2[2]==i) {
                idx_remove=idx;
            }
        });
        init_list.splice(idx_remove,1);
        $("#init_body").html("");
        add_init(init_list);
    }
};

function stat_span(data) {
    var div=$("<div></div>").css("display","inline-table");
    $.each(stat_name, function(key,value) {
        var circle=$("<div></div>").addClass("stat-circle").css("display","inline-table").css("text-align","center").appendTo(div);
        var s1=$("<span></span>").addClass("stat-name").html(value).appendTo(circle);
        var br=$("<br>").appendTo(circle);
        var s2=$("<span></span>").addClass("stat-value").html(data["text"][key+"_value"]).appendTo(circle);
        circle.on("mouseover", function(event) {
            var focus=[];
            for (var i=0; i<16; i++) {
                var f=data["text"][key+"_"+pad(i+1)];
                if (f) {
                    focus.push(f);
                }
            }
            if (focus.length>0) {
                $("#mouseover").html(focus.join(", ")).removeClass("hidden").css("left",event.pageX+10+"px").css("top",event.pageY-20+"px");
            }
        });
        circle.on("mousemove", function(event) {
            $("#mouseover").css("left",event.pageX+10+"px").css("top",event.pageY-20+"px");
        })
        circle.on("mouseout", function(event) {
            $("#mouseover").html("").addClass("hidden");
        })
    });
    return div
}

function grab(data,i,p,label,key,type) {
    var tr_e=$("<tr></tr>").addClass("treegrid-"+i+" treegrid-parent-"+p)
        .on("mouseover", row_mouse_over)
        .on("mouseout", row_mouse_out);
    var td1=$("<td></td>").html(label).appendTo(tr_e);
    var td2=$("<td></td>").attr("colspan","5").html(data[type][key]).appendTo(tr_e);
    return tr_e;
}

function note_grab(data,i,p,label,key) {
    var tr_e=$("<tr></tr>").addClass("treegrid-"+i+" treegrid-parent-"+p)
        .on("mouseover", row_mouse_over)
        .on("mouseout", row_mouse_out);
    var td1=$("<td></td>").html(label).appendTo(tr_e);
    var td2=$("<td></td>").attr("colspan","5").html(data[key].replace(/(?:\r\n|\r|\n)/g, '<br />')).appendTo(tr_e);
    return tr_e;
}

function list_grab(data,i,p,label,key,N) {
    var tr_e=$("<tr></tr>").addClass("treegrid-"+i+" treegrid-parent-"+p)
        .on("mouseover", row_mouse_over)
        .on("mouseout", row_mouse_out);
    var td1=$("<td></td>").html(label).appendTo(tr_e);
    var lst=[]
    for (var i=0; i<N; i++) {
        var v=key+pad(i+1);
        var value=data["text"][v];
        if (value) {
            lst.push(value)
        }
    } 
    var td2=$("<td></td>").attr("colspan","5").html(lst.join(", ")).appendTo(tr_e);
    return tr_e;
}

function talent_grab(data,i,p) {
    var tr_e=$("<tr></tr>").addClass("treegrid-"+i+" treegrid-parent-"+p)
        .on("mouseover", row_mouse_over)
        .on("mouseout", row_mouse_out);
    var td1=$("<td></td>").html("Talents").appendTo(tr_e);
    var tal=[]
    $.each(talent_names, function(idx, value) {
        var v=value.toLowerCase();
        v=v.replace(".","");
        v=v.replace(" ","_");
        if (data["checkbox"][v]) {
            tal.push(value)
        }
    }); 
    var td2=$("<td></td>").attr("colspan","5").html(tal.join(", ")).appendTo(tr_e);
    return tr_e;
}

function health_grab(data,i,p) {
    var tr_e=$("<tr></tr>").addClass("treegrid-"+i+" stat-parent-"+p+" no-bot-line")
        .on("mouseover", row_mouse_over)
        .on("mouseout", row_mouse_out);
    var td1=$("<td></td>").html("Health").appendTo(tr_e);
    var health_html=data["text"]["health_current"]+"/"+data["text"]["health_max"];
    var td2=$("<td></td>").addClass("health-counter").html(health_html).appendTo(tr_e);
    var td3=$("<td></td>").appendTo(tr_e);
    var ar_button=$("<button></button>")
        .addClass("btn btn-xs btn-default health-button")
        .attr({"type":"button","data-toggle":"popover"})
        .css("width","100%")
        .html("±")
        .appendTo(td3)
        .popover({
            html: true,
            placement: "bottom",
            container: "body",
            content: function() {
                return $("#popover_health_mana_body").html();
            },
            title: "Add/Remove Health"
        })
        .on("shown.bs.popover", function() {
            var button = $(this)
            var pop = button.data('bs.popover').tip()
            var health_text = button.parent().parent().find(".health-counter");
            var health = health_text.html().split("/");
            var health_max = parseInt(health[1]);
            var health_current = parseInt(health[0]);
            var a_r_v=pop.find("#add_remove_value");
            pop.find("#add").on("click", function() {
                var add = parseInt(a_r_v.val()) || 0;
                var health_new = health_current + add
                if (health_new > health_max) {
                    health_new = health_max;
                }
                health_text.html(health_new+"/"+health_max);
                a_r_v.val("");
                button.popover('toggle');
            });
            pop.find("#remove").on("click", function() {
                var remove = parseInt(a_r_v.val()) || 0;
                var health_new = health_current - remove
                if (health_new < 0) {
                    health_new = 0;
                }
                health_text.html(health_new+"/"+health_max);
                a_r_v.val("");
                button.popover('toggle');
            });
        });
    var td4=$("<td></td>").attr("colspan","3").appendTo(tr_e);
    return tr_e;
}

function mana_grab(data,i,p) {
    var tr_e=$("<tr></tr>").addClass("treegrid-"+i+" stat-parent-"+p+" no-bot-line")
        .on("mouseover", row_mouse_over)
        .on("mouseout", row_mouse_out);
    var td1=$("<td></td>").html("Mana").appendTo(tr_e);
    var health_html=data["text"]["mana_current"]+"/"+data["text"]["mana_max"];
    var td2=$("<td></td>").addClass("mana-counter").html(health_html).appendTo(tr_e);
    var td3=$("<td></td>").appendTo(tr_e);
    var ar_button=$("<button></button>")
        .addClass("btn btn-xs btn-default mana-button")
        .attr({"type":"button","data-toggle":"popover"})
        .css("width","100%")
        .html("±")
        .appendTo(td3)
        .popover({
            html: true,
            placement: "bottom",
            container: "body",
            content: function() {
                return $("#popover_health_mana_body").html();
            },
            title: "Add/Remove Mana"
        })
        .on("shown.bs.popover", function() {
            var button = $(this)
            var pop = button.data('bs.popover').tip()
            var mana_text = button.parent().parent().find(".mana-counter");
            var mana = mana_text.html().split("/");
            var mana_max = parseInt(mana[1]);
            var mana_current = parseInt(mana[0]);
            var a_r_v=pop.find("#add_remove_value");
            pop.find("#add").on("click", function() {
                var add = parseInt(a_r_v.val()) || 0;
                var mana_new = mana_current + add
                if (mana_new > mana_max) {
                    mana_new = mana_max;
                }
                mana_text.html(mana_new+"/"+mana_max);
                a_r_v.val("");
                button.popover('toggle');
            });
            pop.find("#remove").on("click", function() {
                var remove = parseInt(a_r_v.val()) || 0;
                var mana_new = mana_current - remove
                if (mana_new < 0) {
                    mana_new = 0;
                }
                mana_text.html(mana_new+"/"+mana_max);
                a_r_v.val("");
                button.popover('toggle');
            });
        });
    var td4=$("<td></td>").attr("colspan","3").appendTo(tr_e);
    return tr_e;
}

function grab_weapons(data,i,p,body) {
    var li = 0;
    var lp = i;
    var tr_e1=$("<tr></tr>").addClass("treegrid-"+i+" stat-parent-"+p).appendTo(body)
        .on("mouseover", row_mouse_over)
        .on("mouseout", row_mouse_out);
    var td1=$("<td></td>").attr("colspan","2").html("Weapon").appendTo(tr_e1);
    var td2=$("<td></td>").html("Attack").appendTo(tr_e1);
    var td3=$("<td></td>").attr("colspan","2").html("Damage").appendTo(tr_e1);
    var td4=$("<td></td>").html("Range").appendTo(tr_e1);
    for (var j=0; j<6; j++) {
        if (data["text"]["weapon_"+pad(j+1)]) {
            var tr_e2=$("<tr></tr>").addClass("treegrid-"+lp+"-"+li+" stat-parent-"+p+" treegrid-parent-"+lp).appendTo(body)
                .on("mouseover", row_mouse_over)
                .on("mouseout", row_mouse_out);
            li+=1;
            var td1=$("<td></td>").attr("colspan","2").html(data["text"]["weapon_"+pad(j+1)]).appendTo(tr_e2);
            var td2=$("<td></td>").html(data["text"]["attack_"+pad(j+1)]).appendTo(tr_e2);
            var td3=$("<td></td>").attr("colspan","2").html(data["text"]["damage_"+pad(j+1)]).appendTo(tr_e2);
            var td4=$("<td></td>").html(data["text"]["range_s_"+pad(j+1)]+"/"+data["text"]["range_l_"+pad(j+1)]).appendTo(tr_e2);
        }
    }    
};

function grap_spells(data,i,p,body) {
    var li=0;
    var lp=i;
    var tr_e1=$("<tr></tr>").addClass("treegrid-"+i+" stat-parent-"+p).appendTo(body)
        .on("mouseover", row_mouse_over)
        .on("mouseout", row_mouse_out);
    var td1=$("<td></td>").attr("colspan","4").html("spell").appendTo(tr_e1);
    var td2=$("<td></td>").html("MP").appendTo(tr_e1);
    var td3=$("<td></td>").html("TN").appendTo(tr_e1);
    var td4=$("<td></td>").appendTo(tr_e1);
    var spell_list = []
    $.each(data["spell_check"], function(idx, v) {
        if (v) {
            spell_list.push(idx);
        }
    });
    $.each(spell_list, function(index1, value1) {
        var this_spell = all_spells[value1];
        var tr_e2=$("<tr></tr>").addClass("treegrid-"+i+"-"+li+" stat-parent-"+p+" treegrid-parent-"+i).appendTo(body)
            .on("mouseover", row_mouse_over)
            .on("mouseout", row_mouse_out);
        var td1=$("<td></td>").attr("colspan","4").html(this_spell["name"]).appendTo(tr_e2);
        var td2=$("<td></td>").addClass("title").html(this_spell["mp"]).appendTo(tr_e2);
        var td3=$("<td></td>").addClass("title").html(this_spell["tn"]).appendTo(tr_e2);
        var td4=$("<td></td>").appendTo(tr_e2);
        lp=i+"-"+li
        li+=1;
        $.each(['school', 'type', 'cast time', 'range', 'test', 'full damage', 'half damage', 'AoE'], function(index2, value2) {
            var tr_e3=$("<tr></tr>").addClass("treegrid-"+i+"-"+li+" stat-parent-"+p+" treegrid-parent-"+lp).appendTo(body)
                .on("mouseover", row_mouse_over)
                .on("mouseout", row_mouse_out);
            var td1=$("<td></td>").attr("colspan","2").html(value2).appendTo(tr_e3);
            var td2=$("<td></td>").attr("colspan","4").html(this_spell[value2]).appendTo(tr_e3);
            li+=1;
        });
    });
}

var init_list = [];
$("#add_all").on("click", function() {
    if (init_list.length>0) {
        var value=init_list[0];
        $(".treegrid-"+value[2]).removeClass("active-row");
        $(".treegrid-parent-"+value[2]).removeClass("active-row");
        $(".stat-parent-"+value[2]).removeClass("active-row");
        $(".init").each(function(idx, i) {
            var init=i.value;
            $(i).val("");
            if (init) {
                var current_inits=init_list.map(function(val) {
                    return val[1];
                });
                var current_max=Math.max.apply(Math,current_inits);
                var current_max_index=current_inits.indexOf(current_max+"");
                current_inits.sort(function(a,b) {return b-a});
                var i_parent = $(i).parent().parent()
                var name = i_parent.find(".name").html();
                var parent_class = i_parent.attr("class").split(" ")[0];
                var parent = parent_class.split("-")[1];
                var j=0;
                $.each(current_inits, function(jdx,value) {
                    j=jdx;
                    return init<value;
                });
                var j_insert=j+current_max_index;
                var L=init_list.length;
                if (j_insert>L) {
                    j_insert-=L;
                } else if (j_insert<0) {
                    j_insert+=L;
                };
                init_list.splice(j_insert,0,[name,init,parent]);
            }
        });
        $("#init_body").html("");
        add_init(init_list);
    } else {
        $(".init").each(function(idx, i) {
            var init=i.value;
            $(i).val("");
            if (init) {
                var i_parent = $(i).parent().parent()
                var name = i_parent.find(".name").html();
                var parent_class = i_parent.attr("class").split(" ")[0];
                var parent = parent_class.split("-")[1];
                init_list.push([name,init,parent]);
            }
        });
        init_list.sort(function(a,b) {return b[1]-a[1]})
        add_init(init_list);
    }
});

function seize_init(me) {
    var value=init_list[0];
    $(".treegrid-"+value[2]).removeClass("active-row");
    $(".treegrid-parent-"+value[2]).removeClass("active-row");
    $(".stat-parent-"+value[2]).removeClass("active-row");
    var cv=init_list.splice(0,1)[0];
    var current_inits=init_list.map(function(val) {
        return val[1];
    });
    var current_max=Math.max.apply(Math,current_inits);
    var current_max_index=current_inits.indexOf(current_max+"");
    cv[1]=current_max+0.01+"";
    init_list.splice(current_max_index,0,cv);
    $("#init_body").html("");
    add_init(init_list);
}

function remove_init(el) {
    var value=init_list[0];
    $(".treegrid-"+value[2]).removeClass("active-row");
    $(".treegrid-parent-"+value[2]).removeClass("active-row");
    $(".stat-parent-"+value[2]).removeClass("active-row");
    var me=$(el);
    var me_class=me.parent().parent().attr("class").split(" ")
    var parent=me_class[1].split("-")[2];
    var i=me_class[0].split("-")[2];
    $(".treegrid-parent-init"+i).remove();
    $(".treegrid-init-"+i).remove();
    var idx_remove="";
    $.each(init_list, function(idx,value2) {
        if (value2[2]==parent) {
            idx_remove=idx;
        }
    });
    init_list.splice(idx_remove,1);
    $("#init_body").html("");
    add_init(init_list);
};

function add_init(init_list) {
    if (init_list.length===0) {
        $("#round_number").html("0");
    }
    var current_inits=init_list.map(function(val) {
        return val[1];
    });
    var current_max=Math.max.apply(Math,current_inits);
    var current_max_index=current_inits.indexOf(current_max+"");
    $.each(init_list, function(idx, value) {
        var tr=$("<tr></tr>").addClass("treegrid-init-"+idx+" "+"stat-parent-"+value[2]).attr("init",value[1]).attr("name",value[0]).appendTo("#init_body")
            .on("mouseover", row_mouse_over)
            .on("mouseout", row_mouse_out);
        if (idx===0) {
            $(".treegrid-"+value[2]).addClass("active-row");
            $(".treegrid-parent-"+value[2]).addClass("active-row");
            $(".stat-parent-"+value[2]).addClass("active-row");
        }
        var td1=$("<td></td>").html(value[0]).appendTo(tr);
        var td2=$("<td></td>").appendTo(tr)
        if (idx===current_max_index) {
            var star=$('<span></span>').addClass("glyphicon glyphicon-star").appendTo(td2)
            if (idx===0) {
                var rn=$("#round_number").html();
                $("#round_number").html(parseInt(rn)+1);
            }
        } else if (idx===0) {
            var up_arrow=$('<span onclick="seize_init(this)"></span>').addClass("glyphicon glyphicon-arrow-up").appendTo(td2);
        }
        var td3=$("<td></td>").appendTo(tr).html('<a onclick="remove_init(this);" class="close close-player">&times;</a>');
    });
    $('#initiative_tree').treegrid({
        'initialState': 'collapsed'
    });
}

$("#advance").on("click", function() {
    var value=init_list[0];
    $(".treegrid-"+value[2]).removeClass("active-row");
    $(".treegrid-parent-"+value[2]).removeClass("active-row");
    $(".stat-parent-"+value[2]).removeClass("active-row");
    if (init_list.length>0) {
        var tmp = init_list.shift();
        init_list.push(tmp);
        $("#init_body").html("");
        add_init(init_list);
    }
});

function row_mouse_over(event) {
    var me = $(event.currentTarget);
    //me.addClass("hover-row");
    var c = me.attr("class");
    var i=""
    if (c.indexOf("stat-parent-")>-1) {
        i = c.split(" ")[1].split("-")[2];
    } else if (c.indexOf("treegrid-parent-")>-1) {
        i = c.split(" ")[1].split("-")[2];
    } else {
        i = c.split(" ")[0].split("-")[1];
    }
    if (c.indexOf("active-row")===-1) {
        $("."+"treegrid-"+i).addClass("hover-row");
        $("."+"treegrid-parent-"+i).addClass("hover-row");
        $("."+"stat-parent-"+i).addClass("hover-row");
    }
}

function row_mouse_out(event) {
    var me = $(event.currentTarget);
    //me.removeClass("hover-row");
    var c = me.attr("class");
    var i="";
    if (c.indexOf("stat-parent-")>-1) {
        i = c.split(" ")[1].split("-")[2];
    } else if (c.indexOf("treegrid-parent-")>-1) {
        i = c.split(" ")[1].split("-")[2];
    } else {
        i = c.split(" ")[0].split("-")[1];
    }
    if (c.indexOf("active-row")===-1) {
        $("."+"treegrid-"+i).removeClass("hover-row");
        $("."+"treegrid-parent-"+i).removeClass("hover-row");
        $("."+"stat-parent-"+i).removeClass("hover-row");
    }
}

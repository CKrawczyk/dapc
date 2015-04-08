// set up the edit switch
//$.fn.bootstrapSwitch.defaults.size = 'mini';
$("[name='edit_switch']").bootstrapSwitch();
$("[name='edit_switch']").on("switchChange.bootstrapSwitch", function(event, state) {
    if (state) {
        $(".edit-lock").prop("disabled", false);
        if (["Mage",""].indexOf($("#class").val()) != -1) {
            $("#add_spell").removeClass("disabled");
        } else {
            $("#add_spell").addClass("disabled");
            $("#mana_max").prop("disabled",true);
            $("#mana_current").prop("disabled",true);
        }
    } else {
        $(".edit-lock").prop("disabled", true);
        $("#add_spell").addClass("disabled");
    }
})

function switch_size(event) {
    window_width=parseInt($('#body_container').css('width'));
    if (parseInt($('html').css('width'))<=991) {
        $("[name='edit_switch']").bootstrapSwitch('size', 'normal');
    } else {
        $("[name='edit_switch']").bootstrapSwitch('size', 'mini');
    }
}

switch_size();

window.onresize = switch_size

// Fill in the more tedious parts using js

// The skills table
function make_skill_row1(skill_name) {
    var lower_name = skill_name.toLowerCase();
    var tr = $("<tr></tr>");
    var td = $("<td></td>").appendTo(tr);
    var row = $("<div></div>").addClass("row").appendTo(td);
    var div1 = $("<div></div>").addClass("accordion-toggle col-xs-8").attr("data-toggle", "collapse").attr("data-target","#"+lower_name+"_row").appendTo(row);
    var span1 = $("<span></span>").addClass("skill-arrow glyphicon glyphicon-chevron-right").appendTo(div1);
    var h4 = $("<h4></h4>").html(skill_name).appendTo(div1);

    var div2 = $("<div></div>").addClass("col-xs-4").appendTo(row);
    var input_group = $("<div></div>").addClass("input-group input-group-sm").appendTo(div2);
    var span2 = $("<span></span>").addClass("input-group-addon").appendTo(input_group);
    var check_box = $("<input>").attr("type", "checkbox").attr("id",lower_name+"_prime").prop("disabled", true).appendTo(span2);
    var input = $("<input>").addClass("form-control edit-lock is-int").attr("id",lower_name+"_value").attr("type", "text").appendTo(input_group);
    
    return tr
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function make_skill_row2_inner(skill_name_lower,start_num) {
    var div1 = $("<div></div>").addClass("row top-buffer-small");
    var div2 = $("<div></div>").addClass("col-xs-12").appendTo(div1);
    var input_group = $("<div></div>").addClass("input-group input-group-sm").appendTo(div2);
    for (var i=start_num; i<start_num+4; i++) {
        var input = $("<input>").attr("type", "text").addClass("form-control edit-lock").attr("id", skill_name_lower+"_"+pad(i)).appendTo(input_group);
        if (i<start_num+3) {
            var span = $("<span></span>").addClass("input-group-btn").css("width","3px").appendTo(input_group);
        }
    }
    return div1;
}

function make_skill_row2(skill_name,num_rows) {
    var lower_name = skill_name.toLowerCase();
    var tr = $("<tr></tr>");
    var td = $("<td></td>").addClass("hiddenRow").appendTo(tr);
    var div1 = $("<div></div>").addClass("accordian-body collapse").attr("id",lower_name+"_row").appendTo(td);
    for (var i=0; i<num_rows; i++) {
        var row = make_skill_row2_inner(lower_name,i*4+1);
        row.appendTo(div1)
    }
    return tr
}

$.each(["Communication","Constitution","Cunning","Dexterity","Magic","Perception","Strength","Willpower"], function (idx, value) {
    var r1 = make_skill_row1(value);
    var r2 = make_skill_row2(value, 4);
    r1.appendTo("#accordion_table");
    r2.appendTo("#accordion_table");
});

// Set of 3 input boxes to be used in many places
function set_of_3(name_lower,start_num){
    var div1 = $("<div></div>").addClass("row top-buffer-small");
    var div2 = $("<div></div>").addClass("col-xs-12").appendTo(div1);
    var input_group = $("<div></div>").addClass("input-group input-group-sm").appendTo(div2);
    for (var i=start_num; i<start_num+3; i++) {
        var input = $("<input>").attr("type", "text").addClass("form-control").attr("id", name_lower+"_"+pad(i)).appendTo(input_group);
        if (i<start_num+2) {
            var span = $("<span></span>").addClass("input-group-btn").css("width","3px").appendTo(input_group);
        }
    }
    return div1;
}

function set_of_3_edit_lock(name_lower,start_num){
    var div1 = $("<div></div>").addClass("row top-buffer-small");
    var div2 = $("<div></div>").addClass("col-xs-12").appendTo(div1);
    var input_group = $("<div></div>").addClass("input-group input-group-sm").appendTo(div2);
    for (var i=start_num; i<start_num+3; i++) {
        var input = $("<input>").attr("type", "text").addClass("form-control edit-lock").attr("id", name_lower+"_"+pad(i)).appendTo(input_group);
        if (i<start_num+2) {
            var span = $("<span></span>").addClass("input-group-btn").css("width","3px").appendTo(input_group);
        }
    }
    return div1;
}

// Weapons
function weapon_row(idx) {
   
    
    var row = $("<div></div>").addClass("row top-buffer-small");
    var weapon = $("<div></div>").addClass("col-xs-4 no-margin-right").appendTo(row);
    var input_group1 = $("<div></div>").addClass("input-group input-group-sm").appendTo(weapon);
    var input1 = $("<input>").attr("type","text").attr("id","weapon_"+pad(idx)).addClass("form-control").appendTo(input_group1);

    var att_dam = $("<div></div>").addClass("col-xs-5 no-margin").appendTo(row);
    var input_group2 = $("<div></div>").addClass("input-group input-group-sm").appendTo(att_dam);
    var input2 = $("<input>").attr("type","text").attr("id","attack_"+pad(idx)).addClass("form-control").appendTo(input_group2);
    var span1 = $("<span></span>").addClass("input-group-btn").css("width","0px").appendTo(input_group2);
    var input3 = $("<input>").attr("type","text").attr("id","damage_"+pad(idx)).addClass("form-control").appendTo(input_group2);

    var range = $("<div></div>").addClass("col-xs-3 no-margin-left").appendTo(row);
    var input_group3 = $("<div></div>").addClass("input-group input-group-sm").appendTo(range);
    var input4 = $("<input>").attr("type","text").attr("id","range_s_"+pad(idx)).addClass("form-control").appendTo(input_group3);
    var span2 = $("<span></span>").addClass("input-group-btn").css("width","0px").appendTo(input_group3);
    var input5 = $("<input>").attr("type","text").attr("id","range_l_"+pad(idx)).addClass("form-control").appendTo(input_group3);

    return row;
}

for (var i=0; i<6; i++) {
    var r = weapon_row(i+1);
    r.appendTo("#weapons");
}

// Talents
function talent_check(talent_name) {
    var lower_name = talent_name.toLowerCase();
    lower_name = lower_name.replace(".","");
    lower_name = lower_name.replace(" ","_");
    var input_group = $("<div></div>").addClass("input-group font-sm input-group-sm");
    var span1 = $("<span></span>").addClass("input-group-addon").html(talent_name).appendTo(input_group);
    var span2 = $("<span></span>").addClass("input-group-addon check").appendTo(input_group);
    var check = $("<input>").attr("type","checkbox").attr("id",lower_name).addClass("edit-lock").appendTo(span2);
    return input_group;
}

function talent_row(list) {
    var row = $("<div></div>").addClass("row top-buffer-small")
    $.each(list, function(idx, value) {
        var div = $("<div></div>").addClass("col-xs-3");
        if (idx==0) {
            div.addClass("no-margin-right")
        } else if (idx==3) {
            div.addClass("no-margin-left")
        } else {
            div.addClass("no-margin")
        }
        div.appendTo(row);
        tc=talent_check(value)
        tc.appendTo(div);
    });
    row.appendTo("#talents_and_powers")
}

talent_row(["Axes", "Bludg.", "Bows", "Brawl"]);
talent_row(["H blades", "L blades", "Spears", "Staves"]);

// Class Powers
for (var i=0; i<5; i++) {
    var r = set_of_3_edit_lock("class_power", i*3+1);
    r.appendTo("#talents_and_powers")
}

// Languages box
for (var i=0; i<4; i++) {
    var r = set_of_3_edit_lock("language", i*3+1);
    r.appendTo("#languages")
}

// Equipment box
for (var i=0; i<6; i++) {
    var r = set_of_3("equipment", i*3+1);
    r.appendTo("#equipment");
}

// adjust the primary abilities when the class is changed
$("#class").on("change", function() {
    switch(this.value) {
    case "Mage":
        $("#communication_prime").prop("checked", false);
        $("#constitution_prime").prop("checked", false);
        $("#cunning_prime").prop("checked", true);
        $("#dexterity_prime").prop("checked", false);
        $("#magic_prime").prop("checked", true);
        $("#perception_prime").prop("checked", false);
        $("#strength_prime").prop("checked", false);
        $("#willpower_prime").prop("checked", true);
        $("#mana_max").prop("disabled",false);
        $("#mana_current").prop("disabled",false);
        $("#mana_button").removeClass("disabled");
        $("#add_spell").removeClass("disabled");
        break;
    case "Rogue":
        $("#communication_prime").prop("checked", true);
        $("#constitution_prime").prop("checked", false);
        $("#cunning_prime").prop("checked", false);
        $("#dexterity_prime").prop("checked", true);
        $("#magic_prime").prop("checked", false);
        $("#perception_prime").prop("checked", true);
        $("#strength_prime").prop("checked", false);
        $("#willpower_prime").prop("checked", false);
        $("#mana_max").prop("disabled",true);
        $("#mana_current").prop("disabled",true);
        $("#mana_max").val("");
        $("#mana_current").val("");
        $("#mana_button").addClass("disabled");
        $("#add_spell").addClass("disabled");
        break;
    case "Warrior":
        $("#communication_prime").prop("checked", false);
        $("#constitution_prime").prop("checked", true);
        $("#cunning_prime").prop("checked", false);
        $("#dexterity_prime").prop("checked", true);
        $("#magic_prime").prop("checked", false);
        $("#perception_prime").prop("checked", false);
        $("#strength_prime").prop("checked", true);
        $("#willpower_prime").prop("checked", false);
        $("#mana_max").prop("disabled",true);
        $("#mana_current").prop("disabled",true);
        $("#mana_max").val("");
        $("#mana_current").val("");
        $("#mana_button").addClass("disabled");
        $("#add_spell").addClass("disabled");
        break;
    default:
        $("#communication_prime").prop("checked", false);
        $("#constitution_prime").prop("checked", false);
        $("#cunning_prime").prop("checked", false);
        $("#dexterity_prime").prop("checked", false);
        $("#magic_prime").prop("checked", false);
        $("#perception_prime").prop("checked", false);
        $("#strength_prime").prop("checked", false);
        $("#willpower_prime").prop("checked", false);
        $("#mana_max").prop("disabled",false);
        $("#mana_current").prop("disabled",false);
        $("#mana_button").removeClass("disabled");
        $("#add_spell").removeClass("disabled");
        break;
    }
})

// validate that an input has a non-negitive intiger entered
$(".is-int").on("change", function() {
    this.value = parseInt(this.value) || "0";
})

// create popovers for adding/removing health, mana, and money
$("#health_button").popover({
    html: true,
    placement: "bottom",
    container: "body",
    content: function() {
        return $("#popover_health_mana_body").html();
    },
    title: "Add/Remove Health"
}).on("shown.bs.popover", function() {
    var button = $(this)
    var pop = button.data('bs.popover').tip()
    var health_max = parseInt($("#health_max").val());
    var hc=$("#health_current")
    var a_r_v=pop.find("#add_remove_value")
    pop.find("#add").on("click", function() {
        var health_current = parseInt(hc.val());
        var add = parseInt(a_r_v.val()) || 0;
        var health_new = health_current + add
        if (health_new > health_max) {
            health_new = health_max;
        }
        hc.val(health_new);
        a_r_v.val("");
        button.popover('toggle');
    });
    pop.find("#remove").on("click", function() {
        var health_current = parseInt(hc.val());
        var remove = parseInt(a_r_v.val()) || 0;
        var health_new = health_current - remove
        if (health_new < 0) {
            health_new = 0;
        }
        hc.val(health_new);
        a_r_v.val("");
        button.popover('toggle');
    });
});

$("#mana_button").popover({
    html: true,
    placement: "bottom",
    container: "body",
    content: function() {
        return $("#popover_health_mana_body").html();
    },
    title: "Add/Remove Mana"
}).on("shown.bs.popover", function() {
    var button = $(this);
    var pop = button.data('bs.popover').tip();
    var mana_max = parseInt($("#mana_max").val());
    var mc=$("#mana_current")
    var a_r_v=pop.find("#add_remove_value")
    pop.find("#add").on("click", function() {
        var mana_current = parseInt(mc.val());
        var add = parseInt(a_r_v.val()) || 0;
        var mana_new = mana_current + add
        if (mana_new > mana_max) {
            mana_new = mana_max;
        }
        mc.val(mana_new);
        can_cast();
        a_r_v.val("");
        button.popover('toggle');
    });
    pop.find("#remove").on("click", function() {
        var mana_current = parseInt(mc.val());
        var remove = parseInt(a_r_v.val()) || 0;
        var mana_new = mana_current - remove
        if (mana_new < 0) {
            mana_new = 0;
        }
        mc.val(mana_new);
        can_cast();
        a_r_v.val("");
        button.popover('toggle');
    });
});

$("#money_button").popover({
    html: true,
    placement: "bottom",
    container: "body",
    content: function() {
        return $("#popover_money_body").html();
    },
    title: "Add/Remove Money"
}).on("shown.bs.popover", function() {
    var button = $(this);
    var pop = button.data('bs.popover').tip();
    var cg = $('#gold');
    var cs = $('#silver');
    var cc = $('#copper');
    var all = 10000*(parseInt(cg.val()) || 0) + 100*(parseInt(cs.val()) || 0) + (parseInt(cc.val()) || 0);
    var a_r_g = pop.find("#new_gold");
    var a_r_s = pop.find("#new_silver");
    var a_r_c = pop.find("#new_copper");
    pop.find('#add').on("click", function() {
        var a_r_all = 10000*(parseInt(a_r_g.val()) || 0) + 100*(parseInt(a_r_s.val()) || 0) + (parseInt(a_r_c.val()) || 0);
        var new_all = all + a_r_all;
        var tmp = new_all%10000
        ng = (new_all-tmp)/10000;
        nc = tmp%100;
        ns = (tmp-nc)/100;
        cg.val(ng);
        cc.val(nc);
        cs.val(ns);
        a_r_g.val("");
        a_r_s.val("");
        a_r_c.val("");
        button.popover('toggle');
    });
    pop.find('#remove').on("click", function() {
        var a_r_all = 10000*(parseInt(a_r_g.val()) || 0) + 100*(parseInt(a_r_s.val()) || 0) + (parseInt(a_r_c.val()) || 0);
        var new_all = all - a_r_all;
        var tmp = new_all%10000
        ng = (new_all-tmp)/10000;
        nc = tmp%100;
        ns = (tmp-nc)/100;
        cg.val(ng);
        cc.val(nc);
        cs.val(ns);
        a_r_g.val("");
        a_r_s.val("");
        a_r_c.val("");
        button.popover('toggle');
    });
});

$('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});

// initialize the tree-grids
$.getJSON("./js/spells_table.json", function(data) {
    var p1=0;
    var p2=0;
    var p3=0;
    var i=1;
    $.each(data, function(key1,value1){
        var tr1 = $("<tr></tr>").addClass("treegrid-"+i).appendTo($("#spell_tree")).html("<td>"+key1+"</td> <td> </td>");
        p1=i;
        i+=1;
        $.each(value1, function(key2,value2){
            var tr2 = $("<tr></tr>").addClass("treegrid-"+i).addClass("treegrid-parent-"+p1).appendTo($("#spell_tree")).html("<td>"+key2+"</td> <td> </td>");
            p2=i;
            i+=1;
            if (Object.keys(value2).length>0) {
                $.each(value2, function(key3,value3){
                    var spell_name=key3.split(' ').join('_').toLowerCase();
                    var tr3 = $("<tr></tr>").addClass("treegrid-"+i).addClass("treegrid-parent-"+p2).appendTo($("#spell_tree")).html('<td class="spell-name">'+key3+'</td> <td> <input type="checkbox" class="spell_check" id="spell_'+spell_name+'"> </td>');
                    p3=i;
                    i+=1;
                    $.each(['requirement','tn', 'mp', 'cast time', 'range', 'test', 'full damage', 'half damage', 'AoE'], function(index, value4){
                        var tr4 = $("<tr></tr>").addClass("treegrid-"+i).addClass("treegrid-parent-"+p3).appendTo($("#spell_tree")).html('<td class="spell-prop">'+value4+'</td> <td class="spell-attr">'+value3[value4]+'</td>');
                        i+=1
                    });
                });
            };
        });
    });
    $('#spell_tree').treegrid({
        'initialState': 'collapsed'
    });
});

$("#update_spells").on("click", function() {
    spell_list=[]
    $(".spell_check").each(function() {
        if (this.checked) {
            spell_list.push(this.id)
        }
    });
    update_spells(spell_list); 
});

function update_spells(spell_list) {
    $("#known_spell_body").html("");
    $.getJSON("./js/spells.json", function(data) {
        var i=1;
        var p=0;
        $.each(spell_list, function(index1, value1) {
            var this_spell = data[value1]
            var t1 = $("<tr></tr>").addClass("treegrid-"+i).appendTo($("#known_spell_body")).html('<td>'+this_spell["name"]+'</td> <td></td> <td align="center">'+this_spell["mp"]+'</td><td align="center">'+this_spell["tn"]+'</td> <td><button class="btn btn-default btn-xs spell-cast" type="button" data-toggle="popover" style="width:100%">Cast</button></td>');
            p=i;
            i+=1;
            $.each(['school', 'type', 'cast time', 'range', 'test', 'full damage', 'half damage', 'AoE'], function(index2, value2) {
                var t2 = $("<tr></tr>").addClass("treegrid-"+i).addClass("treegrid-parent-"+p).appendTo($("#known_spell_body")).html('<td>'+value2+'</td> <td colspan="4">'+this_spell[value2]+'</td>');
                i+=1;
            });
        });
        $('#known_spell_tree').treegrid({
            'initialState': 'collapsed'
        });
        var spell_buttons = $(".spell-cast");
        if (spell_buttons.length > 0) {
            can_cast();
            spell_buttons.each(function(index3, value3){
                var current_button = $(value3);
                var mp = current_button.parent().prev().prev().html();
                if (mp.indexOf('-')>-1) {
                    current_button.popover({
                        html: true,
                        placement: "left",
                        container: "body",
                        content: function() {
                            return $("#popover_cast_body").html();
                        },
                        title: "Cast ammount "+mp+" MP"
                    }).on("shown.bs.popover", function() {
                        var pop = current_button.data('bs.popover').tip();
                        var mc=$("#mana_current");
                        var cast_value = pop.find("#cast_value");
                        var cast_button = pop.find("#spell_cast_po");
                        var mp_cost = mp.split("-");
                        mp_cost[1] = Math.min(mp_cost[1], mc.val());
                        cast_value.on("keyup", function(){
                            var mp = cast_value.val();
                            if (((parseInt(mp)|0) >= parseInt(mp_cost[0])) && ((parseInt(mp)|0) <= parseInt(mp_cost[1]))) {
                                cast_button.removeClass("disabled");
                            } else {
                                cast_button.addClass("disabled");
                            }
                        });
                        cast_button.on("click", function() {
                            var mp = cast_value.val();
                            var mana_new = parseInt(mc.val())-parseInt(mp);
                            mc.val(mana_new);
                            can_cast();
                            cast_value.val("")
                            current_button.popover('toggle');
                        });
                        pop.find("#spell_cancel_po").on("click", function() {
                            cast_value.val("")
                            current_button.popover('toggle');
                        });
                    });
                } else {
                    current_button.on("click", function() {
                        var mc=$("#mana_current")
                        var mana_new = parseInt(mc.val())-parseInt(mp);
                        mc.val(mana_new);
                        can_cast();
                    });
                }
            });
        }
    });
}

$("#mana_current").on("change", function() {
    var mc = parseInt($(this).val())|0
    var mm = parseInt($("#mana_max").val())|0
    if (mc > mm) {
        $(this).val(mm);
    }
    can_cast();
});

$("#health_current").on("change", function() {
    var hc = parseInt($(this).val())|0
    var hm = parseInt($("#health_max").val())|0
    if (hc > hm) {
        $(this).val(hm);
    }
});

function can_cast() {
    var mc = parseInt($("#mana_current").val())|0;
    var spell_buttons = $(".spell-cast");
    if (spell_buttons.length > 0) {
        spell_buttons.each(function(index, value) {
            var current_button = $(value)
            var mp = current_button.parent().prev().prev().html();
            if (mp.indexOf('-')>-1) {
                mp = mp.split("-")[0];
            }
            mp = parseInt(mp);
            if (mc < mp) {
                current_button.addClass("disabled");
            } else {
                current_button.removeClass("disabled");
            }
        });
    }
}

// Upload save file (json)
$("#load").on("click", function() {
    $("#file_upload").click();
})

$("#file_upload").on("change", function() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            var dataText = evt.target.result;
            input_json = dataText;
            upload_me(dataText);
        };
        reader.readAsText(file);
    };
});

function upload_me(input_json) {
    input_json = JSON.parse(input_json);
    $.each(input_json["text"], function(idx, v) {
        $("#body_container").find("#"+idx).val(v);
    });
    $.each(input_json["checkbox"], function(idx, v) {
        $("#body_container").find("#"+idx).prop("checked", v);
    });
    $.each(input_json["select"], function(idx, v) {
        $("#body_container").find("#"+idx).selectpicker("val", v);
    });
    var spell_list = []
    $.each(input_json["spell_check"], function(idx, v) {
        $("#spell_modal").find("#"+idx).prop("checked", v);
        if (v) {
            spell_list.push(idx);
        }
    });
    update_spells(spell_list);
    if ($("#class").val()=="Mage") {
        $("#add_spell").removeClass("disabled");
        $("#mana_max").prop("disabled",false);
        $("#mana_current").prop("disabled",false);
    } else {
        $("#add_spell").addClass("disabled");
        $("#mana_max").prop("disabled",true);
        $("#mana_current").prop("disabled",true);
    }
}

// Save state to file (json)
$("#save").on("click", function() {
    var all_input = $("#body_container").find('input[type=text]');
    var all_checkbox = $("#body_container").find('input[type=checkbox]');
    var all_select = $("#body_container").find('select');
    var all_spell = $("#spell_modal").find("input[type=checkbox]");
    var output_json = {"text": {}, "checkbox": {}, "select": {}, "spell_check": {}}
    all_input.each(function(idx, v) {
        output_json["text"][v.id] = v.value;
    });
    all_checkbox.each(function(idx, v) {
        if (v.id!="edit_switch") {
            output_json["checkbox"][v.id] = v.checked;
        }
    });
    all_select.each(function(idx,v) {
        output_json["select"][v.id] = $(v).selectpicker("val");
    });
    all_spell.each(function(idx,v) {
        output_json["spell_check"][v.id] = v.checked;
    });
    save_me(output_json);
});

function save_me(output_json) {
    var json = JSON.stringify(output_json);
    var blob = new Blob([json], {type: "application/json"});
    var url = URL.createObjectURL(blob);
    var save_link = $("#file_save");
    save_link.prop("href", url);
    save_link[0].click();
}

// Clear button
$("#clear").on("click",clear_all);

function clear_all() {
    var all_input = $("#body_container").find('input[type=text]');
    var all_checkbox = $("#body_container").find('input[type=checkbox]');
    var all_select = $("#body_container").find('select');
    var all_spell = $("#spell_modal").find("input[type=checkbox]");
    all_input.each(function(idx, v) {
        v.value=""
    });
    all_checkbox.each(function(idx, v) {
        if (v.id!="edit_switch") {
            v.checked = false;
        }
    });
    all_select.each(function(idx,v) {
        $(v).selectpicker("val", "");
    });
    all_spell.each(function(idx,v) {
        v.checked = false;
    });
    $("#mana_max").prop("disabled",false);
    $("#mana_current").prop("disabled",false);
    $("#add_spell").removeClass("disabled");
    update_spells([]);
}

clear_all();

// add arrows to skill expander
function toggleChevron(e) {
    $(e.target).parent().parent().prev().find('.skill-arrow').toggleClass('glyphicon-chevron-right glyphicon-chevron-down')
}

$("#accordion_table").on('hidden.bs.collapse', toggleChevron)
$("#accordion_table").on('show.bs.collapse', toggleChevron)

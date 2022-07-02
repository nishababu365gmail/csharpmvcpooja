


jQuery(document).ready(function () {
    var counter = 0
    var ct = 0;
    var resultstring = ""
    jQuery('#DateOfBirth').datepicker()
    
    jQuery('#Id').change(function () {
        alert('babu')
        jQuery('#username').val('maani')
    })
    $('button[id$="_btn"]').click(function (event) {
       // var pos = $(this).name.lastIndexOf("_")
        var curtarget = $(event.target)
        var idvar = curtarget[0].id
        var pos = idvar.lastIndexOf("_")
        
       var requiredpart = idvar.substring(0,pos)
        var $item = $(this).closest("tr").next('tr').find('.nr')  
        
        console.log($item)
      //  var tbl = jQuery("#" + requiredpart)
      //  $("#" + requiredpart).toggle();
      $item.toggle()
    })
    jQuery('#DateOfBirth').change(function () {
       var start = $("#DateOfBirth").datepicker("getDate");
       // var start = $("#DateOfBirth").val();
       var fullDate = new Date()
     
      
      //  //convert month to 2 digits
        var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);

       var currentDate = fullDate.getDate() + "-" + twoDigitMonth + "-" + fullDate.getFullYear();
        console.log(fullDate - start);
     
        var daysinnos = (fullDate - start) / (1000 * 60 * 60 * 24);
        console.log(daysinnos/365)
    })
    function isEmail(email) {
        alert(email)
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(email);
        //var regex = / ^ (?=.* [a - z])(?=.* [A - Z])(?=.*\d)(?=.* [^\da - zA - Z]).{ 8, 15 } $/;
        //return regex.test(email);
    }
    jQuery('#Password').on("change", function () {
        alert('maani')
        var m = isEmail(jQuery(this).val())
        if (m == false) {
            jQuery(this).val('')
            jQuery(this).focus()
            return false;
        }
        else {
            return true;
        }
    });
    $('.custom-file-input').on("change",
        function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).next('.custom-file-label').html(fileName);
    });
    jQuery('#btnAdd').click(function () {
        if (jQuery('.mamu').length ==0) {
        if (IsValueSelected('mamu','select skill') == true) {
        counter = counter + 1        
        var appendstring = "<div id='divCompositeRow_"+counter+"' class='row'><div class='nisha col-md-3' ><select class='mamu'  id='cmbselect_"+counter+"'>"
        appendstring = appendstring + "<option value='0'>select skill</option></select ></div > "
        var appendstring1 = "<div class='nisha col-md-3'' ><select class='level'  id='cmblevel_" + counter + "'>"
        appendstring1 = appendstring1 + "<option value='0'>select level</option></select ></div > "
        var buttonstring = "<div class='nisha col-md-3'' ><input type='button'  value='Delete' id='btnskill_" + counter + "'/></div ></div>"
        jQuery('#mytest').append(appendstring + appendstring1 + buttonstring)
       
        $.ajax({
            type: "GET",            
            url: '/Test/GetCombodata',          

            contentType: "application/json; charset=utf-8",

            dataType: "json",
            success: function (data) {
                
                $.each(data, function (i, item) {
                    console.log(i)
                    
                        jQuery.each(item, function (myct, single) {
                            if (i == 0) {
                                $("#cmbselect_" + counter).append(`<option value="${single.text}">${single.value}</option>`);
                            }
                            else if (i == 1) {
                               $("#cmblevel_" + counter).append(`<option value="${single.text}">${single.value}</option>`);
                            }
                        })                  
                          
                        })
                   
                jQuery("#cmbselect_"+counter).on('change', function () {    
                    var myval = jQuery(this).val()                    
                    var myid = jQuery(this)[0].id
                    jQuery('.mamu').each(function (index, item) {
                        if (item.id != myid) {
                            if (jQuery(item).find('option:selected').text() == jQuery('#' + myid).find('option:selected').text()) {
                                alert('hiii dup')
                                jQuery('#' + myid).prop('selectedIndex', 0)
                            }
                            
                        }
                    })
                    resultstring = ""
                    resultstring =  myid + ":" + myval + ","
                    console.log(resultstring)
                    var nishabab = jQuery('#allvalues').val()
                    jQuery('#allvalues').val(nishabab + resultstring)
                
                })
                jQuery('#cmblevel_' + counter).on('change', function () {
                    var myval = jQuery(this).val()
                    var myid = jQuery(this)[0].id                   
                    resultstring = ""
                    resultstring = myid + ":" + myval + ","
                    console.log(resultstring)
                    var nishabab = jQuery('#alllevelvalues').val()
                    jQuery('#alllevelvalues').val(nishabab + resultstring)

                })
                //btnclick function
                jQuery('#btnskill_' + counter).click(function () {
                    var btnid = jQuery(this).attr('id')
                    var poshyphen = btnid.indexOf('_')
                    var number = btnid.substring(poshyphen + 1)
                    removecmbval('allvalues', jQuery('#allvalues').val(),'cmbselect_'+number)
                    jQuery('#divCompositeRow_' + number).remove()
                    alert(number)
                })//end button click function
            }
        });
            }
        }
    })
    function IsValueSelected(classname, texttocompare) {
        var returnval = true
        if (jQuery('.' + classname).length > 0) {
            jQuery('.' + classname).each(function (index, item) {
                if (jQuery(item).find('option:selected').text() == texttocompare) {
                    returnval = false
                    return false;
                }
                else {
                    returnval = true
                }
            })
        }
         return returnval
    }
    function removecmbval(controlname, stringtocheck, stringtoremove) {
        var skillname = stringtocheck
        var stringtobesearched = stringtoremove
        var position = skillname.search(stringtobesearched)
        var commapos = skillname.indexOf(',', position)
        var substringtoberemoved = skillname.substring(position, commapos + 1)
        var newskillname = skillname.replace(substringtoberemoved, '')
        jQuery('#' + controlname).val(newskillname)
        alert(substringtoberemoved)
    }
    function skillbutton(buttonname,counter) {
        
    }
    $("#selecthello").select2({ placeholder: "nishA" });
    $(".select2").select2({});
    $(function () {
        $(document).on("click", "table tbody tr td a", function (e) {
            var $row = $(this).closest("tr");    // Find the row
            var $text = $row.find(".nr").text(); // Find the text
            var $course = $row.find(".sc").text(); // Find the text
            $("#aleena").load("/test/CheckTabeRow1");
            // Let's test it out
            alert($text);

            alert('hiiii');
            $.ajax({

                type: "GET",

                //url: '@Url.Action("Nisha", "Home")',
                url: '/Test/CheckTabeRow1',
                data: { "stname": $text, "stcourse": $course },

                contentType: "application/json; charset=utf-8",

                dataType: "json",

                success: function (data) {
                    console.log(data)
                    $("#aleena").load("/test/CheckTabeRow1");
                    //let output = data.map(i => "<tr><td>" + i.name + "</td><td>" + i.gender + "</td><td>" + i.role + "</td></tr>");

                    //$("#output").html(output);

                }

            });
        });
    });
    jQuery('#btnsave').on('click', function () {
        var fname = $('#fname').val()
        $('#lname').val(fname)
    });
    jQuery('#btntoggle').on('click', function () {
        $('#howtohide').toggle()
    });
    jQuery('#btntblhtml').click(function () {
        alert(jQuery('#familytbl').html())
    });
    jQuery('#btntblloop').click(function () {
        jQuery('#familytbl tr').each(function () {
            alert(jQuery(this))
        });
    });
    //jQuery('#btnattributeselector').click(function () {
    //    jQuery('input[type="text"] ').css('background-color','grey')
    //});
    jQuery('#ddlCustomers1').change(function () {
        var countryid=jQuery(this).val()
        var ddlCustomers = $("#ddlCustomers");
        var obj = { country: '1' };
        ddlCustomers.empty().append('<option selected="selected" value="0" disabled = "disabled">Loading.....</option>');
        $.ajax({
            type: "GET",
            url: "/Home/Vava",
            data: { "country": countryid},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                console.log(response)
                ddlCustomers.empty().append('<option selected="selected" value="0">Please select</option>');
                $.each(response, function (i, item) {

                    $("#ddlCustomers").append(`<option value="${item.value}">${item.text}</option>`);
                    //ddlCustomers.append($("<option></option>").val(this['value']).html(this['text']));
                });
            },
            failure: function (response) {
                alert(response.responseText);
            },
            error: function (response) {
                alert(response.responseText);
            }
        });


    })
    jQuery('#btnattributeselector').click(function () {

        var ddlCustomers = $("#ddlCustomers");
        var obj = { country: '1' };
        ddlCustomers.empty().append('<option selected="selected" value="0" disabled = "disabled">Loading.....</option>');
        $.ajax({
            type: "GET",
            url: "/Home/Babu",
            data: { "country": '1' },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                console.log(response)
                ddlCustomers.empty().append('<option selected="selected" value="0">Please select</option>');
                $.each(response, function (i, item) {

                    $("#ddlCustomers").append(`<option value="${item.value}">${item.text}</option>`);
                    //ddlCustomers.append($("<option></option>").val(this['value']).html(this['text']));
                });
            },
            failure: function (response) {
                alert(response.responseText);
            },
            error: function (response) {
                alert(response.responseText);
            }
        });


    })
    jQuery('#kk1').click(function () {
        alert('hiiii kk1')
        jsonobject = []
        trarray = {}
        trarray["Name"] = "Nisha"
        trarray["Gender"] = "Female"
        trarray["Role"] = "Lead"

        jsonobject.push(trarray)
        trarray["Name"] = "Babu"
        trarray["Gender"] = "Male"
        trarray["Role"] = "Manager"
        jsonobject.push(trarray)
        let ModelObject = [
            { Name: 'Nisha', Gender: 'Female', Role: 'lead' },
            { Name: 'Babu', Gender: 'Male', Role: 'Sooper lead' },]
        $.ajax({

            type: "POST",

            //url: '@Url.Action("Nisha", "Home")',
            url: '/Home/Nisha',
            data: JSON.stringify(jsonobject),

            contentType: "application/json; charset=utf-8",

            dataType: "json",

            success: function (data) {
                console.log(data)
                let output = data.map(i => "<tr><td>" + i.name + "</td><td>" + i.gender + "</td><td>" + i.role + "</td></tr>");

                $("#output").html(output);

            }

        });

    })
    jQuery('#btnlive').click(function () {
        var name = "nisha";
        var course = "Maths";
        var feespaid = "2000";
        var feesdue = "4000";
        var feesoriginal = "8000";
        var markup = "<tr><td class='nr'>" + name + "</td><td class='sc'>" + course + "</td><td>" + feespaid + "</td><td>" + feesdue + "</td><td>" + feesoriginal + "</td><td> <a id='m' class='btn btn-danger nisha' asp-controller='test' asp-action='CheckTabeRow'>View </a></td></tr> ";
        $("#choose-address-table tbody").append(markup);
    })
    jQuery('#choose-address-table tbody tr ').on('click', 'td', function () {
        alert('hiiiii')
    })
    jQuery('#kk').click(function () {
        alert('hiiii')
        let ModelObject = [
            { Name: 'Nisha', Gender: 'Female', Role: 'lead' },
            { Name: 'Babu', Gender: 'Male', Role: 'Sooper lead' },]
        $.ajax({

            type: "POST",

            //url: '@Url.Action("Nisha", "Home")',
            url: '/Home/Nisha',
            data: JSON.stringify(ModelObject),

            contentType: "application/json; charset=utf-8",

            dataType: "json",

            success: function (data) {
                console.log(data)
                let output = data.map(i => "<tr><td>" + i.name + "</td><td>" + i.gender + "</td><td>" + i.role + "</td></tr>");

                $("#output").html(output);

            }

        });

    })
    $(".use-address").click(function () {
        var $row = $(this).closest("tr");    // Find the row
        var $text = $row.find(".nr").text(); // Find the text
        var $course = $row.find(".sc").text(); // Find the text

        // Let's test it out
        alert($text);

        $.ajax({

            type: "GET",

            //url: '@Url.Action("Nisha", "Home")',
            url: '/Test/CheckTabeRow',
            data: { "stname": $text, "stcourse": $course},

            contentType: "application/json; charset=utf-8",

            dataType: "json",

            success: function (data) {
                console.log(data)
                let output = data.map(i => "<tr><td>" + i.name + "</td><td>" + i.gender + "</td><td>" + i.role + "</td></tr>");

                $("#output").html(output);

            }

        });
    });
    $(".nisha").click(function () {
        var $row = $(this).closest("tr");    // Find the row
        var $text = $row.find(".nr").text(); // Find the text
        var $course = $row.find(".sc").text(); // Find the text

        // Let's test it out
        alert($text);

        $.ajax({

            type: "GET",

            //url: '@Url.Action("Nisha", "Home")',
            url: '/Test/CheckTabeRow',
            data: { "stname": $text, "stcourse": $course },

            contentType: "application/json; charset=utf-8",

            dataType: "json",

            success: function (data) {
                console.log(data)
                let output = data.map(i => "<tr><td>" + i.name + "</td><td>" + i.gender + "</td><td>" + i.role + "</td></tr>");

                $("#output").html(output);

            }

        });
    });
})
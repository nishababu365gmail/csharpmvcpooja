
var attributes = [];
$(document).ready(function () {
   
    function myFun(data, controlid) {

        var another = $("#" + controlid + "")
        json = $.parseJSON(JSON.stringify(data));

        if (json.length > 0) {

            another.show();
        }
        else {

            another.hide();
        }
    }
    $(function () {
        $("#datepicker").datepicker(
            
            {
                             
                dateFormat: "dd-mm-yy"
                
            }

        );
        
    });
    $('.multiple-checkboxes').multiselect({
        includeSelectAllOption: true,
    });
    $("div#print_button").click(function () {

        $("div.PrintArea").printArea({ mode: 'popup', popClose: true });

    });

    //$('#printMe').click(function () {
    //    window.print();
    //});
    //to print a particular area
    $('#printMe').click(function () {
        
        $("#OutPutPrint").printArea({ mode: 'popup', popClose: true });
    });
   
        $("#ObjFeesPayment_StudentId").on("change", function () {            
        var studentid = $(this).val();     
            $("#ObjFeesPayment_CourseId").empty();
            $("#ObjFeesPayment_CourseId").append("<option value=''>Select Course</option>");
            $.getJSON(`?handler=StudentCourse&StudentId=${studentid}`, (data) => {
            //myFun(data, controlid)
            $.each(data, function (i, item) {

                $("#ObjFeesPayment_CourseId").append(`<option value="${item.value}">${item.text}</option>`);
            });
        });
        });
    $(".plusimage").click(function () {
        var courseid = $(this).attr("id");          
        var index = courseid.indexOf("_")
        var idstring = courseid.substring(index + 1)
        $("#" + idstring).hide();
        $("#minusimg_" + idstring).show();
        $("#minusimg_" + idstring).css("visibility", "visible");
    });
    $(".minusimage").click(function () {
        var courseid = $(this).attr("id");
        var index = courseid.indexOf("_")
        var idstring = courseid.substring(index + 1)
        $("#" + idstring).show();
        $(this).css("visibility", "hidden")
        
    });
    $("#ObjFeesPayment_CourseId").on("change", function () {
        var courseid = $(this).val();       
        var studentid = $("#ObjFeesPayment_StudentId").val();        
        $.getJSON(`?handler=StudentFeesPayment&CourseId=${courseid}&StudentId=${studentid}`, (data) => {
            console.log('hiiiiiiiiii');
            console.log(data);
            $("#ObjFeesPayment_FeesDueAmount").val(data.feesDueAmount);
            var due = 0.0
            var fp = 0.0
            due = data.feesDueAmount;
            fp = data.feesPaid;            
            $("#FeesTobePaid").val(due - fp);
            $("#ObjFeesPayment_Fees").focus();
        });
    });
    $("#StudentInfo_StuEmailId").on("blur", function () {
        var email = $(this).val();
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        if (re.test(email)) {
            $('.msg').hide();
            $('.success').show();
            $("#btnSaveStudent").prop("disabled", false)
        }
        else {
            $("#btnSaveStudent").prop("disabled", true)
        }
    });
    $("#ObjFeesPayment_Fees").on("blur", function () {
        console.log("onblur");
        var due = 0.0
        var fp = 0.0
        due = parseFloat($("#ObjFeesPayment_Fees").val());
        fp = parseFloat($("#FeesTobePaid").val());
        if (due > fp) {
            alert("Fees entered is greater than Fees remaining");
            //$("#ObjFeesPayment_Fees").focus();
            $("#btnSave").prop("disabled", true)
        }
        else {
            $("#btnSave").prop("disabled", false)
        }
    });
    $('.custom-file-input').on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        console.log(fileName);
        $(this).next('.custom-file-label').html(fileName);
    });
    $('input[type="checkbox"]').click(function () {
        var inputid = ($(this).attr("id"));
        var closeddateinput = $("#ClosedDateDiv");
        if (inputid == "CaseModel_IsClosed") {
            
            
            console.log(closeddateinput);
            if ($(this).is(":checked")) {
                console.log("checked is true");
                closeddateinput.show();
            }
            else {
                closeddateinput.hide();
            }
        }
       
    });

    $("#CaseModel_CourtName").on("change", function () {
        
        var maincourtid = $(this).val();
        var controlid = "SubCourtDiv";
       
        $("#CaseModel_SubCourtName").empty();
        $("#CaseModel_SubCourtName").append("<option value=''>Select SubCourt</option>");
        $.getJSON(`?handler=SubCourts&CourtId=${maincourtid}`, (data) => {
            myFun(data, controlid)
            $.each(data, function (i, item) {               

                $("#CaseModel_SubCourtName").append(`<option value="${item.value}">${item.text}</option>`);
            });
        });
    });
    
    $("#CaseModel_CaseNature").on("change", function () {

        var maincourtid = $(this).val();
        var controlid = "SubCseNatureDiv";

        $("#CaseModel_SubCaseNature").empty();
        $("#CaseModel_SubCaseNature").append("<option value=''>Select Sub case Nature</option>");
        $.getJSON(`?handler=SubCaseNature&CaseNatureId=${maincourtid}`, (data) => {
            myFun(data, controlid)
            $.each(data, function (i, item) {

                $("#CaseModel_SubCaseNature").append(`<option value="${item.value}">${item.text}</option>`);
            });
        });
    });
    
    $("#category").on("change", function () {
        var categoryId = $(this).val();
       
        $("#subcategory").empty();
        $("#subcategory").append("<option value=''>Select SubCategory</option>");
        $.getJSON(`?handler=SubCategories&categoryId=${categoryId}`, (data) => {
           
            $.each(data, function (i, item) {
                
                $("#subcategory").append(`<option value="${item.Key}">${item.Value}</option>`);
            });
        });
    });
    $("#nisha").click(function (e){
        var categoryId = 1;        
        var babu = $("#searchhousename").val();     
        var patid = $("#searchId").val();
        var patname = $("#searchpatientname").val(); 
        
        $.getJSON(`?handler=Profile&housename=${babu}&patientname=${patname}&Id=${patid}`, (data) => {

            $.each(data, function (i, item) {
                
                drawTableHospital(data)
                //$("#subcategory").append(`<option value="${item.Key}">${item.Value}</option>`);
            });
        });
    });

    function drawTableHospital(data) {
        $(".itemtable > tbody").html("");
        for (var i = 0; i < data.length; i++) {
            drawRowHospital(data[i]);
        }
    }

    function drawRowHospital(rowData) {
       
        var row = $("<tr />")
        $(".itemtable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it

        row.append($("<td > <input type='text' style='width:100px' id='" + rowData.id + "-" + rowData.patientname + "' value='" + rowData.patientname + "'  class='vava' readonly/> </td>"));
        row.append($("<td > <input type='text' style='width:100px' id='" + rowData.id + "-" + rowData.housename + "' value='" + rowData.housename + "'  class='vava' readonly/> </td>"));
        row.append($("<td > <input type='text' style='width:100px' id='" + rowData.id + "-" + rowData.placedetails + "' value='" + rowData.placedetails + "'  class='vava' readonly/> </td>"));
        row.append($("<td > <input type='text' style='width:100px' id='" + rowData.id + "-" + rowData.podetails + "' value='" + rowData.podetails + "'  class='vava' readonly/> </td>"));
        row.append($("<td > <input type='button' style='width:100px' id='" + rowData.id + "' value=' select '  class='btnvava' readonly/> </td>"))
    }
    // $(document).on('click', '.btnConfirm', function () {
    $(document).on('click', '.btnvava', function () {
        

        var patid = $(this).attr("id");
       
        $.getJSON(`?handler=Profile&Id=${patid}`, (data) => {

            $.each(data, function (i, item) {

                console.log(item.patientname);
                $("#Id").val(item.id);
                $("#regdate").val(item.dateofbirth);
                $("#patientname").val(item.patientname);
                $("#gender").val(item.gender);
                $("#age").val(item.age);
                $("#agetype").val(item.agetype)
                $("#dateofbirth").val(item.dateofbirth);
                $("#phonenumber").val(item.phonenumber);
                $("#careof").val(item.careof)
                $("#housename").val(item.housename);
                $("#address").val(item.address);
                $("#podetails").val(item.podetails)
                $("#placedetails").val(item.placedetails);
                $("#Profession").val(item.profession);
                $("#Religion").val(item.religion)
                $("#patienttype").val(item.patienttype);
                $("#referedbydoctor").val(item.referedbydoctor);
                $("#doctor").val(item.doctor)
                
            });
        });
    });

    $('#babu').on('click', function (evt) {
        evt.preventDefault();
        console.log("sucess");
        var item1 = $('#Id').val();
        var item2 = $('#regdate').val();
        var item3 = $('#patientname').val();
        var item4 = $('#gender').val();
        var item5 = $('#age').val();
        var item6 = $('#agetype').val();
        var item7 = $('#dateofbirth').val();
        var item8 = $('#phonenumber').val();
        var item9 = $('#careof').val();
        var item10 = $('#housename').val();
        var item12 = $('#address').val();
        var item13 = $('#podetails').val();
        var item14 = $('#placedetails').val();
        var item15 = $('#Profession').val();
        var item16 = $('#Religion').val();
        var item17 = $('#patienttype').val();
        var item18 = $('#referedbydoctor').val();
        var item11 = $('#doctor').val();
        $.ajax({
            type: "POST",
            url: "/Patients/EditPatientDetails?handler=Edit",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            data: JSON.stringify({
                Id: item1,
                regdate: item2,
                patientname: item3,
                gender: item4,
                age: item5,
                agetype: item6,
                dateofbirth: item7,
                phonenumber: item8,
                careof: item9 ,
                housename: item10,
                address: item12,
                podetails: item13 ,
                placedetails: item14,
                Profession: item15,
                Religion: item16,
                patienttype: item17,
                referedbydoctor: item18,
                doctor: item11
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                console.log("sucess");
               
            },
            failure: function (response) {
                alert(response);
            }
        });
       
    })
    $(".doctor").on("change", function () {
           
        var optionText = $(".doctor option:selected").val(); 
        console.log(optionText);
        $('#doctor').val(optionText);
    });
    $(".nationality").on("change", function () {

        var optionText = $(".nationality option:selected").val();
        console.log(optionText);
        $('#nationality').val(optionText);
    });
    
    $("#SubList").change(function () {

        if ($("#SubList").val() > 0) {
            var str = $("#SubList option:selected").text();
            var strval = $("#SubList option:selected").val();
            $("#SubCodeId").val(strval);
            $("#sdesc").val(str);
                var options = {};
                options.url = "/Level3CaseNature/GetDescriptionSubCode";
                //options.data = JSON.stringify({ Id: $("#MainCodeId").val(), CompanyId: $("#CompanyId").val(), BranchId: $("#BranchId").val() });
                options.data = JSON.stringify({ Id: $("#SubCodeId").val(), CompanyId: 1, BranchId: 1 });

                options.datatype = "json";
                options.contentType = "application/json";
                options.type = "POST";
                options.success = function (data) {
                    if (data.length > 0) {
                        $("#scode").val(data);
                        $('#scode').attr('readonly', 'true');
                    }
                    else {
                        $('#scode').val('');
                        $('#scode').attr('readonly', 'true');
                    }
                };
                $.ajax(options);
        }
        else
        {
            $('#scode').val('');
        }

    });
    $("#MainList").change(function () {
        if ($("#MainList").val() > 0) {
            var strval = $("#MainList option:selected").val();
            var str = $("#MainList option:selected").text();
            $("#MainCodeId").val(strval);
            $("#mdesc").val(str);

            var options = {};
            options.url = "/Level3CaseNature/GetDescription";
            //options.data = JSON.stringify({ Id: $("#MainCodeId").val(), CompanyId: $("#CompanyId").val(), BranchId: $("#BranchId").val() });
            options.data = JSON.stringify({ Id: $("#MainCodeId").val(), CompanyId: 1, BranchId: 1 });

            options.datatype = "json";
            options.contentType = "application/json";
            options.type = "POST";
            options.success = function (data) {
                    
                if (data.length > 0) {
                    $("#mcode").val(data);
                    $('#mcode').attr('readonly', 'true');
                    if ($("#MainCodeId").val() > 0) {
                        var options = {};
                        options.url = "/Level3CaseNature/GetCaseSubNatureList";
                        options.data = JSON.stringify({ MainCode: $("#MainCodeId").val() });
                        options.datatype = "json";
                        options.contentType = "application/json";
                        options.type = "POST";

                        options.success = function (data) {
                            if (data.length>0) {
                                $("#rowdiv").show();
                                //$("#SubList").css("display", "inline");
                                //$("#SubListLabel").css("display", "inline");
                                $("#rowdiv1").show();
                                //$("#scode").css("display", "inline");
                                //$("#SubListCodeLabel").css("display", "inline");

                                $("#SubList").empty()
                                $('#scode').val('');
                                $("#SubList").prop("disabled", false);
                                $("#SubList").append("<option value='" + "" + "'>---Select--- </option>");
                                for (var ct = 0; ct <= data.length; ct++) {
                                    $("#SubList").append("<option value=" + data[ct].Id + ">" + data[ct].MainDesc + "</option>");
                                }
                                $("#SubList").prop("disabled", false);
                            }
                            else {
                                $("#SubList").prop("disabled", false);
                                $("#rowdiv").hide();
                                //$("#SubList").css("display", "none");
                                //$("#SubListLabel").css("display", "none");
                                $("#rowdiv1").hide();
                                //$("#scode").css("display", "none");
                                //$("#SubListCodeLabel").css("display", "none");

                            } //else

                        }; //func

                        $.ajax(options);
                    }
                }  
            };
            $.ajax(options);
            //if ($("#MainCodeId").val() > 0) {
            //    var options = {};
            //    options.url = "/Level3CaseNature/GetCaseSubNatureList";
            //    options.data = JSON.stringify({ MainCode: $("#MainCodeId").val() });
            //    options.datatype = "json";
            //    options.contentType = "application/json";
            //    options.type = "POST";

            //    options.success = function (data) {
            //        if (data.length>0) {
            //            alert(data);
            //            $("#rowdiv").show();
            //            //$("#SubList").css("display", "inline");
            //            //$("#SubListLabel").css("display", "inline");
            //            $("#rowdiv1").show();
            //            //$("#scode").css("display", "inline");
            //            //$("#SubListCodeLabel").css("display", "inline");

            //            $("#SubList").empty()
            //            $('#scode').val('');
            //            $("#SubList").prop("disabled", false);
            //            $("#SubList").append("<option value='" + "" + "'>-- Select-- </option>");
            //            for (var ct = 0; ct <= data.length; ct++) {
            //                $("#SubList").append("<option value=" + data[ct].Id + ">" + data[ct].MainDesc + "</option>");
            //            }
            //            $("#SubList").prop("disabled", false);
            //        }
            //        else {
            //            $("#SubList").prop("disabled", false);
            //            $("#rowdiv").hide();
            //            //$("#SubList").css("display", "none");
            //            //$("#SubListLabel").css("display", "none");
            //            $("#rowdiv1").hide();
            //            //$("#scode").css("display", "none");
            //            //$("#SubListCodeLabel").css("display", "none");
                    
            //        } //else
        
            //    }; //func

            //    $.ajax(options);
            //}
        }
    });
    $("#LevelList").change(function () {

        if ($("#LevelList").text != "Select") {
            if ($("#LevelList").val() > 0) {
                var strval = $("#LevelList option:selected").val();
                var str = $("#LevelList option:selected").text();
                var str1=str.replace("_","")
                $("#Id").val(strval);
                $("#Category").val(str1);
            }
        }
    });
    $("#MainCourtId").change(function () {

        if ($("#MainCourtId").text != "Select") {
            var options = {};
            options.url = "/CaseDetails/GetSubCodeList";
            options.data = JSON.stringify({ MainCode: $("#MainCourtId").val() });
            options.datatype = "json";
            options.contentType = "application/json";
            options.type = "POST";
            options.success = function (data) {
                if (data.length> 0) {
                    alert(data.length);
                    $("#SubCourtId").empty()
                    $("#SubCourtId").prop("disabled", false);
                    $("#SubCourtId").append("<option value='" + "" + "'>---Select--- </option>");
                    for (var ct = 0; ct <= data.length; ct++) {
                        $("#SubCourtId").append("<option value='" + data[ct].Id + "'>" + data[ct].MainDesc + "</option>");
                    }

                    $("#SubCourtId").prop("disabled", false);
                }
                else {
                    $("#SubCourtId").prop("disabled", true);
                }
            };
            $.ajax(options);
        }
    });
    //Name of the court
    $("#NameOftheCourt").change(function () {

        if ($("#NameOftheCourt").text != "Select") {
            if ($("#NameOftheCourt").val() > 0) {
                var options = {};
                options.url = "/CaseRegistration/GetCourtSubNameList";
                options.data = JSON.stringify({ MainCode: $("#NameOftheCourt").val() });
                options.datatype = "json";
                options.contentType = "application/json";
                options.type = "POST";
                options.success = function (data) {
                    if (data.length > 0) {
                     
                        $("#subcourtrowdiv").show();
                        //$("#NameOfTheSubCourt").css("display", "inline");
                        //$("#lblCourtSubName").css("display", "inline");
                        $("#NameOfTheSubCourt").empty();
                        $("#NameOfTheSubCourt").prop("disabled", false);
                        
                        $("#NameOfTheSubCourt").append("<option value='" + "" + "'>---Select--- </option>");
                        for (var ct = 0; ct <= data.length; ct++) {
                            $("#NameOfTheSubCourt").append("<option value='" + data[ct].Id + "'>" + data[ct].MainDesc + "</option>");
                        }

                        $("#NameOfTheSubCourt").prop("disabled", false);
                        //$("#divCourtSubName").show();
                    }
                    else {
                        $("#NameOfTheSubCourt").prop("disabled", true);
                        //$("#divCourtSubName").hide();
                        $("#subcourtrowdiv").hide();
                    }
                };
                $.ajax(options);
            }
            else {
                $("#subcourtrowdiv").hide();
            }
        }
    });
    //Nature of the caset
    $("#NatureOfTheCase").change(function () {

        if ($("#NatureOfTheCase").text != "Select") {
            if ($("#NatureOfTheCase").val()>0) {
                var options = {};
                options.url = "/CaseRegistration/GetCaseSubNatureList";
                options.data = JSON.stringify({ MainCode: $("#NatureOfTheCase").val() });
                options.datatype = "json";
                options.contentType = "application/json";
                options.type = "POST";
                options.success = function (data) {
                    if (data.length > 0) {
                        //$("#SubNatureOfTheCase").css("display", "inline");
                        //$("#lblSubNatureOfTheCase").css("display", "inline");
                        $("#subnaturerowdiv").show();
                        $("#SubNatureOfTheCase").empty();
                        $("#SubNatureOfTheCase").prop("disabled", false);
                        $("#SubNatureOfTheCase").append("<option value='" + "" + "'>---Select--- </option>");
                        for (var ct = 0; ct <= data.length; ct++) {
                            $("#SubNatureOfTheCase").append("<option value='" + data[ct].Id + "'>" + data[ct].MainDesc + "</option>");
                        }

                        $("#SubNatureOfTheCase").prop("disabled", false);
                    

                    }
                    else {
                        $("#SubNatureOfTheCase").prop("disabled", true);
                        $("#subnaturerowdiv").hide();
                        //$("#divSubNatureOfTheCase").hide();
                        //$("#divSubNatureOfTheCaselbl").hide();
                    }
                };
                $.ajax(options);
            }
            else
            {
                $("#subnaturerowdiv").hide();
            }
        }
    });

    //SubNature of the case
    $("#SubNatureOfTheCase").change(function () {

        if ($("#SubNatureOfTheCase").text != "Select") {
            if ($("#SubNatureOfTheCase").val() > 0) {
                var options = {};
                options.url = "/CaseRegistration/GetCaseSubNatureListLevel2";
                options.data = JSON.stringify({ MainCode: $("#NatureOfTheCase").val(), SubCode: $("#SubNatureOfTheCase").val() });
                options.datatype = "json";
                options.contentType = "application/json";
                options.type = "POST";
                options.success = function (data) {
                    if (data.length > 0) {
                        //$("#SubNatureOfTheCase1").css("display", "inline");
                        //$("#lblSubNatureOfTheCaseLevel2").css("display", "inline");
                        $("#subnaturerowdiv1").show();
                        $("#SubNatureOfTheCase1").empty();
                        $("#SubNatureOfTheCase1").prop("disabled", false);
                        $("#SubNatureOfTheCase1").append("<option value='" + "" + "'>---Select--- </option>");
                        for (var ct = 0; ct <= data.length; ct++) {
                            $("#SubNatureOfTheCase1").append("<option value='" + data[ct].Id + "'>" + data[ct].MainDesc + "</option>");
                        }

                        $("#SubNatureOfTheCase1").prop("disabled", false);


                    }
                    else {
                        $("#SubNatureOfTheCase1").prop("disabled", true);
                        $("#subnaturerowdiv1").hide();
                        //$("#divSubNatureOfTheCaseLevel2").hide();
                        //$("#divSubNatureOfTheCaseLevel2lbl").hide();
                    }
                };
                $.ajax(options);
            }
            else
            {
                $("#subnaturerowdiv1").hide();
            }
        }
    });

    //end SubNature of the case change
    $("#CaseNoNameRegDate").change(function () { 
        
        var splitstring = $("#CaseNoNameRegDate option:selected").text();
        var splitarr = splitstring.split('*');
        $("#CaseNo").val(splitarr[0]);
        $("#NameOfTheParty").val(splitarr[1]);
        $("#RegistrationDate").val(splitarr[2]);
        $('#CaseNo').attr('readonly', 'true');
        $('#NameOfTheParty').attr('readonly', 'true');
        $('#RegistrationDate').attr('readonly', 'true');
        //alert(splitstring);
        //alert(splitarr[0]);
    }
    );
    $("#CaseNoNameRegDate1").change(function () {
        var splitstring = $("#CaseNoNameRegDate1 option:selected").text();
        var splitarr = splitstring.split('*');
        $("#CaseNo").val(splitarr[0]);
        $("#NameOfTheParty").val(splitarr[1]);
        $("#RegistrationDate").val(splitarr[2]);
        $("#hCaseNo").val(splitarr[0]);
        $("#hNameOfTheParty").val(splitarr[1]);
        $("#hRegistrationDate").val(splitarr[2]);
        $('#CaseNo').attr('readonly', 'true');
        $('#NameOfTheParty').attr('readonly', 'true');
        $('#RegistrationDate').attr('readonly', 'true');
        if ($("#hCaseNo").text != "" && $("#hNameOfTheParty").text != "" && $("#hRegistrationDate").text != "") {
            var options = {};
            options.url = "/CaseProceedings/GetPreviousProceedingsDate";
            options.data = JSON.stringify({ hCaseNo: $("#hCaseNo").val(), CompanyId: 1, BranchId: 1 });
            options.datatype = "json";
            options.contentType = "application/json";
            options.type = "POST";
            options.success = function (data) {
                if (data.length > 0) {
                    $("#PrevPostingDate").val(data);
                    $('#PrevPostingDate').attr('readonly', 'true');
                }
                else {
                    $('#PrevPostingDate').val('');
                    $('#PrevPostingDate').attr('readonly', 'true');
                }
            };
            $.ajax(options);
        }
        //alert(splitstring);
        //alert(splitarr[0]);
    }
   );
    $("#CategoryList").change(function () {
        if ($("#CategoryList").val() > 0) {
            var str = $("#CategoryList option:selected").text();
            var strval = $("#CategoryList option:selected").val(); 
            $("#mdesc").val(str);
            $("#MainCodeId").val(strval);
        }
        else
        {  
            $("#mdesc").val('');
            $("#MainCodeId").val('');
        }
        if ($("#mdesc").text != "" && $("#MainCodeId").text != "") {
            var options = {};
            options.url = "/Level2CourtName/GetDescription";
            //options.data = JSON.stringify({ Id: $("#MainCodeId").val(), CompanyId: $("#CompanyId").val(), BranchId: $("#BranchId").val() });
            options.data = JSON.stringify({ Id: $("#MainCodeId").val(), CompanyId: 1, BranchId: 1 });

            options.datatype = "json";
            options.contentType = "application/json";
            options.type = "POST";
            options.success = function (data) {
                if (data.length > 0) {
                    $("#mcode").val(data);
                    $('#mcode').attr('readonly', 'true');
                }
                else {
                    $('#mcode').val('');
                    $('#mcode').attr('readonly', 'true');
                }
            };
            $.ajax(options);
        }
    });
    $("#StatusNullable").change(function () {

        var status = $("#StatusNullable option:selected").text();

        if (status == "Closed") {
            $('#closedaterow').show();
            //$('#ClosingDate').css('display', 'inline');
            //$('#lblClosingDate').css('display', 'inline');
        }
        else {
            $('#closedaterow').hide();
            //$('#ClosingDate').css('display', 'none');
            //$('#lblClosingDate').css('display', 'none');

        }
        //alert(splitstring);
        //alert(splitarr[0]);
    }
);
    $("#caseno").change(function () {
        if ($("#caseno").val()!='')
        {
            var options = {};
            options.url = "/CaseRegistration/CheckCaseNo";
            options.data = JSON.stringify({ CaseNo: $("#caseno").val() });
            options.datatype = "json";
            options.contentType = "application/json";
            options.type = "POST";
           
            options.success = function (data) {
                if (data>0)
                {
                    $("#caseno").val('');
                    alert("Case No already exists!!!");
                    $("#caseno").focus();
                }
                
            };
            $.ajax(options);
        }
    });

    $("#dob").change(function () {
        if ($("#dob").val() !='')
        {
            var dob = $('#dob').val();
            dob = new Date(dob);
            alert(dob);
            var today = new Date();
            alert(today);
            var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
            $('#age').val(age);
        }
    });
    $("#FirstMiddle").change(function () {
        if ($("#FirstMiddle").text()!="---Select---")
        {
            var splitstring = $("#FirstMiddle option:selected").text();
            var splitarr = splitstring.split('*');
            $("#PartyName").val(splitarr[0]);
        }
    });
    $("#SubCode").change(function () {

        if ($("#SubCode").text != "Select") {
            var valsubcode = $("#SubCode").val();
            var options = {};
            options.url = "/ItemDetail/GetItemMasterList";
            options.data = JSON.stringify({ MainCode: $("#MainCode").val(), SubCode: valsubcode });

            options.datatype = "json";
            options.contentType = "application/json";
            options.type = "POST";
            options.success = function (data) {

                $("#ItemMasterId").empty()
                $("#ItemMasterId").prop("disabled", false);
                $("#ItemMasterId").append("<option value='" + "" + "'>---Select--- </option>");
                for (var ct = 0; ct <= data.length; ct++) {
                    $("#ItemMasterId").append("<option value='" + data[ct].Id + "'>" + data[ct].ItemName + "</option>");
                }

                $("#ItemMasterId").prop("disabled", false);

            };
            $.ajax(options);
        }
    });
    $("#ItemMasterId").change(function () {
        attributes = [];
        if ($("#ItemMasterId").text != "Select") {
            var valitemcode = $("#ItemMasterId").val();
            var options = {};

            options.url = "/ItemDetail/GetItemMasterAttributeList";
            options.data = JSON.stringify({ ItemMasterId: valitemcode });
            options.datatype = "json";
            options.contentType = "application/json";
            options.type = "POST";
            options.success = function (data) {
                drawTable(data);

            };
            $.ajax(options);
        }
    });
    function drawTable(data) {
        $("#itemtable > tbody").html("");
        for (var i = 0; i < data.length; i++) {
            drawRow(data[i]);
        }
    }
   // function drawTableHospital(data) {
   //     $(".itemtable > tbody").html("");
   //     for (var i = 0; i < data.length; i++) {
   //         drawRowHospital(data[i]);
   //     }
   // }

   // function drawRowHospital(rowData) {
   //     console.log(rowData.id);
   //     var row = $("<tr />")
   //     $(".itemtable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it

   //     row.append($("<td > <input type='text' style='width:100px' id='" + rowData.id + "-" + rowData.patientname + "' value='" + rowData.patientname + "'  class='vava' readonly/> </td>"));
   //     row.append($("<td > <input type='text' style='width:100px' id='" + rowData.id + "-" + rowData.housename + "' value='" + rowData.housename + "'  class='vava' readonly/> </td>"));
   //     row.append($("<td > <input type='text' style='width:100px' id='" + rowData.id + "-" + rowData.placedetails + "' value='" + rowData.placedetails + "'  class='vava' readonly/> </td>"));
   //     row.append($("<td > <input type='text' style='width:100px' id='" + rowData.id + "-" + rowData.podetails +  "' value='" + rowData.podetails + "'  class='vava' readonly/> </td>"));
   //     row.append($("<td > <input type='button' style='width:100px' id='" + rowData.id + "' value=' select '  class='btnvava' readonly/> </td>"))
   // }
   //// $(document).on('click', '.btnConfirm', function () {
   // $(document).on('click','.btnvava',function (){
   //     console.log('nisha');
        
   //     var patid = $(this).attr("id");
   //     $.getJSON(`?handler=Profile&Id=${patid}`, (data) => {

   //         $.each(data, function (i, item) {
              
   //             console.log(item.patientname);               

   //             $("#regdate").val(item.dateofbirth);
   //             $("#patientname").val(item.patientname);
                
   //         });
   //     });
   // });
    function drawRow(rowData) {
        var row = $("<tr />")
        $("#itemtable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it

        row.append($("<td > <input type='text' style='width:100px' id='" + rowData.Id + "-" + rowData.charAttributeName + "-prize' value='" + rowData.charAttributeName + "'  class='vava' readonly/> </td>"));
        //row.append($("<td > <input type='number' style='width:48px' id='" + rowData.Id + "-" + rowData.charAttributeName + "-qty'  name='Quantity' class='qty' /> </td>"));
        row.append($("<td > <select  id='" + rowData.Id + "-" + rowData.charAttributeName + "' name=" + rowData.charAttributeName + " class='" + rowData.intOrder + "-attribute' /> </td>"));
        fillKOTType(rowData.Id + "-" + rowData.charAttributeName, rowData.charAttributeName, 0)
    }
    function fillKOTType(id, type, selval) {
        var options = {};

        options.url = "/ItemDetail/GetLookUpValues";

        options.data = JSON.stringify({ key: type })
        //options.data = {}
        options.dataType = "json";
        options.contentType = "application/json";
        options.type = "POST";
        options.success = function (kottype) {

            if (type == "KotType") {

                $("[id='" + id + "']").empty()

                $("[id='" + id + "']").append("<option value='" + "" + "'>---Select--- </option>");
                for (var ct = 0; ct <= kottype.length; ct++) {
                    if (kottype[ct].Id == selval) {

                        $("[id='" + id + "']").append("<option selected= 'true' value='" + kottype[ct].Id + "'>" + kottype[ct].MainDesc + "</option>");
                    }

                    else {

                        $("[id='" + id + "']").append("<option  value='" + kottype[ct].Id + "'>" + kottype[ct].MainDesc + "</option>");
                    }
                }



            }

            else {

                $("[id='" + id + "']").empty()
                if (selval > 0) {
                    $("[id='" + id + "']").prop("disabled", false);

                }
                else {
                    $("[id='" + id + "']").prop("disabled", false);

                }
                $("[id='" + id + "']").append("<option value='" + "" + "'>---Select--- </option>");
                for (var ct = 0; ct <= kottype.length; ct++) {
                    if (kottype[ct].Id == selval) {
                        $("[id='" + id + "']").append("<option selected= 'true' value='" + kottype[ct].Id + "'>" + kottype[ct].MainDesc + "</option>");
                    }
                    else {

                        $("[id='" + id + "']").append("<option value='" + kottype[ct].Id + "'>" + kottype[ct].MainDesc + "</option>");
                    }
                }
            }

        };
        options.error = function () {
            alert("Error retrieving Food Categor!");
        };
        $.ajax(options);

    }
    $('#itemtable').on('change', 'tbody tr td select', function (event) {

        var cs1 = $(this).attr("class");
        var myid = this.id;
        var position = cs1.lastIndexOf('-');
        var order = cs1.substring(0, position);
        attributes[order] = $("#" + myid + " :selected").text();

        var attributevalues = attributes.join('-');

        var attributevaluesconcat = $('#ItemMasterId option:selected').text() + attributevalues
        $("#ItemDetailDesc").val(attributevaluesconcat);
    });
    $("#btnshowItemDetails").click(function () {

        if ($("#ItemMasterId").text != "Select") {
            var valitemcode = $("#ItemMasterId").val();
            var options = {};

            options.url = "/ItemDetail/GetItemDetailsListBasedOnItemMasterId";
            options.data = JSON.stringify({ ItemMasterId: valitemcode });
            options.datatype = "json";
            options.contentType = "application/json";
            options.type = "POST";
            options.success = function (data) {
                drawTableGeneric(data, "itemdetailtable");

            };
            $.ajax(options);
        }
    });
    $("#btnHideItemDetails").click(function () {
        $("#itemdetailtable > tbody").html("");
    });
    function drawTableGeneric(data, tablename) {
        for (var i = 0; i < data.length; i++) {
            drawRowGeneic(data[i], tablename);
        }
    }
    function drawRowGeneic(rowData, tablename) {
        var row = $("<tr />")
        $("#" + tablename + "").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
        //alert(rowData.ItemDetailDesc);
        row.append($("<td > <input type='text' style='width:100px' id='" + rowData.Id + "-" + rowData.ItemDetailDesc + "-prize' value='" + rowData.ItemDetailDesc + "'  class='vava' readonly/> </td>"));

    }
})
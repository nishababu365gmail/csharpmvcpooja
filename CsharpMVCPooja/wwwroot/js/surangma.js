const fnaddfeedetailstotable = () => {
   addRow('tblFeesTransactiondetails')
}
jQuery('.select2').select2({})
function EditRow(event) {
    event.preventDefault()
    const eventagentid = event.currentTarget.id
    
    var element = document.getElementById(eventagentid);
    const studentid = element.getAttribute('data-stuid');
    const studentname = element.getAttribute('data-sname');
    const coursename = element.getAttribute('data-cname');
    const payingamount = element.getAttribute('data-payingamount');
    const totalfees = element.getAttribute('data-totalfees');
    const paidfees = element.getAttribute('data-paidfees');
    const balancefees = element.getAttribute('data-balancefees');
    const studentcourseid = element.getAttribute('data-studentcourseid');
    
    txtpayingamount.value = payingamount
    txtbalancefees.value = balancefees
    txtpaidfees.value = paidfees
    txttotalfees.value = totalfees
    hiddenstudentcourse.value = studentcourseid
  
    $("#surangmastudentid").select2("val", studentid);
  
    $("#surangmastudentid option").each(function () {        
        if ($(this).text() == studentname) {
            $(this).prop('selected', 'selected');
        }
    });
    fnbringcourses(coursename)
    
    var found = false;
    
    
}
function CheckDuplicate() {
    let check = -1;
    var table = document.getElementById("tbbodyfeesTransactiondetails");
    let studentname = jQuery(studentcombo).find('option:selected').text()
    
    let coursename = jQuery(coursecombo).find('option:selected').text()   
    let string_to_check = studentname + '_' + coursename
    for (var i = 0, row; row = table.rows[i]; i++) {
        const studentid = row.cells[0].innerText
        const courseid = row.cells[1].innerText
        let localstring_to_check = studentid + '_' + courseid

        if (string_to_check == localstring_to_check) {
            check=i
            return check
        }
        else {
            
            continue
        }
    }
    return check
}

function addRow(tableID) {    
    //if (CheckDuplicate() == false || CheckDuplicate() == undefined){
    var rownumber = CheckDuplicate() 
    if (rownumber <= -1) {
        let studentname = jQuery(studentcombo).find('option:selected').text()
        let studentid = jQuery(studentcombo).find('option:selected').val()
        let coursename = jQuery(coursecombo).find('option:selected').text()
        if (studentname != "Select Student" && coursename != "Select Course") {
            let dateval = txtdate.value
            let payingamount = txtpayingamount.value
            let totalfees = txttotalfees.value
            let paidfees = txtpaidfees.value
            let balancefees = txtbalancefees.value
            let studentcourseid = hiddenstudentcourse.value
            var markup = `<tr  data-sc=${studentcourseid}><td>${studentname}</td>
                                <td>${coursename}</td>
                                <td>${dateval}</td>
                                <td>${payingamount}</td>
                                <td>${totalfees}</td>
                                <td>${paidfees}</td>
                                <td>${balancefees}</td>
<td>${studentcourseid}</td>

<td><input type="button" value="Edit" id="btnFeesEdit_${studentcourseid}"
class="FeeEditButton"
data-stuid=${studentid}
data-sname=${studentname}
data-cname=${coursename}
data-dateval=${dateval}
data-payingamount=${payingamount}
data-totalfees=${totalfees}
data-paidfees=${paidfees}
data-balancefees=${balancefees}
data-studentcourseid=${studentcourseid}
/>
</td>
 </tr>`
            //var markup = "<tr><td class='nr'>${}</td><td class='sc'>" + course + "</td><td>" + feespaid + "</td><td>" + feesdue + "</td><td>" + feesoriginal + "</td><td> <a id='m' class='btn btn-danger nisha' asp-controller='test' asp-action='CheckTabeRow'>View </a></td></tr> ";
            $("#tblFeesTransactiondetails tbody").append(markup);
            document.querySelectorAll('.FeeEditButton').forEach(item => {
                item.addEventListener('click', EditRow)
            })
        }
    }
    else {
        var maani = document.getElementById("tblFeesTransactiondetails").rows[rownumber+1].getElementsByTagName('td');
        console.log(rownumber)
        maani[0].innerText = jQuery(studentcombo).find('option:selected').text()
        maani[1].innerText = jQuery(coursecombo).find('option:selected').text()
        maani[2].innerText = txtdate.value
        maani[3].innerText = txtpayingamount.value
        maani[4].innerText = txttotalfees.value
        maani[5].innerText = txtpaidfees.value
        maani[6].innerText = txtbalancefees.value
        
    }
}
const fnsavefeedetailstodb = () => {
    
    var table = document.getElementById("tbbodyfeesTransactiondetails");
    let modelarray = []
    let modeljson = {}
    for (var i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        //for (var j = 0, col; col = row.cells[j]; j++) {

        const studentid = row.cells[0].innerText
        const courseid = row.cells[1].innerText
        const date = row.cells[2].innerText
        const currfees = row.cells[3].innerText
        //const stcoid = row.cells[7].innerText

        var stcoid = row.getAttribute("data-sc");
        
        let singlerow = {
            'studentid': studentid,
            'courseid': courseid,
            'date': date,
            'currfees': currfees,
            'studentcourseid': stcoid
        };
            //iterate through columns
            //columns would be accessed using the "col" variable assigned in the for loop
        //}
        modelarray.push(singlerow)
        singlerow = {}
    }
    
    $.ajax({

        type: "POST",

        //url: '@Url.Action("Nisha", "Home")',
        url: '/SurangmaTableToSqlServer/SaveToDb',
        data: JSON.stringify(modelarray),

        contentType: "application/json; charset=utf-8",

        dataType: "json",

        success: function (data) {
            
            let output = data.map(i => "<tr><td>" + i.name + "</td><td>" + i.gender + "</td><td>" + i.role + "</td></tr>");

            $("#output").html(output);

        }

    });
}
const fnbringfeedetails = () => {
    studentid = studentcombo.value;
    courseid = coursecombo.value;
    $.ajax({
        type: "get",
        url: '/SurangmaTableToSqlServer/GetFeeDetailsForStudentCourse',
        data: { "studentid": studentid,"courseid":courseid },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            
            //balanceFees
            //paidFees
            //studentCourseId
            $("#TotalFees").val(data.totalFees)
            $("#PaidFees").val(data.paidFees)
            $("#BalanceFees").val(data.balanceFees)
            $("#StudentCourseId").val(data.studentCourseId)
        }
    })
}

const fnbringcourses = (valtobesel) => {
    
    
    studentid = studentcombo.value;
    
    $.ajax({
        type: "get",
        url: '/SurangmaTableToSqlServer/GetCourseForStudent',
        data: { "studentid": studentid },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#CourseId").empty()
            $("#CourseId").append(`<option value="0">Select Course</option>`);
            $.each(data, function (i, item) {
                if (item.courseName == valtobesel) {
                    $("#CourseId").append(`<option value="${item.id}" selected>${item.courseName}</option>`);
                }
                else {
                    $("#CourseId").append(`<option value="${item.id}" >${item.courseName}</option>`);
                }

                       });
        }
    })
}
//btnAddFees

const studentcombo = document.getElementById("surangmastudentid");
//The following eventlistner code does not work for select2 dropdowns.But works finr for regulr dropdowns
studentcombo.addEventListener("change", fnbringcourses)
//for the change event of select2 to work we need another event handing
//$('#surangmastudentid').on('select2:select', function (e)
const coursecombo = document.getElementById("CourseId");
coursecombo.addEventListener("change", fnbringfeedetails)
const buttonAddFees = document.getElementById("btnAddFees");
buttonAddFees.addEventListener("click", fnaddfeedetailstotable)
const buttonSaveFees = document.getElementById("btnSaveFees");
buttonSaveFees.addEventListener("click", fnsavefeedetailstodb)

const txtdate = document.getElementById("PayingDate");
const txtpayingamount = document.getElementById("PayingAmount");
const txttotalfees = document.getElementById("TotalFees");
const txtpaidfees = document.getElementById("PaidFees");
const txtbalancefees = document.getElementById("BalanceFees");
const hiddenstudentcourse = document.getElementById("StudentCourseId");
const nisha = document.querySelector('.select2')

nisha.addEventListener('select2:select', function (ev) {
    var data = $('surangmastudentid').select2('data')
    alert(data[0].text);
    alert(data[0].id);
    console.log('Changed', ev.target.value)
});

$('#surangmastudentid').on('select2:select', function (e) {
    var data = e.params.data;
    fnbringcourses(data.id)
    
    //console.log(data);
});
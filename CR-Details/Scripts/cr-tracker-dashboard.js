
$(document).on('click', '.cr-tracker-id', function () {
    var cr_tracker_id = $.trim($(this).attr('resource'));
    $('#cr_status_details').modal('show');
    //alert(cr_tracker_id);
})

am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_kelly);
    //am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("pieChartdiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
        {
            country: "New",
            litres: 501.9
        },
        {
            country: "Completed",
            litres: 201.1
        },
        {
            country: "UAT",
            litres: 301.9
        }

    ];

    chart.innerRadius = am4core.percent(40);
    chart.depth = 120;

    chart.legend = new am4charts.Legend();

    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.depthValue = "litres";
    series.dataFields.category = "country";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;
    am4core.useTheme(am4themes_kelly);

}); // end am4core.ready()

am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("stockedChartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
        {
            category: "Jan",
            value1: 1,
            value2: 5,
            value3: 3
        },
        {
            category: "Feb",
            value1: 2,
            value2: 5,
            value3: 3
        },
        {
            category: "March",
            value1: 3,
            value2: 5,
            value3: 4
        },
        {
            category: "April",
            value1: 4,
            value2: 5,
            value3: 6
        },
        {
            category: "May",
            value1: 3,
            value2: 5,
            value3: 4
        },
        {
            category: "June",
            value1: 2,
            value2: 13,
            value3: 1
        }
    ];

    chart.colors.step = 2;
    chart.padding(30, 30, 10, 30);
    chart.legend = new am4charts.Legend();

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minWidth = 50;


    var series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText =
        "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series1.name = "Completed";
    series1.dataFields.categoryX = "category";
    series1.dataFields.valueY = "value1";
    series1.dataFields.valueYShow = "totalPercent";
    series1.dataItems.template.locations.categoryX = 0.5;
    series1.stacked = true;
    series1.tooltip.pointerOrientation = "vertical";

    var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
    bullet1.interactionsEnabled = false;
    bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet1.label.fill = am4core.color("#ffffff");
    bullet1.locationY = 0.5;

    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText =
        "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series2.name = "In-Progress";
    series2.dataFields.categoryX = "category";
    series2.dataFields.valueY = "value2";
    series2.dataFields.valueYShow = "totalPercent";
    series2.dataItems.template.locations.categoryX = 0.5;
    series2.stacked = true;
    series2.tooltip.pointerOrientation = "vertical";

    var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet2.locationY = 0.5;
    bullet2.label.fill = am4core.color("#ffffff");

    var series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.columns.template.width = am4core.percent(80);
    series3.columns.template.tooltipText =
        "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series3.name = "Assigned";
    series3.dataFields.categoryX = "category";
    series3.dataFields.valueY = "value3";
    series3.dataFields.valueYShow = "totalPercent";
    series3.dataItems.template.locations.categoryX = 0.5;
    series3.stacked = true;
    series3.tooltip.pointerOrientation = "vertical";

    var bullet3 = series3.bullets.push(new am4charts.LabelBullet());
    bullet3.interactionsEnabled = false;
    bullet3.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet3.locationY = 0.5;
    bullet3.label.fill = am4core.color("#ffffff");

    chart.scrollbarX = new am4core.Scrollbar();
    am4core.useTheme(am4themes_dataviz);

}); // end am4core.ready()




var areaChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'UAT Done',
        backgroundColor: 'rgba(106,193,126,1)',
        borderColor: 'rgba(60,141,188,0.8)',
        pointRadius: false,
        pointColor: '#3b8bba',
        pointStrokeColor: 'rgba(60,141,188,1)',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data: [28, 48, 40, 35, 50, 27, 50]
    },
    {
        label: 'Total CR Raised',
        backgroundColor: 'rgba(210, 214, 222, 1)',
        borderColor: 'rgba(210, 214, 222, 1)',
        pointRadius: false,
        pointColor: 'rgba(210, 214, 222, 1)',
        pointStrokeColor: '#c1c7d1',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [65, 59, 80, 81, 56, 55, 90]
    },

    {
        label: 'Pending',
        backgroundColor: 'rgba(230,147,155,1)',
        borderColor: 'rgba(60,141,188,0.8)',
        pointRadius: false,
        pointColor: '#3b8bba',
        pointStrokeColor: 'rgba(60,141,188,1)',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data: [35, 48, 40, 25, 36, 27, 40]
    },

    ]
}


var table = $("#example1").DataTable({
    dom: 'Blfrtip',
    buttons: [{ extend: 'excelHtml5', title: 'Data export (Excel)' }], //{ extend: 'pdfHtml5', title: 'Data export (Pdf)' }, 'copy'
    "responsive": true,
    "autoWidth": false,
    "scrollX": true,
    "scrollY": "525px",
});



$('#example1 tbody').on('click', 'tr', function () {
    var $j = jQuery.noConflict();
    if ($j(this).hasClass('selected')) {
        $j(this).removeClass('selected');
    } else {
        table.$('tr.selected').removeClass('selected');
        $j(this).addClass('selected');
    }
});

var formdata = new FormData();

$("#fileInput").on("change", function () {
    //alert("fileInput called");
    var fileInput = document.getElementById('fileInput');
    //Iterating through each files selected in fileInput  
    for (i = 0; i < fileInput.files.length; i++) {

        var sfilename = fileInput.files[i].name;
        let srandomid = Math.random().toString(36).substring(7);

        formdata.append(sfilename, fileInput.files[i]);

        //var markup = "<tr id='" + srandomid + "'><td>" + sfilename + "</td><td><a href='#' onclick='DeleteFile(\"" + srandomid + "\",\"" + sfilename +
        //    "\")'><span class='glyphicon glyphicon-remove red'></span></a></td></tr>"; // Binding the file name  
        var markup = "<tr id='" + srandomid + "'><td>" + sfilename + "</td><td><label onclick='DeleteFile(\"" + srandomid + "\",\"" + sfilename +
            "\")' style='color:Red'><b>X</b></label></td></tr>"; // Binding the file name  
        $("#FilesList tbody").append(markup);

    }
    chkatchtbl();
    $('#fileInput').val('');
});


function DownloadFile(fileId) {
    var $j = jQuery.noConflict();
    //alert("download clicked");
    $j("#hfFileId").val(fileId);
    $j("#btnDownload")[0].click();
};



function chkatchtbl() {
    if ($('#FilesList tr').length > 1) {
        $("#FilesList").css("visibility", "visible");
    } else {
        $("#FilesList").css("visibility", "hidden");
    }
}


//triggered when modal is about to be shown
$('#cr_details').on('show.bs.modal', function (e) {
    var $j = jQuery.noConflict();

    //get data-id attribute of the clicked element

    var bookId = $j(e.relatedTarget).data('book-id');
    //var bookId = $(e.relatedTarget).data('book-id');
    $j.ajax({
        type: "GET",
        url: TeamDetailPostBackURL,
        contentType: "application/json; charset=utf-8",
        data: { "crID": bookId },
        datatype: "json",
        success: function (data) {
            //console.log(data);
            //alert(JSON.stringify(data));
            $j('#myModalContent').html(data);
            $j('#cr_details').modal('show');
        },
        error: function () {
            //alert("Error: Dynamic content load failed.");
        }
    });



    var $dp2 = $j("#ProjectCRReceivedDate");
    $dp2.datepicker({
        changeYear: true,
        changeMonth: true,
        minDate: 0,
        dateFormat: "dd-MM-yy",
        yearRange: "-100:+20",
    });

    var $dp3 = $j("#FinalProjectCRReceivedDate");
    $dp3.datepicker({
        changeYear: true,
        changeMonth: true,
        minDate: 0,
        dateFormat: "dd-MM-yy",
        yearRange: "-100:+20",
    });

    var $dp4 = $j("#UATDeliveryDate");
    $dp4.datepicker({
        changeYear: true,
        changeMonth: true,
        minDate: 0,
        dateFormat: "dd-MM-yy",
        yearRange: "-100:+20",
    });

    var $dp5 = $j("#UATSignoffDate");
    $dp5.datepicker({
        changeYear: true,
        changeMonth: true,
        minDate: 0,
        dateFormat: "dd-MM-yy",
        yearRange: "-100:+20",
    });

    var $dp6 = $j("#ProjectCRLiveDate");
    $dp6.datepicker({
        changeYear: true,
        changeMonth: true,
        minDate: 0,
        dateFormat: "dd-MM-yy",
        yearRange: "-100:+20",
    });

    var $dp7 = $j("#FirstCommittedLiveDate");
    $dp7.datepicker({
        changeYear: true,
        changeMonth: true,
        minDate: 0,
        dateFormat: "dd-MM-yy",
        yearRange: "-100:+20",
    });

    if (typeof $j("#UnitLead").val() === "undefined") {
        //alert("lead is empty");
    }
    else if ($j("#UnitLead").val() == "") {
        //alert("lead is empty 2");

    }
    else {
        $j('#UnitLead').prop("disabled", true);
    }

});


var keyBool = null;
var projBool = null;
var keyFlag = 0;
var projFlag = 0;


function ToggleKeyProjects(el) {
    keyFlag = 1;
    keyBool = el.value;
}

function ToggleProjectCompletedSchedule(el) {
    projFlag = 1;
    projBool = el.value;
}

$(document).on("click", "#btnSubmit", function (event) {
    var formdata = new FormData(); //FormData object
    var $j = jQuery.noConflict();

    //Fields null check
  
    var isValid = true;
    if ($j("#CrTitle").val() == "" || $j("#CrDescription").val() == "null" || $j("#CrDescription").val() == null) {
        console.log("CrTitle is empty");
        isValid = false;
    }
    else if ($j("#CrDescription").val() == "" || $j("#CrDescription").val() == "null" || $j("#CrDescription").val() == null) {
        console.log("CrDescription is empty");
        isValid = false;
    }
    else if ($j("#DepartmentList").val() == "" || $j("#DepartmentList").val() == "null" || $j("#DepartmentList").val() == null) {
        console.log("DepartmentList is empty");
        isValid = false;
    }
    else if ($j("#CategoryList").val() == "" || $j("#CategoryList").val() == "null" || $j("#CategoryList").val() == null) {
        console.log("CategoryList is empty");
        isValid = false;
    }
    else if ($j("#KeyProjectsYes").is(':checked') == false && $j("#KeyProjectsNo").is(':checked') == false ) {
        console.log("KeyProjects is empty");
        isValid = false;
    }
    //else if ($j("#ExpectedDate").val() == "" || $j("#ExpectedDate").val() == "null" || $j("#ExpectedDate").val() == null) {
    //    isValid = false;
    //}
    else if ($j("#ReasonRCA").val() == "" || $j("#ReasonRCA").val() == "null" || $j("#ReasonRCA").val() == null) {
        console.log("ReasonRCA is empty");
        isValid = false;
    }
    else if ($j("#ComplexityList").val() == "" || $j("#ComplexityList").val() == "null" || $j("#ComplexityList").val() == null) {
        console.log("ComplexityList is empty");
        isValid = false;
    }
    else if ($j("#ProjectCompletedScheduleYes").is(':checked') == false && $j("#ProjectCompletedScheduleNo").is(':checked') == false) {
        console.log("ProjectCompletedScheduleNo is empty");
        isValid = false;
    }
    else if ($j("#ProjectCRReceivedDate").val() == "" || $j("#ProjectCRReceivedDate").val() == "null" || $j("#ProjectCRReceivedDate").val() == null) {
        console.log("ProjectCRReceivedDate is empty");
        isValid = false;
    }
    else if ($j("#FinalProjectCRReceivedDate").val() == "" || $j("#FinalProjectCRReceivedDate").val() == "null" || $j("#FinalProjectCRReceivedDate").val() == null) {
        console.log("FinalProjectCRReceivedDate is empty");
        isValid = false;
    }
    else if ($j("#NoOfCRReceivedDuringUAT").val() == "" || $j("#NoOfCRReceivedDuringUAT").val() == "null" || $j("#NoOfCRReceivedDuringUAT").val() == null) {
        console.log("NoOfCRReceivedDuringUAT is empty");
        isValid = false;
    }
    else if ($j("#UATDeliveryDate").val() == "" || $j("#UATDeliveryDate").val() == "null" || $j("#UATDeliveryDate").val() == null) {
        console.log("UATDeliveryDate is empty");
        isValid = false;
    }
    else if ($j("#UATSignoffDate").val() == "" || $j("#UATSignoffDate").val() == "null" || $j("#UATSignoffDate").val() == null) {
        console.log("UATSignoffDate is empty");
        isValid = false;
    }
    else if ($j("#ProjectCRLiveDate").val() == "" || $j("#ProjectCRLiveDate").val() == "null" || $j("#ProjectCRLiveDate").val() == null) {
        console.log("ProjectCRLiveDate is empty");
        isValid = false;
    }
    else if ($j("#FirstCommittedLiveDate").val() == "" || $j("#FirstCommittedLiveDate").val() == "null" || $j("#FirstCommittedLiveDate").val() == null) {
        console.log("FirstCommittedLiveDate is empty");
        isValid = false;
    }
    else if ($j("#TAT").val() == "" || $j("#TAT").val() == "null" || $j("#TAT").val() == null) {
        console.log("TAT is empty");
        isValid = false;
    }
    else if ($j("#NoOfShowstoppersPostGoLive").val() == "" || $j("#NoOfShowstoppersPostGoLive").val() == "null" || $j("#NoOfShowstoppersPostGoLive").val() == null) {
        console.log("NoOfShowstoppersPostGoLive is empty");
        isValid = false;
    }
    else if ($j("#UnitLead").val() == "" || $j("#UnitLead").val() == "null" || $j("#UnitLead").val() == null) {
        console.log("UnitLead is empty");
        isValid = false;
    }
    else if ($j("#Manager").val() == "" || $j("#Manager").val() == "null" || $j("#Manager").val() == null) {
        console.log("Manager is empty");
        isValid = false;
    }
    else {
        isValid = true;
    }

    if (isValid) {
        formdata.append("CR_ID", $j("#CR_ID").val());
        formdata.append("CrTitle", $j("#CrTitle").val());
        formdata.append("CrDescription", $j("#CrDescription").val());
        formdata.append("ComplexityList", $j("#ComplexityList").val());
        formdata.append("DepartmentList", $j("#DepartmentList").val());
        formdata.append("CategoryList", $j("#CategoryList").val());
        if (keyFlag == 1) {
            formdata.append("KeyProjects", keyBool);
        }
        else {
            if ($j("#KeyProjectsYes").is(':checked')) {
                formdata.append("KeyProjects", true);
            }
            else if ($j("#KeyProjectsNo").is(':checked')) {
                formdata.append("KeyProjects", false);
            }
            else {
                formdata.append("KeyProjects", keyBool);
            }

        }
        if (projFlag == 1) {
            formdata.append("ProjectCompletedSchedule", projBool);
        }
        else {
            if ($j("#ProjectCompletedScheduleYes").is(':checked')) {
                formdata.append("ProjectCompletedSchedule", true);
            }
            else if ($j("#ProjectCompletedScheduleNo").is(':checked')) {
                formdata.append("ProjectCompletedSchedule", false);
            }
            else {
                formdata.append("ProjectCompletedSchedule", projBool);
            }
        }

        formdata.append("ProjectCRReceivedDate", $j("#ProjectCRReceivedDate").val());
        formdata.append("FinalProjectCRReceivedDate", $j("#FinalProjectCRReceivedDate").val());
        formdata.append("NoOfCRReceivedDuringUAT", $j("#NoOfCRReceivedDuringUAT").val());
        formdata.append("UATDeliveryDate", $j("#UATDeliveryDate").val());
        formdata.append("UATSignoffDate", $j("#UATSignoffDate").val());
        formdata.append("ProjectCRLiveDate", $j("#ProjectCRLiveDate").val());
        formdata.append("FirstCommittedLiveDate", $j("#FirstCommittedLiveDate").val());
        formdata.append("TAT", $j("#TAT").val());
        formdata.append("NoOfShowstoppersPostGoLive", $j("#NoOfShowstoppersPostGoLive").val());
        formdata.append("UnitLead", $j("#UnitLead").val());
        formdata.append("Manager", $j("#Manager").val());
        formdata.append("ReasonRCA", $j("#ReasonRCA").val());
        $j.ajax({
            url: '/Modal/UpdateCRDetails',
            type: "POST",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            data: formdata,
            async: false,
            success: function (result) {
                if (result != "") {
                    alert(result);
                    keyFlag = 0;
                    projFlag = 0;
                    keyBool = null;
                    projBool = null;
                    $j('#cr_details').modal('toggle'); //or  $('#IDModal').modal('hide');
                    return false;
                }
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    }
    else {
        alert("Please Enter Required fields input");
    }
});


$(document).on("keypress", "#CrTitle", function (e) {
    var $j = jQuery.noConflict();
    var keyCode = e.keyCode || e.which;

    $j("#CrTitleError").html("");

    //Regex for Valid Characters i.e. Alphabets and Numbers.
    var regex = /^[A-Za-z0-9]+$/;

    //Validate TextBox value against the Regex.
    var isValid = regex.test(String.fromCharCode(keyCode));
    if (!isValid) {
        $j("#CrTitleError").html("Only Alphabets and Numbers allowed.");
    }

    return isValid;
});

$(document).on("keyup", "#NoOfShowstoppersPostGoLive", function () {
//$('#NoOfShowstoppersPostGoLive').keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');

});

$(document).on("keypress", "#NoOfShowstoppersPostGoLive", function (evt) {
//$("#NoOfShowstoppersPostGoLive").keypress(function (e) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
});

$(document).on("keyup", "#NoOfCRReceivedDuringUAT", function () {
//$('#NoOfCRReceivedDuringUAT').keyup(function () {

    this.value = this.value.replace(/[^0-9\.]/g, '');

});

$(document).on("keypress", "#NoOfCRReceivedDuringUAT", function (evt) {
//$("#NoOfCRReceivedDuringUAT").keypress(function (e) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
});









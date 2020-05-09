//---------------------Pie Chart--------------------------
var $j = jQuery.noConflict();
//document ready
$j(document).ready(function () {
    ChartHelper.LoadPieChart();
})

var ChartManager = {
    Get_Chart_Data: function () {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "/CR_Tracker/CR_Pie_Chart_Details";
        ChartManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
            $j('.pie-chart-overlay').hide();
            if (jsonData.length <= 0) {
                $j('#chartdiv1').html("<p style='height: 100%; position: absolute; top: 0; width: 100%; align-items: center; display: flex; justify-content: center;'>No Record Found !!</p>")
            }
        }
        function onFailed(error) {
            $j('.pie-chart-overlay').hide();
            alert(error.statusText);
            alert(error.responseText);
            console.log(error.responseText);
        }
        //error: function (xhr, ajaxOptions, thrownError) {
        //    alert(xhr.responseText);
        //    console.log(xhr.responseText);
        //    alert(thrownError);
        //}
        return obj;
    },

    GetJsonResult: function (serviceUrl, jsonParams, isAsync, isCache, successCallback, errorCallback) {
        $j.ajax({
            type: "GET",
            async: isAsync,
            cache: isCache,
            url: serviceUrl,
            data: jsonParams,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successCallback,
            error: errorCallback
        });
    }

};

var ChartHelper = {
    LoadPieChart: function () {
        var data = ChartManager.Get_Chart_Data();
        am4core.ready(function () {
            am4core.useTheme(am4themes_animated);
            var chart1 = am4core.create("chartdiv1", am4charts.PieChart3D);
            chart1.hiddenState.properties.opacity = 0; // this creates initial fade-in
            chart1.data = data;

            chart1.innerRadius = am4core.percent(35);
            chart1.depth = 50;
            //chart1.height = 350;
            //chart1.width = 400;

            chart1.legend = new am4charts.Legend();

            var series = chart1.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "CR_Status_Count";
            series.dataFields.depthValue = "CR_Status_Count";
            series.dataFields.category = "CR_Status";
            series.slices.template.cornerRadius = 6;
            series.colors.step = 16;

            series.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series.slices.template.events.on("hit", (event) => {
                var clickedStatus = $j.trim(event.target.dataItem._dataContext.CR_Status);
                Get_CR_Tracker_Table_Details_By_Filter(clickedStatus, "");
                //alert(clickedStatus);
                //Pie_Chart_Click_Event_Common(event)
                //console.log(event.target.dataItem._dataContext);
            });

            //function Pie_Chart_Click_Event_Common(event) {
            //    console.log(event.target.dataItem._dataContext.country);
            //    console.log(event.target.dataItem._dataContext.litres);
            //}
        });
    }
};


//--------------------------Bar Chart--------------------------
$j(document).ready(function () {
    StackBarHelper.LoadBarGraph();
})

var StackBarManager = {
    Get_Bar_Data: function () {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "/CR_Tracker/CR_Stack_Bar_Details";
        ChartManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            $j('.bar-chart-overlay').hide();
            obj = jsonData;
            if (jsonData.length <= 0) {
                $j('#chartdiv2').html("<p style='height: 100%; position: absolute; top: 0; width: 100%; align-items: center; display: flex; justify-content: center;'>No Record Found !! </br>Since Last 6 Months</p>")
            }
        }
        function onFailed(error) {
            $j('.bar-chart-overlay').hide();
            alert(error.statusText);
        }
        return obj;
    },

    GetJsonResult: function (serviceUrl, jsonParams, isAsync, isCache, successCallback, errorCallback) {
        $j.ajax({
            type: "GET",
            async: isAsync,
            cache: isCache,
            url: serviceUrl,
            data: jsonParams,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successCallback,
            error: errorCallback
        });
    }
}

var StackBarHelper = {
    LoadBarGraph: function () {
        var data = StackBarManager.Get_Bar_Data();
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            var chart = am4core.create("chartdiv2", am4charts.XYChart);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
            chart.data = data;
            //chart.data = [
            //  {
            //      category: "Jan",
            //      value1: 1,
            //      value2: 5,
            //      value3: 3,
            //      value4: 3
            //  },
            //  {
            //      category: "Feb",
            //      value1: 2,
            //      value2: 5,
            //      value3: 3,
            //      value4: 2
            //  },
            //  {
            //      category: "Mar",
            //      value1: 3,
            //      value2: 5,
            //      value3: 4,
            //      value4: 6
            //  },
            //  {
            //      category: "Apr",
            //      value1: 4,
            //      value2: 5,
            //      value3: 6,
            //      value4: 4
            //  },
            //  {
            //      category: "May",
            //      value1: 3,
            //      value2: 5,
            //      value3: 4,
            //      value4: 2
            //  },
            //  {
            //      category: "Jun",
            //      value1: 2,
            //      value2: 13,
            //      value3: 1,
            //      value4: 7
            //  }
            //];

            //console.log(chart.data);
            chart.colors.step = 16;
            chart.padding(30, 30, 10, 30);
            chart.legend = new am4charts.Legend();

            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "CR_Months";
            categoryAxis.renderer.grid.template.location = 0;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
            valueAxis.max = 100;
            valueAxis.strictMinMax = true;
            valueAxis.calculateTotals = true;
            valueAxis.renderer.minWidth = 50;


            var series1 = chart.series.push(new am4charts.ColumnSeries());
            series1.columns.template.width = am4core.percent(80);
            series1.columns.template.tooltipText = "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
            series1.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series1.name = "New";
            series1.dataFields.categoryX = "CR_Months";
            series1.dataFields.valueY = "Completed_Count";
            series1.dataFields.valueYShow = "totalPercent";
            series1.dataItems.template.locations.categoryX = 0.5;
            series1.stacked = true;
            series1.tooltip.pointerOrientation = "vertical";
            series1.columns.template.events.on("hit", function (ev) { Stack_Bar_Click_Event_Common(ev, 'New'); });

            var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
            bullet1.interactionsEnabled = false;
            bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
            bullet1.label.fill = am4core.color("#ffffff");
            bullet1.locationY = 0.5;

            var series2 = chart.series.push(new am4charts.ColumnSeries());
            series2.columns.template.width = am4core.percent(80);
            series2.columns.template.tooltipText = "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
            series2.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series2.name = "UAT";
            series2.dataFields.categoryX = "CR_Months";
            series2.dataFields.valueY = "UAT_Count";
            series2.dataFields.valueYShow = "totalPercent";
            series2.dataItems.template.locations.categoryX = 0.5;
            series2.stacked = true;
            series2.tooltip.pointerOrientation = "vertical";
            series2.columns.template.events.on("hit", function (ev) { Stack_Bar_Click_Event_Common(ev, 'UAT'); });

            var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
            bullet2.interactionsEnabled = false;
            bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
            bullet2.locationY = 0.5;
            bullet2.label.fill = am4core.color("#ffffff");

            var series3 = chart.series.push(new am4charts.ColumnSeries());
            series3.columns.template.width = am4core.percent(80);
            series3.columns.template.tooltipText = "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
            series3.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series3.name = "Completed";
            series3.dataFields.categoryX = "CR_Months";
            series3.dataFields.valueY = "Pending_Count";
            series3.dataFields.valueYShow = "totalPercent";
            series3.dataItems.template.locations.categoryX = 0.5;
            series3.stacked = true;
            series3.tooltip.pointerOrientation = "vertical";
            series3.columns.template.events.on("hit", function (ev) { Stack_Bar_Click_Event_Common(ev, 'Completed'); });
            var bullet3 = series3.bullets.push(new am4charts.LabelBullet());
            bullet3.interactionsEnabled = false;
            bullet3.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
            bullet3.locationY = 0.5;
            bullet3.label.fill = am4core.color("black");

            var series4 = chart.series.push(new am4charts.ColumnSeries());
            series4.columns.template.width = am4core.percent(80);
            series4.columns.template.tooltipText = "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
            series4.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series4.name = "Working";
            series4.dataFields.categoryX = "CR_Months";
            series4.dataFields.valueY = "Other_Count";
            series4.dataFields.valueYShow = "totalPercent";
            series4.dataItems.template.locations.categoryX = 0.5;
            series4.stacked = true;
            series4.tooltip.pointerOrientation = "vertical";
            series4.columns.template.events.on("hit", function (ev) { Stack_Bar_Click_Event_Common(ev, 'Working'); });

            var bullet4 = series4.bullets.push(new am4charts.LabelBullet());
            bullet4.interactionsEnabled = false;
            bullet4.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
            bullet4.locationY = 0.5;
            bullet4.label.fill = am4core.color("#ffffff");


            chart.scrollbarX = new am4core.Scrollbar();

            function Stack_Bar_Click_Event_Common(ev, status) {
                //alert("Clicked on " + ev.target.dataItem.categoryX + ": " + ev.target.dataItem.valueY + " Status: " + status);
                var monthYear = ev.target.dataItem.categoryX;
                Get_CR_Tracker_Table_Details_By_Filter($j.trim(status), $j.trim(monthYear))
            }
        });
    }
}

$j('#example1 tbody').on('click', 'tr', function () {
    var $j = jQuery.noConflict();
    if ($j(this).hasClass('selected')) {
        $j(this).removeClass('selected');
    } else {
        table.$j('tr.selected').removeClass('selected');
        $j(this).addClass('selected');
    }
});

var formdata = new FormData();

$j("#fileInput").on("change", function () {
    var $j = jQuery.noConflict();
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
        $j("#FilesList tbody").append(markup);

    }
    chkatchtbl();
    $j('#fileInput').val('');
});


function DownloadFile(fileId) {
    var $j = jQuery.noConflict();
    //alert("download clicked");
    $j("#hfFileId").val(fileId);
    $j("#btnDownload")[0].click();
};



function chkatchtbl() {
    var $j = jQuery.noConflict();
    if ($j('#FilesList tr').length > 1) {
        $j("#FilesList").css("visibility", "visible");
    } else {
        $j("#FilesList").css("visibility", "hidden");
    }
}


//triggered when modal is about to be shown
$j('#cr_details').on('show.bs.modal', function (e) {
    var $j = jQuery.noConflict();

    //get data-id attribute of the clicked element

    var bookId = $j(e.relatedTarget).data('book-id');
    //var bookId = $j(e.relatedTarget).data('book-id');
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

function ToggleCRStatus(el) {
    var CRStatus = el.value;
}

function ToggleUnitLead(el) {
    var $j = jQuery.noConflict();
    var CRStatus = { "Unassigned": 1, "Pending": 2, "Assigned": 3, "Working": 4, "UAT": 5 };
    var lead = el.value;
    if (lead != "") {
        $j('#CRStatus').val('Assigned');
        //alert("value changed");
    }
}



$j(document).on("click", "#btnSubmit", function (event) {
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
    else if ($j("#KeyProjectsYes").is(':checked') == false && $j("#KeyProjectsNo").is(':checked') == false) {
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
    else if ($j("#CRStatus").val() == "" || $j("#CRStatus").val() == "null" || $j("#CRStatus").val() == null) {
        console.log("CRStatus is empty");
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
        formdata.append("CRStatus", $j("#CRStatus").val());
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
                    $j('#cr_details').modal('toggle'); //or  $j('#IDModal').modal('hide');
                    //$j('#cr_detailsP').load('/CR_Tracker/CR_Details_DataTableP');
                    Get_CR_Tracker_Table_Details_By_Filter("", ""); // refresh CR-Tracker Datatable records
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


$j(document).on("keypress", "#CrTitle", function (e) {
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

$j(document).on("keyup", "#NoOfShowstoppersPostGoLive", function () {
    //$j('#NoOfShowstoppersPostGoLive').keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');

});

$j(document).on("keypress", "#NoOfShowstoppersPostGoLive", function (evt) {
    //$j("#NoOfShowstoppersPostGoLive").keypress(function (e) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
});

$j(document).on("keyup", "#NoOfCRReceivedDuringUAT", function () {
    //$j('#NoOfCRReceivedDuringUAT').keyup(function () {

    this.value = this.value.replace(/[^0-9\.]/g, '');

});

$j(document).on("keypress", "#NoOfCRReceivedDuringUAT", function (evt) {
    //$j("#NoOfCRReceivedDuringUAT").keypress(function (e) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
});


//-----------------------------------------------------------------------
//Function
var _months = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
};
function getMonthObject(month) {
    return _months[month];
}

//------------------------Main Dashboard-----------------------------------

$j(document).on('click', '.cr-count-dashboard', function () {
    var $j = jQuery.noConflict();
    //$j('.cr-count-dashboard').removeClass('selected-card-color');
    //$j(this).addClass('selected-card-color');
    var text = $j.trim($j(this).find('.info-box-text').text());
    Get_CR_Tracker_Table_Details_By_Filter(text, "");
})

$j(document).on('click', '.btn-clear-status-filter', function () {
    Get_CR_Tracker_Table_Details_By_Filter("All CR Module", "");
})
$j(document).on('click', '.btn-refresh-cr-details', function () {
    Get_CR_Tracker_Table_Details_By_Filter("All CR Module", "");
    //----If You Want to Refresh Chart Details Also--- Then UnComment Below
    //$j('.pie-chart-overlay,.bar-chart-overlay').show();
    //ChartHelper.LoadPieChart();
    //StackBarHelper.LoadBarGraph();
})



function Get_CR_Tracker_Table_Details_By_Filter(clicked_status, MonthClicked) {
    var $j = jQuery.noConflict();
    $j('#lbl_cr_details_alert_msg').text($j.trim(clicked_status));
    if ($j.trim(MonthClicked) != "") {
        $j('#lbl_cr_details_alert_msg').text($j.trim(clicked_status) + " Of " + MonthClicked);
        var month = MonthClicked.split('-')[0]; //getting month name
        var year = MonthClicked.split('-')[1]; //getting year
        MonthClicked = getMonthObject(month) + "-20" + year; // convert to 12-2020 date formate
    }
    $j.trim(clicked_status) != "" && $j.trim(clicked_status) != "All CR Module" ? $j('.cr-details-alert-message').show() : $j('.cr-details-alert-message').hide();
    //Changing Dashboard count color
    $j('.cr-count-dashboard').removeClass('selected-card-color');
    $j.trim(clicked_status).toLowerCase() != "all cr module" && $j.trim(clicked_status).toLowerCase() != "new" ? $j('.cr-' + clicked_status.toLowerCase() + '-clicked').addClass('selected-card-color') : $j('.cr-all-cr-module-clicked').addClass('selected-card-color');

    //New Search Function Added 
    var seachByDate = $j.trim($j('#txt_from_to_date_search').val());
    var searchByDateFrom = "";
    var searchByDateTo = "";
    $j('.cr-details-date-alert-message').hide();
    if (seachByDate != "" && $j.trim(MonthClicked) == "") {
        var searchByDateFrom = $j.trim($j('#txt_hidden_from_dt').val());
        var searchByDateTo = $j.trim($j('#txt_hidden_to_dt').val());
        $j('.cr-details-date-alert-message').show();
        $j('#lbl_cr_details_date_alert_msg').text($j.trim(seachByDate));
    }

    $j.ajax({
        url: "/CR_Tracker/CR_Details_DataTableP",
        type: "POST",
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify({ status: $j.trim(clicked_status), MonthWiseStatus: $j.trim(MonthClicked), FilterByDateFrom: $j.trim(searchByDateFrom), FilterByDateTo: $j.trim(searchByDateTo) }),
        async: true,
        beforeSend: function () {
            //$j('#cr_detailsP').html('');
            $j('.cr-details-table-overlay').show();
        },
        complete: function () {
            $j('#txt_from_to_date_search').val(seachByDate); //feeling again
            $j('.cr-details-table-overlay').hide();
        },
        success: function (result) {
            $j('#cr_detailsP').html(result);
        }
    })

}


//---------------------------CR Remark--------------------------------
$j(document).on('click', '.cr-tracker-id', function () {
    var $j = jQuery.noConflict();
    var cr_tracker_id = $j.trim($j(this).attr('resource'));
    $j('#txt_hidden_cr_id').val(cr_tracker_id);
    $j('#lbl_Message_To').text(cr_tracker_id);
    $j('#txt_cr_remark_details').val('');
    $j('.txt-message-reply').slideUp();
    $j('#cr_status_details').modal('show');
    Get_CR_Remark_Details_Function(cr_tracker_id);
    //alert(cr_tracker_id);
})

$j(document).on('click', '#btn_add_cr_remark', function () {
    var $j = jQuery.noConflict();
    $j('#txt_cr_remark_details').val('');
    $j('#btn_save_cr_remark_details').val('SAVE');
    $j('.txt-message-reply').slideDown();
})

$j(document).on('click', '.close-reply', function () {
    var $j = jQuery.noConflict();
    $j('.txt-message-reply').slideUp();
})

$j(document).on('click', '#btn_save_cr_remark_details', function () {
    var $j = jQuery.noConflict();
    var txt_cr_remark_details = $j.trim($j('#txt_cr_remark_details').val());
    var btn_action = "SAVE";
    if ($j.trim($j(this).val()) == "UPDATE") {
        btn_action = "UPDATE";
    }
    var txt_hidden_cr_id = $j.trim($j('#txt_hidden_cr_id').val());
    var txt_hidden_cr_remark_id = $j.trim($j('#txt_hidden_cr_remark_id').val());

    if (txt_cr_remark_details == "") {
        alert("Please Enter CR Remark Details !!");
        $j('#txt_cr_remark_details').focus();
        return false;
    }

    var data_obj = {
        add_update_action: $j.trim(btn_action),
        cr_remark_id: $j.trim(txt_hidden_cr_remark_id),
        ref_cr_id: $j.trim(txt_hidden_cr_id),
        cr_remark: $j.trim(txt_cr_remark_details),
    }
    console.log(data_obj);

    $j.ajax({
        url: '/CR_Tracker/Add_Update_CR_Remark_Details',
        type: 'POST',
        datatype: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(data_obj),
        async: true,
        beforeSend: function () {
            //loading
        },
        complete: function () {
            //loading
            Get_CR_Remark_Details_Function(txt_hidden_cr_id);
        },
        success: function (result) {
            $j('#txt_cr_remark_details').val('');
            $j('.txt-message-reply').slideUp();
            //
        }
    });

});

function Get_CR_Remark_Details_Function(refCR_ID) {
    var $j = jQuery.noConflict();
    $j.ajax({
        url: '/CR_Tracker/CR_Remark_DetailsP',
        type: 'POST',
        datatype: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify({ ref_cr_id: $j.trim(refCR_ID) }),
        async: true,
        beforeSend: function () {
            $j('.timeline-overlay').show();
            $j('#cr_remark_timeline_details').html('');
        },
        complete: function () {
            //loading
            $j('.timeline-overlay').hide();
        },
        success: function (result) {
            $j('#cr_remark_timeline_details').html(result);
        }
    });

}

$j(document).on('click', '.btn-edit-remark', function () {
    var $j = jQuery.noConflict();
    var cr_remark_id = $j.trim($j(this).attr('resource'));
    $j('#txt_hidden_cr_remark_id').val(cr_remark_id);
    $j('#btn_save_cr_remark_details').val('UPDATE');
    $j('.txt-message-reply').slideDown();
    var txt_hidden_cr_id = $j.trim($j('#txt_hidden_cr_id').val());

    $j.ajax({
        url: '/CR_Tracker/Edit_CR_Remark_Detail_By_ID',
        type: 'POST',
        datatype: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify({ cr_remark_id: $j.trim(cr_remark_id) }),
        async: true,
        beforeSend: function () {
            //loading
        },
        complete: function () {
        },
        success: function (result) {
            $j('#txt_cr_remark_details').val($j.trim(result.data));
            $j('.txt-message-reply').slideDown();
        }
    });

});


$j(document).on('click', '#btn_dt_search', function () {
    var $j = jQuery.noConflict();
    var search_date = $j.trim($j('#txt_from_to_date_search').val());
    var search_from_date = $j.trim($j('#txt_hidden_from_dt').val());
    var search_to_date = $j.trim($j('#txt_hidden_to_dt').val());

    if (search_date == "") {
        alert("Please Select Date-Range For Search !!");
        return false;
    }
    Get_CR_Tracker_Table_Details_By_Filter("", "");
});


$j(document).on('click', '#btn_clear_dt,.btn-clear-date-filter', function () {
    var $j = jQuery.noConflict();
    $j('#txt_from_to_date_search').val('');
    $j('#txt_hidden_from_dt,#txt_hidden_to_dt').val('');
    Get_CR_Tracker_Table_Details_By_Filter("", "");
});
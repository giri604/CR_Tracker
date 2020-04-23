
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
    alert("fileInput called");
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

function DeleteFile(Fileid, FileName) {
    formdata.delete(FileName)
    $("#" + Fileid).remove();
    chkatchtbl();
}
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
    //$j(".select-department-placeholder").prepend("<option value='' disabled selected>Select a department...</option>");
    //$j(".select-complexity-placeholder").prepend("<option value='' disabled selected>Select a complexity...</option>");
    //$j(".select-category-placeholder").prepend("<option value='' disabled selected>Select a category...</option>");
    //$j(".select-lead-placeholder").prepend("<option value='' disabled selected>Select a lead...</option>");
    //$j(".select-manager-placeholder").prepend("<option value='' disabled selected>Select a manager...</option>");

    //get data-id attribute of the clicked element

    var bookId = $j(e.relatedTarget).data('book-id');
    alert("a clicked");
    alert(bookId);
    //var bookId = $(e.relatedTarget).data('book-id');
    $j.ajax({
        type: "GET",
        url: TeamDetailPostBackURL,
        contentType: "application/json; charset=utf-8",
        data: { "crID": bookId },
        datatype: "json",
        success: function (data) {
            //alert(JSON.stringify(data));
            $j('#myModalContent').html(data);
            $j('#cr_details').modal('show');
        },
        error: function () {
            alert("Error: Dynamic content load failed.");
        }
    });
});




//$j("#datepicker").datepicker();
//$j('.datepicker').datepicker();


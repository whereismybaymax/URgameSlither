$(window).ready(function () {
    window.scrollTo(0, 0);
});


$(document).ready(function () {
    var hash = document.location.hash;

    if (hash == "#global")
        makeTabActive('global');
    else if (hash == "#profile")
        makeTabActive('profile');

});

function makeTabActive(tab) {

    console.log("Making " + tab + " active!");
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};


$("#profiletab").click(function () {
    console.log("Button was clicked. Time for AJAX call");
    $.ajax(
        {
            type: "GET",
            url: "stats/ajaxUpdate/profile",
            success: function (result) {
                console.log("I just finished the call and got updated data");
                console.log(result);
                $("#ajaxUpdateProfileStats").html(result);
            }
        });
});

$("#globaltab").click(function () {
    console.log("Button was clicked. Time for AJAX call");
    $.ajax(
        {
            type: "GET",
            url: "stats/ajaxUpdate/global",
            success: function (result) {
                console.log("I just finished the call and got updated data");
                console.log(result);
                $("#ajaxUpdateGlobalStats").html(result);
            }
        });
});

loadProfileCharts();
loadGlobalCharts();

function loadProfileCharts() {

    var avgSnakeLengthChart = makeChart("avgSnakeLengthchartdiv", avgSnakeLengthChartData, "length","#AE3F69");
    var highestSnakeLengthChart = makeChart("highestSnakeLengthchartdiv", highestSnakeLengthChartData, "length","#F4B46D");
    var timeOfKillsChart = makeChart("timeOfKillschartdiv", timeOfKillsChartData, "kills","#60C57C");

}

function loadGlobalCharts() {
    console.log('Printing kills here:');
    console.log(avgSnakeLengthAllChart);
    console.log('Printing kills here:');
    console.log(highestSnakeLengthAllChart);
    var avgSnakeLengthAllChart = makeChart("avgSnakeLengthAllchartdiv", avgSnakeLengthAllChartData, "length","#60C57C");
    var highestSnakeLengthAllChart = makeChart("highestSnakeLengthAllchartdiv", highestSnakeLengthAllChartData, "length","#60C57C");
}

function makeChart(chartDiv, chartData, yAxisName,graphColor) {

    return AmCharts.makeChart(chartDiv, {
        "type": "serial",
        "theme": "black",
        "marginRight": 80,
        "autoMarginOffset": 20,
        "marginTop": 7,
        "dataProvider": chartData,
        "categoryField": "second", //field of x-axis
        "categoryAxis":
            {},
        "valueAxis": [
            {
                "position": "left",
                "title": "Avg Length of snake" //not showing up
            }],
        "mouseWheelZoomEnabled": true,
        "graphs": [
            {
                "id": "g1",
                "fillColors": "[[graphColor]]",
                "balloonText": "[[value]]", //what the pop up when hovered is
                "bullet": "round", //available: none, square, triangleUp, traingleDown, bubble, custom, round
                "bulletBorderAlpha": 1, //bulletborderopacity
                "bulletColor": "#FFFFFF",
                "hideBulletsCount": 50, //"If there are more data points than hideBulletsCount, the bullets will not be shown. 0 means the bullets will always be visible.
                "title": "title goes here", //just a variable for the ballonText
                "valueField": yAxisName, //the name of the field in data in Y-axis
                "useLineColorForBulletBorder": true, //determines border of value dot(bullet)
                "type": "smoothedLine", //typeofgraph - line, column, step, smoothedLine, candlestick,ohIc
                "balloon":
                    {
                        "drop": true  //if you want the balloon to be in a tear shape
                    },
                "fillAlphas": 0.7
            }],
        "chartScrollbar":
            {
                "autoGridCount": true,
                "graph": "g1",
                "scrollbarHeight": 40
            },
        "chartCursor":
            {
                "limitToGraph": "g1"
            },
        "export":
            {
                "enabled": true
            },
        "legend":
            {
                "enabled": true,
                "useGraphSettings": true
            }
    });
};

//
// chart.addListener("rendered", zoomChart);
// zoomChart();
//
// // this method is called when chart is first inited as we listen for "rendered" event
// function zoomChart() {
//     // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
//     chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
// }
//


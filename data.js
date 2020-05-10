

var countySel
var stateSel


/**
returns an array with data filtered by the state
 */
function filterByState(state){

    let filtered =   countyNames.filter(e=> e.state === state)
    let result = []
    filtered.forEach(e=>result.push(e.county+ ":" + e.state))
    //result.push("all:"+state)
    return(result)
}



window.onload = function () {

    //Get html elements
    countySel = d3.select("#countySel")
    stateSel = d3.select("stateSel")
    stateSelector = d3.select("stateSelector")
   // var stateSel = document.getElementById("stateSel");

    d3.select("#stateSelector")
        .selectAll('myOptions')
        .data(states)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

    d3.select("#stateSel")
        .selectAll('myOptions')
        .data(states)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button


}

/** when a new state is selected refresh the drop down for county **/

function updateState(selected) {


    let stateCounties = filterByState(selected);


    document.getElementById('countySel').options.length = 0;
    countySel.selectAll('myOptions')
        .data(stateCounties)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button



}


function updateCounty(selected, selectedSt) {

    /** when a county is selected clear the plot from the dom and rerender
     * */

    d3.select("#cases").html(null)
    d3.select("#deaths").html(null)
    d3.select("#dailycases").html(null)
    d3.select("#dailydeaths").html(null)



    renderCounty(selected)

}

function updateStateOnly(selected, selectedSt) {

    /** when a county is selected clear the plot from the dom and rerender
     * */

    d3.select("#cases").html(null)
    d3.select("#deaths").html(null)
    d3.select("#dailycases").html(null)
    d3.select("#dailydeaths").html(null)



    renderState(selected)

}


/** attach method to dropdown method
 * **/


d3.select("#stateSel").on("change", function (d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")
    // run the updateChart function with this selected option
    // console.log(selectedOption)

    updateState(selectedOption)
})

/** attach method to dropdown menu
 * */

d3.select("#countySel").on("change", function (d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")

    updateCounty(selectedOption)
})

d3.select("#stateSelector").on("change", function (d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")

    updateStateOnly(selectedOption)
})

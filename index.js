let states = [];

//render list of U.S states from data object
for(let i = 0; i< countyNames.length; i++){
    if(states.indexOf(countyNames[i].state) === -1){
        states.push(countyNames[i].state);
    }
}


/** render the plots based on the selected County
 *
 * @param CountySelected
 */

function render(CountySelected) {
    let url = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
    d3.csv(url).then(function (data) {


        let Data = [data]
        let DataNewEarly = Data[0]
        let DataNew = DataNewEarly.filter(function (e) {
            return e.county === CountySelected;


        });

        let Dates = []
        let Cases = []
        let Deaths = []
        DataNew.forEach(e => Dates.push(e.date))
        DataNew.forEach(f => Cases.push(f.cases))
        DataNew.forEach(g => Deaths.push(g.deaths))
        console.log(CountySelected)
        console.log(DataNew.length)
        console.log(Cases)

        /***
         * plot the data

         */
        var trace1 = {
            x: Dates,
            y: Cases,
            mode: 'lines+markers',
            type: 'scatter'
        };

        var plotData = [trace1];

        Plotly.newPlot('cases', plotData);

        var trace2 = {
            x: Dates,
            y: Deaths,
            mode: 'lines+markers',
            type: 'scatter'
        };

        var plotData2 = [trace2];

        Plotly.newPlot('deaths', plotData2);


    })
}

/*** initial render
 *
 */
render("Hudson")







let states = [];
var selectedState

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

function renderCounty(CountySelected) {
    var res = CountySelected.split(":");


    let chosenState = res[1]
    let chosenCounty = res[0]
    console.log("render")
    console.log(chosenState)
    let url = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
    d3.csv(url).then(function (data) {


        let Data = [data]
        let DataNewEarly = Data[0]
        let DataNewOld = DataNewEarly.filter(function (e) {
            return e.county === chosenCounty;
        });
        console.log(DataNewOld)

        let DataNew = DataNewOld.filter(function (e) {
            return e.state === chosenState
        });
        console.log(DataNew)


        let Dates = []
        let Cases = []
        let Deaths = []
        DataNew.forEach(e => Dates.push(e.date))
        DataNew.forEach(f => Cases.push(f.cases))
        DataNew.forEach(g => Deaths.push(g.deaths))
        console.log(CountySelected)
        console.log(DataNew.length)
        console.log(Cases)

        let DailyCases = []
        let DailyDeaths = []
        let DailyDates = []
        DailyDates = Dates
        DailyDates.shift()
        for ( let ii = 1; ii < Cases.length; ii++){
            DailyCases.push(Cases[ii]-Cases[ii-1])
        }
        for ( let jj = 1; jj < Deaths.length; jj++){
            DailyDeaths.push(Deaths[jj]-Deaths[jj-1])
        }
        /***
         * plot the data

         */
        var trace3 = {
            x: DailyDates,
            y: DailyCases,
            mode: 'lines+markers',
            type: 'scatter'
        };

        var plotData3 = [trace3];

        Plotly.newPlot('dailycases', plotData3);

        var trace4 = {
            x: DailyDates,
            y: DailyDeaths,
            mode: 'lines+markers',
            type: 'scatter'
        };

        var plotData4 = [trace4];

        Plotly.newPlot('dailydeaths', plotData4);


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
renderCountry()
//renderCounty("Hudson", "New Jersey")







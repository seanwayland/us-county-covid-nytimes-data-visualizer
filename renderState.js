
function renderState(chosenState) {


    let url = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
    d3.csv(url).then(function (data) {


        let Data = [data]
        let DataNewEarly = Data[0]
        let DataNew = DataNewEarly.filter(function (e) {
            return e.state === chosenState;
        });



        let Dates = []
        let Cases = []
        let Deaths = []
        DataNew.forEach(e => Dates.push(e.date))
        DataNew.forEach(f => Cases.push(f.cases))
        DataNew.forEach(g => Deaths.push(g.deaths))


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
        let trace3 = {
            x: DailyDates,
            y: DailyCases,
            mode: 'lines+markers',
            type: 'scatter'
        };

        let plotData3 = [trace3];

        Plotly.newPlot('dailycases', plotData3);

        let trace4 = {
            x: DailyDates,
            y: DailyDeaths,
            mode: 'lines+markers',
            type: 'scatter'
        };

        let plotData4 = [trace4];

        Plotly.newPlot('dailydeaths', plotData4);


        /***
         * plot the data

         */
        let trace1 = {
            x: Dates,
            y: Cases,
            mode: 'lines+markers',
            type: 'scatter'
        };

        let plotData = [trace1];

        Plotly.newPlot('cases', plotData);

        let trace2 = {
            x: Dates,
            y: Deaths,
            mode: 'lines+markers',
            type: 'scatter'
        };

        let plotData2 = [trace2];

        Plotly.newPlot('deaths', plotData2);


    })
}

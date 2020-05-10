
function renderCountry(){



    let url = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv"
    d3.csv(url).then(function (data) {


        let DataNewEarly = [data]
        let CountryDataNew = DataNewEarly[0]
        console.log(CountryDataNew[1])




        let CountryDates = []
        let CountryCases = []
        let CountryDeaths = []
        CountryDataNew.forEach(e => CountryDates.push(e.date))
        CountryDataNew.forEach(f => CountryCases.push(f.cases))
        CountryDataNew.forEach(g => CountryDeaths.push(g.deaths))
        console.log(CountryCases)

        let CountryDailyCases = []

        let CountryDailyDeaths = []
        let CountryDailyDates = []
        CountryDailyDates = CountryDates
        CountryDailyDates.shift()
        console.log(CountryDailyDates)
        for ( let ii = 1; ii < CountryCases.length; ii++){
            CountryDailyCases.push(CountryCases[ii]-CountryCases[ii-1])
        }
        for ( let jj = 1; jj < CountryDeaths.length; jj++){
            CountryDailyDeaths.push(CountryDeaths[jj]-CountryDeaths[jj-1])
        }


        /***
         * plot the data

         */
        let trace3 = {
            x: CountryDailyDates,
            y: CountryDailyCases,
            mode: 'lines+markers',
            type: 'scatter'
        };

        let plotData3 = [trace3];

        Plotly.newPlot('dailycases', plotData3);

        let trace4 = {
            x: CountryDailyDates,
            y: CountryDailyDeaths,
            mode: 'lines+markers',
            type: 'scatter'
        };

        let plotData4 = [trace4];

        Plotly.newPlot('dailydeaths', plotData4);


        /***
         * plot the data

         */
        let trace1 = {
            x: CountryDates,
            y: CountryCases,
            mode: 'lines+markers',
            type: 'scatter'
        };

        let plotData = [trace1];

        Plotly.newPlot('cases', plotData);

        let trace2 = {
            x: CountryDates,
            y: CountryDeaths,
            mode: 'lines+markers',
            type: 'scatter'
        };

        let plotData2 = [trace2];

        Plotly.newPlot('deaths', plotData2);


    })
}

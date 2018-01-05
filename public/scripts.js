var palette = new Rickshaw.Color.Palette();

var graph = new Rickshaw.Graph( {
        element: document.querySelector("#chart"),
        width: 800,
        height: 640,
        renderer: 'line',
        series: [
                {
                        name: "Northeast",
                        data: [ { x: -1893456000, y: 25868573 }, { x: -1577923200, y: 29662053 }, { x: -1262304000, y: 34427091 }, { x: -946771200, y: 35976777 }, { x: -631152000, y: 39477986 }, { x: -315619200, y: 44677819 }, { x: 0, y: 49040703 }, { x: 315532800, y: 49135283 }, { x: 631152000, y: 50809229 }, { x: 946684800, y: 53594378 }, { x: 1262304000, y: 55317240 } ],
                        color: palette.color()
                },
                {
                        name: "Midwest",
                        data: [ { x: -1893456000, y: 29888542 }, { x: -1577923200, y: 34019792 }, { x: -1262304000, y: 38594100 }, { x: -946771200, y: 40143332 }, { x: -631152000, y: 44460762 }, { x: -315619200, y: 51619139 }, { x: 0, y: 56571663 }, { x: 315532800, y: 58865670 }, { x: 631152000, y: 59668632 }, { x: 946684800, y: 64392776 }, { x: 1262304000, y: 66927001 } ],
                        color: palette.color()
                },
                {
                        name: "South",
                        data: [ { x: -1893456000, y: 29389330 }, { x: -1577923200, y: 33125803 }, { x: -1262304000, y: 37857633 }, { x: -946771200, y: 41665901 }, { x: -631152000, y: 47197088 }, { x: -315619200, y: 54973113 }, { x: 0, y: 62795367 }, { x: 315532800, y: 75372362 }, { x: 631152000, y: 85445930 }, { x: 946684800, y: 100236820 }, { x: 1262304000, y: 114555744 } ],
                        color: palette.color()
                },
                {
                        name: "West",
                        data: [ { x: -1893456000, y: 7082086 }, { x: -1577923200, y: 9213920 }, { x: -1262304000, y: 12323836 }, { x: -946771200, y: 14379119 }, { x: -631152000, y: 20189962 }, { x: -315619200, y: 28053104 }, { x: 0, y: 34804193 }, { x: 315532800, y: 43172490 }, { x: 631152000, y: 52786082 }, { x: 946684800, y: 63197932 }, { x: 1262304000, y: 71945553 } ],
                        color: palette.color()
                }
        ]
} );

var x_axis = new Rickshaw.Graph.Axis.Time( { graph: graph } );

var y_axis = new Rickshaw.Graph.Axis.Y( {
        graph: graph,
        orientation: 'left',
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
        element: document.getElementById('y-axis'),
} );

var legend = new Rickshaw.Graph.Legend( {
        element: document.querySelector('#legend'),
        graph: graph
} );

var offsetForm = document.getElementById('offset-form');

offsetForm.addEventListener('change', function(e) {
        var offsetMode = e.target.value;

        if (offsetMode == 'lines') {
                graph.setRenderer('line');
                graph.offset = 'zero';
        } else {
                graph.setRenderer('stack');
                graph.offset = offsetMode;
        }
        graph.render();

}, false);

graph.render();


// const loadData = () => {
//   fetch('/api/v1/usage')
//     .then( response => {
//       if (response.status !== 200) {
//         console.log(response);
//       }
//       return response;
//     })
//     .then(response => response.json())
//     .then(parsedResponse => {
//       const unpackData = (arr, key) => {
//         return arr.map(obj => obj[key])
//       }
//       const firstTrace = {
//         type: 'scatter',
//         mode: 'lines',
//         name: 'Mean User Usage',
//         x: unpackData(parsedResponse, 'time'),
//         y: unpackData(parsedResponse, 'mean_usage_user'),
//         line: {color: '#17BECF'}
//       }
//       const secondTrace = {
//         type: "scatter",
//         mode: "lines",
//         name: 'Mean System Usage',
//         x: unpackData(parsedResponse, 'time'),
//         y: unpackData(parsedResponse, 'mean_usage_system'),
//         line: {color: '#7F7F7F'}
//       }
//       const data = [firstTrace, secondTrace];
//       const layout = {
//         title: 'Local CPU Usage',
//       };
//       return Plotly.newPlot('graphs-container', data, layout);
//     })
//     .catch( error => console.log(error) );
// }
//
// $(window).on('load', loadData);

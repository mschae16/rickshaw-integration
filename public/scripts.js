const loadData = () => {
  fetch('/api/v1/usage')
    .then( response => {
      if (response.status !== 200) {
        console.log(response);
      }
      return response;
    })
    .then(response => response.json())
    .then(parsedResponse => {
      const unpackData = (array, key) => {
        return array.map(obj => Object.assign({}, { x: Date.parse(obj['time']), y: obj[key] }))
      };

      const palette = new Rickshaw.Color.Palette({ scheme: 'colorwheel' });
      const graph = new Rickshaw.Graph({
        element: document.querySelector('#chart'),
        width: 1200,
        height: 440,
        renderer: 'line',
        series: [
          {
            name: 'Mean User Usage',
            data: unpackData(parsedResponse, 'mean_usage_user'),
            color: palette.color()
          },
          {
            name: 'Mean System Usage',
            data: unpackData(parsedResponse, 'mean_usage_system'),
            color: palette.color()
          },
        ]
      });

      const xAxis = new Rickshaw.Graph.Axis.Time({
        graph: graph,
        ticksTreatment: 'glow'
      });

      const yAxis = new Rickshaw.Graph.Axis.Y({
        element: document.getElementById('y-axis'),
        graph: graph,
        orientation: 'left',
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      });
      const legend = new Rickshaw.Graph.Legend( {
        element: document.getElementById('legend'),
        graph: graph
      });
      const offsetForm = document.getElementById('offset-form');
      offsetForm.addEventListener('change', function(e) {
        const offsetMode = e.target.value;

        if (offsetMode == 'lines') {
                graph.setRenderer('line');
                graph.offset = 'zero';
        } else {
                graph.setRenderer('stack');
                graph.offset = offsetMode;
        }
        graph.render();
      }, false);

      return graph.render();
    })
    .catch( error => console.log(error) );
}

document.addEventListener('DOMContentLoaded', loadData);

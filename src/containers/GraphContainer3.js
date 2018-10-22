import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js-gl3d-dist';

const PlotlyComponent = createPlotlyComponent(Plotly);

class _GraphContainer extends React.Component{
  render () {
    const points = JSON.parse(this.props.points);
    const xs = points.map( e => e[0]);
    const ys = points.map( e => e[1]);
    const zs = points.map( e => e[2]);
    const data = [ {
        type: 'scatter3d',
        x:[0,0,0],
        y:[0,1,2],
        z:[0,0,2],
        mode: "markers",
      }
    ]
    const layout = {
        hovermode: "closest",
        dragmode: false
    }
    return (
      <PlotlyComponent data={data} layout={layout}></PlotlyComponent>
    )
  }
}

const MapStateToProps = (state) => ({
        points: state.points,
        weights: state.weights,
        normalization: state.normalization
})


export default connect(MapStateToProps)(_GraphContainer)




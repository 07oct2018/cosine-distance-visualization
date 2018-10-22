import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Vis from 'vis';

class _GraphContainer extends React.Component{
  constructor (props) {
    super(props);
    const containerElement = document.createElement('div');
    const data = new vis.DataSet(JSON.parse(this.props.points).map( (v,k) => ({id:k, x:v[0], y:v[1], z:v[2], style:4}) ));
    const graph3d = new vis.Graph3d(containerElement, data, {style: 'dot-color'})
    this.initialState = {
      containerElement: containerElement,
      data: data,
      graph3d: graph3d
    }
    this.state = this.initialState
  }
  render () {
    
    return (
      <div dangerouslySetInnerHTML={{__html: this.state.containerElement.innerHTML}}></div>
    )

    ;
  }
}

const MapStateToProps = (state) => ({
    points: state.points,
    weights: state.weights,
    normalization: state.normalization
})


export default connect(MapStateToProps)(_GraphContainer)


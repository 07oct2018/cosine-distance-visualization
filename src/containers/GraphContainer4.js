import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import 'aframe';
import 'aframe-orbit-controls-component-2';
import {Entity, Scene} from 'aframe-react';

class _GraphContainer extends React.Component {
  render () {
    return (
      <a-scene className="a-body">
      {/*<a-entity camera look-controls orbit-controls="target: 0 1.6 -0.5; minDistance: 0.5; maxDistance: 180; initialPosition: 0 5 15"></a-entity>*/}
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" shadow></a-box>
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow></a-sphere>
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow></a-cylinder>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" shadow></a-plane>
      </a-scene>
    )
  }
}

const MapStateToProps = (state) => ({
        points: state.points,
        weights: state.weights,
        normalization: state.normalization
})


export default connect(MapStateToProps)(_GraphContainer)

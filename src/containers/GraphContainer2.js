import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import x3dom from 'x3dom'




class _GraphContainer extends React.Component{
  render () {
    const points = JSON.parse(this.props.points);
    const xs = points.map( e => e[0]);
    const ys = points.map( e => e[1]);
    const zs = points.map( e => e[2]);
    const pos = [xs,ys,zs].map(l => Math.max(...l)*2)
    const orient = pos.map(e => (-e / (Math.max(...pos)))).concat([0])
    console.log(pos)
    console.log(orient)
    return (
<div>
    <x3d width='600px' height='400px'>
        <scene>
            <viewpoint position={pos.join(' ')} orientation="-0.45134 0.86267 0.22823 0.86055"    description="camera" ></viewpoint>
            <indexedLineSet coordIndex="0 1 0 2 0 3">
            <coordinate point="0 0 0 0 0 100 0 100 0 100 0 0"></coordinate>
            </indexedLineSet>
            {points.map( (v,k) => 
            <transform translation={v.join(' ')}> 
                <shape>
                    <appearance>
                        <material diffuseColor={Math.random() + ' ' + Math.random() + ' ' + Math.random()}></material>
                    </appearance>
                    <sphere></sphere>
                </shape>
            </transform> 
            )}
        </scene>
    </x3d>
</div>
    )
  }
}

const MapStateToProps = (state) => ({
      points: state.points,
      weights: state.weights,
      normalization: state.normalization
})


export default connect(MapStateToProps)(_GraphContainer)



import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import vis from 'vis';

Array.prototype.isEmpty = function(){ return !Boolean(this.length)}

const transpose = (array) => array[0].map( (li1,i) => array.map(li2 => li2[i]) )

function mulvec(v1,v2,weights) {
  return v1
    .map( (v,k) => (v * v2[k])*weights[k])
    .reduce( ((a,c) => a + c) , 0);
}

function cosdistance (p1, p2, weights) {
  const retval = Math.acos(
    (mulvec(p1,p2,weights))/
    (Math.sqrt(mulvec(p1,p1,weights)) * Math.sqrt(mulvec(p2,p2,weights)))
  );
  return isNaN(retval) ? 0 : retval;
}

function multiIndex(array,indexes) {
  return array
    .map( (li,k1) => li.filter( (v,k2) => indexes.includes(k2) && k2>k1 ))
    .filter( (v,k) => indexes.includes(k) )
    .reduce(( (a,c) => a.concat(c) ), [])
}

function getMergingCandidates(distances,clusters) {
  return clusters.map ( (el1,k1) => 
    clusters.map( el2 => 
      multiIndex(distances,el1.concat(el2))
    ).map( (el2,k2) =>
      k2==k1 ? [1/0] : el2
    ).map( el2 =>
      Math.max(...el2)
    ).reduce(
      ( (a,c,i) => a.value > c ? {value:c,index:[i]} : a ),
      {value:1/0,index:[-1]}
    )
  ).reduce(
    ( (a,c,i) => a.value > c.value ? {value:c.value,index:c.index.concat([i])} : a ),
    {value:1/0,index:[-1]}
  ).index
}

function mergeClusters (clusters,mergingCandidates) {
  const [mc1,mc2] = mergingCandidates;
  return clusters.map( (v,k) => 
    k==mc1 ? v.concat(clusters[mc2])
    : k==mc2 ? [] 
    : v
  ).filter( e => 
    !e.isEmpty()
  )
}



function normalize(points) {
  const transposedPoints = transpose(points)
  const mins = transposedPoints.map( li => Math.min(...li))
  const maxs = transposedPoints.map( li => Math.max(...li) - Math.min(...li))
  const normalizedTransposedPoints = transposedPoints.map( (li,k1) =>
    li.map( (v,k2) => (v - mins[k1]) / maxs[k1] )
  )
  return transpose(normalizedTransposedPoints)
}

function clusterize (props) {
  // cosine distance between points
  // furthest neighbor between clusters
  // clusterization by merging 
  const {weights, clusterCount, normalization} = props;
  const preNormPoints = JSON.parse(props.points);
  const points = normalization ? normalize(preNormPoints) : preNormPoints;
  const distances = points.map(a =>
    points.map(b => 
      Number(cosdistance(a,b,weights).toFixed(7)) 
    )
  )
  window.distances=distances;
  var clusters = points.map( (v,k) => [k]);
  while (clusters.length>clusterCount)
  clusters = mergeClusters(clusters,getMergingCandidates(distances,clusters));
  return [clusters,points];
}

function convertClustersToData(points,clusters) {
  return points.map( (v,k) =>
    ({ id:k, 
      x:v[0],
      y:v[1],
      z:v[2],
      style: clusters.reduce( 
        ( (a,c,i) => c.includes(k) ? i : a),-1
      )
    })
  )
}


class _GraphContainer extends React.Component{
  constructor(props){
    super(props);
      const { identifier } = props;
      this.updateGraph = this.updateGraph.bind(this);
      this.state = {
              identifier: identifier !== undefined ? identifier : "graphcont"
      };
  }
  componentDidMount() {
    this.data = new vis.DataSet(JSON.parse(this.props.points).map( (v,k) => ({id:k, x:v[0], y:v[1], z:v[2], style:Math.round((Math.random()*5))}) ));
    //this.data.add([{id:0,x:0,y:0,z:0,style:5}]);
    this.updateGraph();
  }
  componentDidUpdate () {
    this.updateGraph();
  }
  updateGraph () {
    //this.data = new vis.DataSet(JSON.parse(this.props.points).map( (v,k) => ({id:k, x:v[0], y:v[1], z:v[2], style:Math.round((Math.random()*5))}) ));
    let [clusters, points] = clusterize(this.props);
    this.props.dispatch({type: "UPDATE_CLUSTERIZATION",value: clusters})
    let data = convertClustersToData(points,clusters)
    this.data = new vis.DataSet(data)
    let container = document.getElementById(this.state.identifier);
    let defaultOptions = {
      tooltip: (e) => `x: ${e.x} y: ${e.y} z: ${e.z} <br /> group: ${e.value}`,
      style: "dot-color"
    };
    let options = Object.assign({},defaultOptions,this.props.options)
    this.plot = new vis.Graph3d(container,this.data,options);
  }
  render () {
    const {identifier} = this.state;
    return React.createElement(
      "div", {id:identifier, className: "container-fluid d-flex justify-content-center"}, identifier
    )
  }
}

const MapStateToProps = (state) => ({
  points: state.points,
  weights: state.weights,
  normalization: state.normalization,
  clusterCount: state.clusterCount
})


export default connect(MapStateToProps)(_GraphContainer)


//class _GraphContainer extends React.Component{
//  constructor (props) {
//    super(props);
//    const containerElement = document.createElement('div');
//    const data = new vis.DataSet(JSON.parse(this.props.points).map( (v,k) => ({id:k, x:v[0], y:v[1], z:v[2], style:4}) ));
//    const graph3d = new vis.Graph3d(containerElement, data, {style: 'dot-color'})
//    this.initialState = {
//      containerElement: containerElement,
//      data: data,
//      graph3d: graph3d
//    }
//    this.state = this.initialState
//  }
//  render () {
//    
//    return (
//      <div dangerouslySetInnerHTML={{__html: this.state.containerElement.innerHTML}}></div>
//    )
//
//    ;
//  }
//}
//

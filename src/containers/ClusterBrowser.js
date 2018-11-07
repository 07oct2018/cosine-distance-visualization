import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class _ClusterBrowser extends React.Component {
  render () {
    const points=JSON.parse(this.props.points);
    return (
      <table className={"table table-sm " + (this.props.hidden ? "d-none": "") } >
        <thead> 
          <tr>
            <th>Кластер</th>
            <th>Точки</th>
          </tr>
        </thead>
        <tbody>
        {
          
          this.props.clusterization.map( (value,key) =>
              <tr key={key}>
                <td>{key}</td>
                <td><p>{value.map(e => ( points[e] != undefined ? points[e].toString() : "")).join("; ")}</p></td>
              </tr>
          )
        }
        </tbody>
      </table>
    )
  }
}

const MapStateToProps = (state) => ({
  points : state.points,
  clusterization : state.clusterization
})

const ClusterBrowser = connect(MapStateToProps)(_ClusterBrowser)

export default ClusterBrowser

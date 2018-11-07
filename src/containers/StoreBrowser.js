import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class _StoreBrowser extends React.Component {
  render () {
    let myState = Object.entries(this.props.myState);
    return (
      <table className={"table table-sm " + this.props.className } ><tbody>
      {
        myState.map( (value,key) =>
            <tr key={key}>
              <td>{JSON.stringify(value[0])}</td>
              <td>{JSON.stringify(value[1])}</td>
            </tr>
        )
      }
      </tbody></table>
    )
  }
}

const MapStateToProps = (state) => ({
  myState : state
})

const StoreBrowser = connect(MapStateToProps)(_StoreBrowser)

export default StoreBrowser


import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ConfigPanel from './containers/ConfigPanel';
import StoreBrowser from './containers/StoreBrowser'
import ClusterBrowser from './containers/ClusterBrowser'
import VisualizationContainer from './containers/StoreBrowser'
import { Container } from 'reactstrap';
import GraphContainer from './containers/GraphContainer';

export default class App extends React.Component {
  render () {
    return (
<main>
    <Container>
        <ConfigPanel>
            <hr />
        </ConfigPanel>
        <StoreBrowser hidden={true}></StoreBrowser>
        <ClusterBrowser ></ClusterBrowser>
        <GraphContainer></GraphContainer>
    </Container>
</main>
    )
  }
}

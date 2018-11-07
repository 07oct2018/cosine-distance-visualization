import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Input, InputGroup, InputGroupAddon, InputGroupText, Label, Container, Row, Col } from 'reactstrap';

class _ConfigPanel extends React.Component{
  render () {
    return (
<div className={this.props.className}>
    <Row>
        <Col >
        <InputGroup className="my-2">
            <InputGroupAddon addonType="prepend">Points</InputGroupAddon>
            <Input defaultValue={this.props.points} onInput={(e) => this.props.dispatch({type: "UPDATE_POINTS", value: e.target.value})} />
        </InputGroup>
        </Col>
    </Row>
    <Row>
        <Col sm="auto" >
        <InputGroup className="my-2 justify-content-center">
            <InputGroupAddon addonType="prepend">Use threshold?</InputGroupAddon>
            <InputGroupAddon addonType="append">
                <InputGroupText>
                    <Input addon type="checkbox" aria-label="Использовать пороговое расстояние?" checked={this.props.usethreshold} onChange={(e) => this.props.dispatch({type:"UPDATE_USETHRESHOLD", value:!this.props.useThreshold })}/>
                </InputGroupText>
            </InputGroupAddon>
        </InputGroup>
        </Col>
        <Col >
        <InputGroup className={"my-2 " + (this.props.useThreshold ? "d-none" : "")}>
            <InputGroupAddon addonType="prepend">Cluster count</InputGroupAddon>
              <Input defaultValue={this.props.clusterCount} step="1" type="number" onChange={ (e) => this.props.dispatch({type: "UPDATE_CLUSTER_COUNT", value: e.target.value})} />
        </InputGroup>
        <InputGroup className={"my-2 " + (!this.props.useThreshold ? "d-none" : "")}>
            <InputGroupAddon addonType="prepend">Threshold</InputGroupAddon>
              <Input defaultValue={this.props.threshold} step="any" type="number" onChange={ (e) => this.props.dispatch({type: "UPDATE_THRESHOLD", value: e.target.value})} />
        </InputGroup>
        </Col>
    </Row>
    <Row>
        <Col sm="auto" >
        <InputGroup className="my-2 justify-content-center">
            <InputGroupAddon addonType="prepend">Normalization</InputGroupAddon>
            <InputGroupAddon addonType="append">
                <InputGroupText>
                    <Input addon type="checkbox" aria-label="Нормировка" checked={this.props.normalization} onChange={(e) => this.props.dispatch({type:"UPDATE_NORMALIZATION", value:!this.props.normalization })}/>
                </InputGroupText>
            </InputGroupAddon>
        </InputGroup>
        </Col>
        <Col >
        <InputGroup className="my-2">
            <InputGroupAddon addonType="prepend">Weights</InputGroupAddon>
            {this.props.weights.map ((value,key) => 
              <Input defaultValue={this.props.weights[key]} type="number" key={key} onChange={ (e) => this.props.dispatch({type: "UPDATE_WEIGHTS", value: e.target.value, index: key})} />
            )}
        </InputGroup>
        </Col>
    </Row>
    {this.props.children}
</div>
    )
  }
}

const MapStateToProps = (state) => ({
  points: state.points,
  weights: state.weights,
  normalization: state.normalization,
  clusterCount: state.clusterCount,
  useThreshold: state.useThreshold,
  threshold: state.threshold
})


export default connect(MapStateToProps)(_ConfigPanel)

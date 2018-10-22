import { combineReducers } from 'redux';
import validatePoints from '../util/validatePoints.js'

const initialState =  {
    points: '[[0,1,1], [0,1,7], [5,7,4], [0,5,5], [9,4,5], [7,1,2], [10,0,19], [0,12,7], [-5,-4,5], [20,10,15], [0,16,-16], [-1,9,-30], [18,0,17], [6,18,4]]',
    weights: [1,1,1],
    normalization: false,
    clusterCount: 3,
    clusterization: []
};


const points = (points = initialState.points, action) => {
  switch (action.type) {
    case 'UPDATE_POINTS':
      if (validatePoints(action.value))
        return JSON.stringify(JSON.parse(action.value)).replace( /\],\[/g ,"], [")
      else
        return points
    default:
      return points
  }
}
const weights = (weights = initialState.weights, action) => {
  switch (action.type) {
    case 'UPDATE_WEIGHTS':
      return weights.map( (value, index) => (index === action.index ? Number(action.value) : value) )
    default:
      return weights
  }
}
const normalization = (normalization = initialState.normalization, action) => {
  switch (action.type) {
    case 'UPDATE_NORMALIZATION':
      return action.value
    default:
      return normalization
  }
}

const clusterCount = (clusterCount = initialState.clusterCount, action) => {
  switch (action.type) {
    case 'UPDATE_CLUSTER_COUNT':
      return Number(action.value)
    default:
      return clusterCount
  }
}

const clusterization = (clusterization = initialState.clusterization, action) => {
  switch (action.type) {
    case 'UPDATE_CLUSTERIZATION':
      return action.value
    default:
      return clusterization
  }
}

export default combineReducers({
  points, 
  weights,
  normalization,
  clusterCount,
  clusterization
})

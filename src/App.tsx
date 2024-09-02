import React from 'react';
import './App.css';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import AddingShapePanel from './components/AddingShapePanel'

function App() {
  return (
    <div className="main-container">
      <div className="panel-container">
        <AddingShapePanel/>
      </div>

      <div className="canvas-container">
        <Stage width={window.innerWidth*0.7} height={window.innerHeight}>
          <Layer>
            <Rect width={50} height={50} fill="red" />
            <Circle x={200} y={200} stroke="black" radius={50} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default App;

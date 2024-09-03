import React, { useState } from 'react';
import './App.css';
import { Stage, Layer, Rect, Circle, RegularPolygon } from 'react-konva';
import AddingShapePanel from './components/AddingShapePanel'

function App() {
  const [shapes, setShapes] = useState([]);

  const addingNewPattern = (data:object) => {
    console.warn(data)
  }

  return (
    <div className="main-container">
      <div className="panel-container">
        <AddingShapePanel onAddingNewPattern={addingNewPattern}/>
      </div>

      <div className="canvas-container">
        <h2 className="m-2">Your Canvas</h2>

        <Stage className="border-top border-dark" width={window.innerWidth*0.7} height={window.innerHeight}>
          <Layer>
            <RegularPolygon x={100} y={100} radius={40} sides={3} fill="green" rotation={0} draggable/>

            <Rect x={300} y={300} width={60} height={60} fill="red" rotation={75} draggable/>

            <Circle x={200} y={200} radius={30} fill="yellow" draggable/>
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default App;

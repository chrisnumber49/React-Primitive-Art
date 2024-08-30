import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage, Layer, Rect, Circle } from 'react-konva';

function App() {
  return (
    <div className="App">


      <Stage width={window.innerWidth*0.7} height={window.innerHeight*0.7}>
        <Layer>
          <Rect width={50} height={50} fill="red" />
          <Circle x={200} y={200} stroke="black" radius={50} />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;

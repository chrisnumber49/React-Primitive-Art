import { useEffect, useState } from 'react';
import './App.css';
import { Stage, Layer, Rect, Circle, RegularPolygon } from 'react-konva';
import AddingShapePanel from './components/AddingShapePanel'
import { Pattern } from './const/const';

function App() {
  const [patterns, setPatterns] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [patternCount, setPatternCount] = useState({triangle:0, rectangle:0, circle:0, score:100});

  useEffect(() => {
    const patternType = patterns.map((pattern) => {
      return pattern.shape;
    });

    const triangleCount = patternType.filter(type => type === "TRIANGLE").length;
    const rectangleCount = patternType.filter(type => type === "RECTANGLE").length;
    const circleCount = patternType.filter(type => type === "CIRCLE").length;
    const score = patternType.length? 
      100 - 10*(Math.max(triangleCount, rectangleCount, circleCount) - Math.min(triangleCount, rectangleCount, circleCount)): 
      0;

    const updatedPatternCount = {
      triangle: triangleCount, 
      rectangle: rectangleCount, 
      circle: circleCount,
      score: score
    };

    setPatternCount(updatedPatternCount);
  }, [patterns.length]);

  const addingNewPattern = (newPattern: Pattern) => {
    console.log('New Pattern', newPattern);
    setPatterns([...patterns, newPattern]);
  }

  const onSelectPattern = (event: any, patternID: string) => {
    event.cancelBubble = true;
    console.log('Select Pattern', patternID);
    setSelectedId(patternID);
  }

  const handleDragStart = (e) => {
    const id = e.target.id();
    const patternsArray = patterns.slice();
    const pattern = patternsArray.find((i) => i.id === id);
    const index = patternsArray.indexOf(pattern);
    // remove from the list:
    patternsArray.splice(index, 1);
    // add to the top
    patternsArray.push(pattern);
    setPatterns(patternsArray);

    onSelectPattern(e, id);
  };
  const handleDragEnd = (e) => {
    const id = e.target.id();
    const patternsArray = patterns.slice();
    const pattern = patterns.find((i) => i.id === id);
    const index = patterns.indexOf(pattern);
    // update item position
    patternsArray[index] = {
      ...pattern,
      x: e.target.x(),
      y: e.target.y(),
    };
    setPatterns(patternsArray);
  };

  const onDeletePattern = () => {
    const updatedPatterns = patterns.filter((pattern)=>{
      return pattern.id !== selectedId;
    });

    setPatterns(updatedPatterns);
    setSelectedId('');
  }

  return (
    <div className="main-container">
      <div className="panel-container">
        <AddingShapePanel onAddingNewPattern={addingNewPattern}/>
      </div>

      <div className="canvas-container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="m-2">Your Canvas Score: {patternCount.score}</h2>
          <div className='mx-3'>triangle: {patternCount.triangle}, rectangle: {patternCount.rectangle}, circle: {patternCount.circle}</div>
        </div>
        
        {selectedId !== '' && 
          <button
            onClick={onDeletePattern}
            className='delete-btn btn btn-danger'
          >
            Delete Selected Pattern
          </button>
        }
        
        <Stage 
          className="border-top border-dark" 
          width={window.innerWidth*0.7} 
          height={window.innerHeight} 
          onClick={()=>{setSelectedId('')}}
        >
          <Layer>
            {patterns.map((pattern) => {
              if(pattern.shape ==="TRIANGLE"){
                return(
                  <RegularPolygon 
                    id={pattern.id}
                    key={pattern.id}
                    x={pattern.x} 
                    y={pattern.y} 
                    radius={pattern.radius} 
                    sides={3} 
                    fill="green" 
                    rotation={pattern.rotation} 
                    draggable
                    shadowColor="black"
                    shadowOpacity={pattern.id === selectedId ? 0.6 : 0}
                    shadowOffsetX={pattern.shadowOffset}
                    shadowOffsetY={pattern.shadowOffset}
                    onClick={(event)=>{onSelectPattern(event, pattern.id)}}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                )
              } else if(pattern.shape ==="RECTANGLE"){
                return(
                  <Rect 
                    id={pattern.id}
                    key={pattern.id}
                    x={pattern.x} 
                    y={pattern.y} 
                    width={pattern.width} 
                    height={pattern.height} 
                    fill="red" 
                    rotation={pattern.rotation} 
                    draggable
                    shadowColor="black"
                    shadowOpacity={pattern.id === selectedId ? 0.6 : 0}
                    shadowOffsetX={pattern.shadowOffset}
                    shadowOffsetY={pattern.shadowOffset}
                    onClick={(event)=>{onSelectPattern(event, pattern.id)}}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                )
              } else if(pattern.shape ==="CIRCLE"){
                return(
                  <Circle 
                    id={pattern.id}
                    key={pattern.id}
                    x={pattern.x} 
                    y={pattern.y} 
                    radius={pattern.radius} 
                    fill="yellow" 
                    draggable
                    shadowColor="black"
                    shadowOpacity={pattern.id === selectedId ? 0.6 : 0}
                    shadowOffsetX={pattern.shadowOffset}
                    shadowOffsetY={pattern.shadowOffset}
                    onClick={(event)=>{onSelectPattern(event, pattern.id)}}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                )
              }
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default App;

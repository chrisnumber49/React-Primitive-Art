import React, { useReducer, useState } from 'react'
import '../App.css';

interface ShapeStyles {
    triangleStyle: Object;
    rectangleStyle: Object;
    circleStyle: Object;
}

const initialShapeStyles: ShapeStyles = {
    triangleStyle: {
        'width': 0,
        'height': 0,
        'borderLeft': '50px solid transparent',
        'borderRight': '50px solid transparent',
        'borderBottom': '100px solid black',
        'rotate': '0deg'
    },
    rectangleStyle: {
        'width': '75px',
        'height': '75px',
        'borderStyle': 'solid',
        'borderColor': 'red',
        'backgroundColor': 'red',
        'rotate': '0deg'
    },
    circleStyle: {
        'width': '75px',
        'height': '75px',
        'borderStyle': 'solid',
        'borderColor': 'yellow',
        'backgroundColor': 'yellow',
        'borderRadius': '50%'
    }
}

const reducer = (state: ShapeStyles, action:{shape:string, changeOn:string, value:any}) => {
    let newParams = {};

    switch (action.shape) {
        case "TRIANGLE":
            newParams = {...state.triangleStyle};
            if(action.changeOn === "ZOOM"){

            } else if(action.changeOn === "ROTATION"){

            }

            return {...state, triangleStyle: newParams}
        case "RECTANGLE":
            newParams = {...state.rectangleStyle};
            if(action.changeOn === "ZOOM"){

            } else if(action.changeOn === "ROTATION"){
                
            }

            return {...state, rectangleStyle: newParams}
        case "CIRCLE":
            newParams = {...state.circleStyle};
            if(action.changeOn === "ZOOM"){

            }

            return {...state, circleStyle: newParams}
        default:
            return state;
    }
  };


function AddingShapePanel() {
    const [shapeStyles, dispatch] = useReducer(reducer, initialShapeStyles);
    const [currentZoom, setZoom] = useState({triangle: 50,rectangle: 50,circle: 50});
    const [currentRotation, setRotation] = useState({triangle: 0,rectangle: 0});

    const handleShapeChange = (shape: "TRIANGLE"| "RECTANGLE"| "CIRCLE", changeOn: "ZOOM"| "ROTATION", value: number) => {
        if(changeOn === "ZOOM"){
            const newZoom = {...currentZoom}
            newZoom[shape.toLowerCase()] = value;
            setZoom(newZoom);
        } else if(changeOn === "ROTATION") {
            const newRotation = {...currentRotation}
            newRotation[shape.toLowerCase()] = value;
            setRotation(newRotation);
        }

        dispatch({ shape, changeOn, value });
    };

    return (
        <div className="panel-layout">
            <h2 className='text-white'>Control Panel</h2>
            <div className="panel-item">
                <div style={shapeStyles.triangleStyle}/>

                <input
                    type="range"
                    id="triangleZoom"
                    min="1"
                    max="100"
                    value={currentZoom.triangle}
                    onChange={(event)=> {handleShapeChange("TRIANGLE", "ZOOM", Number(event.target.value))}}
                ></input>
                <input
                    type="range"
                    id="triangleRotate"
                    min="0"
                    max="359"
                    value={currentRotation.triangle}
                    onChange={(event)=> {handleShapeChange("TRIANGLE", "ROTATION", Number(event.target.value))}}
                ></input>
            </div>
            
            <div className="panel-item">
                <div style={shapeStyles.rectangleStyle}/>

                <input
                    type="range"
                    id="rectangleZoom"
                    min="1"
                    max="100"
                    value={currentZoom.rectangle}
                    onChange={(event)=> {handleShapeChange("RECTANGLE", "ZOOM", Number(event.target.value))}}
                ></input>
                <input
                    type="range"
                    id="rectangleRotate"
                    min="0"
                    max="359"
                    value={currentRotation.rectangle}
                    onChange={(event)=> {handleShapeChange("RECTANGLE", "ROTATION", Number(event.target.value))}}
                ></input>
            </div>

            <div className="panel-item">
                <div style={shapeStyles.circleStyle}/>

                <input
                    type="range"
                    id="circleZoom"
                    min="1"
                    max="100"
                    value={currentZoom.circle}
                    onChange={(event)=> {handleShapeChange("CIRCLE", "ZOOM", Number(event.target.value))}}
                ></input>
            </div>
        </div>
    )
}

export default AddingShapePanel;
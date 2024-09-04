import { useReducer, useState } from 'react'
import '../App.css';
import { v4 as uuidv4 } from 'uuid';
import { initialShapeStyles, ShapeStyles, Pattern } from '../const/const';

const reducer = (state: ShapeStyles, action:{shape:string, changeOn:string, value:number}) => {
    let newParamsSetting:any = {};

    switch (action.shape) {
        case "TRIANGLE":
            newParamsSetting = {...state.triangleStyle};
            if(action.changeOn === "ZOOM"){
                newParamsSetting.borderWidth = `0 ${0.72*action.value}px ${1.2*action.value}px ${0.72*action.value}px`;
            } else if(action.changeOn === "ROTATION"){
                newParamsSetting.rotate = `${action.value}deg`;
            }

            return {...state, triangleStyle: newParamsSetting}
        case "RECTANGLE":
            newParamsSetting = {...state.rectangleStyle};
            if(action.changeOn === "ZOOM"){
                newParamsSetting.width = `${1.2*action.value}px`;
                newParamsSetting.height = `${1.2*action.value}px`;
            } else if(action.changeOn === "ROTATION"){
                newParamsSetting.rotate = `${action.value}deg`;
            }

            return {...state, rectangleStyle: newParamsSetting}
        case "CIRCLE":
            newParamsSetting = {...state.circleStyle};
            if(action.changeOn === "ZOOM"){
                newParamsSetting.width = `${1.2*action.value}px`;
                newParamsSetting.height = `${1.2*action.value}px`;
            }

            return {...state, circleStyle: newParamsSetting}
        default:
            return state;
    }
};


function AddingShapePanel({onAddingNewPattern}) {
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

    const addNewShapeToCanvas = (shape: "TRIANGLE"| "RECTANGLE"| "CIRCLE") => {
        let newShape:Pattern;
        if(shape === "TRIANGLE") {
            newShape = {
                id: uuidv4(),
                shape: 'TRIANGLE',
                x:100,
                y:100,
                radius: 0.8*currentZoom.triangle,
                rotation: currentRotation.triangle,
                shadowOffset: 0.1*currentZoom.triangle,
            }
        } else if(shape === "RECTANGLE") {
            newShape = {
                id: uuidv4(),
                shape: 'RECTANGLE',
                x:100,
                y:100,
                width: 1.2*currentZoom.rectangle,
                height: 1.2*currentZoom.rectangle,
                rotation: currentRotation.rectangle,
                shadowOffset: 0.1*currentZoom.rectangle,
            }
        } else if(shape === "CIRCLE") {
            newShape = {
                id: uuidv4(),
                shape: 'CIRCLE',
                x:100,
                y:100,
                radius: 0.6*currentZoom.circle,
                shadowOffset: 0.1*currentZoom.circle,
            }
        }

        onAddingNewPattern(newShape);
    }

    return (
        <div className="panel-layout">
            <h2 className='m-2'>Control Panel</h2>

            <div className="panel-item">
                <div className="shape-container">
                    <div style={shapeStyles.triangleStyle}/>
                </div>

                <div className="input-group my-2">
                    <label className='mx-2' htmlFor="triangleZoom">Zooming</label>
                    <input
                        type="range"
                        id="triangleZoom"
                        min="10"
                        max="100"
                        value={currentZoom.triangle}
                        onChange={(event)=> {handleShapeChange("TRIANGLE", "ZOOM", Number(event.target.value))}}
                    ></input>
                </div>
                <div className="input-group my-2">
                    <label className='mx-2' htmlFor="triangleRotate">Rotation</label>
                    <input
                        type="range"
                        id="triangleRotate"
                        min="0"
                        max="359"
                        value={currentRotation.triangle}
                        onChange={(event)=> {handleShapeChange("TRIANGLE", "ROTATION", Number(event.target.value))}}
                    ></input>
                </div>

                <button className="add-btn btn btn-primary" onClick={() => {addNewShapeToCanvas("TRIANGLE")}}>Add</button>
            </div>
            
            <div className="panel-item">
                <div className="shape-container">
                    <div style={shapeStyles.rectangleStyle}/>
                </div>

                <div className="input-group my-2">
                    <label className='mx-2' htmlFor="rectangleZoom">Zooming</label>
                    <input
                        type="range"
                        id="rectangleZoom"
                        min="10"
                        max="100"
                        value={currentZoom.rectangle}
                        onChange={(event)=> {handleShapeChange("RECTANGLE", "ZOOM", Number(event.target.value))}}
                    ></input>
                </div>
                <div className="input-group my-2">
                    <label className='mx-2' htmlFor="rectangleRotate">Rotation</label>
                    <input
                        type="range"
                        id="rectangleRotate"
                        min="0"
                        max="359"
                        value={currentRotation.rectangle}
                        onChange={(event)=> {handleShapeChange("RECTANGLE", "ROTATION", Number(event.target.value))}}
                    ></input>
                </div>

                <button className="add-btn btn btn-primary" onClick={() => {addNewShapeToCanvas("RECTANGLE")}}>Add</button>
            </div>

            <div className="panel-item">
                <div className="shape-container">
                    <div style={shapeStyles.circleStyle}/>
                </div>

                <div className="input-group my-2">
                    <label className='mx-2' htmlFor="circleZoom">Zooming</label>
                    <input
                        type="range"
                        id="circleZoom"
                        min="10"
                        max="100"
                        value={currentZoom.circle}
                        onChange={(event)=> {handleShapeChange("CIRCLE", "ZOOM", Number(event.target.value))}}
                    ></input>
                </div>

                <button className="add-btn btn btn-primary" onClick={() => {addNewShapeToCanvas("CIRCLE")}}>Add</button>
            </div>
        </div>
    )
}

export default AddingShapePanel;
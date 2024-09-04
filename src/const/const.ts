export interface ShapeStyles {
    triangleStyle: Object;
    rectangleStyle: Object;
    circleStyle: Object;
}

export interface Pattern {
    id: string;
    shape: string;
    shadowOffset: number;
    x: number;
    y: number;
    radius?: number;
    width?: number;
    height?: number;
    rotation?: number;
}

export const initialShapeStyles: ShapeStyles = {
    triangleStyle: {
        'width': 0,
        'height': 0,
        'borderWidth': '0 36px 60px 36px',
        'borderColor': 'transparent transparent green transparent',
        'borderStyle': 'solid',
        'rotate': '0deg'
    },
    rectangleStyle: {
        'width': '60px',
        'height': '60px',
        'borderStyle': 'solid',
        'borderColor': 'red',
        'backgroundColor': 'red',
        'rotate': '0deg'
    },
    circleStyle: {
        'width': '60px',
        'height': '60px',
        'borderStyle': 'solid',
        'borderColor': 'yellow',
        'backgroundColor': 'yellow',
        'borderRadius': '50%'
    }
}
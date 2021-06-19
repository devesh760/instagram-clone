import React from 'react';
import classes from './Backdrop.module.css';
function Backdrop(props){
    let style = props.opacity? {backgroundColor: `rgba(0,0,0,${props.opacity})`}:null;
    return(
        <div style={style} onClick={props.on_click} className={classes.Backdrop}>
        </div>
    )
}

export default Backdrop;
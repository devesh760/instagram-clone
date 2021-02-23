import React from 'react';
import Logo from "../../assets/Instagram-big-Logo.png";
function getLogo(props){
    let style={
        height:props.height,
        width:props.width
    }
    return(
        <img style={style} src={Logo} alt="insta-logo"/>
    );
}
export default getLogo;
import React from 'react';
import Logo from '../../../assets/avatar.svg'
function Avatar({style}){
    return(
        <img style={style} src={Logo} alt="" />
    )
}

export default Avatar;
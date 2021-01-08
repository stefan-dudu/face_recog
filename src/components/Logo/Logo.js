import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png'
import './Logo.css';



const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 170, width: 170 }} >
                <div className="Tilt-inner"> 
                    <img alt='brain-logo' src={brain} /> 
                </div>
            </Tilt>
        </div>
    )
};

export default Logo;
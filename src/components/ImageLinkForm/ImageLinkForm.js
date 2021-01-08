import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div>
            <p className='f3'>
                {"Just add a link and watch the magic happening..."}
            </p>
            <div className='center'>
                <div className=' center form pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 cencer' type= 'tex' onChange={onInputChange}/> 
                <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue'
                    onClick={onButtonSubmit}
                    >Detect!
                    </button>  
                </div>
            </div>
        </div>
    )
};

export default ImageLinkForm;
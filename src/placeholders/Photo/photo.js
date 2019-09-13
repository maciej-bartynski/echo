import React from 'react';
import './photo.css';

const Photo = props => {
    return(
        
        <div {...props} className={'photo-wrapper'}>
            <img 
                className={'photo-image'}
                alt=''
                src={props.src}            
            />
        </div>
    )
}

export default Photo
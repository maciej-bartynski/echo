import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { goToIndex, goToNoClone } from './utilsRun';
import provider from './provider';

function Track(props) {
    const { userProps, displayContext, configProps } = props;
    const trackReference = useRef();
    displayContext.registerTrack(userProps.unique, props);

    const columnWidth = 100 / userProps.slidesToShow;
    const initialPosition = -configProps.initialIndex * columnWidth;

    useLayoutEffect(()=>{
        const node = trackReference.current;
        const columnWidth = 100 / userProps.slidesToShow;
        const initialPosition = -configProps.initialIndex * columnWidth;
        node.style.transform = `translateX(${initialPosition}%)`;
    }, [userProps.unique])


    useEffect(() => {
        const node = trackReference.current;
        goToIndex(props, node);
    });

    return (
        <div
            currentposition={userProps.initialIndex}
            unique={userProps.unique}
            ref={trackReference}
            onTransitionEnd={() => {
                    const node = trackReference.current;
                    
                    if (userProps.mode === 'infinite') {
                        goToNoClone(props, node);
                    }

                    displayContext.unlockActions();
            }}
            
            style={{
                width: '100%',
                whiteSpace: 'nowrap',
                transform: `translateX(${initialPosition}%)`
            }}
        >
            {props.children}
        </div>
    );
}

export default provider(Track);

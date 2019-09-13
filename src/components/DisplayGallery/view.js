import React, { useRef, useMemo } from 'react';
import { finiteChildren, infiniteChildren } from './utilsMount';
import Track from './track';
import provider from './provider';

const View = props => {
    const viewReference = useRef();

    const initialIndex = props.mode === 'infinite' ? props.slidesToShow : 0;

    const returnChildren = useMemo(
        () => {
            let elements = finiteChildren(props.children);
            if (props.mode === 'infinite') {
                elements = infiniteChildren(props, elements);
            }
            return elements;
        },
        [props.unique]
    );

    const userProps = {
        unique: props.unique,
        onTransitionEnd: props.onTransitionEnd,
        onTransitionStart: props.onTransitionStart,
        slidesToShow: props.slidesToShow,
        mode: props.mode,
        duration: props.duration
    }

    const configProps = {
        viewReference: viewReference,
        noclone: props.children.length,
        initialIndex,
    }

    return (
        <div
            ref={viewReference}
            style={{
                width: '100%',
                overflow: 'hidden'
            }}
        >
            <Track
                userProps={userProps}
                configProps={configProps}
            >
                {returnChildren}
            </Track>
        </div>
    );
};

export default provider(View);

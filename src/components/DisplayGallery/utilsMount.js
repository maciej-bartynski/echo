import { Children, cloneElement } from 'react';

export const finiteChildren = function(children) {
    return Children.map(children, (child, id) => {
        return cloneElement(child, {
            style: { ...child.props.style, display: 'inline-block' },
            ['data-id']: id,
        });
    });
};

export const infiniteChildren = function(props, finiteChildren) {
    const factor = props.slidesToShow;

    const head = finiteChildren.slice(-factor);
    const tail = finiteChildren.slice(0, factor);
    const newChildren = head.concat(finiteChildren).concat(tail);

    return Children.map(newChildren, (child, id) => {
        let isClone = false;

        if (id < factor) {
            isClone = true;
        } else if (id > newChildren.length - 1 - factor) {
            isClone = true;
        }

        const extensions = {
            key: id,
            style: { ...child.props.style, display: 'inline-block' },
            ['total-id']: id,
            clone: isClone.toString()
        }

        return cloneElement(child, extensions);
    });
};

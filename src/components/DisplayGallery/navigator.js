import { cloneElement } from 'react';
import provider from './provider';

const handleClick = function (props) {
    const { displayContext, by } = props;
    const { move_by } = displayContext;
    move_by(by);
};

const Navigator = props => {
    return cloneElement(props.children, {
        onClick: () => {
            handleClick(props);
        },
    });
};

export default provider(Navigator);

import React from 'react';
import { DisplayContext } from './displayGallery';

export default WrappedComponent => props => {
    return (
        <DisplayContext.Consumer>
            {ctx => <WrappedComponent displayContext={ctx} {...props} />}
        </DisplayContext.Consumer>
    );
};

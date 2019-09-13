import React, { Component, createContext } from 'react';
import { findPosition } from './utilsRun';

export const DisplayContext = createContext();

class DisplayGallery extends Component {
    constructor(props) {
        super(props);
        this.shortestView = 0;
        this.mutable = {
            lock: 0,
            selectors: []
        };
        this.state = {
            transition : false,
            index : 0,
            resetIndex: this.resetIndex,
            move_by: this.move_by,
            move_to: this.move_to,
            write: this.write,
            registerTrack: this.registerTrack,
            unlockActions: this.unlockActions
        };
    }

    componentDidMount = () => {
        this.mutable.selectors.forEach(sel => {
            sel.node = document.querySelector("[unique=" + sel.selector + "]");
        });
    };

    registerTrack = (selector, props) => {
        const arrayPossibleDuplicates = [...this.mutable.selectors];

        this.shortestView = this.shortestView > props.userProps.slidesToShow || this.shortestView === 0 ? 
            props.userProps.slidesToShow : this.shortestView

        arrayPossibleDuplicates.push({
            selector,
            node: null,
            data: props
        });

        const seen = {};
        const arrayNoDuplicates = [];
        const len = arrayPossibleDuplicates.length;
        let j = 0;
        for (let i = 0; i < len; i++) {
            let item = arrayPossibleDuplicates[i];
            if (seen[item.selector] !== 1) {
                seen[item.selector] = 1;
                arrayNoDuplicates[j++] = item;
            }
        }
        this.mutable.selectors = arrayNoDuplicates;
    };

    write = (name, value) => {
        this.mutable[name] = value;
    };

    unlockActions = () => {
        this.mutable.lock -= 1;
    };

    resetIndex = (payload) => {
        this.setState({
            index: payload,
            transition: false
        })
    }

    move_by = payload => {
        this.initial = false;
        if (this.mutable.lock !== 0) return;
        this.mutable.lock = this.mutable.selectors.length;
        const by = Math.abs(payload) <= this.shortestView ? payload : Math.sign(payload) * this.shortestView ;
        
        this.setState({
            transition: true,
            index: this.state.index + by
        });
        // this.mutable.selectors.forEach(item => {
        //     findPosition({
        //         ...item,
        //         by,
        //         to
        //     });
        // });
    };

    render = () => {
        return (
            <DisplayContext.Provider value={this.state}>
                {this.props.children}
            </DisplayContext.Provider>
        );
    };
}

export default DisplayGallery;

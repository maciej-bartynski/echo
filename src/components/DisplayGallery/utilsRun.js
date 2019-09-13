export const goToIndex = function (props, track) {
    const { displayContext, userProps, configProps } = props;

    if (!track || !track.childNodes) {
        return;
    }

    const items = track.childNodes;
    const index = displayContext.index + configProps.initialIndex;
    if (!items[index]) {
        return;
    }

    const position = `translateX(${-items[index].offsetLeft}px)`;
    const transition = `transform ${userProps.duration}ms ease-out`;

    requestAnimationFrame(() => {
        if (displayContext.transition) {
            track.style.transition = transition;
        }
        requestAnimationFrame(() => {
            track.style.transform = position;
        });
    });
};

export const goToNoClone = function (props, track) {
    const { configProps, displayContext } = props;
    
    requestAnimationFrame(() => {
        const items = track.childNodes;
        const index = +displayContext.index + +configProps.initialIndex;
        const current = items[index];
        const isClone = current.attributes.clone.value;

        if (isClone === 'true') {

            const selectorToFind = current.getAttribute('data-id');
            const indexToFind = +selectorToFind;

            requestAnimationFrame(() => {
                track.style.transition = 'none';
                requestAnimationFrame(() => {
                    displayContext.resetIndex(indexToFind);
                });
            });
        }
    });
}

export const protectEdge = (dataGiven, to) => {
    const { node, data } = dataGiven;
    const { userProps: { slidesToShow } } = data;
    const max = node.childNodes.length - slidesToShow;
    const returned = to > max || to < 0 ? (to > max ? max : 0) : to;

    node.attributes.currentposition.value = returned;

    return -node.childNodes[returned].offsetLeft;
};

export const protectInfiniteEdge = (dataGiven, to) => {
    const { node, data } = dataGiven;
    const { userProps: { slidesToShow } } = data;
    const max = node.childNodes.length - +slidesToShow;

    console.log(data, max)
    const min = +slidesToShow - 1;
    const returned = to > max || to < min ? (to > max ? max : min) : to;

    node.attributes.currentposition.value = returned;

    return -node.childNodes[returned].offsetLeft;
};

export const findPositionTo = function (data) {
    const { to, node } = data;
    console.log(data)

    if (!node || !node.childNodes) {
        return;
    }

    let currentPosition = null;
    const childrenNodes = node.childNodes;
    const targetNode = data.data.configProps.elReferences['id_' + to.toString()].current;

    if (!targetNode) {
        // currentPosition = +node.attributes.currentposition.value;
        // node.style.transform =
        //     'translateX(' + -childrenNodes[currentPosition].offsetLeft + 'px)';
        return;
    }

    node.attributes.currentposition.value = to;
    node.style.transform =
        'translateX(' + -targetNode.offsetLeft + 'px)';
};

export const findPositionBy = function (data) {
    const { by, node } = data;

    if (!node || !node.childNodes) {
        return;
    }

    const childrenNodes = node.childNodes;
    let currentPosition = +node.attributes.currentposition.value;
    let to = currentPosition + by;

    if (!childrenNodes[to]) {
        to = to < 0 ? 0 : childrenNodes.length - 1;
    }

    const goTo =
        data.data.mode === 'finite'
            ? protectEdge(data, to)
            : protectInfiniteEdge(data, to);
    node.style.transform = 'translateX(' + goTo + 'px)';
};

export const findPosition = function (data) {
    const { by } = data;
    by ? findPositionBy(data) : findPositionTo(data);
};

export const handleInfinite = (node, props) => {
    const { userProps, configProps, displayContext } = props;
    const position = node.attributes.currentposition.value;
    const current = node.childNodes[position];
    const isClone = current.attributes.clone.value;
    const factor = userProps.slidesToShow;

    if (isClone === 'true') {
        requestAnimationFrame(() => {
            node.style.transition = 'none';
            const realId = +current.attributes['data-id'].value;
            node.attributes.currentposition.value = factor + realId;

            requestAnimationFrame(() => {
                node.style.transform =
                    'translateX(' +
                    -node.childNodes[factor + realId].offsetLeft +
                    'px)';

                requestAnimationFrame(() => {
                    node.style.transition = `transform ${
                        userProps.duration
                        }ms ease-out`;
                    displayContext.unlockActions();
                });
            });
        });
    } else {
        displayContext.unlockActions();
    }
};

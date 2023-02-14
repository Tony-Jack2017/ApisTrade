const getPixelRatio = function(context) {
    const backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;

    return (window.devicePixelRatio || 1) / backingStore;
};

function throttle(handler, wait) {
    let timeout;
    return function () {
        let context = this
        let args = arguments
        if (!timeout) {
            timeout = setTimeout(function() {
                timeout = null
                handler.apply(context, args)
            }, wait)
        }
    }
}

export {
    getPixelRatio,
    throttle
}


    let socket;

    function init(url) {
        socket = new WebSocket(url);
        console.log('connecting....');
    }

    export default {
        // init: init but if key and value are same you can omit one of them
        init,
    }
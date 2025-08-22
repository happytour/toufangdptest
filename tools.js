(function () {
    window.__windvane__ = window.__windvane__ || {
        call: function (api, data, successCallback, errorCallback, timeout) {
            alert("Your browser does not support WindVane API calls. Please ensure you are using a compatible browser.");
        },
    };
    window.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'iframe') {
            const { callbackId, api, data, timeout } = event.data;
            window.__windvane__.call(
                api,
                data,
                function (result) {
                    event.source.postMessage({ type: 'iframe', callbackId: callbackId, success: true, data: result }, '*');
                },
                function (error) {
                    event.source.postMessage({ type: 'iframe', callbackId: callbackId, success: false, data: error }, '*');
                },
                timeout
            );
        }
    }, false);
})();

var messenger = {
    message: "Hello World",
    start: function () {
        var _self = this;
        setTimeout(function () {
            _self.message.toString();
        }, 3000);
    }
};
messenger.start();

define(function (require, exports) {
    "use strict";
    var file_system = brackets.getModule('filesystem/FileSystem');

    exports.mkdirp = function (path) {
        var dir = file_system.getDirectoryForPath(path);
        var promise = $.Deferred();

        dir.exists(function (err, exists) {
            if (!exists) {
                var parentFolder = path.replace(/\/+\s*$/, '').split('/').slice(0, -1).join('/');
                exports.mkdirp(parentFolder).then(function () {
                        dir.create(function (err) {
                            if (err) {
                                promise.reject(err);
                            }
                            else {
                                promise.resolve();
                            }
                        });
                    })
                    .fail(function (err) {
                        promise.reject(err);
                    });
            }
            else {
                promise.resolve();
            }
        });

        return promise;
    };

    exports.create_file = function (file, content) {
        var promise = $.Deferred();
        file.write(content, {}, function (err) {
            if (err) {
                promise.reject(err);
            }
            else {
                promise.resolve();
            }
        });
        return promise;
    };

});
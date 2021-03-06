import chrome from 'ui/chrome';

export default function($http) {
    var baseURI = "/api/ems/space";
    var uri = {
        register: {uri:chrome.addBasePath(baseURI + "/register"), method:"POST"},
        getSpaceList: {uri:chrome.addBasePath(baseURI + "/"), method:"GET"},
        test: {uri:chrome.addBasePath(baseURI + "/test"), method:"GET"}
    };

    this.register = function(space, callback) {
        var u = uri.register;

        var req = {
            method: u.method,
            url: u.uri,
            data: space
        };

        this.callAPI(req,callback);
    };

    this.getSpaceList = function(user_id, callback) {
        var u = uri.getSpaceList;

        var req = {
            method: u.method,
            url: u.uri + "?user_id="+user_id
        };

        this.callAPI(req,function(res) {
            if(res.result){
                var data = [];

                for (var i=0; i<res.data.length; i++) {
                    var item = res.data[i]._source;
                    item._id = res.data[i]._id;
                    data.push(item);
                }

                callback(data);
            }
        });
    };

    this.test = function(callback) {
        var u = uri.test;

        var req = {
            method: u.method,
            url: u.uri
        };

        this.callAPI(req,callback);
    };

    this.callAPI = function(req, callback) {
        $http(req).then(function successCallback(res) {
            callback({result:true, data:res.data});
        }, function errorCallback(res) {
            callback({result:false, data:res.data});
        });
    };
}

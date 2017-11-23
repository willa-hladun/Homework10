var http = require('http');
var credentials = {
    userName: "willa",
    password: "hladun"
};
var realm = "basic authentication";
function authenticationStatus(resp) {
    resp.writeHead(401, {'WWW-Authenticate': 'Basic realm="' + realm + '"'});
    resp.end('Authorization is needed');
};
var server = http.createServer(function (request, response) {
    var authentication, loginInfo
    if (!request.headers.authorization) {
        authenticationStatus (response);
        return;
    }
authentication = request.headers.authorization.replace(/^Basic/,'');
authentication = (new Buffer(authentication, 'base64')).toString('utf8');
loginInfo = authentication.split(':');
if (loginInfo[0] === credentials.userName && loginInfo[1] ===
credentials.password) {
    response.end('You Are Authenticated...');
}    
authenticationStatus (response);

});

server.listen(5050)

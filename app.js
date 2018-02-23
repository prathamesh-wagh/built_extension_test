var Built = require('built-extension-sdk')

// Initiate application
var app = Built.App('blt8cb659c05289f7a3')
.setHost("dev-api.built.io")
.setProtocol("https")
.setMasterKey('bltf4a27ff1b7ce3a5666')

// 574df6c8fb2034b1603d792e8e2922268779c456 - access token
// bltc88f3d42ad8a728c - secret key
// blt_ext_default_test - extension key
// web hook url - https://test-stag-api.built.io/v1/extensions/blt_ext_default/redeploy?application_api_key=bltc4f7ed1f03053fe8

var extensionSDK = app.Extension({
	extension_key  : 'blt_ext_default_test_app',
	secret_key     : 'app_test_123',
	static         : __dirname + '/client',
	routes         : require('./server/routes')
})

return extensionSDK.start(9000)

// Wrong code
// var Built = require('built-extension-sdk')

// // Initiate application
// var app = Built.App('blt8f9dff6a8e3d328b')
// // .setHost('localhost')
// // .setPort(8000)
// .setHost("dev-api.built.io")
// .setProtocol("https")
// // .setPort(80)
// .setMasterKey('blt89bb8dd35304a8dc')

// var extensionSDK = app.Extension({
// 	secret_key     : 'blta8c9b5ed7cdcfc35',
// 	extension_key	 : 'blt_ext_default',
// 	static         : __dirname + '/client',
// 	routes         : require('./server/routes')
// })

// return extensionSDK.start(9000)
var Built = require('built-extension-sdk')

// Initiate application
var app = Built.App('blt8cb659c05289f7a3')
.setHost("dev-api.built.io")
.setProtocol("https")
.setMasterKey('bltf4a27ff1b7ce3a59')

// 574df6c8fb2034b1603d792e8e2922268779c456 - access token
// bltc88f3d42ad8a728c - secret key
// blt_ext_default_test - extension key - blt_ext_third_party_secret, blt_ext_third_party
// web hook url - https://test-stag-api.built.io/v1/extensions/blt_ext_default/redeploy?application_api_key=bltc4f7ed1f03053fe8

var extensionSDK = app.Extension({
	extension_key  : 'blt_ext_default_test_app',
	secret_key     : 'app_test_123',
	// extension_key  : 'blt_ext_third_party',
	// secret_key     : 'blt_ext_third_party_secret',
	static         : __dirname + '/client',
	routes         : require('./server/routes')
})

return extensionSDK.start(9000)
var Built = require('built-extension-sdk')

// Initiate application
// var app = Built.App('bltfac30679d8d03d35')
// .setHost("api.built.io")
// .setProtocol("https")
// .setMasterKey('blt0be0f2378a122f65')

var app = Built.App('blt8cb659c05289f7a3')
.setHost("dev-api.built.io")
.setProtocol("https")
.setMasterKey('bltf4a27ff1b7ce3a59')

var extensionSDK = app.Extension({
	extension_key  : 'blt_ext_default_test_app',
	secret_key     : 'app_test_123',
	// extension_key  : 'blt_ext_third_party',
	// secret_key     : 'blt_ext_third_party_secret',
	static         : __dirname + '/client',
	routes         : require('./server/routes')
})

return extensionSDK.start(9000)
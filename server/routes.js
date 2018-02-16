var when = require('when')
module.exports = {
	// hello_world is the name of function in this code block
	"/v1/functions/hello_world" : {
		GET : function(req, res) {
			// req.logger.log("Calling function hello_world")
			// return this.resSuccess(req, res, "Hello World..!!")
		}
	},
	"/v1/classes/bugs/objects" : {
		GET : {
			_pre : function(req, res) {
				req.logger.log("GET for bugs")
				// return this.resSuccess(req, res, "Success")
			}
		}
	}
}
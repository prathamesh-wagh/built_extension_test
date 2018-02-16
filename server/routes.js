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
	},
	"/v1/classes/person/objects" : {
		POST : {
			_pre : function(req, res) {
				req.logger.log("POST for Persons _pre")
				return this.resSuccess(req, res, "Success in _pre")
			},
			_post : function(req, res) {
				req.logger.log("POST for Persons _post")
				return this.resSuccess(req, res, "Success in _post")
			}
		}
	}
}
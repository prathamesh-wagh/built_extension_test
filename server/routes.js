var when = require('when')
module.exports = {
	// hello_world is the name of function in this code block
	"/v1/functions/hello_world" : {
		GET : function(req, res) {
			req.logger.log("Calling function hello_world")
			return this.resSuccess(req, res, "Hello World..!!")
		}
	},
	"/v1/classes/bugs/objects" : {
		GET : {
			_pre : function(req, res) {
				req.logger.log("GET for bugs")
				return this.resSuccess(req, res, "Success")
			}
		}
	},
	"/v1/classes/bugs/objects/:objectuid" : {
    // PUT call signifies Save operation
    PUT: {
      // Before save hook
      _pre: function(req, res) {
        var that = this
				var bapp = req.builtApp

				if(req.bobjekt.get("status") == "closed") {
					return that.resError(req, res, {
						"error" : "Bug status is already!"
					})
				}

				// Fetch bugs object from Built.io Backend
				var dueDate     = new Date(req.payload.due_date)
				var currentDate = new Date()

				// Compare due_date received from req.payload to update bug due_date
				if(dueDate < currentDate) {
					return that.resError(req, res, {
						"due_date" : "should not be a past date"
					})
				}

				return that.resSuccess(req, res)
      }
    }
  },
	"/v1/classes/person/objects": {
		GET : {
			_pre : function(req, res) {
				req.bobjekt = req.bobjekt.where("age", 54)
				return this.resSuccess(req, res)
			}
		},
		POST: {
			_pre: function(req, res) {
				req.bobjekt = req.bobjekt.set("age", 54)
				
				req.logger.log(req.bobjekt)
				
				return this.resSuccess(req, res)
			},
			_post: function(req, res) {
				req.bobjekt["description"] = "New person object created.!"
				return this.resSuccess(req, res)
			}
		},
		"/:personid" : {
			PUT : {
				_pre : function(req, res) {
					var that = this
					if(!req.payload.object.age) {
						return that.resError(req, res, {
							error : "Age needs to be provided"
						})
					}
					
					if(req.payload.object.age < 21) {
						return that.resError(req, res, {
							error : "Age must be greater than 21"
						})
					}
	
					return that.resSuccess(req, res)
				}
			}
		}
	},
	"/v1/functions/createPerson": {
		POST : function(req, res) {
			var that = this
			// Save Built App Instance
			var bapp = req.builtApp

			// Fetch Class instance and initialize object to save and call save()
			// function in Built SDK
			return bapp.Class("person").Object({
				"first_name" : req.payload.first_name
			})
			.save()
			.then(function(personObject) {
				return that.resSuccess(req, res, {
					savedObject : personObject.toJSON()
				})
			})
			.catch(function(err) {
				req.logger.log(err)
				return that.resError(req, res, err)
			})
		}
	},
	"/v1/functions/getAllPersons" : {
		GET : function(req, res) {
			// Save Built App Instance
			var bapp = req.builtApp
			var that = this

			// Fetch Built Class Query instance and call fetch()
			return bapp.Class("person").Query()
			.exec()
			.then(function(objects) {
				 // Fetches all objects from Person class
				 return that.resSuccess(req, res, {
					 personsData : objects
				 })
			})
			.catch(function(err) {
				req.logger.log(err)
				return that.resError(req, res, err)
			})
		}
	},
	"/v1/functions/smita": {
		GET: function(req, res){
			this.resSuccess(req, res, {
				smita: "is awesome"
			})
		}
	},
	"/v1/functions/test" : {
		POST: function(req, res){
			var that = this
			req.builtApp = req.builtApp
			
			var response = {}

			return req.builtApp.Class('person').Object(req.payload.data.person)
			.save()
			.then(function(person){
				response['person'] = person.toJSON()
				return req.builtApp.Class('address').Object(req.payload.data.address)
				.save()
			})
			.then(function(address){
				response['address'] = address.toJSON()
				return that.resSuccess(req, res, response)
			})
		}
	}
}
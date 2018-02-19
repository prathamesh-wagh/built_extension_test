var when = require('when')
module.exports = {
	// hello_world is the name of function in this code block
	"/v1/functions/hello_world" : {
		GET : function(req, res) {
			req.logger.log("Calling function hello_world")
			return this.resSuccess(req, res, "Hello World..!!")
		}
	},
	"/v1/classes/person/objects": {
		GET : {
			_pre : function(req, res) {
				// Fetches all persons with age 54
				req.bobjekt = req.bobjekt.where("age", 54)
				return this.resSuccess(req, res)
			}
		},
		POST: {
			_pre: function(req, res) {
				// Set default age of person to 54 for every person being created
				req.bobjekt = req.bobjekt.set("age", 54)				
				return this.resSuccess(req, res)
			},
			_post: function(req, res) {
				// Sets a default message in description once a person object is created
				req.bobjekt["description"] = "New person object created.!"
				return this.resSuccess(req, res)
			}
		},
		"/:personid" : {
			PUT : {
				_pre : function(req, res) {
					var that = this
					// Checks whether age is provided in request payload else throws error
					if(!req.payload.object.age) {
						return that.resError(req, res, {
							"error" : "Age needs to be provided"
						})
					}

					// Checks whether age is less than 21 and if it is, then throws error
					if(req.payload.object.age < 21) {
						return that.resError(req, res, {
							"error" : "Age must be greater than 21"
						})
					}

					return that.resSuccess(req, res)
				}
			}
		}
	},
	"/v1/classes/bugs/objects" : {
		// POST call signifies Save operation
		POST : {
			_pre : function(req, res) {
				var that       = this
				var bapp       = req.builtApp
				var reqPayload = req.payload.object

				req.logger.log(reqPayload)

				// Fetch bugs object from Built.io Backend
				var dueDate     = new Date(reqPayload.due_date)
				var currentDate = new Date()

				// Compare due_date received from req.payload to update bug due_date
				if(dueDate < currentDate) {
					return that.resError(req, res, {
						"due_date" : "should not be a past date"
					})
				}

				return that.resSuccess(req, res)
			}
		},
		"/:buguid" : {
   		// PUT call signifies Update operation
			PUT: {
				// Before save hook
				_pre: function(req, res) {
					var that       = this
					var bapp       = req.builtApp
					var reqPayload = req.payload.object
					
					req.logger.log(reqPayload)

					req.logger.log(req.bobjekt)

					if(req.bobjekt.get("status") == "closed") {
						return that.resError(req, res, {
							"error" : "Bug status is already!"
						})
					}

					var dueDate     = new Date(reqPayload.due_date)
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
		}
  },
	"/v1/functions/createPerson": {
		POST : function(req, res) {
			var that = this
			// Save Built App Instance
			var bapp = req.builtApp

			// Fetch Class instance, initializes object to save and calls save()
			// function in Built SDK
			req.logger.log(req.built.getContextVar("currentUser"))
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
				// Logs any error that occurs while executing this application
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

			// Fetch Built Class Query instance and call exec()
			return bapp.Class("person").Query()
			.exec()
			.then(function(objects) {
				 // Fetches all objects from Person class
				 return that.resSuccess(req, res, {
					 personsData : objects
				 })
			})
			.catch(function(err) {
				// Logs any error that occurs while executing this application
				req.logger.log(err)
				return that.resError(req, res, err)
			})
		}
	}
}
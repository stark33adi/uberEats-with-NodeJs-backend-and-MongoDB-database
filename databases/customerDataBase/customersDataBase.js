const mongoose = require('mongoose');
const { stringify } = require('querystring');

const credentials = require("../customerDataBase/credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;


//the schema definition
let customerSchema = new Schema({
	
	email:String,
	firstName:String,
	lastName:String,
	phone:String,
	password:String
	
}, {
	collection: 'kumar_customer'
});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("restrauntListModel", 
							customerSchema);
		};
		return model;
	}
};

























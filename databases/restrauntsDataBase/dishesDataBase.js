const mongoose = require('mongoose');
const { stringify } = require('querystring');

const credentials = require("../restrauntsDataBase/credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;



//the schema definition
let restaurantListSchema = new Schema({
	
	restaurantId:Number,
	email:String,
	restaurantName:String,
	restaurantAbbrName:String,
	address:String,
	phone:String,
	openStatus:String,
	deliveryTime:String,
	rateValue:Number,
	foodType:String,
	origin:String,
	imagePath:String
	
}, {
	collection: 'kumar'
});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("restrauntListModel", 
							restaurantListSchema);
		};
		return model;
	}
};

























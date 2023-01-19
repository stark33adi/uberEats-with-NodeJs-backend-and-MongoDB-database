const mongoose = require('mongoose');
const { stringify } = require('querystring');

const credentials = require("../eachRestaurantDataBase/credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

//the schema definition

let restaurantMenuSchema = new Schema({
	
	dishId:Number,
	dishName:String,
	dishPrice:String,
	dishPhoto:String,
	genDate:String,
	dishType:String,
	restaurant:String
}, {
	collection: 'kumar_dishes'
});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("restrauntListModel", 
			restaurantMenuSchema);
		};
		return model;
	}
};

























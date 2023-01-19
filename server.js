const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//XML converter
var js2xmlparser = require("js2xmlparser");


//include the different origin food
const preProcessResutls=require("./typesOfFood.js");

//load the customer Database
const customerDB = require('./databases/customerDataBase/customersDataBase.js');
const customer = customerDB.getModel();

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars.engine({defaultLayout: 'frontPage'}));
app.set('view engine', 'handlebars');



//custom function
var hb = handlebars.create({});

hb.handlebars.registerHelper('concat', function(server_path,name){
	return server_path+name;
});
hb.handlebars.registerHelper('concat_multi', function(name1,name2){
	return '/city/'+name1+'/state/'+name2;
});

// including static resources
//incliding the images, js files, css files
app.use(express.static(__dirname + '/public'));


// GET request to the homepage

app.get('/', function (req, res){
	res.render('frontPage');
});

app.get('/login', function (req, res){
	res.sendFile(__dirname + '/pages/login/loginPage.html')
});


app.post('/checkUser', async function (req, res){
	
	let temp = await customer.find({'email': req.body.email,'password': req.body.password});
	if(temp.length==0){
		res.sendFile(__dirname + '/pages/login/loginPageError.html');
	}else{
		res.sendFile(__dirname + '/pages/restaurantList/restaurantListPage.html');
	}
	
});

app.get('/getInfo/:id', async function (req, res){
	let temp = await customer.find({'email': req.params.id.slice(1)});
	res.send(JSON.stringify(temp[0]));
});





app.get('/signUp', function (req, res){
	res.sendFile(__dirname + '/pages/signUp/signUpPage.html')
});

app.post('/signUpInformation', function (req, res){
	//add the new customer
	var customerN = { email:req.body.email, firstName: req.body.fname,
		lastName: req.body.lname, phone : req.body.phoneNumber, password:req.body.password };
    var newdata= new customer(customerN);
    newdata.save();
	
	res.sendFile(__dirname + '/pages/login/loginPage.html');
});



// for restaurant Displaying
app.get('/restaurantList', function (req, res){
	res.sendFile(__dirname + '/pages/restaurantList/restaurantListPage.html')
});


app.post('/restaurantListDisplay', async function (req, res){

	let results= await preProcessResutls.processResult();

	
	let format=JSON.parse(JSON.stringify(req.headers));

		if (format.accept.split("/")[1]=='xml'){
			//Send XML
			res.send(js2xmlparser.parse(results));
		}
		else{
			//send JSON
			res.send(JSON.stringify(results));}
	



	//res.send(JSON.stringify(results));
});

//filter feature for the restraunt
app.post('/restaurantListFilter', async function (req, res){
	let results= await preProcessResutls.processResultFiltered(req.body);
	//console.log(JSON.stringify(results));
	let format=JSON.parse(JSON.stringify(req.headers));

		if (format.accept.split("/")[1]=='xml'){
			//Send XML
			res.send(js2xmlparser.parse(results));
		}
		else{
			//send JSON
			res.send(JSON.stringify(results));}

	//res.send(JSON.stringify(results));

});




// for displaying the restraunt Menu
app.get('/restaurantMenu', async function (req, res){
	console.log('here');
	res.sendFile(__dirname + '/pages/eachRestaurant/eachRestaurantPage.html')
});


// for displaying the restraunt Menu items
app.get('/restaurantMenuItems/:email', async function (req, res){

	console.log('Menu');
	let results= await preProcessResutls.processResultMenu(req.params.email.slice(1));
	res.send(JSON.stringify(results));
});



// for storing the cart
app.post('/cartSave', async function (req, res){
	console.log(preProcessResutls.makeCart(req.body));
	let results = await preProcessResutls.makeCart(req.body);
	//console.log(req.params.email.slice(1));
	//let results= await preProcessResutls.processResultMenu(req.params.email.slice(1));
	//console.log(results);


	res.send(JSON.stringify(results));
});


// for displaying the checkOut Page
app.get('/checkOut', async function (req, res){
	console.log('check Out');
	res.sendFile(__dirname + '/pages/checkOut/checkOutPage.html');
});



// for displaying the checkOut Page
app.post('/placeOrder', async function (req, res){
	console.log('Order Placed!!');
	console.log(req.body);
	res.send();
});



app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.listen(3000, function(){
  console.log('http://localhost:3000');
});


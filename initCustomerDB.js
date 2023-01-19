const { use } = require('express/lib/application');
const customerDB = require('./databases/customerDataBase/customersDataBase.js');

const customer = customerDB.getModel();

(async() => {

	await customer.deleteMany({});

	let customer1 = new customer({	
		email:'peeyush@bu.edu',
		firstName:'peeyush',
		lastName:'kumar',
		phone:'617-123-1234',
		password:'1234'
		
}); 
   


	await Promise.all([
		customer1.save()
		]);

	let currentCustomers = await customer.find({});

	console.log(currentCustomers);

	process.exit();


})();













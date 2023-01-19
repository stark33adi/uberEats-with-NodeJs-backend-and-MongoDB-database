const { use } = require('express/lib/application');
const restaurantMenuDB = require('./databases/eachRestaurantDataBase/eachRestaurantDataBase.js');

const restrauntMenu = restaurantMenuDB.getModel();

(async() => {

	await restrauntMenu.deleteMany({});

	let dish1 = new restrauntMenu({	
		dishId:1,
	dishName:"Veggie Paradise Pizza",
	dishPrice:"20.0",
	dishPhoto:'dominosDishes/veggieParadise.jpg',
	genDate:'nothing',
	dishType:'Main Course',
	restaurant:'dominos@us.com'
}); 

let dish2 = new restrauntMenu({	
	dishId:1,
dishName:"Plain Cheese Pizza",
dishPrice:"21.0",
dishPhoto:'dominosDishes/plainCheese.webp',
genDate:'nothing',
dishType:'Main Course',
restaurant:'dominos@us.com'
}); 

let dish3 = new restrauntMenu({	
	dishId:1,
dishName:"Peproni Pizza",
dishPrice:"19.0",
dishPhoto:'dominosDishes/peproni.jpg',
genDate:'nothing',
dishType:'Main Course',
restaurant:'dominos@us.com'
}); 
let dish4 = new restrauntMenu({	
	dishId:1,
dishName:"Chicken Barbeque Pizza",
dishPrice:"24.0",
dishPhoto:'dominosDishes/chickenBarbeque.png',
genDate:'nothing',
dishType:'Main Course',
restaurant:'dominos@us.com'
}); 
let dish5 = new restrauntMenu({	
	dishId:1,
dishName:"Mac'N'Cheese",
dishPrice:"9.0",
dishPhoto:'dominosDishes/macNcheese.jpg',
genDate:'nothing',
dishType:'Sides',
restaurant:'dominos@us.com'
}); 
let dish6 = new restrauntMenu({	
	dishId:1,
dishName:"Garlic Knots",
dishPrice:"5.99",
dishPhoto:'dominosDishes/garlicKnots.jpg',
genDate:'nothing',
dishType:'Breads',
restaurant:'dominos@us.com'
}); 
let dish7 = new restrauntMenu({	
	dishId:1,
dishName:"Garlic Bread",
dishPrice:"8.0",
dishPhoto:'dominosDishes/garlicBread.jpg',
genDate:'nothing',
dishType:'Breads',
restaurant:'dominos@us.com'
}); 
let dish8 = new restrauntMenu({	
	dishId:1,
dishName:"Coke",
dishPrice:"2.0",
dishPhoto:'dominosDishes/coke.jpg',
genDate:'nothing',
dishType:'Sides',
restaurant:'dominos@us.com'
}); 
let dish9 = new restrauntMenu({	
	dishId:1,
dishName:"Choco Lava Cake",
dishPrice:"5.0",
dishPhoto:'dominosDishes/chocoLava.jpg',
genDate:'nothing',
dishType:'Main Course',
restaurant:'dominos@us.com'
}); 

let dish10 = new restrauntMenu({	
	dishId:1,
dishName:"Banana Pizza",
dishPrice:"20.0",
dishPhoto:'dominosDishes/banana.jpg',
genDate:'nothing',
dishType:'Main Course',
restaurant:'dominos@us.com'
}); 





	await Promise.all([
		dish1.save(), 
		dish2.save(),
		dish3.save(), 
		dish4.save(),
		dish5.save(), 
		dish6.save(),
		dish7.save(), 
		dish8.save(),
		dish9.save(), 
		dish10.save()
		]);

	let currentRestaurantMenu = await restrauntMenu.find({});

	console.log(currentRestaurantMenu);

	process.exit();


})();













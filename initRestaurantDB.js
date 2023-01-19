const { use } = require('express/lib/application');
const restaurantDB = require('./databases/restrauntsDataBase/dishesDataBase.js');

const restraunt = restaurantDB.getModel();

(async() => {

	await restraunt.deleteMany({});

	let restaurant1 = new restraunt({	
		restaurantId:1,
		email:'dominos@us.com',
		restaurantName:'Dominos Pizza',
		restaurantAbbrName:'DP',
		address:'412 Washington Street, MA 02134',
		phone:'123-456-9078',
		openStatus:'open',
		deliveryTime:'30',
		rateValue:3.9,
		foodType:'Non-Veg',
		origin:'American',
		imagePath:'dominos.jpeg'
}); 

	let restaurant2 = new restraunt({	
					restaurantId:2,
					email:'rogrady7@gmail.com',
					restaurantName:'Tawakal Halal Cafe',
					restaurantAbbrName:'THC',
					address:'389 Maverick St. Boston, MA 02128',
					phone:'(617) 418-5890',
					openStatus:'open',
					deliveryTime:'30',
					rateValue:3.2,
					foodType:'Non-Veg',
					origin:'African',
					imagePath:'tawakal.jpg'
					}); 

    let restaurant3 = new restraunt({	
						restaurantId:3,
						email:'vligoeb@huffingtonpost.com',
						restaurantName:"Gene's Chinese Flatbread Cafe",
						restaurantAbbrName:'GCF',
						address:'86 Bedford St Boston, MA 02111',
						phone:'(617) 418-5890',
						openStatus:'open',
						deliveryTime:'30',
						rateValue:4.6,
						foodType:'Non-Veg',
						origin:'Chinese',
						imagePath:'genes.jpg'
						}); 


	let restaurant4 = new restraunt({	
							restaurantId:4,
							email:'pammy@us.com',
							restaurantName:"Pammy's",
							restaurantAbbrName:'PAM',
							address:'412 Washington Street, MA 02134',
							phone:'123-456-9078',
							openStatus:'open',
							deliveryTime:'45',
							rateValue:4.5,
							foodType:'Non-Veg',
							origin:'American',
							imagePath:'pammy.jpeg'
					}); 	

	let restaurant5 = new restraunt({	
						restaurantId:5,
						email:'kosmard@reuters.com',
						restaurantName:"Dumpling Cafe",
						restaurantAbbrName:'DC',
						address:'86 Bedford St Boston, MA 02111',
						phone:'(617) 418-5890',
						openStatus:'open',
						deliveryTime:'35',
						rateValue:4.9,
						foodType:'Non-Veg',
						origin:'Chinese',
						imagePath:'dc.jpg'
						}); 

	let restaurant6 = new restraunt({	
							restaurantId:6,
							email:'cdougane@hibu.com',
							restaurantName:"Peach Farm",
							restaurantAbbrName:'PF',
							address:'86 Bedford St Boston, MA 02111',
							phone:'(617) 418-5890',
							openStatus:'open',
							deliveryTime:'35',
							rateValue:4.0,
							foodType:'Non-Veg',
							origin:'Chinese',
							imagePath:'pf.jpg'
							});

	let restaurant7 = new restraunt({	
								restaurantId:7,
								email:'sturrell2@gmail.com',
								restaurantName:"Puritan & Company",
								restaurantAbbrName:'PC',
								address:'86 Bedford St Boston, MA 02111',
								phone:'(617) 418-5890',
								openStatus:'open',
								deliveryTime:'28',
								rateValue:4.5,
								foodType:'Gluten-Free',
								origin:'English',
								imagePath:'pc.jpg'
								});

	let restaurant8 = new restraunt({	
									restaurantId:8,
									email:'pkildale12@gmail.com',
									restaurantName:"Brewer's Fork",
									restaurantAbbrName:'BF',
									address:'86 Bedford St Boston, MA 02111',
									phone:'(617) 418-5890',
									openStatus:'open',
									deliveryTime:'35',
									rateValue:4.9,
									foodType:'Gluten-Free',
									origin:'Italian',
									imagePath:'bf.jpg'
									});

	let restaurant9 = new restraunt({	
										restaurantId:9,
										email:'twymang@who.int',
										restaurantName:"Sportello",
										restaurantAbbrName:'SP',
										address:'86 Bedford St Boston, MA 02111',
										phone:'(617) 418-5890',
										openStatus:'open',
										deliveryTime:'32',
										rateValue:4.4,
										foodType:'Veg',
										origin:'Italian',
										imagePath:'sport.jpg'
										});

    let restaurant10 = new restraunt({	
									restaurantId:10,
											email:'rstabler3@gmail.com',
											restaurantName:"Cafe Sushi",
											restaurantAbbrName:'CS',
											address:'86 Bedford St Boston, MA 02111',
											phone:'(617) 418-5890',
											openStatus:'open',
											deliveryTime:'40',
											rateValue:4.4,
											foodType:'Veg',
											origin:'Japanese',
											imagePath:'cs.jpg'
											});

let restaurant11 = new restraunt({	
												restaurantId:11,
														email:'kkopmann9@indiatimes.com',
														restaurantName:"Pagu",
														restaurantAbbrName:'PAG',
														address:'86 Bedford St Boston, MA 02111',
														phone:'(617) 418-5890',
														openStatus:'open',
														deliveryTime:'45',
														rateValue:4.4,
														foodType:'Veg',
														origin:'Japanese',
														imagePath:'pag.jpg'
														});


let restaurant12 = new restraunt({	
															restaurantId:12,
																	email:'fkohrdingc@oracle.com',
																	restaurantName:"O Ya",
																	restaurantAbbrName:'OYA',
																	address:'86 Bedford St Boston, MA 02111',
																	phone:'(617) 418-5890',
																	openStatus:'open',
																	deliveryTime:'42',
																	rateValue:4.6,
																	foodType:'Veg',
																	origin:'Mediterranean',
																	imagePath:'oya.jpg'
																	});

let restaurant13 = new restraunt({	
																		restaurantId:13,
																		email:'jheavens4@gmail.com',
																		restaurantName:'Oleana',
																		restaurantAbbrName:'OLE',
																		address:'412 Washington Street, MA 02134',
																		phone:'123-456-9078',
																		openStatus:'open',
																		deliveryTime:'30',
																		rateValue:4.3,
																		foodType:'Non-Veg',
																		origin:'Mediterranean',
																		imagePath:'ole.jpg'
																}); 


		
	await Promise.all([
		restaurant1.save(), 
		restaurant2.save(),
		restaurant3.save(),
		restaurant4.save(),
		restaurant5.save(),
		restaurant6.save(),
		restaurant7.save(),
		restaurant8.save(),
		restaurant9.save(),
		restaurant10.save(),
		restaurant11.save(),
		restaurant12.save(),
		restaurant13.save()
		]);

	let currentRestaurants = await restraunt.find({});

	console.log(currentRestaurants);

	process.exit();


})();













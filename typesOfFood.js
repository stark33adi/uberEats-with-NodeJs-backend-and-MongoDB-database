//This Modules Contains all the function used for processing the API calls

//load the dataset
//load the data set MongoDb
const restaurantDB = require('./databases/restrauntsDataBase/dishesDataBase.js');
const restraunt = restaurantDB.getModel();

const restaurantMenuDB = require('./databases/eachRestaurantDataBase/eachRestaurantDataBase.js');
const restrauntMenu = restaurantMenuDB.getModel();


const differentFoodTypes=["American","Chinese","English","Italian","Japanese","African","Mediterranean"];

exports.processResult= async function(){

    //let results = 0//await restraunt.find({'origin': differentFoodTypes[0]});

    let result={
        "result": 0,
             "data": {//here different restraunts go
            }
    }
    for(let originName of differentFoodTypes){
            //find specific food origin
            let temp = await restraunt.find({'origin': originName});
            //console.log(temp);
            result.data[originName]=[];
            for(let rest of temp){
                result.data[originName].push(rest);
            }
    }
    return result;
};




const differentCusines=['Main Course','Sides','Breads'];

exports.processResultMenu= async function(restaurantEmail){

    //let results = 0//await restraunt.find({'origin': differentFoodTypes[0]});

    let result={
        "result": 0,
             "data": {//here different restraunts go
            }
    }
    for(let cuisine of differentCusines){
            //find specific food origin
            let temp = await restrauntMenu.find({'dishType': cuisine,'restaurant':restaurantEmail});
            //console.log(temp);
            result.data[cuisine]=[];
            for(let rest of temp){
                result.data[cuisine].push(rest);
            }
    }
    return result;
};


exports.makeCart= async function(cart){

    //let results = 0//await restraunt.find({'origin': differentFoodTypes[0]});
    let result={
        "result": 0,
             "cart": [],
             'total':0,
             'tax':0,
             'deliveryFee':0
    }
    
    let total =0;

    for(let item of cart){
        let temp={}
        temp['itemName']=item.dishName;
        temp['itemQuantity']=item.dishCount;
        temp['itemPrice']=Number(item.dishPrice)*Number(item.dishCount);
        total=total+ temp['itemPrice'];
        result.cart.push(temp);

    }
    result.total=total;
    result.tax=total*0.03; // 3 % of the total amount
    result.deliveryFee=total*0.05; //5 % of the total amount 

    return result;
};


exports.processResultFiltered= async function(obj){

    //let results = 0//await restraunt.find({'origin': differentFoodTypes[0]});

    let result={
        "result": 0,
             "data": {//here different restraunts go
            }
    }

   

    let conditions=[];
    // if wanted to filter according to delivery time
    if(obj.deliveryTimeFilter==null){
        conditions.push({ deliveryTime: { $not: { $gt:  Number(obj.deliveryTimeFilter)}}});
    }

  
//if wanted to sort by foodType
    if(obj.restaurantTypeFilter!=null){
        for(let Type of obj.restaurantTypeFilter )
        {
            conditions.push({  foodType: Type });
        }
    }

    let temp;
    for(let originName of differentFoodTypes){
       
            //find specific food origin
            if(obj.rateValueFilter==null)
            {   //conditions.push({  'origin': originName });
                
                temp = await restraunt.find({$or: conditions,'origin': originName });
                

            }else{
                temp = await restraunt.find({$or: conditions,'origin': originName }).sort( {rateValue : -1});
              }
            //console.log(temp);
            result.data[originName]=[];
            for(let rest of temp){
                result.data[originName].push(rest);
            }
    }
    return result;
};

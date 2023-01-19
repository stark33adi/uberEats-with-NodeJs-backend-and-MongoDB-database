const all_restraunt_api="/restaurantListDisplay";
let stored_obj = {};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

if(sessionStorage.getItem('user')!=0){
    const menu_portal= new XMLHttpRequest();
    menu_portal.open('GET','/getInfo/:'+sessionStorage.getItem('user'));

            menu_portal.onload = function (){
                
                let obj = JSON.parse(this.responseText);
                sessionStorage.setItem('firstname',capitalizeFirstLetter(obj['firstName']));
                sessionStorage.setItem('lastname',capitalizeFirstLetter(obj['lastName']));
                sessionStorage.setItem('phone',obj['phone']);
                sessionStorage.setItem('customerid',obj['_id']);
                display_client_info();
            }
    menu_portal.send();
}

function color_to_hex(){ 
            const menu_portal= new XMLHttpRequest();
            menu_portal.open('POST',all_restraunt_api);

            menu_portal.onload = function (){
                //window.alert(this.responseText);
                let obj = JSON.parse(this.responseText);
                sessionStorage.setItem('restraunt_list',obj);
                stored_obj=obj;
                document.getElementById('the_r_display').innerHTML= restraunt_displayer(obj); 
            }
            menu_portal.send(JSON.stringify({}));

    }


// handles the filter values

let filters_parameters={'restaurantTypeFilter':[], 'rateValueFilter':null, 'deliveryTimeFilter':'30'};
function fetch_filtered_values_ft(id){
        var flag=false;
        var temp=[];
        for(let x of filters_parameters['restaurantTypeFilter']){
            if (x == String(document.getElementById(id).value)){
                flag=true;
            }else{ 
                temp.push(x);
            }
        }
        if(flag==true){
            // means user wans to de select it
            filters_parameters['restaurantTypeFilter']=temp;
        }else{  
            filters_parameters['restaurantTypeFilter'].push(document.getElementById(id).value);
        }
              
}

function fetch_filtered_values_rate(){
    if (filters_parameters['rateValueFilter']=='5.0'){
        // means user wans to de select it
        filters_parameters['rateValueFilter']=null;
    }else{
        filters_parameters['rateValueFilter']='5.0';
    }
}

function fetch_filtered_values_dt(id){
    //displays dt scale value
    document.getElementById('dt_display').innerHTML= document.getElementById('dt_scale').value +' mins';
    //stores the the dt scale value
    filters_parameters['deliveryTimeFilter']=document.getElementById(id).value;
}


// fetch the filtered values
function display_values(){
    window.alert(JSON.stringify(filters_parameters));

    const menu_portal= new XMLHttpRequest();
    menu_portal.open('POST','/restaurantListFilter');
    menu_portal.setRequestHeader("Content-Type","application/json");
    menu_portal.onload = function (){
        window.alert(this.responseText);
        let obj = JSON.parse(this.responseText);
        //sessionStorage.setItem('restraunt_list',obj);
        document.getElementById('the_r_display').innerHTML= restraunt_displayer(obj); 
    }
    menu_portal.send(JSON.stringify(filters_parameters));
}


function search_restraunt(){
    if(document.getElementById('search').value==''){
        document.getElementById('the_r_display').innerHTML=restraunt_displayer(stored_obj);
    }
    else {let target=RegExp(String(document.getElementById('search').value),'gi');
    let obj = stored_obj; //sessionStorage.getItem('restraunt_list');
    let temp_obj={  "data": {  } };
    for(let food_type in obj.data){
          for (let restraunt of obj.data[food_type]){
            if (restraunt['restaurantName'].search(target)!=-1){
                    // check if there is a key for food_type 
                    if(food_type in temp_obj.data){
                        temp_obj.data[food_type].push(restraunt);
                    }else{
                        // create one and push 
                        temp_obj.data[food_type]=[];
                        temp_obj.data[food_type].push(restraunt)
                    }    
            }
          }
        }
    //window.alert(temp_obj);  
    document.getElementById('the_r_display').innerHTML=restraunt_displayer(temp_obj);}
}

function take_me_to_restraunt(id){
        let temp = id.split(",");
        
        // 0 is the id  1 is the email and rest is the name
        sessionStorage.setItem('restrauntImage',document.getElementById(temp[0]).src);
        sessionStorage.setItem("restrauntEmail",temp[1]);
        let name='';
        for(let x of temp.slice(2)){
            name=name+x+" ";
        }
        sessionStorage.setItem('restrauntName',document.getElementById(temp[0]+'_name').innerHTML);

        // make API call to fetch the menu
        window.location.assign('/restaurantMenu');

       
}

function restraunt_displayer(obj){
      // saving it to session

      text='';
      let filter='<p class="filter_text_heading" style="text-align:center">By Country</p> <ul>';
      var row_item=0;
      for(let food_type in obj.data){
        //window.alert(food_type);
      //here x will be the type of food
          filter=filter+"<li class='filter_text'><a href = '#"+food_type+"' " + ">" +food_type+" </a></li> "; //<a href = '#"+food_type+"' " + ">" +food_type+" </a>

              text=text+"<tr id ='"+food_type+"'> <td class='bookmarks'>"+ food_type +"</td></tr> <tr>";
            row_item=0;
          for (let restraunt of obj.data[food_type]){
                  // here we will acess the type of food array 
                  // here y will be the iterators or the total possible indexes
                  
                  //create an image obj
                  
                  let img_bg = 'images/restaurants/'+restraunt['imagePath'];
                  
                  if(row_item%3==0 && row_item!=0 ){
                                      text=text+'</tr><tr>';
                                          }
                  text=text+'<td>';
                  //text=text+" <div><img class='restraunts' src="+img_bg.src+"> </div>"; // this is the original line
                  text=text+" <div class='img_container'><img id='"+restraunt['restaurantId']+"'class='restraunts' src="+img_bg+" onclick=take_me_to_restraunt('"+(restraunt['restaurantId']+","+restraunt['email'] )+"')> <div class='rating'>"+restraunt['rateValue']+"</div></div>";             
                  text=text+ "<div> <p id='"+restraunt['restaurantId']+"_name'class='restraunts_name'>"+restraunt['restaurantName']+"</p> </div>";
                  text=text+ "<div> <p class='restraunts_info'>Delivery "+restraunt['deliveryTime'] +"mins</p> </div>";


                  text=text+'</td>';
                  row_item=row_item+1;
          }
          text=text+'</tr>';     
      }
      filter=filter+"</ul>";
      document.getElementById('food_index').innerHTML=filter;
      return text;
}



// this function displays client information
function display_client_info(){
    //window.alert(sessionStorage.getItem('address'));
        document.getElementById('customer_address').innerHTML=sessionStorage.getItem('location');
        document.getElementById('client_profile').innerHTML=sessionStorage.getItem('firstname');
        
}


function service_type(id){
        let ids=['delivery_button', 'pickup_button', 'dinein_button'];
        
        document.getElementById(id).style.backgroundColor='rgb(166, 252, 252)';
        sessionStorage.setItem('service_type',id);
        for(let x of ids){
            if(x != id){
                document.getElementById(x).style.backgroundColor='rgb(229, 235, 235)';
            }
        }

}
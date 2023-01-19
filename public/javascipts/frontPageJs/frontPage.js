
// photo_1  is the backgroung image
// photo_2  is the logo image

const signin_page_url = "login";

const sign_up_page_url = "/signUp";

const restraunt_page_url="/restaurantList";


function take_to_signin_page(){
    window.location.assign(signin_page_url);
}

function take_to_sign_up_page(){
    window.location.assign(sign_up_page_url);
}

// this function stores value in the the browser session
function store_in_browser(key,value){
    sessionStorage.setItem(key,value);
}

function check_validity(data){

    if(data.location!=null && data.location!='Enter Delivery Address'){
        if(data.order_type!=null){
            return true;
        }
    }
    return false;
}

function take_to_restraunt_page(o_type){

    let loc_obj={};
    loc_obj.location=address.value;
    loc_obj.order_type=o_type;
    var flag=check_validity(loc_obj);
    store_in_browser('location',loc_obj.location);
    store_in_browser('firstname','Sign In');
    
    if(flag==true){
        window.location.assign(restraunt_page_url);
    }else{
        window.alert('Please choose a valid Address or Order Type');
    }


}


function get_bg(){

        const server_portal= new XMLHttpRequest();

        server_portal.open('POST',background_image_api_url);

        server_portal.onload = function (){
            let obj = JSON.parse(this.responseText);
            let img_bg= new Image();
            img_bg.src=obj.data.photo_1;
            document.getElementById('bo').style.backgroundImage="url("+img_bg.src+")";
            //let logo= new Image();
            img_bg.src=obj.data.photo_2;
            //document.getElementById('logo_img').src=img_bg.src;
        }
        server_portal.send('gimme');

}
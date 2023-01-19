

let stored_obj = {};
sessionStorage.setItem('user',0);
function color_to_hex(){ 
    sessionStorage.setItem('user',document.getElementById('email').value);
    }


function get_customer_profile(){
            const portal= new XMLHttpRequest();

            portal.open('POST',"/checkUser");
            window.alert('boom');
            portal.onload = function (){
                //let obj = JSON.parse(this.responseText);
                //window.alert(this.responseText);
                //window.alert(this.responseText);
                window.alert('boom');
                //let obj = JSON.parse(this.responseText);
                //sessionStorage.setItem('firstname',obj.data['firstName']);
                //sessionStorage.setItem('lastname',obj.data['lastName']);
                //sessionStorage.setItem('phone',obj.data['phone']);
                //sessionStorage.setItem('address',obj.data['address']);
                //sessionStorage.setItem('customerid',obj.data['customerId']);
                //window.alert(sessionStorage.getItem('phone'));

                //document.getElementById('tit').innerHTML=this.responseText;
                //document.getElementById('logo_img').src=img_bg.src;
            }

            //if(flag==false){window.alert('FAILURE of getting profile')} "email" : sessionStorage.getItem('email')
    

            let customer = {
                "email" : document.getElementById('email').value,
                "password" : document.getElementById('password').value
            };
            //window.alert(typeof(String(sessionStorage.getItem('email'))));
            portal.send(JSON.stringify(customer));
}


$(function () {
    $("#showPassword").change(function () {
        if ($(this).is(":checked")) {
            $("#password").attr("type", "text");
            $("#cfmPassword").attr("type", "text");
        } else {
            $("#password").attr("type", "password");
            $("#cfmPassword").attr("type", "password");

        }
    });

    $("#toLogin").click(function () {
        window.location.assign("../login_page/login_page.html");
    });
});

function check_email(a){
    if (a.includes('@') != true){
        return 0;
    }
    else{
        return 1;
    }
}
function check_num(num){
    if(num.length != 10){
        return 0;
    } else if (isNaN(Number(num)) == true){
        return 0;
    } else {
        return 1;
    }
}      

function is_same(p1, p2){
    return p1 == p2;
}

function collect_personal_values(){
    let firstName = $("#fname").val();
    let lastName = $("#lname").val();
    let address = $("#address").val();
    let phone = $("#phone").val();
    let zipcode = $("#zipcode").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let cfmPassword = $("#cfmPassword").val();

    let personal= {
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone: phone,
        zipcode: zipcode,
        email: email,
        password: password
    };


    if (firstName.length == 0) {
        alert('Please enter a valid First Name.');
        return 0;
    } else if (lastName.length == 0) {
        alert('Please enter a valid Last Name.');
        return 0;
    } else if (address.length == 0) {
        alert('Please enter a valid Address.');
        return 0;
    } else if (check_num(phone) != 1) {
        alert('Please enter a valid Phone.');
        return 0;
    } else if (zipcode.length == 0){
        alert('Please enter a valid Zipcode.');
        return 0;
    } else if (check_email(String(email)) != 1){
        alert('Please enter a valid Email.');
        return 0;
    } else if (password.length <= 8 || password.length > 20 || cfmPassword.length <= 8 || cfmPassword.length > 20) {
        alert('Please enter Password and Confirm Password between 9 - 20 digits.');
        return 0;
    } else if (is_same(password, cfmPassword) != true){
        alert('Password and Confirm Password do not Match.');
        return 0;
    }

    console.log(personal);
    customerSignUp(personal);
}      

//interaction between front-end and back-end
//return data format:{"result":*,"data":*}
function customerSignUp(param){
    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/customer/signUp.do",
        // url: "http://localhost:8080/Restaurant_Automation/customer/signUp.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),     //data transfer to back-end
        dataType: "json",	    //the type of data which receive from back-end
        success: function(data){
            if(data.result == 0){

                sessionStorage.setItem('customerEmail', param.email);
                let object = {
                    customerEmail: param.email,
                    // 1: logged in, 0: anonymous
                    state: 1
                }
                localStorage.setItem("customer", JSON.stringify(object));
                alert("sign up successfully!");
                window.location.assign('../restaurant_list_page_alternative/restaurant_list_page_alternative.html');
            }else if(data.result == 1){
                alert("back-end unknown error");
            }else if(data.result == 2){
                alert("email already existed, please use another email.");
            }
        },
        error: function (message) {
            alert("sign up failed...")
        }
    });
    
}
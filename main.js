function addUser(){
    var username = document.getElementById("textinput").value;
    if(username == "" ){
        console.log("nousername")
    alert("type in a username first!")
    }else{
        localStorage.setItem("username", username)
        window.location = "waitingroom.html"  
    }

}
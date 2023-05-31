var firebaseConfig = {
    apiKey: "AIzaSyD1wGdL6CY2h_BZu6vDuQX_WayJ7z69N38",
    authDomain: "chitchat2-3bb4f.firebaseapp.com",
    databaseURL: "https://chitchat2-3bb4f-default-rtdb.firebaseio.com",
    projectId: "chitchat2-3bb4f",
    storageBucket: "chitchat2-3bb4f.appspot.com",
    messagingSenderId: "641139363076",
    appId: "1:641139363076:web:f3b0233b049faf7faf1451"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);






function logout(){
    localStorage.removeItem("username")
    localStorage.removeItem("roomname")  
    window.location = "index.html"
}

username = localStorage.getItem("username")
roomname = localStorage.getItem("room_name")

document.getElementById("intro").innerHTML = "chat in "+ roomname;

function back(){
    window.location = "waitingroom.html"
}






function getData() { firebase.database().ref("/"+roomname).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
 console.log(firebase_message_id)
 console.log(message_data)
 name = message_data['user']
 likes = message_data['likes']
 message = message_data['message']
 date = message_data['datetime']

    if (date == undefined)
    {
        date = ''
    }

    
    //shortdate = date.indexOf("GMT");


 userwtag = "<h4 style='color: black' >"+name+"<img class='user_tick' src='tick.png'></h4> <p>"+date+"</p>"
 messagewtag = "<h4 class='message_h4'>"+message+"</h4>"
 likesbtn = "<button style= 'border-radius: 15px; background-color:darkblue; color:white; ' id="+firebase_message_id+" onclick='updatelikes(this.id,"+ likes+ ")'>"
 spantag = "<span class='glyphicon glyphicon-thumbs-up'>"+likes+"</span> </button> <hr>"

 row = userwtag + messagewtag + likesbtn + spantag;
 document.getElementById("output").innerHTML += row;

//End code
 } });  }); }
getData();


function send(){
    msg = document.getElementById("message").value;
    if(msg == ""){
        alert("type in a message first!")
    }else{

firebase.database().ref(roomname).push({    
       user: username,
       message: msg,
       likes: 0,
       datetime: (new Date()).toString(),   
     })
 console.log(msg)
 document.getElementById("message").value = " ";
    }
}

function updatelikes(message_id, current_like){
 updated_likes = Number(current_like) + 1
 console.log(updated_likes) 
 
 firebase.database().ref(roomname).child(message_id).update({
       likes: updated_likes
 })
}

function sendtext(e){
if(e.keyCode === 13){
    e.preventDefault(); 

    console.log("entered")

        msg = document.getElementById("message").value;
        var mytime = new Date();
        firebase.database().ref(roomname).push({    
              user: username,
              message: msg,
              likes: 0,
              datetime: mytime.toString(),
        })
        console.log(msg)
        document.getElementById("message").value = " ";
       }
}

function changetheme(){
    var themetype = document.getElementById("theme").value;
    console.log("changetheme")

    if(themetype == "pinkbubble"){
        console.log("pinkbubble")  
        document.getElementById("sendbtn").style.backgroundImage = "linear-gradient(to right top, #f133a8, #d9258b, #c11875, #aa0a87, #940060)";
        document.getElementById("header").style.color = "rgb(240, 126, 219)"
        document.getElementById("header").style.background = "rgba(118, 34, 100, 0.8)"
        document.body.style.backgroundImage = "url('pinkbubble.jpg')";


    }else if(themetype == "underthesea"){
        console.log("underthesea") 
        document.getElementById("sendbtn").style.backgroundImage = "linear-gradient(to right top,#20934c, #25d997 , #18c1c1, #0a72aa, #004594)";
        document.getElementById("header").style.color = "rgb(240, 191, 126)"
        document.getElementById("header").style.background = "linear-gradient(to right top,#20934c9d, #25d9979c , #18c1c193, #0a72aa96, #0045949f)"
        document.body.style.backgroundImage = "url('undertheseabg.png')";

    }else if(themetype == "waterdrops"){
        console.log("futeristic") 
        document.getElementById("sendbtn").style.backgroundImage = "linear-gradient(to right top,#5f2093, #9725d9 , #8318c1, #6a0aaa, #630094)";
        document.getElementById("header").style.color = "rgb(170, 126, 240)"
        document.getElementById("header").style.background = "rgba(40, 15, 105, 0.8)"
        document.body.style.backgroundImage = "url('futurebg.jpg')";


    }else if(themetype == "bluegraffiti"){
        console.log("blue graffiti")
        document.getElementById("sendbtn").style.backgroundImage = "linear-gradient(to right top, #33a0f1, #2591d9, #1882c1, #0a73aa, #006494)";
        document.getElementById("header").style.color = "rgb(126, 170, 240)"
        document.getElementById("header").style.background = "rgba(34, 34, 118, 0.8)"
        document.body.style.backgroundImage = "url('bluegrff.jpg')";


    }else{
        console.log("default")

        document.getElementById("header").style.color = "white"
        document.getElementById("header").style.background = "linear-gradient(to right top,rgba(245, 47, 255, 0.8), rgba(146, 180, 227, 0.8), rgba(234, 151, 241, 0.8))"
        document.getElementById("sendbtn").style.backgroundImage = "linear-gradient(to right top, #6f33f1, #9a25d9, #c118bb, #aa0a75, #940043)";
        document.body.style.backgroundImage = "url('defalt.png')";
    }

}




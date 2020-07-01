const login = document.querySelector("#login");
let Token;
 
var dat='{ "password": "admin", "username": "admin@gmail.com"}';
async function TokenReq() 
{
    const response= await fetch('https://indipl2020.herokuapp.com/authenticate', {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json'
        },
		body: dat
    });
        const data = await response.json();
        console.log(data);
        Token = data['token'];
 
        console.log(Token);
}

// localStorage.setItem('UserName','bigman69834');
// localStorage.setItem('Password','GoldmanSacs');
// check();
TokenReq();
// function check() {

//     var storedName = localStorage.getItem('UserName');
//     var storedPw = localStorage.getItem('Password');

//     var userName = document.getElementById('userName').value;
//     var userPw = document.getElementById('userPw').value;
//     console.log(userName);
//     console.log(userPw);

//     if(userName.value !== storedName || userPw.value !== storedPw) 
//     {
//         alert('ERROR');
//     }
//     else 
//     {
//         alert('You are loged in.');
//         event.preventDefault();
//         localStorage.setItem('Authorization', Token);
//         window.location.href = "index.html";
//     }
// }
// check();
function OnClick()
{
    event.preventDefault();
    localStorage.clear();
    localStorage.setItem('Authorization', Token);
    window.location.href = "index.html";
    
}
// localStorage.clear();
// localStorage.setItem('UserName',UserName.value);
// localStorage.setItem('Password',Password.value);
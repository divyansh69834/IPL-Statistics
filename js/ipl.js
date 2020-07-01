const token_p = localStorage.getItem('Authorization');
const token = "Bearer "+token_p;
// const token="Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE1OTAzMTQwMzQsImlhdCI6MTU5MDI5NjAzNH0.iKwTC8M0vOiyH6FQsziLHr_dzbwYRzn6Chh_iid1oX5ykwtbP3ljc7MHkyVSoMcW1vVinK7NNkYtfmScy8BbqQ";
const lurl = "https://indipl2020.herokuapp.com/ipl2020/team/"; 
let role= new Map();
google.charts.load('current', {'packages':['corechart']});
 
getdata();
 
async function getdata()
{
    const url=`${lurl}labels`;
    const response=await fetch(url,{headers:{"Authorization": token}});
    const data= await response.json();
    console.log(data);
    labels=data["labels"];
    let str="";
    op=document.querySelector("#select1");
    for(let i=0;i<8;i++) 
    {
        console.log(labels[i]);
        var opt = document.createElement('option');
        opt.value = labels[i];
        opt.innerHTML = labels[i];
        op.appendChild(opt);
     }
    console.log(str);    
}
 
function startwork()
{
    let op=document.querySelector("#select1");
    let value=op.value;
    console.log("start");
    console.log(value);
    if(value!=="")
        findteam(value);
}

async function findteam(value)
{    
    const url = `https://indipl2020.herokuapp.com/ipl2020/team/${value}`; 
    const response=await fetch(url,{headers:{"Authorization": token}});
    const data= await response.json();
    console.log(data);
    showtable(data); 
}

function showtable(data)
{    
    let tableData = document.querySelector("#b");
    let str=`<table id="tabledata" class='table bg-light text-dark mt-2 table-striped'>
    <tr><th>Name</th><th>Label</th><th>Role</th><th>Price</th><tr>`;
    role.clear();
    data.forEach(p => {
        str += `<tr><td>${p.name}</td><td>${p.label}</td><td>${p.role}</td><td>${p.price}</td></tr>`;
        if(role.get(p.role))
            role.set(p.role,role.get(p.role)+1);
        else
            role.set(p.role,1);
        console.log(p.role+" "+role.get(p.role));
    });
    str+=`</table>`;    
    tableData.innerHTML=str;
    google.charts.setOnLoadCallback(make_chart);
}

let arr=[];

function logMapElements(value, key, map) 
{
    console.log(`map.get('${key}') = ${value}`);
    arr.push([key,value]);
}
 
function make_chart()
{
    role.forEach(logMapElements);
    console.log("aaa");
    arr=[['Task', 'Hours per Day']];
    role.forEach(logMapElements)    
    console.log(arr);
    var data1 = google.visualization.arrayToDataTable( arr );
    var options = {'width':550, 'height':400};
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data1, options);
}  
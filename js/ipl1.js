const token_p = localStorage.getItem('Authorization');
console.log(token_p);
const token = "Bearer "+token_p;
// const token="Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE1OTAzMTQwMzQsImlhdCI6MTU5MDI5NjAzNH0.iKwTC8M0vOiyH6FQsziLHr_dzbwYRzn6Chh_iid1oX5ykwtbP3ljc7MHkyVSoMcW1vVinK7NNkYtfmScy8BbqQ";
const lurl = "https://indipl2020.herokuapp.com/ipl2020/team/"; 
google.charts.load('current', {'packages':['corechart']});


let role= new Map();

async function getTable() {
    const url=`${lurl}all`;
    const response = await fetch(url,{headers:{"Authorization": token}});
    const data = await response.json();
    console.log(data);
    let str=`<table id="tabledata" class='table bg-light text-dark mt-2 table-striped'>
    <tr><th>Label</th><th>Team</th><th>City</th><th>Coach</th><th>Home</th></tr>`; //Label	Team	City	Coach	Home
    data.forEach(p => {
        str += `<tr><td>${p.label}</td><td>${p.team}</td><td>${p.city}</td><td>${p.coach}</td><td>${p.home}</td></tr>`;
    });
    str+=`</table>`;  
    bt = document.querySelector("#bt1");
    console.log(str); 
    console.log(bt); 
    bt.innerHTML=str;

}

getTable();
google.charts.setOnLoadCallback(chartit);

async function chartit()
{
    const url=`${lurl}totalamount`;
    const response = await fetch(url,{headers:{"Authorization": token}});
    const data_chart = await response.json();
    let arr=[['Team Name','Amount']];
    for(let i=0;i<data_chart.length;i++)
    {
        arr.push([data_chart[i]['teamName'],data_chart[i]['amount']]);
    }
    console.log(arr);
    var dat = google.visualization.arrayToDataTable(arr);
    var options = {title: 'Expenditure of IPL Teams','width':750,'height':250}; 
    var chart = new google.visualization.ColumnChart(document.getElementById('abc'));
    chart.draw(dat, options);
    google.visualization.events.addListener(chart, 'select', selectHandler); 
    function selectHandler(e)     {   
        var x = chart.getSelection()[0].row;
        x++;
        console.log(arr[x][0]);
        google.charts.setOnLoadCallback(make_chart(arr[x][0]));

    }
}
let arr=[];

function logMapElements(value, key, map) 
{
    console.log(`map.get('${key}') = ${value}`);
    arr.push([key,value]);
} 
// chartit();
async function make_chart(value)
{
    // value=encodeURI(value);
    const url=`${lurl}${value}`;
    const response = await fetch(url,{headers:{"Authorization": token}});
    const data_team = await response.json();

    role.clear();
    data_team.forEach(p => {
        if(role.get(p.role))
            role.set(p.role,role.get(p.role)+1);
        else
            role.set(p.role,1);
        console.log(p.role+" "+role.get(p.role));
    });
    console.log(role);
    role.forEach(logMapElements);
    // console.log("aaa");
    arr=[['Task', 'Hours per Day']];
    role.forEach(logMapElements)   
    console.log(arr);
    var data1 = google.visualization.arrayToDataTable( arr );
    var options = {'width':550, 'height':400};
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data1, options);
}








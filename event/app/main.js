'use strict';
const searchInput = document.getElementById('search');
const results = document.getElementById('results');

let data;
let searched = "";


function getAll(){
    fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&rows=10&facet=date_start&facet=date_end&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=transport&facet=price_type&facet=access_type&facet=updated_at',{method: "GET"})
    .then(res => {
        return res.json()
    })
    .then(res=>{
        console.log(res.records)
        let divToAdd = document.querySelector("#results");
        let unsure =''
        for (let element of res.records){
            console.log(element)
            if(element.fields.address_name){
                unsure =element.fields.address_name;
            }
            else{
                unsure = ''
            }
            divToAdd.innerHTML += "<div><h3>"+element.fields.title+
            "</h2>"+"<img src='"+element.fields.cover_url+"'>"+
            "<p>"+unsure+"</p>"+
            "<p>"+element.fields.address_street+"</p></div>";
        }
    } ) 
}

const searchBar = document.querySelector("#search")
const sortBar = document.querySelector('#sortBy')

searchBar.addEventListener("keyup",() =>{
    let query = searchBar.value;
    if(sortBar.value === ""){
        let fetchRequest = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q="+query+"&rows=10"
        fetch(fetchRequest,{method: "GET"} )
    
        .then(res => {
            return res.json()
        })
        .then(res=>{
            console.log(res.records)
            let divToAdd = document.querySelector("#results");
            divToAdd.innerHTML ='';
            let unsure =''
            for (let element of res.records){
                console.log(element)
                if(element.fields.address_name){
                    unsure =element.fields.address_name;
                }
                else{
                    unsure = ''
                }
                divToAdd.innerHTML += "<div><h3>"+element.fields.title+
                "</h2>"+"<img src='"+element.fields.cover_url+"'>"+
                "<p>"+unsure+"</p>"+
                "<p>"+element.fields.address_street+"</p></div>";
            }
        } )
    }
    else{
        let fetchDetails = sortBar.value;
        let fetchRequest = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q="+query+"&rows=10&sort="+fetchDetails;
        fetch(fetchRequest,{method: "GET"} )
    
        .then(res => {
            return res.json()
        })
        .then(res=>{
            console.log(res.records)
            let divToAdd = document.querySelector("#results");
            divToAdd.innerHTML ='';
            let unsure =''
            for (let element of res.records){
                console.log(element)
                if(element.fields.address_name){
                    unsure =element.fields.address_name;
                }
                else{
                    unsure = ''
                }
                divToAdd.innerHTML += "<div><h3>"+element.fields.title+
                "</h2>"+"<img src='"+element.fields.cover_url+"'>"+
                "<p>"+unsure+"</p>"+
                "<p>"+element.fields.address_street+"</p></div>";
            }
        } )
    } 
})

function setUpButtons(){
    let optionButtons = document.querySelectorAll ("option");
    let fetchDetails;
    optionButtons.forEach (element => 
        element.addEventListener("click",function(element){
            fetchDetails = sortBar.value;
            let fetchRequest = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&rows=10&sort="+fetchDetails;
            fetch(fetchRequest,{method: "GET"})
            .then(res => {
                return res.json()
            })
            .then(res=>{
                console.log(res.records)
                let divToAdd = document.querySelector("#results");
                divToAdd.innerHTML ='';
                let unsure =''
                for (let element of res.records){
                    console.log(element)
                    if(element.fields.address_name){
                        unsure =element.fields.address_name;
                    }
                    else{
                        unsure = ''
                    }
                    divToAdd.innerHTML += "<div><h3>"+element.fields.title+
                    "</h2>"+"<img src='"+element.fields.cover_url+"'>"+
                    "<p>"+unsure+"</p>"+
                    "<p>"+element.fields.address_street+"</p></div>";
                }
            } )
        })
    )
}

getAll()
setUpButtons()
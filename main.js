let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let submet = document.getElementById('submet')
let count = document.getElementById('count')
let categury = document.getElementById('categury')
let title = document.getElementById('title')

let mood = 'create';
let tmp;


// get total

function gettotal(){
    if(price.value !=''){
    let result = (+price.value + +taxes.value + +ads.value)
    - +discount.value;
    total.innerHTML = result;
    total.style.background = "green"
    }
    else{
        total.innerHTML = '';
        total.style.background = "#750404"
    }
}


// creat,save
let databro;
if(localStorage.endbro != null){
databro = JSON.parse(localStorage.endbro)
}
else{
    databro = [];
}

submet.onclick = function(){
    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        categury:categury.value.toLowerCase(),
    }
    if(title.value !='' 
        && price.value !='' 
         && categury.value !=''
        && newpro.count <= 100){
           if(mood === 'create'){

        if(newpro.count > 1){
        for(let i =0 ; i < newpro.count ; i++){
            databro.push(newpro)
        }
    }
    else{
         databro.push(newpro)
    }

    }
    else{
        databro[tmp] = newpro;
        mood = 'create';
        submet.innerHTML = 'Create';
        count.style.display = 'block';
    }
    cleardata()
    }


    localStorage.setItem('endbro', JSON.stringify(databro))

    
    read()
}

// clear input
function cleardata(){
title.value = '';
price.value = '';
taxes.value = '';
ads.value = '';
discount.value = '';
total.innerHTML = '';
count.value = '';
categury.value = '';
}

// raed

function read(){
    gettotal()
    let table ='';
    for(let i=0 ; i<databro.length ;i++){
        table += `
                 <tr>
                    <td>${i+1}</td>
                    <td>${databro[i].title}</td>
                    <td>${databro[i].price}</td>
                    <td>${databro[i].taxes}</td>
                    <td>${databro[i].ads}</td>
                    <td>${databro[i].discount}</td>
                    <td>${databro[i].total}</td>
                    <td>${databro[i].categury}</td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deletdata(${i})"  id="delete">delete</button></td>
                </tr>
        `
            
   }
    document.getElementById('tbody').innerHTML = table
    let deletall = document.getElementById('deletall')
    if(databro.length > 0){
      deletall.innerHTML = `<button onclick = "deletAll()">Delet All (${databro.length})</button>`
    }
    else{
        deletall.innerHTML = ''
    }
}
read()

// delet

function deletdata(i){
databro.splice(i,1);
localStorage.endbro = JSON.stringify(databro);
read()
}

// delet all

function deletAll(){
    localStorage.clear();
    databro.splice(0);
    read()
}
// update

function updatedata(i){
    title.value = databro[i].title;
    price.value = databro[i].price;
    taxes.value = databro[i].taxes;
    ads.value = databro[i].ads;
    discount.value = databro[i].discount;
    categury.value = databro[i].categury;
    count.style.display = 'none'; 
    gettotal();
    submet.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}

// search

let searchmood = 'title';
function getsearchmood(id)
{
    let search = document.getElementById('search')
    if(id == 'bytitle'){
        searchmood = 'title';
        search.placeholder = 'Search By Title' 
    }
    else{
        searchmood = 'category';
        search.placeholder = 'Search By Category' 
    }
    search.focus();
    search.value = '';
    read()
}

function searchdata(value){
    let table ='';
    if(searchmood == 'title'){
        for(let i=0; i<databro.length; i++){
            if(databro[i].title.includes(value.toLowerCase())){
            
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${databro[i].title}</td>
                        <td>${databro[i].price}</td>
                        <td>${databro[i].taxes}</td>
                        <td>${databro[i].ads}</td>
                        <td>${databro[i].discount}</td>
                        <td>${databro[i].total}</td>
                        <td>${databro[i].categury}</td>
                        <td><button onclick="updatedata(${i})" id="update">update</button></td>
                        <td><button onclick="deletdata(${i})"  id="delete">delete</button></td>
                    </tr>
        `;

        }


    }



}
else{
        for(let i=0; i<databro.length; i++){
            if(databro[i].categury.includes(value.toLowerCase())){
            
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${databro[i].title}</td>
                        <td>${databro[i].price}</td>
                        <td>${databro[i].taxes}</td>
                        <td>${databro[i].ads}</td>
                        <td>${databro[i].discount}</td>
                        <td>${databro[i].total}</td>
                        <td>${databro[i].categury}</td>
                        <td><button onclick="updatedata(${i})" id="update">update</button></td>
                        <td><button onclick="deletdata(${i})"  id="delete">delete</button></td>
                    </tr>
        `;

        }


    }



}
 document.getElementById('tbody').innerHTML = table
}

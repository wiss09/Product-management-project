let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");

let total = document.getElementById("total");
let count = document.getElementById("count");
let catagory = document.getElementById("catagory");
let submit = document.getElementById("submit");
let dataProd = JSON.parse(localStorage.getItem("dataProd") || "[]")
// myVar
function generateID(T) {
    var max
    if (T.length == 0) {
        max = 0
    }
    for (let i = 0; i < T.length; i++) {
        max = T[0].id
        if (T[i].id > max) {
            max = T[i].id
        }

    }
    return max
}
// get total
function getTotal() {

    let price = document.getElementById("price");
    let taxes = document.getElementById("taxes");
    let ads = document.getElementById("ads");
    let discount = document.getElementById("discount");
    let total = document.getElementById("total");
    if (price.value != 0) {

        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.backgroundColor = "green"

    } else if (price.value == 0) {
        total.style.backgroundColor = "red"
        total.innerText = ""
    }
}
// create production
function createPro() {
    // save localstorage
    // let dataProd
    // if (localStorage.dataProd != null) {
    //     dataProd = JSON.parse(localStorage.dataProd)
    // } else { dataProd = [] }
    let dataProd = JSON.parse(localStorage.getItem("dataProd" )|| '[]')

    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let taxes = document.getElementById("taxes");
    let ads = document.getElementById("ads");
    let discount = document.getElementById("discount");
    let catagory = document.getElementById("catagory");
    let total = document.getElementById("total");
    let count = document.getElementById("count");
    if ( (count.value <= 100)  && title.value !='') {

        for (let i = 0; i < count.value; i++) {
            let newPro = {
                id: generateID(dataProd) + 1,
                title: title.value.toLowerCase(),
                price: price.value,
                taxes: taxes.value,
                ads: ads.value,
                discount: discount.value,
                total: total.value,
                catagory: catagory.value.toLowerCase()
            }
            dataProd.push(newPro)


        }
    
    } else {
        let newPro = {
            id: generateID(dataProd) + 1,
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.value,
            catagory: catagory.value
        }
        dataProd.push(newPro)
    }
    


    localStorage.setItem("dataProd", JSON.stringify(dataProd))
    read()
    clearData()
}






// clear inputs
function clearData() {
    let title = document.getElementById("title").value = "";
    let price = document.getElementById("price").value = "";
    let taxes = document.getElementById("taxes").value = "";
    let ads = document.getElementById("ads").value = "";
    let discount = document.getElementById("discount").value = "";
    let catagory = document.getElementById("catagory").value = "";
    let total = document.getElementById("total").value = "";


}
// read
function read() {
    let content = '';

    let dataProd = JSON.parse(localStorage.getItem("dataProd")
     || '[]')


    for (let i = 0; i < dataProd.length; i++) {
        content += `
        <tr>
                        <td>${dataProd[i].id}</td>
                        <td>${dataProd[i].title}</td>
                        <td>${dataProd[i].price} Dt</td>
                        <td>${dataProd[i].taxes} Dt</td>
                        <td>${dataProd[i].ads} Dt</td>
                        <td>${dataProd[i].discount} Dt</td>
                        <td>${dataProd[i].total} Dt</td>
                        <td>${dataProd[i].catagory}</td>
                        <td><button id="update" onclick="update(${dataProd[i].id})">update</button></td>
                        <td><button id="delete" onclick="remove(${dataProd[i].id})">delete</button></td>
                    </tr>
        `

    }

    document.getElementsByTagName('tbody')[0].innerHTML = content;
    let btnDelete=document.getElementById('btnDelete')
    if (dataProd.length > 0) {
        btnDelete.innerHTML=`
        <button onclick="clearItem()"  id="deleteAll">Delete All (${dataProd.length})</button>
        `
    }else{btnDelete.innerHTML=''}
}

//count



//delete
function remove(id) {
    T = JSON.parse(localStorage.getItem("dataProd"))
    for (let i = 0; i < T.length; i++) {
        if (id == T[i].id) {
            T.splice(i, 1)
        }

    }
    localStorage.setItem("dataProd", JSON.stringify(T))
    read()
}

//update
function update(id) {
    T = JSON.parse(localStorage.getItem("dataProd"))
    let update = document.getElementById("update");
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let taxes = document.getElementById("taxes");
    let ads = document.getElementById("ads");
    let discount = document.getElementById("discount");
    let submit = document.getElementById("submit");
    let total = document.getElementById("total");
    let count = document.getElementById("count");
    let catagory = document.getElementById("catagory");
    var content;
    for (let i = 0; i < T.length; i++) {
        if (id == T[i].id) {
            title.value = T[i].title
            price.value = T[i].price
            taxes.value = T[i].taxes
            ads.value = T[i].ads
            discount.value = T[i].ads
            catagory.value = T[i].catagory
            localStorage.setItem("idUpdate", T[i].id)

        }
        document.getElementById('submit').innerText = 'validate'
        


    }

//validate

    submit.onclick = function () {
        var T = JSON.parse(localStorage.getItem("dataProd"))
        var idUpdate = localStorage.getItem("idUpdate")
        if (submit.innerText == 'validate') {
            for (let i = 0; i < T.length; i++) {

                if (idUpdate == T[i].id) {



                    T[i].title = title.value
                    T[i].price = price.value
                    T[i].taxes = taxes.value
                    T[i].ads = ads.value
                    T[i].ads = discount.value
                    T[i].catagory = catagory.value
                    
                }
            }
        }
        localStorage.setItem("dataProd", JSON.stringify(T))
        read()
        clearData()
        document.getElementById('submit').innerText = 'Create'
    }

    
    
}
//search
function mood(id) {
     searchTitle=document.getElementById('searchTitle');
searchCatagory=document.getElementById('searchCatagory');
   search= document.getElementById('search');
   var searchMood
if (id=="searchTitle") {
    searchMood="title";
    search.placeholder="search by title"

}else {
    searchMood="catagory";
    search.placeholder="search by catagory"
}    
return searchMood
}





function search(value) {
    var content=" ";
searchTitle=document.getElementById('searchTitle');
searchCatagory=document.getElementById('searchCatagory');
dataProd= JSON.parse(localStorage.getItem("dataProd")  || "[]")


    

    for (let i = 0; i < dataProd.length; i++) {
        
       if (dataProd[i].title.includes(value) || dataProd[i].catagory.includes(value) ) {
        
            content+=`
            <tr>
            <td>${dataProd[i].id}</td>
            <td>${dataProd[i].title}</td>
            <td>${dataProd[i].price}</td>
            <td>${dataProd[i].taxes}</td>
            <td>${dataProd[i].ads}</td>
            <td>${dataProd[i].discount}</td>
            <td>${dataProd[i].total}</td>
            <td>${dataProd[i].catagory}</td>
            <td><button id="update" onclick="update(${dataProd[i].id})">update</button></td>
            <td><button id="delete" onclick="remove(${dataProd[i].id})">delete</button></td>
        </tr>
        `
        }
    }
    
    
    document.getElementsByTagName('tbody')[0].innerHTML = content;
}    

function clearItem() {
    dataProd=JSON.parse(localStorage.getItem("dataProd") || "[]")
    localStorage.removeItem("dataProd")
    read()
    
}
//clean data
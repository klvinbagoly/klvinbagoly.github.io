let user = {
    "_id": "457723578977936dhfkdhmf",
    index: 0,
    isActive: true,
    balance: 1273450,
    picture: "http://placeholder.it/32x32"
}

user.getBalance = function () {
    let balanceArray = [];
    let str = this.balance.toString();
    for (let i = 0; i < str.length; i++) {
        balanceArray.push(
            (str.length - i) % 3 == 1 && (i + 1) < str.length ? str[i] + "." : str[i])
    };
    return `$ ${balanceArray.join("")}`;
}


user.plusBalance = function (amount) {
    this.balance += amount;
}
user.minusBalance = function (amount) {
    this.balance -= amount;
}

let users = []

let fetchInit = {
    method: "GET",
    headers: new Headers(),
        mode: "cors",
            cache: "default"
}; 

fetch("http://localhost:3000/users", fetchInit).then(data => data.json(), err => console.error(err)).then(data => createTable(data));



let userTable = document.querySelector("#userTable");

function createTable (users){
userTable.innerHTML = ""
for (let i = 0; i < users.length; i++) {
    const element = users[i];
    userTable.innerHTML += "<tr><td>" + element.nr + "</td><td>" +
                                        element.surname + "</td><td>" +
                                        element.name + "</td><td>" +
                                        element.age + 
    "</td><td><div class='btn-group'><button class='btn-info btn'>Módosítás</button><button class='btn btn-danger'>Törlés</button>                                </div></td></tr>"
};
activateButtons();
}

/* így is lehet:*/
let createTD =(html, parent) => {
    let td = document.createElement("td");
    td.innerHTML = html;
    parent.appendChild(td);
};

let createButtonGroup = parent => {
    let group = document.createElement("div");
    group.className = "btn-group";

    createButtonInfo(group);
    createButtonDanger(group);

    let td = document.createElement("td");
    td.appendChild(group);
    parent.appendChild(td);
}

function createButtonInfo (parent){
    let btnInfo = document.createElement("button");
    btnInfo.className = "btn-info btn";
    btnInfo.innerHTML = "<i class='fas fa-sync-alt'></i>";
    btnInfo.onclick = function(){
        userReplace(this)};
    parent.appendChild(btnInfo);
}

function createButtonDanger (parent){
    let btnDanger = document.createElement("button");
    btnDanger.className = "btn-danger btn";
    btnDanger.innerHTML = "<i class='fas fa-trash-alt'></i>";
    btnDanger.onclick = function(){
        alert("Biztos hogy törli a felhasználót?");
        deleteUser(this);};
    parent.appendChild(btnDanger);
}
/*
for (let k in users){
    let tr = document.createElement("tr");
    createTD(parseInt(k) + 1, tr); // Csak ha nincs sorszám a tömbben.
    for(let value of Object.values(users[k])){
        createTD(value, tr);
    }
    createButtonGroup(tr);
    userTable.appendChild(tr);
};*/

function activateButtons(){
let modifyButtons = document.querySelectorAll("#userTable .btn-info");
let deleteButtons = document.querySelectorAll("#userTable .btn-danger");

for (let i = 0; i < modifyButtons.length; i++){
    modifyButtons[i].onclick = function(){
    userReplace(this)}} 

for (let i = 0; i < deleteButtons.length; i++){
    deleteButtons[i].onclick = function(){
    alert("Biztos hogy törli a felhasználót?");
    deleteUser(this);
}} 
}

function userReplace (element){
        for (let i = 0; i < userTable.childElementCount; i++) {
            if (userTable.children[i].contains(element)){
                addInputs (i);
            }
        };
        element.className = "btn btn-success";
        element.innerHTML = "Mentés";
        element.onclick = function(){
        saveUser(element);    
        } 
}

function addInputs (i){
    let row = userTable.children[i];
    replaceInput (row.children[1], "surname");
    replaceInput (row.children[2], "name");
    replaceInput (row.children[3], "age")
}

function replaceInput (element, name){
    let value = element.textContent;
    let input = document.createElement("input");
    input.type = "text";
    input.name = name;
    input.value = value;
    input.className = "form-control";
    element.innerHTML = ""
    element.appendChild(input);
}

function saveUser (element){
    for (let i = 0; i < userTable.childElementCount; i++) {
        if (userTable.children[i].contains(element)){
            saveInput(userTable.children[i].children[1]);
            saveInput(userTable.children[i].children[2]);
            saveInput(userTable.children[i].children[3]);
        }
    };
    element.innerHTML = "Módosítás";
    element.className = "btn btn-info";
    element.onclick = function(){
        userReplace(this)}
}

function saveInput(element){
    let value = element.firstChild.value;
    element.removeChild(element.firstChild);
    element.innerHTML = value;
}

function deleteUser(element){
    for (let i = 0; i < userTable.childElementCount; i++) {
        if (userTable.children[i].contains(element)){
            let deleted = userTable.children[i];
            userTable.removeChild(deleted);
        };
        userTable.children[i].firstChild.innerHTML = i + 1;
    };
}

function getUser(){
    let newSurname = document.querySelector("input#newSurname").value;
    let newName = document.querySelector("input#newName").value;
    let newAge = document.querySelector("input#newAge").value;
    let tr = document.createElement("tr");
    createTD (userTable.childElementCount + 1, tr);
    createTD (newSurname, tr);
    createTD (newName, tr);
    createTD (newAge, tr);
    createButtonGroup(tr);
    userTable.appendChild(tr);
}
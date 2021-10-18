// Global scope. A var function scope-ú.
var globalName = "Joe";

function something() {
    var globalName = "Jack";
    console.log (globalName);
}

// A let és a const blokk scope-ú.
something();
console.log (globalName);

let name1 = "Sanyi";
{
    let name1 = "Pisti";
    console.log(name1);
}
console.log(name1);
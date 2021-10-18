/* Összegzés algoritmusa:
összeg = 0
ciklus AMÍG van szám addig
    szám = következő elem,
    összeg = összeg + szám
ciklus vége 
*/
let numericArray = [1, 3, 2, 5, 4, 7, 9, 8];
let sum = 0;
for (let i = 0; i < numericArray.length; i++) {
    sum += numericArray[i];
}
console.log("Sum: " + sum);

/* Számlálás algoritmusa:
db = 0
ciklus AMÍG van szám addig
    szám = következő elem,
    HA a feltétel igaz a számra akkor
        db = db + 1
    feltétel vége
ciklus vége 
*/
let db = 0;
for (let i = 0; i < numericArray.length; i++) {
    if (numericArray[i] % 2 == 0) {
        db++;
    }
}
console.log("Even numbers: " + db);

/* Szélsőérték keresése:
legnagyobb = első elem 
CIKLUS AMÍG van még elem, ADDIG
    elem = következő elem
    HA elem > legnagyobb, AKKOR
       legnagyobb = elem  
    FELTÉTEL VÉGE 
CIKLUS VÉGE

 */
let biggest = numericArray[0];

for (let i = 0; i < numericArray.length; i++) {
    if (numericArray[i] > biggest){
        biggest = numericArray[i];
    }
};
console.log("The biggest element: ", biggest);

let smallest = numericArray[0];

for (let i = 0; i < numericArray.length; i++) {
    if (numericArray[i] < smallest){
        smallest = numericArray[i];
    }
};
console.log("The smallest element: ", smallest);

/* Eldöntés tétele
találat = HAMIS 
CIKLUS AMÍG van elem ÉS NEM találat
    elem = következő elem
    HA keresett tulajdonságú az elem, AKKOR
        találat = IGAZ
    FELTÉTEL VÉGE
CIKLUS VÉGE 
*/
let contains = false;
for (let i = 0; i < numericArray.length; i++) {
    if( numericArray[i] == 5) {
        contains = true;
        break;
    }; 
}
console.log("This array contains number 5: ", contains)
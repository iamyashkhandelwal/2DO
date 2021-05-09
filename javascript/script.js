console.log("this is final todo");

var localItems = [];
var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function getDate(){
    let d = new Date();
    let date = document.querySelector(".date");
    date.innerHTML = d.getDate() + "<sup>" +"th" + "</sup>" +" "+ monthList[d.getMonth()] + ", " + d.getFullYear();
}
getDate();

function getTime(){
    let d = new Date();
    let s = d.getSeconds();
    let m = d.getMinutes();
    let h = d.getHours();
    // document.write(h + ":" + m + ":" + s);
    let dateTime = document.querySelector(".dateAndTime").innerHTML = h + ":" + m + ":" + s;
    // console.log(dateTime);
}
getTime();

setInterval(getTime,1000);



// Self calling function for showing items after reload
(function(){
    if (JSON.parse(localStorage.getItem("localItems")) != null ) {
        localItems = JSON.parse(localStorage.getItem("localItems"));
    }
    // console.log(localItems);
    disPlay();
}());

function addToArray(){
    
    const input = document.querySelector(".input");

    // if(localItems === null){
    //     // If local storage is not alloted
    //     // console.log("No local Storage alloted");
    //      taskList = [];
    // }
    // else{
    //     // If local Storage is alloted
    //     // console.log(localItems);
    //     taskList = localItems;
    // }
    // taskList.push(input.value);
    // localStorage.setItem("localItems", JSON.stringify(taskList));

    if (input.value.trim() != "") {
        // console.log("not empty");
        localItems.push(input.value.trim());
       
        if (localStorage.getItem("localItems") == null) {
            localStorage.setItem("localItems", JSON.stringify(localItems));
          } else {
            localStorage.setItem("localItems", JSON.stringify(localItems));
          }
    }

    disPlay();
}



function disPlay(){

    // function to display items on clicking addButton 


    const input = document.querySelector(".input");
    const listGroup = document.querySelector(".list-group");
    
    listGroup.innerHTML = "";

    for (let index = 0; index < localItems.length; index++) {
        listGroup.innerHTML += `
    <div class="list-group-item">${localItems[index]}
                <i class="fas fa-check" 
                onclick = 'completed("${index}")'></i>
                <i class="fas fa-trash-alt"
                onclick='deleteItem("${index}")'></i>
            </div>
    
    `  
    }

    input.value = "";
    
}


const addButton = document.querySelector(".addButton");
addButton.addEventListener("click", addToArray);

var inp = document.querySelector(".input");
inp.addEventListener('keyup', (event) => {
    
    if (event.keyCode === 13) {
        // console.log("enter pressed");
        const input = document.querySelector(".input");
        if (input.value.trim() != "") {
            // console.log("not empty");
            localItems.push(input.value.trim());
           
            if (localStorage.getItem("localItems") == null) {
                localStorage.setItem("localItems", JSON.stringify(localItems));
              } else {
                localStorage.setItem("localItems", JSON.stringify(localItems));
              }
        }
    
        disPlay();
    }
});


function completed(index){
    if (localItems[index].includes("<s>")) {
        localItems[index] = localItems[index].replace("<s>", "");
      } else {
        localItems[index] = "<s>" + localItems[index] + "</s>";
      }
      if (localStorage.getItem("localItems") == null) {
        localStorage.setItem("localItems", JSON.stringify(localItems));
      } else {
        localStorage.setItem("localItems", JSON.stringify(localItems));
      }

      disPlay();
    // console.log(localItems);

}


function deleteItem(index){

    localItems.splice(index, 1);
    if (localStorage.getItem("localItems") == null) {
    localStorage.setItem("localItems", JSON.stringify(localItems));
     } 
    else {
    localStorage.setItem("localItems", JSON.stringify(localItems));
    }

    disPlay();
}

function clearAll() {
    // console.log("clearAll called");
    localStorage.clear();
    localItems.splice(0, localItems.length);
    disPlay();
}

const clearAllButton = document.querySelector(".clearAll");
clearAllButton.addEventListener("click", clearAll);

function clearCompleted(){
    console.log(localItems.length);
    for (let index = 0; index < localItems.length;) {
        if (localItems[index].includes("<s>")) {
            localItems.splice(index,1);
            // console.log(localItems.length);
        }
        else{
            index++;
            continue;
        }
        
        
    }

    // console.log(localItems);

    if (localStorage.getItem("localItems") == null) {
        localStorage.setItem("localItems", JSON.stringify(localItems));
         } 
        else {
        localStorage.setItem("localItems", JSON.stringify(localItems));
        }
    disPlay();
}

const clearCompletedButton = document.querySelector(".clearAllCompleted");
clearCompletedButton.addEventListener("click", clearCompleted);














/*

// function showList(){

//     // localItems = JSON.parse(localStorage.getItem("localItems"));
//     // // function to display after reload
//     // // console.log("reloaded");
//     // const listGroup = document.querySelector(".list-group");

//     // if(localItems === null){
//     //     // console.log("if executed");
//     //     // If local storage is not alloted
//     //     console.log("No local Storage alloted");
//     //      taskList = [];
//     //     //  localStorage.setItem("localItems", JSON.stringify(taskList))
//     //     //  console.log(localItems.length);
//     // }
//     // else{
//     //     for (let index = 0; index < localItems.length; index++) {

//     //         listGroup.innerHTML += `
//     //             <div class="list-group-item">${localItems[index]}
//     //                 <i class="fas fa-check"
//     //                 onclick = 'completed("${index}")'></i>
//     //                 <i class="fas fa-trash-alt"
//     //                 onclick='deleteItem("${index}")'></i>
//     //             </div>
        
//     //               `
            
//     //     }
//     // }

//     if (JSON.parse(localStorage.getItem("localItems")) != null ) {
//         localItems = JSON.parse(localStorage.getItem("localItems"));
//     }
//     // console.log(localItems);
//     disPlay();


// }
// showList();

function generateList(){
    const ul = document.querySelector(".list-group");
    // ul.innerHTML = "";
    const input = document.querySelector(".input");
    storeItems.push(input.value);
    // console.log(storeItems);

    const li = document.createElement("li");
    li.classList.add("list-group-item");

    const text = document.createTextNode(input.value);
    li.appendChild(text);

    const done = document.createElement("i");
    done.classList.add("fas");
    done.classList.add("fa-check");

    const dlt = document.createElement("i");
    dlt.classList.add("fas");
    dlt.classList.add("fa-trash-alt");

    li.appendChild(done);
    li.appendChild(dlt);

    ul.appendChild(li);
    input.value = "";

    // console.log(ul);
}

function display(){

    const input = document.querySelector(".input");

    const listGroup = document.querySelector(".list-group");
    // console.log(listGroup);
    const listItem = document.createElement("div");
    listItem.classList.add("list-group-item")

    const text = document.createTextNode(input.value);
    listItem.appendChild(text);
    // console.log(listItem);

    const done = document.createElement("i");
    done.classList.add("fas");
    done.classList.add("fa-check");

    const dlt = document.createElement("i");
    dlt.classList.add("fas");
    dlt.classList.add("fa-trash-alt");

    listItem.appendChild(done);
    listItem.appendChild(dlt);

    listGroup.appendChild(listItem);
    input.value = "";
    // console.log(listGroup);

}

*/
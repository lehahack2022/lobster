function storeItem(item,itemName) {
    const itemString = JSON.stringify(item);
    localStorage.setItem(itemName,itemString);
}

function getItem(itemName) {
    const itemString = localStorage.getItem(itemName);
    return JSON.parse(itemString);
}

function newLobster() {
    const nameBox = document.getElementById("lobster-name");
    const name = nameBox.value;
    const lobster = {
        name,
        birthDate: Date.now(), 
        color: Math.round(Math.random()*190+60)
    }
    storeItem(lobster,"lobster");
    nameBox.value = "";
    render();
}

function removeClasses() {
    const lobster = document.getElementById("lobster");
    const lobsterClasses = lobster.classList;
    const movementClasses = ["left-right","left-middle","middle-left","middle-right","right-left","right-middle"];
    lobsterClasses.remove(...movementClasses);
}

function showFood(food) {
    const foodClasses = food.classList;
    foodClasses.remove("hidden")
    foodClasses.add("falling")
}

function hideFood(food) {
    const foodClasses = food.classList;
    foodClasses.add("hidden")
    foodClasses.remove("falling")
}

function scuttleRight() {
    const lobster = document.getElementById("lobster");
    const lobsterClasses = lobster.classList;
    removeClasses();
    const food = document.getElementById("rightFood");
    showFood(food);
    if(lobsterClasses.contains("left")){
        lobsterClasses.add("left-right") 
        setTimeout(()=>hideFood(food), 2000);
    }
    if(lobsterClasses.contains("middle")){
        lobsterClasses.add("middle-right")
        setTimeout(()=>hideFood(food), 1000);
    }
    lobsterClasses.add("right");
    lobsterClasses.remove("left");
    lobsterClasses.remove("middle");
    lobsterEat();
}

function scuttleLeft() {
    const lobster = document.getElementById("lobster");
    const lobsterClasses = lobster.classList;
    removeClasses();
    const food = document.getElementById("leftFood");
    showFood(food);
    if(lobsterClasses.contains("middle")){
        lobsterClasses.add("middle-left")
        setTimeout(()=>hideFood(food), 1000);
    }
    if(lobsterClasses.contains("right")){
        lobsterClasses.add("right-left")
        setTimeout(()=>hideFood(food), 2000);
    }
    lobsterClasses.add("left");
    lobsterClasses.remove("right");
    lobsterClasses.remove("middle");
    lobsterEat();
}

function scuttleMiddle() {
    const lobster = document.getElementById("lobster");
    const lobsterClasses = lobster.classList;
    removeClasses();
    const food = document.getElementById("middleFood");
    showFood(food);
    if(lobsterClasses.contains("left")){
        lobsterClasses.add("left-middle")
        setTimeout(()=>hideFood(food), 1000);
    }
    if(lobsterClasses.contains("right")){
        lobsterClasses.add("right-middle")
        setTimeout(()=>hideFood(food), 1000);
    }
    lobsterClasses.add("middle");
    lobsterClasses.remove("left");
    lobsterClasses.remove("right");
    lobsterEat();
}

function lobsterEat() {
    const lobsterAteDate = new Date;
    const lastFed = {
        date:lobsterAteDate.toISOString()
    }
    storeItem(lastFed, "lastFed");
    render();
    //add result hunger level to last fed
}

const lastFedMessage = document.getElementById("last-fed-message");

const hungerLevelDisplay = document.getElementById("hunger-level");

function render() {
    const lobster = getItem("lobster");
    if(!lobster) {
        document.getElementById("new-lobster-container").style.display = "block";
        document.getElementById("button-container").style.display = "none";
        document.getElementById("lobster").style.display = "none";
    }
    else {
        document.getElementById("new-lobster-container").style.display = "none";
        document.getElementById("button-container").style.display = "flex";
        const lobsterElement = document.getElementById("lobster");
        lobsterElement.style.display = "block";
        lobsterElement.style.filter = `hue-rotate(${lobster.color}deg)`;
    }

    const now = new Date;
    const threeDays = 1000*60*60*24*3;
    let lastFed = getItem("lastFed");
    let lastFedDate;
    let difference;

    if(lastFed) {
        lastFedDate = new Date (Date.parse(lastFed.date));
        lastFedMessage.innerHTML = `${lobster.name} last ate: ${lastFedDate.toLocaleString()}`;
        difference = now.valueOf()-lastFedDate.valueOf();
        console.log(localStorage.lastFed);
        //subtract previous number from 3 days
    }
    else
        if(lobster) {
            lastFedMessage.innerHTML = "Brand new, hungry lobster";
            difference = (now.valueOf()-lobster.birthDate)+threeDays/2;
        }
        //subtract last fed from now
        const hungryTime = threeDays-difference;
    const hungerLevel = Math.round((hungryTime/threeDays)*10000)/100;
    if(lobster)
        hungerLevelDisplay.innerHTML = `${lobster.name} is: ${hungerLevel >= 0? hungerLevel: 0}% full`;
    //divide by 3 days*100
    //display on screen
    if (hungerLevel <= 0) {
        let graveyard = getItem("graveyard");
        if (!graveyard) {
            graveyard = [];
        }
        lobster.deathDate = Date.now();
        lobster.lastFed = lastFedDate.toLocaleString();
        graveyard.push(lobster);
        storeItem(graveyard,"graveyard");
        localStorage.removeItem("lobster");
        localStorage.removeItem("lastFed");
    }
}

render();

setInterval(render,1000);
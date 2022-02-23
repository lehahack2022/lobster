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
    const lastFed = lobsterAteDate.toISOString();
    localStorage.setItem("lastFed", lastFed);
    render();
}

const lastFedMessage = document.getElementById("last-fed-message");

const hungerLevelDisplay = document.getElementById("hunger-level");

function render() {
    const now = new Date;
    const lastFed = new Date (Date.parse(localStorage.lastFed));
    if(localStorage.lastFed)
        lastFedMessage.innerHTML = "Lobster last ate: " + lastFed.toLocaleString();
    else
        lastFedMessage.innerHTML = "Brand new, hungry lobster";
    //subtract last fed from now
    const difference = now.valueOf()-lastFed.valueOf();
    console.log(localStorage.lastFed);
    //subtract previous number from 3 days
    const threeDays = 1000*60*60*24*3;
    const hungryTime = threeDays-difference;
    const hungerLevel = Math.round((hungryTime/threeDays)*10000)/100;
    hungerLevelDisplay.innerHTML = "The lobster is: " + hungerLevel + "% full";
    //divide by 3 days*100
    //display on screen
}

render();

setInterval(render,1000);
function removeClasses() {
    const lobster = document.getElementById("lobster");
    const lobsterClasses = lobster.classList;
    const movementClasses = ["left-right","left-middle","middle-left","middle-right","right-left","right-middle"];
    lobsterClasses.remove(...movementClasses);
}

function showFood(food){
    const foodClasses = food.classList;
    foodClasses.remove("hidden")
    foodClasses.add("falling")
}

function hideFood(food){
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
}

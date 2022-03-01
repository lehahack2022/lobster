const lobsters = JSON.parse(localStorage.getItem("graveyard"));
if(lobsters){
    console.log(lobsters)
    const graveContainer = document.getElementById("graves-container")
    const lobsterLife = document.getElementById("lobster-life")
    const lobsterImage = document.getElementById("lobster-image")
    const lobsterName = document.getElementById("lobster-name")
    const lobsterLifespan = document.getElementById("lobster-lifespan")
    const headstone = document.getElementById("empty-grave").innerHTML
    function displayLobster(lobster) {
        lobsterImage.style.filter = `hue-rotate(${lobster.color}deg)`
        lobsterName.innerHTML = lobster.name
        const lobsterBirth = new Date ((lobster.birthDate));
        const lobsterDeath = new Date ((lobster.deathDate));
        const lifespan = lobsterBirth.toDateString() + " - " + lobsterDeath.toDateString()
        lobsterLifespan.innerHTML = lifespan
        lobsterLife.style.display = "block"
    }
    lobsters.forEach(lobster => {
        const grave = document.createElement("p")
        grave.innerHTML = headstone
        grave.classList.add("grave")
        grave.onmouseover = () => displayLobster(lobster)
        grave.onclick = () => displayLobster(lobster)
        grave.onmouseleave = function() {
            lobsterLife.style.display = "none"
        }
        graveContainer.append(grave)
    })
}
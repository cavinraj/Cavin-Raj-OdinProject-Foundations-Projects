let container = document.querySelector("#container")
let resetButton = document.querySelector("#reset_button")

const createGrid = size => {
    for (let x = 0;x < size;x++) {
        for (let y = 0; y < size; y++) {
            let square = document.createElement('div')
            square.className = 'square'
            square.style.width = (100/size) + '%'
            square.style.height = (100/size) + '%'
            container.appendChild(square)
        }
    }
}

container.addEventListener('mouseover',(e) => {

    if (e.target.classList.contains('square')) {
        let randNums = [Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256)]
        e.target.style.backgroundColor = `rgb(${randNums[0]},${randNums[1]},${randNums[2]})`
    }
})

function generateNewGrid() {
    let pass = false

    while (!pass) {
        const userInput = prompt("What would you like the new grid size to be ?")

        if (userInput === null) {
            return
        }

        let newSize = parseFloat(userInput)

        // Safety Check: Prevent the browser from crashing if they type 5000
        if (!isNaN(newSize) && newSize > 0) {
            pass= true
            if (newSize > 100) {
                newSize = 100
            }

            // Empty the container completely so squares don't stack
            container.innerHTML = ''
            createGrid(newSize)
        }

        if (newSize <= 0) {
            alert("That is an invalid grid size")
        }
    }
}

resetButton.addEventListener('click',(e) => {
    generateNewGrid()
})

createGrid(16)
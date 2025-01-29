const gridSizeCounter = document.querySelector('.size__view');
const gridField = document.querySelector('.grid__field');
const inputFieldSize = document.querySelector('input[type="range"]');
const pickedColor = document.querySelector('input[type="color"]');
let pickedColorValue = '#000'; // default value
let temporaryStorageForColor = '#000'; // for previous changed color
const pickedColorButton = document.querySelector('.picked__color');

const makeField = function makeFieldOfCells() {
    let gridValue = Number(inputFieldSize.value);
    gridText(gridValue);
    const gridFieldCells = document.querySelectorAll('.cell');
    checkForCells(gridFieldCells);
    createCells(gridValue);
};

const gridText = function countHowMuchCellsInGrid(gridValue = 10) {
    gridSizeCounter.textContent = `Grid: ${gridValue}x${gridValue}`;
};

const checkForCells = function checkForExistingCells(nodeOfCells) {
    nodeOfCells.forEach((cell) => {
        if (cell) {
            gridField.removeChild(cell);
        }
    });
};

const createCells = function createNumberOfCells(cellsNumber = 10) {
    for (let i = 0; i < cellsNumber; i++)
    {
        for (let j = 0; j < cellsNumber; j++)
        {
            const cell = document.createElement('div');
            cell.classList.toggle('cell');
            cell.style.width = `${(400 / cellsNumber)}px`;
            cell.style.height = `${(400 / cellsNumber)}px`;
            cell.style.border = '1px solid #000';
            gridField.appendChild(cell);
        }
    }
};

const applyColor = function applyColorToCell(event) {
    pickedColorValue = event.target.value;
    temporaryStorageForColor = event.target.value;
};

makeField(); // Initialize immediately to fill out the field


inputFieldSize.addEventListener('input', () => {
    makeField();
});

pickedColorButton.addEventListener('click', () => {
    pickedColor.addEventListener('input', applyColor);
});
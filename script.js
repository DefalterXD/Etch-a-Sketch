const gridSizeCounter = document.querySelector('.size__view');
const gridField = document.querySelector('.grid__field');
const inputFieldSize = document.querySelector('input[type="range"]');
const pickedColor = document.querySelector('input[type="color"]');
let pickedColorValue = '#000'; // default value
let temporaryStorageForColor = '#000'; // for previous changed color
let opacityColorValue = 1; // default to view the opacity color
const pickedColorButton = document.querySelector('.picked__color');
const randomColorButton = document.querySelector('.random__color');
const fillColorButton = document.querySelector('.fill__color');
const opacityColorButton = document.querySelector('.opacity__color');
const clearGridButton = document.querySelector('.clear__button');

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
    for (let i = 0; i < cellsNumber; i++) {
        for (let j = 0; j < cellsNumber; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = `${(100 / cellsNumber)}%`;
            cell.style.height = `${(100 / cellsNumber)}%`;
            cell.style.border = '1px solid #000';
            gridField.appendChild(cell);
        }
    }
};

const applyColor = function applyColorToCell(event) {
    pickedColorValue = event.target.value;
    temporaryStorageForColor = pickedColorValue;
};

const applyRandomColor = function applyRandomColorToCell(event) {
    generateRandomColor();
    event.target.style.backgroundColor = pickedColorValue;
};

const generateRandomColor = function generateRandomColorToCell() {
    let hexLetters = '0123456789ABCDEF';
    let newHexColor = '#';
    for (let i = 0, hexLength = 6; i < hexLength; i++) {
        newHexColor += hexLetters[(Math.floor(Math.random() * 16))];
    }
    pickedColorValue = newHexColor;
};

const applyFillColor = function applyFillToEveryCell(fieldOfCells, pickedColorValue) {
    fieldOfCells.forEach((cell) => {
        cell.style.backgroundColor = pickedColorValue;
        cell.style.opacity = 1; // Keep all cells opacity the same
    });
};

const applyOpacityColor = function applyOpacityColorToCell(event) {
    pickedColorValue = temporaryStorageForColor;
    opacityColorValue += 0.1;
    const cell = event.target;
    cell.style.opacity = opacityColorValue;
};

makeField(); // Initialize immediately to fill out the field at the start


inputFieldSize.addEventListener('input', () => {
    makeField();
});

gridField.addEventListener('mouseover', (event) => {
    const hoveredAboveCell = event.target;
    hoveredAboveCell.style.backgroundColor = pickedColorValue; 
});

pickedColorButton.addEventListener('click', () => {
    pickedColor.addEventListener('input', applyColor);
    gridField.removeEventListener('mouseover', applyRandomColor);
});

randomColorButton.addEventListener('click', () => {
    pickedColor.removeEventListener('input', applyColor);
    gridField.addEventListener('mouseover', applyRandomColor);
});

fillColorButton.addEventListener('click', () => {
    const copyOfGridCells = document.querySelectorAll('.cell');
    applyFillColor(copyOfGridCells, temporaryStorageForColor);
});

opacityColorButton.addEventListener('click', () => {
    opacityColorValue = 0;
    pickedColor.removeEventListener('input', applyColor);
    gridField.removeEventListener('mouseover', applyRandomColor);
    gridField.addEventListener('mouseover', applyOpacityColor);
});

clearGridButton.addEventListener('click', () => {
    pickedColor.removeEventListener('input', applyColor);
    gridField.removeEventListener('mouseover', applyRandomColor);
    gridField.removeEventListener('mouseover', applyOpacityColor);
    makeField(); // Make a clear grid field
});
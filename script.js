const gridSizeCounter = document.querySelector('.size__view');
const gridField = document.querySelector('.grid__field');
const inputFieldSize = document.querySelector('input[type="range"]');
const pickedColor = document.querySelector('input[type="color"]');
let pickedColorValue = '#000'; // default value
let temporaryStorageForColor = '#000'; // for previous changed color
const pickedColorButton = document.querySelector('.picked__color');
const randomColorButton = document.querySelector('.random__color');
const fillColorButton = document.querySelector('.fill__color');
const opacityColorButton = document.querySelector('.opacity__color');

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
    temporaryStorageForColor = event.target.value;
};

const applyRandomColor = function applyRandomColorToCell(event) {
    event.target.style.backgroundColor = pickedColorValue;
    generateRandomColor();
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
    });
};

makeField(); // Initialize immediately to fill out the field


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
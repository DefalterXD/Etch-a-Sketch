const gridSizeCounter = document.querySelector('.size__view');
const gridField = document.querySelector('.grid__field');
const inputFieldSize = document.querySelector('input[type="range"]');

const makeField = function makeFieldOfCells() {
    let gridValue = Number(inputFieldSize.value);
    gridText(gridValue);
    const gridFieldCells = document.querySelectorAll('.cell');
    checkForCells(gridFieldCells);
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

document.getElementById('sizePicker').addEventListener('submit', function makeGrid(grid) {
	let pixelCanvas = document.getElementById('pixelCanvas');
	let colorPicker = document.getElementById('colorPicker');
	const userWidth = document.getElementById('inputWidth').value;
	const userHeight = document.getElementById('inputHeight').value;
// Clears grid for new 'submit' event.
	for (child of pixelCanvas.children) {
			child.remove(0);
	}
//  Inserts <tr> elements according to userHeight.
	for (let i = 0; i < userHeight; i++) {
	 	pixelCanvas.insertRow();
	 }	
// Inserts <td> elements according to userWidth, and adds a 'click' event listener to each.
	for (let i = 0; i < userWidth; i++) {

		for (row of pixelCanvas.rows) {
	 		row.insertCell();

	 		for (cell of row.cells) {
				cell.addEventListener('click', function paint(event) {
				event.target.style.backgroundColor = colorPicker.value;
			});
		}
	 }
}
 	grid.preventDefault();
});
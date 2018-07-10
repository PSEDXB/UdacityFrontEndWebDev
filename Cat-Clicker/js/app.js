// Model

// array of cat object literals
const cats = [
	{
		name: "Tom",
		pic: "img/cat3.png",
		click: 1,
		phrase1: "Who touched me?",
		phrase2: "Sheesh",
		phrase3: "Meowza"
	},

	{
		name: "Elmo",
		pic: "img/cat2.png",
		click: 1,
		phrase1: "Hello there",
		phrase2: "I don't like that very meowch",
		phrase3: "No likey"
	},

	{
		name: "Spanky",
		pic: "img/cat.jpg",
		click: 1,
		phrase1: "I'll tell my momma if you keep that up!",
		phrase2: "Why are you so meowean?",
		phrase3: "Why are you doing this?"
	},

	{
		name: "Alaric",
		pic: "img/cat4.png",
		click: 1,
		phrase1: "AHHHHHHHHH",
		phrase2: "AHHHHHHHHHHHHHHHH!!!!",
		phrase3: "If you would kindly stop clicking us, it would be much meowpreciated."

	},

	{
		name: "Elvis",
		pic: "img/cat5.png",
		click: 1,
		phrase1: "Careful, I'm furrocious!",
		phrase2: "You seriously still clicking cats?",
		phrase3: "I'm sure you can think of better stress relievers on the internet..."
	}
];

let i = 0;

for (cat of cats) {
	// creates list element for each cat, provides it content and assigns variable for each cat (model)
	let catListEntry = document.createElement('li');
	catListEntry.innerHTML = `<span class="catName">${cats[i].name}</span>`;

	// appends newly created element to ul
	let catListCurrent = document.getElementById("catList").appendChild(catListEntry);
	
	// NB: the function below is in the loop because it needs to be passed i
	catListCurrent.addEventListener('click', (function(n) {
		return function() {
			
			// clears the screen
			if (document.querySelector('.container')) {
				document.querySelector('.container').remove();
			}

			// creates container element.
			const div = document.createElement('div');
			div.classList.add('container');

			// creates cat name element.
			const selectedCatName = document.createElement('h3');
			selectedCatName.innerText = `${cats[n].name}`;
			
			// selects relevant picture.
			const img = document.createElement('img');
			img.src = `${cats[n].pic}`;

			// adds counter beneath image.
			const clicker = document.createElement('span');
			clicker.classList.add('clicker');

			// provides counter/clicker content depending on previous clicks to the current cat.
			if (cats[n].click == 1) {
				clicker.innerText = "Click me right meow!";
			} else {
				clicker.innerText = `You already clicked me ${cats[n].click} times!`;
			}

			let j = cats[n].click;
			
			// "Octopus"/View Model, etc: provides functionality in the view to image.
			img.addEventListener('click', function() {
				if (j == 10) {
					alert(cats[n].phrase1);
				} else if (j == 23) {
					alert(cats[n].phrase2);
				} else if (j == 40) {
					alert(cats[n].phrase3);
				} else if (j == 80) {
					alert("PETA: 757-622-7382");
				} else if (j == 100) {
					img.src = "img/deadcat.jpg";
					cats[n].pic = "img/deadcat.jpg";
					// img from complex.com
					alert("Jeez, I'm dead. Happy now?");
				} else if (j >=150) {
					clicker.innerText = "Cat's dead! Go you!";
				} else{
				clicker.innerText = `You clicked me ${j} times!`;
				}
				j++;
				cats[n].click = j;
			});
			
			// "Octopus"/View Model, etc: Dynamically populates the UI ('view') using data created above ( from the 'model').
			document.querySelector('body').appendChild(div);
			div.appendChild(img);
			div.appendChild(selectedCatName);
			div.appendChild(clicker);

		};
	})(i), false);

	i++;
}
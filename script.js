const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(res => {
            createMeal(res.meals[0]);
        }).catch(e => {
            console.warn(e);
        })
});

const createMeal = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break;
        }
    }

    const newInnerHTML = `
		<div class="row">
			<div class="columns five">
				<img src="${meal.strMealThumb}" alt="Meal Image">
				${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div class="columns seven">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		${meal.strYoutube ? `
		<div class="row">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>` : ''}
	`;

    meal_container.innerHTML = newInnerHTML;
}

//button

const docStyle = document.documentElement.style;
const aElem = document.querySelector('button');
const boundingClientRect = aElem.getBoundingClientRect();

aElem.onmousemove = function (e) {

    const x = e.clientX - boundingClientRect.left;
    const y = e.clientY - boundingClientRect.top;

    const xc = boundingClientRect.width / 2;
    const yc = boundingClientRect.height / 2;

    const dx = x - xc;
    const dy = y - yc;

    docStyle.setProperty('--rx', `${dy / -1}deg`);
    docStyle.setProperty('--ry', `${dx / 10}deg`);

};

aElem.onmouseleave = function (e) {

    docStyle.setProperty('--ty', '0');
    docStyle.setProperty('--rx', '0');
    docStyle.setProperty('--ry', '0');

};

aElem.onmousedown = function (e) {

    docStyle.setProperty('--tz', '-25px');

};

document.body.onmouseup = function (e) {

    docStyle.setProperty('--tz', '-12px');

};

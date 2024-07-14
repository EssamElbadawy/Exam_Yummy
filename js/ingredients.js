// Start Loading Screen
$(window).ready(function () {
    $('.loadingScreen').fadeOut(1000, function () { });
});
// End Loading Screen

// Start allIngredients Section 
$('.Ingredients').on('click', function () {
    $('.serch-Container').addClass('d-none');
    $('.meals-sec').addClass('d-none');
    $('.category-sec').addClass('d-none');
    $('.Area-sec').addClass('d-none');
    $('.contactUs-sec').addClass('d-none');
    $('.ingredient-sec').removeClass('d-none');
});

let allIngredients = [];
export async function getIngredients() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await res.json();
    allIngredients = data.meals;
    displayIngredients();
}

getIngredients();

export function displayIngredients() {
    let cartona = ``;
    for (let i = 0; i < allIngredients.length; i++) {
        let description = allIngredients[i].strDescription;
        let shortDescription = description ? description.split(" ").slice(0, 20).join(" ") : "";

        cartona += `<div class="col-md-3 rounded-2 text-center cursor-pointer text-white py-3 mt-4">
                        <i role="button" onclick="getIngredientDetails('${allIngredients[i].strIngredient}')" class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${allIngredients[i].strIngredient}</h3> 
                        <p>${shortDescription}</p>
                    </div>`;
    }
    document.getElementById('ingredientsData').innerHTML = cartona;
}

let allDetailsIngredient = [];
export async function getIngredientDetails(ingredient) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    if (res.status === 400) return;
    let data = await res.json();
    allDetailsIngredient = data.meals;
    displayDetailsCategory();
}

export function displayDetailsCategory() {
    let displayDiv = ``
    for (let i = 0; i < allDetailsIngredient?.length; i++) {
        displayDiv += `<div class="col-md-3">
                        <div onclick="getIngredientDetailsdetails(${allDetailsIngredient[i].idMeal})" class="work-box bg-white rounded-3 mt-3 overflow-hidden">
                            <div role="button" class="menu-item position-relative">
                                <img role="button" src="${allDetailsIngredient[i].strMealThumb}" alt="" class="img-fluid rounded-3">
                                <div class="caption position-absolute">
                                    <h2 class="w-title fs-5 ms-5">${allDetailsIngredient[i].strMeal}</h2>
                                </div>
                            </div>
                        </div>
                    </div>`
    }
    document.getElementById('ingredientsData').innerHTML = displayDiv;
}

let allDetailsgetIngredient = [];
export async function getIngredientDetailsdetails(id) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    console.log(allDetailsgetIngredient);
    if (res.status === 400) return;
    let data = await res.json();
    allDetailsgetIngredient = data.meals;
    displayDetailsIngredient();
}

export function displayDetailsIngredient() {
    let displayDiv = ``
    for (let i = 0; i < allDetailsgetIngredient?.length; i++) {
        displayDiv += `
     <div class="col-md-4">
                <img class="w-100 rounded-3"  role="button" src="${allDetailsgetIngredient[i].strMealThumb}"
                    alt="">
                <h2 class="text-white mt-3">${allDetailsgetIngredient[i].strMeal}</h2>
            </div>
            <div class="col-md-8 text-white mt-5">
            <h2>Instructions</h2>
                <p>${allDetailsgetIngredient[i].strInstructions}</p>
                <p> strMeal</p>
                <h3><span class="fw-bolder">Area: </span>${allDetailsgetIngredient[i].strArea} </h3>
                <h3><span class="fw-bolder">Category: </span>${allDetailsgetIngredient[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1">${allDetailsgetIngredient[i].strMeasure1, allDetailsgetIngredient[i].strIngredient1}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsgetIngredient[i].strMeasure2, allDetailsgetIngredient[i].strIngredient2}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsgetIngredient[i].strMeasure3, allDetailsgetIngredient[i].strIngredient3}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsgetIngredient[i].strMeasure4, allDetailsgetIngredient[i].strIngredient4}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsgetIngredient[i].strMeasure5, allDetailsgetIngredient[i].strIngredient5}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsgetIngredient[i].strMeasure6, allDetailsgetIngredient[i].strIngredient6}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsgetIngredient[i].strMeasure7, allDetailsgetIngredient[i].strIngredient7}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsgetIngredient[i].strMeasure8, allDetailsgetIngredient[i].strIngredient8}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsgetIngredient[i].strMeasure9, allDetailsgetIngredient[i].strIngredient9}</li>
                  
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                </ul>
                <a target="_blank" href="${allDetailsgetIngredient[i].strYoutube}"
                    class="btn btn-success">Source</a>
                <a target="_blank" href="${allDetailsgetIngredient[i].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    }
    document.getElementById('ingredientsData').innerHTML = displayDiv;
}

// End allIngredients Section

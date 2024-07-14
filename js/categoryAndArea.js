
//Start Loading Screen
$(window).ready(function () {
    $('.loadingScreen').fadeOut(1000, function () {
    })

})
//End Loading Screen 
$('.Categories').on('click', function () {
    $('.serch-Container').addClass('d-none')
    $('.meals-sec').addClass('d-none')
    $('.Area-sec').addClass('d-none')
    $('.contactUs-sec').addClass('d-none');
    $('.ingredient-sec').addClass('d-none');
    $('.category-sec').removeClass('d-none')
})
//Start Category Section 

let allCategory = [];
async function getCategory() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await res.json();
    allCategory = data.categories;
    displayCategory();
}

getCategory();

function displayCategory() {
    let cartona = ``
    for (let i = 0; i < allCategory.length; i++) {
        cartona += `<div class="col-md-3 mt-5">
                    <div onclick="getCategoryDetails('${allCategory[i].strCategory}')" class="work-box rounded-3 overflow-hidden ">
                        <div class="menu-item position-relative">
                            <img role="button" src="${allCategory[i].strCategoryThumb}" alt="" class="rounded-3 bg-transparent">
                            <div class="caption-category position-absolute text-center p-2 ">
                                <h2 class="w-title  ">${allCategory[i].strCategory} </h2>
                                <p role="button">${allCategory[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")} </p>
                            </div>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById('categoryData').innerHTML = cartona
}

let allDetailsCategory = [];
async function getCategoryDetails(category) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    if (res.status === 400) return;
    let data = await res.json();
    allDetailsCategory = data.meals;
    displayDetailsCategory()


}

function displayDetailsCategory() {
    let displayDiv = ``
    for (let i = 0; i < allDetailsCategory?.length; i++) {
        displayDiv += `<div class="col-md-3">
                        <div role="button" onclick="getMealDetailsByCategory(${allDetailsCategory[i].idMeal})" class="work-box bg-white rounded-3 mt-3 overflow-hidden">
                            <div class="menu-item position-relative">
                                <img role="button" role="button" src="${allDetailsCategory[i].strMealThumb}" alt="" class="img-fluid rounded-3">
                                <div class="caption position-absolute">
                                    <h2 role="button" class="w-title fs-5 ms-5">${allDetailsCategory[i].strMeal}</h2>
                                </div>
                            </div>
                        </div>
                    </div>`
    }

    document.getElementById('categoryData').innerHTML = displayDiv;
}

let allDetailsMealMyCategory = [];
async function getMealDetailsByCategory(id) {
    let res = await fetch(`https:/www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (res.status === 400) return;
    let data = await res.json();
    allDetailsMealMyCategory = data.meals;
    console.log(allDetailsMealMyCategory);
    displayDetailsMealsByCategory();
}

function displayDetailsMealsByCategory() {
    let display = ``
    for (let i = 0; i < allDetailsMealMyCategory.length; i++) {
        console.log(allDetailsMealMyCategory);
        display += `
     <div class="col-md-4">
                <img class="w-100 rounded-3"  role="button" src="${allDetailsMealMyCategory[i].strMealThumb}"
                    alt="">
                <h2 class="text-white mt-3">${allDetailsMealMyCategory[i].strMeal}</h2>
            </div>
            <div class="col-md-8 text-white mt-5">
            <h2>Instructions</h2>
                <p>${allDetailsMealMyCategory[i].strInstructions}</p>
                <p> strMeal</p>
                <h3><span class="fw-bolder">Area: </span>${allDetailsMealMyCategory[i].strArea} </h3>
                <h3><span class="fw-bolder">Category: </span>${allDetailsMealMyCategory[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1">${allDetailsMealMyCategory[i].strMeasure1, allDetailsMealMyCategory[i].strIngredient1}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealMyCategory[i].strMeasure2, allDetailsMealMyCategory[i].strIngredient2}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealMyCategory[i].strMeasure3, allDetailsMealMyCategory[i].strIngredient3}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealMyCategory[i].strMeasure4, allDetailsMealMyCategory[i].strIngredient4}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealMyCategory[i].strMeasure5, allDetailsMealMyCategory[i].strIngredient5}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealMyCategory[i].strMeasure6, allDetailsMealMyCategory[i].strIngredient6}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealMyCategory[i].strMeasure7, allDetailsMealMyCategory[i].strIngredient7}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealMyCategory[i].strMeasure8, allDetailsMealMyCategory[i].strIngredient8}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealMyCategory[i].strMeasure9, allDetailsMealMyCategory[i].strIngredient9}</li>
                  
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                </ul>
                <a target="_blank" href="${allDetailsMealMyCategory[i].strYoutube}"
                    class="btn btn-success">Source</a>
                <a target="_blank" href="${allDetailsMealMyCategory[i].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    }
    console.log(display);
    document.getElementById('categoryData').innerHTML = display;
}
//End Category Section 

//Start Area Section  
$('.Area').on('click', function () {
    $('.serch-Container').addClass('d-none')
    $('.meals-sec').addClass('d-none')
    $('.category-sec').addClass('d-none')
    $('.ingredient-sec').addClass('d-none');
    $('.contactUs-sec').addClass('d-none')
    $('.Area-sec').removeClass('d-none')
})

let allArea = [];
async function getArea() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await res.json();
    allArea = data.meals;
    displayArea()
}

getArea()
function displayArea() {
    let cartona = ``
    for (let i = 0; i < allArea.length; i++) {
        cartona += `<div class="col-md-3 rounded-2 text-center text-white mt-5">
                    <i role="button" onclick="getAreaDetails('${allArea[i].strArea}')" class="fa-solid fa-house-laptop fa-5x"></i>
                    <h3 >${allArea[i].strArea}</h3>
                </div>`
    }
    document.getElementById('areaData').innerHTML = cartona
}

let allDetailsArea = [];
async function getAreaDetails(Area) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`);
    if (res.status === 400) return;
    let data = await res.json();
    allDetailsArea = data.meals;
    displayDetailsAreas();
}

function displayDetailsAreas() {
    let displayDiv = ``
    for (let i = 0; i < allDetailsArea.length; i++) {
        displayDiv += `<div class="col-md-3">
                        <div onclick="getMealDetailsArea('${allDetailsArea[i].idMeal}')" class="work-box bg-white rounded-3 mt-3 overflow-hidden">
                            <div class="menu-item position-relative">
                                <img role="button" src="${allDetailsArea[i].strMealThumb}" alt="" class="img-fluid rounded-3">
                                <div class="caption position-absolute">
                                    <h2 class="w-title fs-5 ms-5">${allDetailsArea[i].strMeal}</h2>
                                </div>
                            </div>
                        </div>
                    </div>`
    }
    document.getElementById('areaData').innerHTML = displayDiv;
}

let allDetailsMealArea = [];
async function getMealDetailsArea(id) {

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (res.status === 400) return;
    let data = await res.json();
    allDetailsMealArea = data.meals;
    displayDetailsMealsArea();
}

function displayDetailsMealsArea() {
    let displayDiv = ``
    for (let i = 0; i < allDetailsMealArea?.length; i++) {
        displayDiv += `
     <div class="col-md-4">
                <img class="w-100 rounded-3"  role="button" src="${allDetailsMealArea[i].strMealThumb}"
                    alt="">
                <h2 class="text-white mt-3">${allDetailsMealArea[i].strMeal}</h2>
            </div>
            <div class="col-md-8 text-white mt-5">
            <h2>Instructions</h2>
                <p>${allDetailsMealArea[i].strInstructions}</p>
                <p> strMeal</p>
                <h3><span class="fw-bolder">Area: </span>${allDetailsMealArea[i].strArea} </h3>
                <h3><span class="fw-bolder">Category: </span>${allDetailsMealArea[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1">${allDetailsMealArea[i].strMeasure1, allDetailsMealArea[i].strIngredient1}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealArea[i].strMeasure2, allDetailsMealArea[i].strIngredient2}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealArea[i].strMeasure3, allDetailsMealArea[i].strIngredient3}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealArea[i].strMeasure4, allDetailsMealArea[i].strIngredient4}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealArea[i].strMeasure5, allDetailsMealArea[i].strIngredient5}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealArea[i].strMeasure6, allDetailsMealArea[i].strIngredient6}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealArea[i].strMeasure7, allDetailsMealArea[i].strIngredient7}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealArea[i].strMeasure8, allDetailsMealArea[i].strIngredient8}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMealArea[i].strMeasure9, allDetailsMealArea[i].strIngredient9}</li>
                  
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                </ul>
                <a target="_blank" href="${allDetailsMealArea[i].strYoutube}"
                    class="btn btn-success">Source</a>
                <a target="_blank" href="${allDetailsMealArea[i].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    }
    document.getElementById('areaData').innerHTML = displayDiv;
}

//End Area Section  


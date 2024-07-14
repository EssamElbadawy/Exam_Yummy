//Start Loading Screen
$(window).ready(function () {
    $('.loadingScreen').fadeOut(1000, function () {
    })
})
//End Loading Screen 


$('.search').on('click', function () {
    $('.Area-sec').addClass('d-none')
    $('.category-sec').addClass('d-none')
    $('.meals-sec').addClass('d-none')
    $('.ingredient-sec').addClass('d-none');
    $('.contactUs-sec').addClass('d-none');
    $('.serch-Container').removeClass('d-none')
})

$('#searchBoxByFullName').on('keyup', function (e) {
    $('.meals-sec').removeClass('d-none')
    getMeals(this.value);
})


$('#searchBoxByLetter').on('keyup', function (e) {
    $('.meals-sec').removeClass('d-none')
    getMeals(this.value);
})

let allMeal = [];
let mealName = "chicken";

async function getMeals(mealName = "chicken") {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    if (res.status === 400) return;
    let data = await res.json();
    allMeal = data.meals || []; // Handle case where no meals are found
    displayMeals();
}

function displayMeals() {
    let displayDiv = ``;
    if (allMeal.length === 0) {
        displayDiv = `<p class="bg-white fs-1">No meals found</p>`; // Show message if no meals found
    } else {
        for (let i = 0; i < allMeal.length; i++) {
            displayDiv += `<div class="col-md-3">
                        <div onclick="getMealDetails(${allMeal[i].idMeal})" class="work-box bg-white rounded-3 mt-3 overflow-hidden">
                            <div class="menu-item position-relative">
                                <img role="button" src="${allMeal[i].strMealThumb}" alt="" class="img-fluid rounded-3">
                                <div class="caption position-absolute">
                                    <h2 class="w-title fs-5 ms-5">${allMeal[i].strMeal}</h2>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
    }
    document.getElementById('rowData').innerHTML = displayDiv;
}



//Start Loading Screen
$(window).ready(function () {
    $('.loadingScreen').fadeOut(1000, function () {
    })

})
//End Loading Screen 
const sideNaveMenu = $('.side-nav-menu');
const navwidth = sideNaveMenu.outerWidth();
const newwidth = navwidth - 60;

$('.closer').on('click', function () {
    if (sideNaveMenu.css('left') == '0px') {
        sideNaveMenu.animate({ left: -newwidth }, 500, function () {
            $('.side-nav-menu li').hide();
        });
        $('.closer').addClass('fa-bars').removeClass('fa-xmark');
    } else {
        sideNaveMenu.animate({ left: 0 }, 500, function () {
            $('.closer').addClass('fa-xmark').removeClass('fa-bars');
            $('.side-nav-menu li').each(function (index) {
                $(this).delay(index * 50).fadeIn(500);
            });
        });
    }
});

// Automatically close the side navigation menu after the page loads
$(window).on('load', function () {
    if (sideNaveMenu.css('left') == '0px') {
        sideNaveMenu.animate({ left: -newwidth }, 500, function () {
            $('.side-nav-menu li').hide(); // Hide list items when closing the menu
        });
        $('.closer').addClass('fa-xmark').removeClass('fa-bars');
    }
});

$('.Contact-Us').on('click', function () {
    $('.serch-Container').addClass('d-none')
    $('.Area-sec').addClass('d-none')
    $('.meals-sec').addClass('d-none')
    $('.category-sec').addClass('d-none')
    $('.ingredient-sec').addClass('d-none')
    $('.contactUs-sec').removeClass('d-none')
})
//Input Validate 
// Function to validate all inputs
function validateInputs() {
    let isValid = true;

    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const ageInput = document.getElementById('ageInput');
    const passwordInput = document.getElementById('passwordInput');
    const repasswordInput = document.getElementById('repasswordInput');

    const nameAlert = document.getElementById('nameAlert');
    const emailAlert = document.getElementById('emailAlert');
    const phoneAlert = document.getElementById('phoneAlert');
    const ageAlert = document.getElementById('ageAlert');
    const passwordAlert = document.getElementById('passwordAlert');
    const repasswordAlert = document.getElementById('repasswordAlert');

    // Regular expressions for validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const ageRegex = /^(1[8-9]|[2-9][0-9]|100)$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Name validation
    if (!nameRegex.test(nameInput.value)) {
        nameAlert.textContent = "Special characters and numbers not allowed";
        nameAlert.classList.remove('d-none');
        isValid = false;
    } else {
        nameAlert.classList.add('d-none');
    }

    // Email validation
    if (!emailRegex.test(emailInput.value)) {
        emailAlert.textContent = "Email not valid (example@domain.com)";
        emailAlert.classList.remove('d-none');
        isValid = false;
    } else {
        emailAlert.classList.add('d-none');
    }

    // Phone validation
    if (!phoneRegex.test(phoneInput.value)) {
        phoneAlert.textContent = "Enter a valid 10-digit phone number";
        phoneAlert.classList.remove('d-none');
        isValid = false;
    } else {
        phoneAlert.classList.add('d-none');
    }

    // Age validation
    if (!ageRegex.test(ageInput.value)) {
        ageAlert.textContent = "Enter a valid age between 18 and 100";
        ageAlert.classList.remove('d-none');
        isValid = false;
    } else {
        ageAlert.classList.add('d-none');
    }

    // Password validation
    if (!passwordRegex.test(passwordInput.value)) {
        passwordAlert.textContent = "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.";
        passwordAlert.classList.remove('d-none');
        isValid = false;
    } else {
        passwordAlert.classList.add('d-none');
    }

    // Repassword validation
    if (passwordInput.value !== repasswordInput.value || repasswordInput.value === '') {
        repasswordAlert.textContent = "Passwords do not match";
        repasswordAlert.classList.remove('d-none');
        isValid = false;
    } else {
        repasswordAlert.classList.add('d-none');
    }

    // Enable or disable the submit button
    document.getElementById('submitBtn').disabled = !isValid;
}

// Event listeners to trigger validation on input
document.getElementById('nameInput').addEventListener('keyup', validateInputs);
document.getElementById('emailInput').addEventListener('keyup', validateInputs);
document.getElementById('phoneInput').addEventListener('keyup', validateInputs);
document.getElementById('ageInput').addEventListener('keyup', validateInputs);
document.getElementById('passwordInput').addEventListener('keyup', validateInputs);
document.getElementById('repasswordInput').addEventListener('keyup', validateInputs);
// End Contact us section

let allMeal = [];

async function getMeal() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=a`);
    if (res.status === 400) return;
    let data = await res.json();
    allMeal = data.meals;
    displayMeal();
}

getMeal();
function displayMeal() {
    let displayDiv = ``;
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
    document.getElementById('rowData').innerHTML = displayDiv;
}


let allDetailsMeal = [];
async function getMealDetails(id) {

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (res.status === 400) return;
    let data = await res.json();
    allDetailsMeal = data.meals;
    displayDetailsMeals();
}


function displayDetailsMeals() {
    let displayDiv = ``
    for (let i = 0; i < allDetailsMeal?.length; i++) {
        displayDiv += `
     <div class="col-md-4">
                <img class="w-100 rounded-3" role="button" src="${allDetailsMeal[i].strMealThumb}"
                    alt="">
                <h2 class="text-white mt-3">${allDetailsMeal[i].strMeal}</h2>
            </div>
            <div class="col-md-8 text-white mt-5">
            <h2>Instructions</h2>
                <p>${allDetailsMeal[i].strInstructions}</p>
                <p> strMeal</p>
                <h3><span class="fw-bolder">Area: </span>${allDetailsMeal[i].strArea} </h3>
                <h3><span class="fw-bolder">Category: </span>${allDetailsMeal[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1">${allDetailsMeal[i].strMeasure1, allDetailsMeal[i].strIngredient1}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMeal[i].strMeasure2, allDetailsMeal[i].strIngredient2}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMeal[i].strMeasure3, allDetailsMeal[i].strIngredient3}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMeal[i].strMeasure4, allDetailsMeal[i].strIngredient4}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMeal[i].strMeasure5, allDetailsMeal[i].strIngredient5}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMeal[i].strMeasure6, allDetailsMeal[i].strIngredient6}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMeal[i].strMeasure7, allDetailsMeal[i].strIngredient7}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMeal[i].strMeasure8, allDetailsMeal[i].strIngredient8}</li>
                    <li class="alert alert-info m-2 p-1">${allDetailsMeal[i].strMeasure9, allDetailsMeal[i].strIngredient9}</li>
                  
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                </ul>
                <a target="_blank" href="${allDetailsMeal[i].strYoutube}"
                    class="btn btn-success">Source</a>
                <a target="_blank" href="${allDetailsMeal[i].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    }
    document.getElementById('rowData').innerHTML = displayDiv;
}







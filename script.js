// Define options for breakfast, lunch, and dinner
const options = {
    breakfast: ['bread_jam', 'cereal', 'turkey_sandwich', 'grilled_chicken_breast'],
    lunch: ['pizza', 'spaghetti', 'fried_rice'],
    dinner: ['salad', 'fruit', 'yogurt', 'milk', 'water']
};

// Food items and their respective calories
const foodItems = {
    'bread_jam': 130,
    'cereal': 240,
    'turkey_sandwich': 300,
    'grilled_chicken_breast': 320,
    'pizza': 266,
    'spaghetti': 266,
    'fried_rice': 180,
    'salad': 120,
    'fruit': 50,
    'yogurt': 100,
    'milk': 120,
    'water': 0
};

// Function to populate select dropdown menus
function populateDropdown(selectId, optionsArray, foodItemsData) {
    const selectElement = document.getElementById(selectId);
    // Clear existing options
    selectElement.innerHTML = '';
    // Create and append new options
    optionsArray.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option.replace('_', ' '); // Replace underscores with spaces for better readability
        selectElement.appendChild(optionElement);
    });
}

// Populate dropdown menus on page load
document.addEventListener('DOMContentLoaded', function() {
    // Iterate over each day of the week
    for (let i = 0; i < 7; i++) {
        const dayPrefix = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][i];
        populateDropdown(dayPrefix + 'Breakfast', options.breakfast, foodItems);
        populateDropdown(dayPrefix + 'Lunch', options.lunch, foodItems);
        populateDropdown(dayPrefix + 'Dinner', options.dinner, foodItems);
    }
});

// Function to calculate the total calorie consumption for a week
function calculateTotalCalories() {
    let totalCalories = 0;
    // Iterate over each day of the week
    for (let i = 0; i < 7; i++) {
        const dayPrefix = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][i];
        const breakfastSelect = document.getElementById(dayPrefix + 'Breakfast');
        const lunchSelect = document.getElementById(dayPrefix + 'Lunch');
        const dinnerSelect = document.getElementById(dayPrefix + 'Dinner');
        // Add calorie counts for each meal
        totalCalories += foodItems[breakfastSelect.value] || 0;
        totalCalories += foodItems[lunchSelect.value] || 0;
        totalCalories += foodItems[dinnerSelect.value] || 0;
    }
    return totalCalories;
}

// Function to display the total calorie consumption for a week
function displayTotalCalories() {
    const totalCalories = calculateTotalCalories();
    console.log('Total calorie consumption for the week:', totalCalories);
}

// Event listener for the 'Analyze' button click
document.getElementById('analyzeBtn').addEventListener('click', displayTotalCalories);

// Constants for age, height, and weight
const age = 20; // in years
const height = 180; // in cm
const weight = 72; // in kg

// Activity level (choose one): sedentary, moderately_active, active, very_active
const activityLevel = 'moderately_active';

// Function to calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor equation
function calculateBMR(age, height, weight) {
    return 10 * weight + 6.25 * height - 5 * age + 5;
}

// Adjust BMR based on activity level
function adjustBMR(bmr, activityLevel) {
    switch (activityLevel) {
        case 'sedentary':
            return bmr * 1.2;
        case 'moderately_active':
            return bmr * 1.375;
        case 'active':
            return bmr * 1.55;
        case 'very_active':
            return bmr * 1.725;
        default:
            return null; // Invalid activity level
    }
}

// Function to calculate recommended calorie intake for each day of the week
function calculateRecommendedCalories(age, height, weight, activityLevel) {
    const bmr = calculateBMR(age, height, weight);
    const adjustedBMR = adjustBMR(bmr, activityLevel);
    if (adjustedBMR !== null) {
        return adjustedBMR / 7; // Divide by 7 to get daily intake
    } else {
        return null; // Invalid activity level
    }
}

// Calculate recommended calorie intake for each day of the week
const recommendedCaloriesPerDay = calculateRecommendedCalories(age, height, weight, activityLevel);
console.log('Recommended calorie intake per day:', recommendedCaloriesPerDay);

// Data for days of the week
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Data for actual calorie consumption (replace with your actual data)
const actualCaloriesConsumption = [2000, 2200, 1800, 2100, 2400, 2300, 2500]; // Example data

// Generate recommended intake data (same value for each day)
const recommendedIntakeData = Array(7).fill(recommendedCaloriesPerDay);

// Generate the bar graph using Chart.js
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: daysOfWeek,
        datasets: [{
            label: 'Actual Intake',
            data: actualCaloriesConsumption,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }, {
            label: 'Recommended Intake',
            data: recommendedIntakeData,
            type: 'line',
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

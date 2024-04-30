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
function populateDropdown(selectId, optionsArray) {
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
        populateDropdown(dayPrefix + 'Breakfast', options.breakfast);
        populateDropdown(dayPrefix + 'Lunch', options.lunch);
        populateDropdown(dayPrefix + 'Dinner', options.dinner);
    }
});

// Function to calculate the total calorie consumption for a day
function calculateTotalCalories(breakfast, lunch, dinner) {
    let totalCalories = 0;
    totalCalories += foodItems[breakfast] || 0;
    totalCalories += foodItems[lunch] || 0;
    totalCalories += foodItems[dinner] || 0;
    return totalCalories;
}

// Function to display the total calorie consumption for a week
function displayTotalCalories() {
    const totalCaloriesPerDay = [];
    // Iterate over each day of the week
    for (let i = 0; i < 7; i++) {
        const dayPrefix = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][i];
        const breakfastSelect = document.getElementById(dayPrefix + 'Breakfast');
        const lunchSelect = document.getElementById(dayPrefix + 'Lunch');
        const dinnerSelect = document.getElementById(dayPrefix + 'Dinner');
        const totalCalories = calculateTotalCalories(breakfastSelect.value, lunchSelect.value, dinnerSelect.value);
        totalCaloriesPerDay.push(totalCalories);
    }
    console.log('Total calorie consumption for the week:', totalCaloriesPerDay);
    updateChart(totalCaloriesPerDay);
}

// Event listener for the 'Analyze' button click
document.getElementById('analyzeBtn').addEventListener('click', displayTotalCalories);

// Function to update the chart with actual calorie consumption data
function updateChart(actualCalories) {
    // Destroy the existing chart if it exists
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    // Update the chart
    const ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Actual Intake',
                data: actualCalories,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
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
}

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

// Function to generate recommended intake data for each day of the week
function generateRecommendedIntakeData(recommendedCaloriesPerDay) {
    const recommendedIntakeData = [];
    for (let i = 0; i < 7; i++) {
        recommendedIntakeData.push(recommendedCaloriesPerDay);
    }
    return recommendedIntakeData;
}

// Generate recommended intake data for each day of the week
const recommendedIntakeData = generateRecommendedIntakeData(recommendedCaloriesPerDay);

// Function to update the chart with actual and recommended calorie consumption data
function updateChart(actualCalories, recommendedIntake) {
    // Destroy the existing chart if it exists
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    // Update the chart
    const ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Actual Intake',
                data: actualCalories,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }, {
                label: 'Recommended Intake',
                data: recommendedIntake,
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
}

// Function to display the total calorie consumption for a week
function displayTotalCalories() {
    const totalCaloriesPerDay = [];
    // Iterate over each day of the week
    for (let i = 0; i < 7; i++) {
        const dayPrefix = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][i];
        const breakfastSelect = document.getElementById(dayPrefix + 'Breakfast');
        const lunchSelect = document.getElementById(dayPrefix + 'Lunch');
        const dinnerSelect = document.getElementById(dayPrefix + 'Dinner');
        const totalCalories = calculateTotalCalories(breakfastSelect.value, lunchSelect.value, dinnerSelect.value);
        totalCaloriesPerDay.push(totalCalories);
    }
    console.log('Total calorie consumption for the week:', totalCaloriesPerDay);
    updateChart(totalCaloriesPerDay, recommendedIntakeData);
}

// Event listener for the 'Analyze' button click
document.getElementById('analyzeBtn').addEventListener('click', displayTotalCalories);
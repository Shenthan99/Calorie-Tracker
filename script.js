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
// Define options for breakfast, lunch, and dinner
const options = {
    breakfast: ['bread_jam', 'cereal', 'turkey_sandwich', 'grilled_chicken_breast'],
    lunch: ['pizza', 'spaghetti', 'fried_rice'],
    dinner: ['salad', 'fruit', 'yogurt', 'milk', 'water']
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
    populateDropdown('mondayBreakfast', options.breakfast);
    populateDropdown('mondayLunch', options.lunch);
    populateDropdown('mondayDinner', options.dinner);

    populateDropdown('tuesdayBreakfast', options.breakfast);
    populateDropdown('tuesdayLunch', options.lunch);
    populateDropdown('tuesdayDinner', options.dinner);

    populateDropdown('wednesdayBreakfast', options.breakfast);
    populateDropdown('wednesdayLunch', options.lunch);
    populateDropdown('wednesdayDinner', options.dinner);

    populateDropdown('thursdayBreakfast', options.breakfast);
    populateDropdown('thursdayLunch', options.lunch);
    populateDropdown('thursdayDinner', options.dinner);

    populateDropdown('fridayBreakfast', options.breakfast);
    populateDropdown('fridayLunch', options.lunch);
    populateDropdown('fridayDinner', options.dinner);

    populateDropdown('saturdayBreakfast', options.breakfast);
    populateDropdown('saturdayLunch', options.lunch);
    populateDropdown('saturdayDinner', options.dinner);

    populateDropdown('sundayBreakfast', options.breakfast);
    populateDropdown('sundayLunch', options.lunch);
    populateDropdown('sundayDinner', options.dinner);
});
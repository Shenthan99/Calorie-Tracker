import matplotlib.pyplot as plt
import datetime

# Define the food items and their respective calories
food_items = {
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
}

# Function to get user input for a meal
def get_meal(meal_name):
    print(f"What's for {meal_name}?")
    user_input = input().lower()
    if user_input in food_items:
        return food_items[user_input]
    else:
        print("Invalid input. Please try again.")
        return get_meal(meal_name)

# Function to get user input for a day
def get_day(day_num):
    print(f"Day-{day_num}; {datetime.date.today() + datetime.timedelta(days=day_num)}")
    breakfast = get_meal('breakfast')
    lunch = get_meal('lunch')
    dinner = get_meal('dinner')
    return breakfast, lunch, dinner

# Function to get user input for a week
def get_week():
    week_data = []
    for day_num in range(3):
        day_data = get_day(day_num)
        week_data.append(day_data)
    return week_data

# Function to calculate the mean recommended calorie consumption
def mean_recommended_calories(height, weight, activity_level):
    bmr = (10 * weight) + (6.25 *height) - (5 * 20) + 5
    if activity_level == 'sedentary':
        bmr *= 1.2
    elif activity_level == 'moderately_active':
        bmr *= 1.375
    elif activity_level == 'active':
        bmr *= 1.55
    elif activity_level == 'very_active':
        bmr *= 1.725
    else:
        print("Invalid activity level. Please try again.")
        return None
    return bmr / 7

# Get user input for a week
week_data = get_week()

# Calculate the mean recommended calorie consumption
height = int(input("Enter your height in cm: "))
weight = int(input("Enter your weight in kg: "))
activity_level = input("Enter your activity level (sedentary, moderately_active, active, very_active): ")
recommended_calories = mean_recommended_calories(height, weight, activity_level)

# Visualize the calorie consumption
days = [i+1 for i in range(7)]
breakfasts = [data[0] for data in week_data]
lunches = [data[1] for data in week_data]
dinners = [data[2] for data in week_data]
meals = breakfasts + lunches + dinners

plt.figure(figsize=(12,6))
plt.subplot(1, 3, 1)
plt.bar(days, breakfasts, color='b')
plt.title('Breakfast')
plt.xlabel('Day')
plt.ylabel('Calories')

plt.subplot(1, 3, 2)
plt.bar(days, lunches, color='g')
plt.title('Lunch')
plt.xlabel('Day')
plt.ylabel('Calories')

plt.subplot(1, 3, 3)
plt.bar(days, dinners, color='r')
plt.title('Dinner')
plt.xlabel('Day')
plt.ylabel('Calories')

plt.suptitle('Calorie Consumption for a Week')
plt.show()

plt.figure(figsize=(12,6))
plt.bar(days, meals, color='y')
plt.title('Total Calories')
plt.xlabel('Day')
plt.ylabel('Calories')
plt.suptitle('Calorie Consumption for a Week')
plt.show()

if recommended_calories is not None:
    plt.figure(figsize=(12,6))
    plt.bar(days, [recommended_calories]*7, color='grey')
    plt.title('Mean Recommended Calorie Consumption')
    plt.xlabel('Day')
    plt.ylabel('Calories')
    plt.suptitle('Calorie Consumption for a Week')
    plt.show()
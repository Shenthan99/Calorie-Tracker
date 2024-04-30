import datetime
import matplotlib.pyplot as plt

# Define food items and their respective approximate calorie counts
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

# Function to calculate recommended calorie intake based on user inputs
def calculate_recommended_calories(height, weight, age):
    # Example calculation, replace with actual formula
    return (10 * weight) + (6.25 * height) - (5 * age) + 5

# Get today's date
today = datetime.date.today()

# Get the current day of the week
weekday = today.strftime("%A")

# Define a dictionary to store daily food intake
weekly_intake = {
    "Monday": {"breakfast": None, "lunch": None, "dinner": None},
    "Tuesday": {"breakfast": None, "lunch": None, "dinner": None},
    "Wednesday": {"breakfast": None, "lunch": None, "dinner": None},
    "Thursday": {"breakfast": None, "lunch": None, "dinner": None},
    "Friday": {"breakfast": None, "lunch": None, "dinner": None},
    "Saturday": {"breakfast": None, "lunch": None, "dinner": None},
    "Sunday": {"breakfast": None, "lunch": None, "dinner": None},
}

# Ask for user inputs for height, weight, and age
height = float(input("Enter your height (in cm): "))
weight = float(input("Enter your weight (in kg): "))
age = int(input("Enter your age: "))

# Calculate recommended calorie intake
recommended_calories = calculate_recommended_calories(height, weight, age)

# Define lists to store daily calorie intake and recommended intake
daily_calories = []
recommended_intake = []

# Ask for daily food intake
for day in weekly_intake.keys():
    print(f"Day-{list(weekly_intake.keys()).index(day) + 1}; {day}")
    daily_intake = {}
    daily_intake["breakfast"] = input("What's for breakfast? ")
    daily_intake["lunch"] = input("What's for lunch? ")
    daily_intake["dinner"] = input("What's for dinner? ")
    total_calories = sum([food_items[item] for item in daily_intake.values() if item in food_items])
    daily_calories.append(total_calories)
    recommended_intake.append(recommended_calories)

# Calculate mean calorie intake
mean_calorie_intake = sum(daily_calories) / len(daily_calories)

# Plotting
plt.figure(figsize=(10, 6))
plt.bar(weekly_intake.keys(), daily_calories, color='skyblue', label='Calorie Intake')
plt.plot(weekly_intake.keys(), recommended_intake, color='r', marker='o', label='Recommended Intake')
plt.axhline(y=mean_calorie_intake, color='g', linestyle='--', label='Mean Intake')
plt.xlabel('Day of the Week')
plt.ylabel('Calories')
plt.title('Weekly Calorie Consumption')
plt.legend()
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
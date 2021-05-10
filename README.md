# SleepDietApp
SleepDietApp
This is a project for the DTU 02808 Personal Informatics class in the 2021 spring semester created by Group 2.

## How to start the application

1. Unzip the project folder
2. Navigate into the SleepDietApp folder
3. Run `npm install`
4. Run `npm start`
5. Now the application runs on `localhost:3000` *Since our app is not designed for desktop use, it's better to interact with it in mobile mode, follow the steps to set it up:*
7. Press F12 to open the inspector
8. Press `Toggle device toolbar` in the top left corner
![image](https://user-images.githubusercontent.com/26260669/117714416-375f2780-b1d7-11eb-896b-abd0faf5f024.png)
9. Make `Responsive` is selected from the top dropdown list above the application
10. Now the setup should look like this in your browser
![image](https://user-images.githubusercontent.com/26260669/117714240-ecddab00-b1d6-11eb-973c-6c380364dac1.png)


## How to use the application
1. To insert new sleep data, navigate to the `My sleep data` screen, where the csv can be uploaded with drag&drop or by selecting from the file system after clicking on the square
An example csv file can be found in the project's public folder.
2. On the `Home` screen the sleep data for the sleep started yesterday can be seen with the dinner data for today if there's any
3. By switching to the `Add food` menu tab, you can enter new dinner data to any date, by selecting the date, time, categories, details, notes.
The date, time, dinner details, notes are optional to fill, they either have default values or it's not required to fill them out. Selecting at least one category is mandatory.
If a date is selected where a dinner data is already entered, it can be overriden, but only if there's difference between the old data and new data.
The hints for each section can be opened by clicking on the questionmark signs next to the section titles.
4. On the `Analytics` page the different graphs can be seen about the sleep and food data in the past. The first chart shows the sleep time by weekdays/month/days. The second chart shows the food consumed by category. In the 3rd section, the connection between food and sleep is visualised. First, with a radar chart, where the data can be hidden/displayed by clicking on each weekday, secondly, with a pie chart after selecting a weekday from the dropdown list on the right. In all cases (except for the radar chart), tooltips can be shown with the details by clicking on the charts.

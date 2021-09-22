Team-Project-8

## Proposal 1 - Predicting cost of a House
1.	Problems and Goals: 
People often face issues while buying or selling a property because most of them are not completely aware of the exact price. In such scenario, they approach real estate brokers for good deals, here instead of customers these brokers get high profit as a brokerage. For avoiding such middle man, we are going to build an application which can take house details like its area, number of bedrooms, location etc. from the user and estimate its cost.  

2.	Abstract: 
In this project we are going to build a web application which can predict the cost of a house by taking its parameters and comparing it with existing data. Through this application, we can provide a better overview of the property prices to the customer.

3.	Approach: 
•	Initially, we feed our machine learning model with a dataset which has various types of houses and their cost.
•	Upon this data, we train our machine learning model using the python programming and its libraries like Numpy, Pandas, SKlearn which can analyze the data and predict the cost of a house.
•	Using bootstrap and Java script we create a user interface through which we can take the user inputs and show the predictions. 
    
4.	Persona: 
This project aims to provide user friendly interface for every individual who are intended to buy or sell a house.






## Proposal 2 - Fitness lounge
1.	Problems and Goals: 
Fitness lounge is an application for facilitating fitness class registrations held in multiple gyms or fitness centers across the city. This would help people who desire to attend a fitness session in a new place.

2.	Abstract: 
Fitness lounge will have three user roles Admin, Host, and Customer. Each role will have to register himself before logging in. Admin will be able to add new gyms in the site after logging in. Trainer (Host) after logging in, can be able to add and update classes that are going to be held in their gym. Customer after logging in, will be able to see all the classes posted by various hosts with details. Customer can join any class and if prompted to join the same class again, application will not allow. Customer can view all the classes he has joined and can also search for a particular class based on gym name or class name. Filters have been implemented to filter out script and sql injection characters.

3.	Approach:
Technologies: Spring MVC framework, Hibernate, Validator, Filters.
Functionality: Unauthorized access to the application and few pages is been prohibited, Validator and Filters would be implemented.
    
4.	Persona:  Admin, Customer and Host.
•	Admin: Admin can register and log in. Add gyms to the site.
•	Trainer (Host):  Host can register and login. Can add and update classes of their respective gym only.
•	Customer: Customer can register and login, search for a class, join and can view joined classes.

        





## Proposal 3 - Save the Vending Machine 
1.	Problems and Goals:
There are more than 7 million vending machines serving people in the U.S. every day, and these add up to a market more than 8 billion dollars. However, seeing the desired item being out-of-stock is one of the most disappointing moment. In fact, vending machines being out-of-stock are estimated to be at least 3% in lost sales. Therefore, having an interactive web app that helps tracking the stock information becomes crucial to improve the business.

2.	Abstract: 
We will be building a web application that allows suppliers to better monitor their vending machines supplies. We will also provide several ways for suppliers receive low stock alerts, including automatic stock updates API (for Internet connected vending machines) and a consumer updates flow that will allow consumers to upload a picture of the vending machine.

3.	Approach: 
•	Node.js server and PostgreSQL DB to store stock & user information.
•	React front end with different view for consumers and suppliers.
•	Deploy the app on AWS

4.	Persona:  
•	Supplier: Suppliers will be able to see all their vending machines on a list, with different icon shows different level of stocks. They will also be able to implement           our API with their machines to automatically updates stock information in our system, and get alerted when stock of any item falls below a pre-defined threshold.
•	Consumer: Consumers can help improve the accuracy of stock information by uploading a picture of a specific vending machine, and we will be able to gather stock info from that picture.

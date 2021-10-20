##Save the Vending Machine

## Proposal 1 - Predicting cost of a House
**1.	Problems and Goals:** <br />
People often face issues while buying or selling a property because most of them are not completely aware of the exact price. In such scenario, they approach real estate brokers for good deals, here instead of customers these brokers get high profit as a brokerage. For avoiding such middle man, we are going to build an application which can take house details like its area, number of bedrooms, location etc. from the user and estimate its cost.  

**2.	Abstract:** <br />
In this project we are going to build a web application which can predict the cost of a house by taking its parameters and comparing it with existing data. Through this application, we can provide a better overview of the property prices to the customer.

**3.	Approach:** <br />
•	Initially, we feed our machine learning model with a dataset which has various types of houses and their cost.<br />
•	Upon this data, we train our machine learning model using the python programming and its libraries like Numpy, Pandas, SKlearn which can analyze the data and predict the cost of a house.<br />
•	Using bootstrap and Java script we create a user interface through which we can take the user inputs and show the predictions. 
    
**4.	Persona:** <br />
This project aims to provide user friendly interface for every individual who are intended to buy or sell a house.






## Proposal 2 - Fitness lounge
**1.	Problems and Goals:** <br />
Every year, people pay huge prices to the fitness centers keep their fitness membership active. Fitness lounge is a one stop solution for people who would like to explore new fitness centers and attend a session in a new gym in the city. This would help people to move out of their daily routine, while the businesses would also expect new crowd to their fitness centers. 

**2.	Abstract:** <br />
Fitness lounge will have three user roles Admin, Host, and Customer. Each role will have to register himself before logging in. Admin will be able to add new gyms in the site after logging in. Trainer (Host) after logging in, can be able to add and update classes that are going to be held in their gym. Customer after logging in, will be able to see all the classes posted by various hosts with details. Customer can join any class and if prompted to join the same class again, application will not allow. Customer can view all the classes he has joined and can also search for a particular class based on gym name or class name. Filters have been implemented to filter out script and sql injection characters.

**3.	Approach:** <br />
Technologies: Spring MVC framework, Hibernate, Validator, Filters.<br />
Functionality: Unauthorized access to the application and few pages is been prohibited, Validator and Filters would be implemented.
    
**4.	Persona:**  Admin, Customer and Host.<br />
- Admin: Admin can register and log in. Add gyms to the site.<br />
- Trainer (Host):  Host can register and login. Can add and update classes of their respective gym only.<br />
- Customer: Customer can register and login, search for a class, join and can view joined classes.

        
        
## Proposal 3 - Save the Vending Machine 
**1.	Problems and Goals:**<br />
There are more than 7 million vending machines serving people in the U.S. every day, and these add up to a market more than 8 billion dollars. However, seeing the desired item being out-of-stock is one of the most disappointing moment. In fact, vending machines being out-of-stock are estimated to be at least 3% in lost sales. Therefore, having an interactive web app that helps tracking the stock information becomes crucial to improve the business.

**2.	Abstract:** <br />
We will be building a web application that allows suppliers to better monitor their vending machines supplies. We will also provide several ways for suppliers to receive low stock alerts, including automatic stock updates API (for Internet connected vending machines) and a consumer updates flow that will allow consumers to upload a picture of the vending machine.

We'll also build an internal service for vending machines to talk to each other, so vending machines can better guide customers to nearby machines when it runs out of stock and the other machine still have that product in stock. 

**3.	Approach:** <br />
- Node.js server and PostgreSQL DB to store stock & user information.
- React front end with different view for consumers and suppliers.
- Deploy the app on AWS


**4.	Features:**  <br />
- **Supplier:** 
  - Manage all vending machines in one place
  - Aggregated stock and sales data to better predict future supplies
  - Integrate our API to their machines for automatically stock updates and nearby suggestion features
  - Receive notifications when stock is or will be running out of stock

- **Consumer:** 
  - Help improve the accuracy of stock information by uploading a picture of the machine.

- **Smart Machine:**
  - Be able to display nearby stock info directly on the machines if a requested product runs out but is available at other machines. 
  - Record climate infomation (temperature, precipitation) via on machine sensor and data from NOAA to observe relations and advice on stocking. 
  - Display customized ads when user make purchases

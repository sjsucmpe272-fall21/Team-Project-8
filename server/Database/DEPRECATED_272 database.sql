-----------------------------------------------------------------------------------------------------------
-- Items table will have all the items which our vending machies are going to have 
CREATE TABLE ITEMS(
ITEM_ID VARCHAR(255) PRIMARY KEY,
ITEM_NAME VARCHAR(100)
);
-----------------------------------------------------------------------------------------------------------------
-- We store every vending machine details in this table
create table vending_machines(
MACHINE_ID VARCHAR(255) PRIMARY KEY,
FLOOR INT,
MACHINE_NUMBER INT);
-----------------------------------------------------------------------------------------------------------------------------------
-- This table is going to have every machine details and its's corresponding stock quantity
CREATE TABLE MACHINE_ITEMS(
M_ID varchar(255),
PRODUCT_ID VARCHAR(255),
QUANTITY INT,
PRIMARY KEY(M_ID,PRODUCT_ID),
FOREIGN KEY (M_ID) REFERENCES VENDING_MACHINES(MACHINE_ID),
FOREIGN KEY (PRODUCT_ID) REFERENCES ITEMS(ITEM_ID));
----------------------------------------------------------------------------------------------------------------------------------
-- This table has owner details who can refill stock
Create table OWNER(
O_ID varchar(255),
OWNER_NAME varchar(50),
EMAIL varchar(30),
password varchar(30));
----------------------------------------------------------------------------------------------------------------------------------
-- This table can climate details

create table CLIMATE_UPDATE(
C_ID varchar(255),
C_DATE DATE,
c_TIME time,
PREDICTION varchar(10)); 


















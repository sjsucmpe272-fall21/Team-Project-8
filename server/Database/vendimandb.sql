-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: vendiman
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS vendiman;
use vendiman;

--
-- Table structure for table `climate_update`
--

DROP TABLE IF EXISTS `climate_update`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `climate_update` (
  `C_ID` varchar(255) DEFAULT NULL,
  `C_DATE` date DEFAULT NULL,
  `c_TIME` time DEFAULT NULL,
  `PREDICTION` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `climate_update`
--

LOCK TABLES `climate_update` WRITE;
/*!40000 ALTER TABLE `climate_update` DISABLE KEYS */;
/*!40000 ALTER TABLE `climate_update` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `ITEM_ID` varchar(255) NOT NULL,
  `ITEM_NAME` varchar(100) DEFAULT NULL,
  `price` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`ITEM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES ('102f61f8-4b51-11ec-902a-b05adad3c217','sprite',2.00),('1030b8e3-4b51-11ec-902a-b05adad3c217','coke',2.50),('10322a92-4b51-11ec-902a-b05adad3c217','coffee',3.00),('1033e3b6-4b51-11ec-902a-b05adad3c217','pringles',1.50),('1034dd74-4b51-11ec-902a-b05adad3c217','doritos',2.00),('1036a9da-4b51-11ec-902a-b05adad3c217','noodles',5.00),('1037b911-4b51-11ec-902a-b05adad3c217','snickers',3.50),('103955b3-4b51-11ec-902a-b05adad3c217','kit kat',1.50),('103a7fbf-4b51-11ec-902a-b05adad3c217','hot cheetos',2.00),('103bfff9-4b51-11ec-902a-b05adad3c217','bread',1.50);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `machine_items`
--

DROP TABLE IF EXISTS `machine_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `machine_items` (
  `M_ID` varchar(255) NOT NULL,
  `PRODUCT_ID` varchar(255) NOT NULL,
  `QUANTITY` int DEFAULT NULL,
  `CAPACITY` int DEFAULT NULL,
  PRIMARY KEY (`M_ID`,`PRODUCT_ID`),
  KEY `PRODUCT_ID` (`PRODUCT_ID`),
  CONSTRAINT `machine_items_ibfk_1` FOREIGN KEY (`M_ID`) REFERENCES `vending_machines` (`MACHINE_ID`),
  CONSTRAINT `machine_items_ibfk_2` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `items` (`ITEM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machine_items`
--

LOCK TABLES `machine_items` WRITE;
/*!40000 ALTER TABLE `machine_items` DISABLE KEYS */;
INSERT INTO `machine_items` VALUES 
('4c502e60-4b51-11ec-902a-b05adad3c217','102f61f8-4b51-11ec-902a-b05adad3c217',0, 10),
('4c502e60-4b51-11ec-902a-b05adad3c217','1030b8e3-4b51-11ec-902a-b05adad3c217',10, 10),
('4c502e60-4b51-11ec-902a-b05adad3c217','10322a92-4b51-11ec-902a-b05adad3c217',10, 10),
('4c502e60-4b51-11ec-902a-b05adad3c217','1033e3b6-4b51-11ec-902a-b05adad3c217',9, 10),
('4c502e60-4b51-11ec-902a-b05adad3c217','1034dd74-4b51-11ec-902a-b05adad3c217',10, 20),
('4c502e60-4b51-11ec-902a-b05adad3c217','1036a9da-4b51-11ec-902a-b05adad3c217',10, 30),
('4c502e60-4b51-11ec-902a-b05adad3c217','1037b911-4b51-11ec-902a-b05adad3c217',10, 20),
('4c502e60-4b51-11ec-902a-b05adad3c217','103955b3-4b51-11ec-902a-b05adad3c217',10, 10),
('4c502e60-4b51-11ec-902a-b05adad3c217','103a7fbf-4b51-11ec-902a-b05adad3c217',10, 20),
('4c502e60-4b51-11ec-902a-b05adad3c217','103bfff9-4b51-11ec-902a-b05adad3c217',10, 20),
('4c51a993-4b51-11ec-902a-b05adad3c217','102f61f8-4b51-11ec-902a-b05adad3c217',10, 10),
('4c51a993-4b51-11ec-902a-b05adad3c217','1030b8e3-4b51-11ec-902a-b05adad3c217',10, 10),
('4c51a993-4b51-11ec-902a-b05adad3c217','10322a92-4b51-11ec-902a-b05adad3c217',10, 20),
('4c51a993-4b51-11ec-902a-b05adad3c217','1033e3b6-4b51-11ec-902a-b05adad3c217',10, 20),
('4c51a993-4b51-11ec-902a-b05adad3c217','1034dd74-4b51-11ec-902a-b05adad3c217',10, 10),
('4c51a993-4b51-11ec-902a-b05adad3c217','1036a9da-4b51-11ec-902a-b05adad3c217',10, 20),
('4c51a993-4b51-11ec-902a-b05adad3c217','1037b911-4b51-11ec-902a-b05adad3c217',10, 10),
('4c51a993-4b51-11ec-902a-b05adad3c217','103955b3-4b51-11ec-902a-b05adad3c217',10, 20),
('4c51a993-4b51-11ec-902a-b05adad3c217','103a7fbf-4b51-11ec-902a-b05adad3c217',10, 10),
('4c51a993-4b51-11ec-902a-b05adad3c217','103bfff9-4b51-11ec-902a-b05adad3c217',10, 20),
('4c531d92-4b51-11ec-902a-b05adad3c217','102f61f8-4b51-11ec-902a-b05adad3c217',10, 10),
('4c531d92-4b51-11ec-902a-b05adad3c217','1030b8e3-4b51-11ec-902a-b05adad3c217',0, 20),
('4c531d92-4b51-11ec-902a-b05adad3c217','10322a92-4b51-11ec-902a-b05adad3c217',10, 10),
('4c531d92-4b51-11ec-902a-b05adad3c217','1033e3b6-4b51-11ec-902a-b05adad3c217',10, 20),
('4c531d92-4b51-11ec-902a-b05adad3c217','1034dd74-4b51-11ec-902a-b05adad3c217',10, 10),
('4c531d92-4b51-11ec-902a-b05adad3c217','1036a9da-4b51-11ec-902a-b05adad3c217',10, 20),
('4c531d92-4b51-11ec-902a-b05adad3c217','1037b911-4b51-11ec-902a-b05adad3c217',10, 10),
('4c531d92-4b51-11ec-902a-b05adad3c217','103955b3-4b51-11ec-902a-b05adad3c217',10, 20),
('4c531d92-4b51-11ec-902a-b05adad3c217','103a7fbf-4b51-11ec-902a-b05adad3c217',10, 10),
('4c531d92-4b51-11ec-902a-b05adad3c217','103bfff9-4b51-11ec-902a-b05adad3c217',10, 20),
('4c54a982-4b51-11ec-902a-b05adad3c217','102f61f8-4b51-11ec-902a-b05adad3c217',10, 10),
('4c54a982-4b51-11ec-902a-b05adad3c217','1030b8e3-4b51-11ec-902a-b05adad3c217',10, 20),
('4c54a982-4b51-11ec-902a-b05adad3c217','10322a92-4b51-11ec-902a-b05adad3c217',10, 10),
('4c54a982-4b51-11ec-902a-b05adad3c217','1033e3b6-4b51-11ec-902a-b05adad3c217',10, 20),
('4c54a982-4b51-11ec-902a-b05adad3c217','1034dd74-4b51-11ec-902a-b05adad3c217',10, 10),
('4c54a982-4b51-11ec-902a-b05adad3c217','1036a9da-4b51-11ec-902a-b05adad3c217',10, 20),
('4c54a982-4b51-11ec-902a-b05adad3c217','1037b911-4b51-11ec-902a-b05adad3c217',10, 10),
('4c54a982-4b51-11ec-902a-b05adad3c217','103955b3-4b51-11ec-902a-b05adad3c217',10, 20),
('4c54a982-4b51-11ec-902a-b05adad3c217','103a7fbf-4b51-11ec-902a-b05adad3c217',10, 15),
('4c54a982-4b51-11ec-902a-b05adad3c217','103bfff9-4b51-11ec-902a-b05adad3c217',10, 15);
/*!40000 ALTER TABLE `machine_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS `owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS owner(
  id varchar(255) primary key, 
  email varchar(255) not null,  
  password varchar(255) not null,
  name varchar(255) not null,
  UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner`
--

LOCK TABLES `owner` WRITE;
/*!40000 ALTER TABLE `owner` DISABLE KEYS */;
INSERT INTO `owner` VALUES ('f43b629e-234e-4e9b-9532-58d8ac732854', 1234, '$2a$10$OnKLvihviDoXzbLZen3BDO8yQwRg5LEXyH6dEDbWEBHypu1mxSYpC', "Test User");
/*!40000 ALTER TABLE `owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` varchar(255) NOT NULL,
  `price` decimal(4,2) DEFAULT NULL,
  `credit_card_number` varchar(255) DEFAULT NULL,
  `p_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `machine_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `machine_id` (`machine_id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`machine_id`) REFERENCES `machine_items` (`M_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `payment_product`;
CREATE TABLE `payment_product` (
  `payment_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `unit_price` decimal(4,2) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`payment_id`, `product_id`),
  CONSTRAINT `payment_product_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`payment_id`),
  CONSTRAINT `payment_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `items` (`ITEM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `payment_product` WRITE;
/*!40000 ALTER TABLE `payment_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vending_machines`
--

DROP TABLE IF EXISTS `vending_machines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vending_machines` (
  `MACHINE_ID` varchar(255) NOT NULL,
  `FLOOR` int NOT NULL,
  `MACHINE_NUMBER` int NOT NULL,
  `OWNER_ID` varchar(255) NOT NULL,
  PRIMARY KEY (`MACHINE_ID`),
  CONSTRAINT `machines_ibfk_1` FOREIGN KEY (`OWNER_ID`) REFERENCES `owner` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vending_machines`
--

LOCK TABLES `vending_machines` WRITE;
/*!40000 ALTER TABLE `vending_machines` DISABLE KEYS */;
INSERT INTO `vending_machines` VALUES ('4c502e60-4b51-11ec-902a-b05adad3c217',1,1, 'f43b629e-234e-4e9b-9532-58d8ac732854'),('4c51a993-4b51-11ec-902a-b05adad3c217',1,2, 'f43b629e-234e-4e9b-9532-58d8ac732854'),('4c531d92-4b51-11ec-902a-b05adad3c217',2,1, 'f43b629e-234e-4e9b-9532-58d8ac732854'),('4c54a982-4b51-11ec-902a-b05adad3c217',2,2, 'f43b629e-234e-4e9b-9532-58d8ac732854'),('4c55aa1d-4b51-11ec-902a-b05adad3c217',3,1, 'f43b629e-234e-4e9b-9532-58d8ac732854'),('4c574e73-4b51-11ec-902a-b05adad3c217',3,2, 'f43b629e-234e-4e9b-9532-58d8ac732854'),('4c586d6e-4b51-11ec-902a-b05adad3c217',4,1, 'f43b629e-234e-4e9b-9532-58d8ac732854'),('4c59c144-4b51-11ec-902a-b05adad3c217',4,2, 'f43b629e-234e-4e9b-9532-58d8ac732854'),('4c5ac9d1-4b51-11ec-902a-b05adad3c217',5,1, 'f43b629e-234e-4e9b-9532-58d8ac732854'),('4c5c2ab1-4b51-11ec-902a-b05adad3c217',5,2, 'f43b629e-234e-4e9b-9532-58d8ac732854');
/*!40000 ALTER TABLE `vending_machines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'vendiman'
--
/*!50003 DROP PROCEDURE IF EXISTS `nearestMachinecheck` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`172.31.4.95` PROCEDURE `nearestMachinecheck`(
productId varchar(255),
flr int)
BEGIN
select MACHINE_NUMBER,floor from vending_machines
    where MACHINE_ID in (select mi.M_ID from machine_items mi,vending_machines v where v.MACHINE_ID =mi.M_ID and
     v.floor =flr and mi.product_id=productId and quantity>0)
    UNION
    (select MACHINE_NUMBER,floor from vending_machines
    where  MACHINE_ID in(select mi.M_ID from machine_items mi,vending_machines v where v.MACHINE_ID =mi.M_ID and
     v.floor >flr  and mi.product_id=productID and quantity>0))
    UNION
    (select MACHINE_NUMBER,floor from vending_machines
    where  MACHINE_ID in(select mi.M_ID from machine_items mi,vending_machines v where v.MACHINE_ID =mi.M_ID and
     v.floor <flr  and mi.product_id=productId and quantity>0))
    order by floor,MACHINE_NUMBER asc
    limit 3;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `purchaseItems` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;

DROP PROCEDURE IF EXISTS `createPayment`;

DELIMITER ;;
CREATE DEFINER=`root`@`172.31.4.95` PROCEDURE `createPayment`(
paymentId varchar(255),
machineId varchar(255),
cost decimal(4,2),
card_number bigint)
BEGIN

insert into payments (payment_id,price,credit_card_number,machine_id)
values (paymentId,cost,card_number,machineId);

END ;;
DELIMITER ;




DELIMITER ;;
CREATE DEFINER=`root`@`172.31.4.95` PROCEDURE `purchaseItems`(
paymentId varchar(255),
productId varchar(255),
machineId varchar(255),
unit_price decimal(4,2),
count int)
BEGIN


insert into payment_product (payment_id, product_id, unit_price, quantity)
values (paymentId,productId, unit_price, count);

UPDATE machine_items SET Quantity = quantity-count where m_id=machineId and PRODUCT_ID=productId;




END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `quantityCheck` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`172.31.4.95` PROCEDURE `quantityCheck`(
machine_id varchar(255),
p_id varchar(255),
count int)
BEGIN

SELECT quantity from machine_items where product_id =p_id and m_id=machine_id and quantity >=count;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-23 21:21:25

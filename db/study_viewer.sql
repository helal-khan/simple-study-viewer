-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: study_viewer
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

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

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (54);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `id` bigint NOT NULL,
  `created_at` datetime NOT NULL,
  `dob` date NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `person_code` varchar(30) NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_4g2ve6vjua5e5an4vgnj3a4jj` (`person_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (15,'2021-06-27 20:07:26','1993-05-13','Helal','Khan','p1000','2021-06-28 00:28:03'),(22,'2021-06-28 01:39:49','2000-05-28','Promi','Khan','p1002','2021-06-28 01:39:49'),(24,'2021-06-30 09:24:36','2020-08-18','Fatema','Mintaha','p1003','2021-06-30 09:24:36'),(25,'2021-06-30 09:26:31','2021-06-30','Anika','Khatun','p1004','2021-06-30 09:26:31'),(26,'2021-06-30 12:52:12','2021-06-30','Ibrahim','Hossain','p1005','2021-06-30 12:52:12'),(27,'2021-06-30 13:02:38','2021-06-30','Shahin','Hossain','p1006','2021-06-30 13:02:38'),(28,'2021-06-30 13:05:15','2021-06-30','Firoj','Ahmed','p1007','2021-06-30 13:05:15'),(29,'2021-06-30 13:25:52','2021-06-30','Ruma','Khan','p1008','2021-06-30 13:25:52'),(30,'2021-06-30 14:41:43','2021-06-30','Milon','Khan','p1009','2021-06-30 14:41:43'),(32,'2021-06-30 14:47:21','2021-06-16','Sobuj','Ahmed','p1010','2021-06-30 14:47:21'),(34,'2021-06-30 14:48:40','2021-06-30','Shahan','Ahmed','p1011','2021-06-30 14:48:40'),(40,'2021-06-30 14:51:05','2021-06-30','Russel','Ahmed','p1012','2021-06-30 14:51:05'),(41,'2021-06-30 17:20:48','2021-06-30','Rabeya','Khatun','p1013','2021-06-30 17:20:48'),(46,'2021-07-01 08:29:07','2021-07-01','Khadiza','Khatun','p1014','2021-07-01 08:29:07'),(48,'2021-07-01 08:51:37','2021-07-01','Ajuya','Khatun','p1015','2021-07-01 08:51:37'),(50,'2021-07-01 15:28:41','1968-01-01','Abdur','Rahman','p1016','2021-07-01 15:28:41');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study`
--

DROP TABLE IF EXISTS `study`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study` (
  `id` bigint NOT NULL,
  `created_at` datetime NOT NULL,
  `description` text,
  `name` varchar(255) NOT NULL,
  `updated_at` datetime NOT NULL,
  `patient_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdrg7o8kpt69qx8h28v21w0shx` (`patient_id`),
  CONSTRAINT `FKdrg7o8kpt69qx8h28v21w0shx` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study`
--

LOCK TABLES `study` WRITE;
/*!40000 ALTER TABLE `study` DISABLE KEYS */;
INSERT INTO `study` VALUES (21,'2021-06-28 01:15:01','A 90-year-old woman has been a patient of the Beacham Ambulatory Care Center since 2000.  Chronic conditions are pernicious anemia, osteoarthritis, and urinary incontinency.  She is fully functional and fully independent.  She provides care for the homebound husband who has severe COPD.  They live in a row home specifically “close to the hospital” to ensure access to house calls for her husband.','Post Traumatic Stress Disorder','2021-06-28 01:15:01',15),(23,'2021-06-28 01:41:46','HK is an 83 yo woman complaining of pruritic “hives” (small red bumps) one day ago on trunk and thighs accompanied by nausea and lightheadedness. Her left eyelid also became swollen.  Symptoms occurred at rest and lasted two hours.','An Unusual Syncope Case','2021-06-28 01:41:46',22),(42,'2021-06-30 19:07:30','Description','Study for Fatima','2021-06-30 19:07:30',24),(43,'2021-06-30 19:09:04','Description','Study for Anika','2021-07-01 08:03:31',25),(44,'2021-07-01 08:19:19','Description','Study for Russel.','2021-07-01 08:21:02',40),(45,'2021-07-01 08:23:13','Description','Study for Rabeya','2021-07-01 08:23:13',41),(47,'2021-07-01 08:29:57','Description','Study for Shahin','2021-07-01 08:31:28',27),(49,'2021-07-01 08:52:02','Description','Study for Ibrahim','2021-07-01 08:52:35',26);
/*!40000 ALTER TABLE `study` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-01 22:34:38

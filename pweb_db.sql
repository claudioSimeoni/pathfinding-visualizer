-- Exported database

CREATE DATABASE IF NOT EXISTS `pweb_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pweb_db`;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `boards`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `boards` (
  `board_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `repr` text NOT NULL,
  `creation_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`board_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `boards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET FOREIGN_KEY_CHECKS = 1;

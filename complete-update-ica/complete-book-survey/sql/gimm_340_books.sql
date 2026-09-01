-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: bsu-gimm260-fall-2021.cwtgn0g8zxfm.us-west-2.rds.amazonaws.com
-- Generation Time: Feb 15, 2022 at 04:51 AM
-- Server version: 8.0.23
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `in_class_activity`
--

-- --------------------------------------------------------

--
-- Table structure for table `gimm_340_books`
--

CREATE TABLE `gimm_340_books` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `pages` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gimm_340_books`
--

INSERT INTO `gimm_340_books` (`id`, `title`, `author`, `pages`) VALUES
(1, 'Addiction By Design: Machine Gambling in Las Vegas', 'Natasha Schull', 309),
(2, 'AI Superpowers: China, Silicon Valley, and the New World Order', 'Kai-Fu Lee', 232),
(3, 'Tools and Weapons: The Promise and the Peril of the Digital Age', 'Brad Smith', 384),
(4, 'Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy', 'Cathy O\'Neil', 231),
(5, 'The Metaverse: And How It Will Revolutionize Everything', 'Matthew Ball', 352),
(6, 'The Age of Surveillance Capitalism: The Fight For a Human Future at the New Frontier of Power', 'Shoshana Zuboff', 525),
(7, "Chip War: The Fight for the World's Most Critical Technology", 'Chris Miller', 464),
(8, 'What We Owe the Future', 'William MacAskill', 352);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gimm_340_books`
--
ALTER TABLE `gimm_340_books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gimm_340_books`
--
ALTER TABLE `gimm_340_books`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

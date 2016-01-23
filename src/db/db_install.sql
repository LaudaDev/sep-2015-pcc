-- Table structure for Issuer bank
DROP TABLE IF EXISTS `issuer`;
CREATE TABLE `issuer` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
	`pan` varchar(6) NOT NULL DEFAULT "000000",
	`url` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

-- Table data for Issuer bank
INSERT INTO `issuer` (`pan`, `url`) VALUES
('123456', 'http://localhost:8002/api/issuer/'),
('112233', 'http://localhost:8002/api/issuer/'),
('445566', 'http://localhost:8002/api/issuer/');

-- Table structure for logging transactions over PCC (Payment Card Center)
DROP TABLE IF EXISTS `transaction_log`;
CREATE TABLE `transaction_log` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
	`logTimestamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`acquirerOrderId` int(10) NOT NULL,
	`acquirerTimestamp` varchar(255) NOT NULL,
	`transactionAmount` float(10,2) NOT NULL,
	`issuerId` int(10) NOT NULL,
	`issuerOrderId` int(10) NOT NULL,
	`issuerTimestamp` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

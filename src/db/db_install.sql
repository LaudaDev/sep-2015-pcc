DROP TABLE IF EXISTS `issuer`;
CREATE TABLE `issuer` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
	`pan` varchar(6) NOT NULL DEFAULT "000000",
	`url` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO `issuer` (`pan`, `url`) VALUES ('123456', 'http://localhost:8100/api/issuer/'), ('112233', 'http://localhost:8100/api/issuer/'), ('445566', 'http://localhost:8100/api/issuer/');

DROP TABLE IF EXISTS `transaction_log`;
CREATE TABLE `transaction_log` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
	`trnTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`issuerId` varchar(10) NOT NULL,
	`data` varchar(255) NOT NULL DEFAULT "N/A",
	PRIMARY KEY (`id`)
);
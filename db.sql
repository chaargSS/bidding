
CREATE DATABASE bids;
use bids;
CREATE TABLE IF NOT EXISTS  `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT ,
   `name` varchar(250) NOT NULL ,
   `email` varchar(250) NOT NULL ,
   `bids` INT(50) NOT NULL ,
   `password` varchar(250) NOT NULL ,   
   `salt` varchar(10) NOT NULL ,
   PRIMARY KEY (`id`)
  )   DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

  CREATE TABLE IF NOT EXISTS  `bids` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `bid_id` int(10) NOT NULL  ,
   `name` varchar(250) NOT NULL ,   
    `amount` varchar(50) NOT NULL ,
   PRIMARY KEY (`id`)
  )   DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
  
  SELECT * FROM users;
   SELECT * FROM bids;
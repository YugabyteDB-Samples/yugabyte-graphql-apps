\c hasuratest
CREATE TABLE user_orders (
	
	userID BIGINT NOT NULL ,
	orderID VARCHAR NOT NULL ,
	orderTotal VARCHAR NOT NULL ,
	orderDetails VARCHAR NOT NULL,
	orderTime TIMESTAMP NOT NULL,
	PRIMARY KEY (userID HASH, orderID ASC)
);

ALTER TABLE user_orders ADD FOREIGN KEY (userID) REFERENCES user_account(userID);
\c hasuratest
CREATE TABLE user_account (
	
	userID BIGINT NOT NULL ,
	accountName VARCHAR ,
	givenName VARCHAR ,
	middleName VARCHAR ,
	familyName VARCHAR ,
	userGender VARCHAR ,
	userAge INT,
	dob TIMESTAMP,
	address1 VARCHAR ,
	address2 VARCHAR ,
	city VARCHAR ,
	zip VARCHAR ,
	email VARCHAR ,
	homePhone VARCHAR ,
	mobilePhone VARCHAR ,
	country VARCHAR ,
	company VARCHAR ,
	companyEmail VARCHAR ,
	active BOOLEAN ,
	PRIMARY KEY (userID HASH)
);

CREATE INDEX user_fname ON user_account (givenName) ;
CREATE INDEX user_lname ON user_account (familyName) ;

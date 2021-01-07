\c hasuratest
CREATE TABLE events (
	
	label VARCHAR NOT NULL ,
	connection_id INT NOT NULL ,
	operation_id INT NOT NULL ,
	event_number INT NOT NULL ,
	event_data JSONB NOT NULL ,
	event_time TIMESTAMP NOT NULL ,
	is_error BOOLEAN NOT NULL ,
	latency INT ,
	PRIMARY KEY (connection_id HASH, label, operation_id, event_number)
);
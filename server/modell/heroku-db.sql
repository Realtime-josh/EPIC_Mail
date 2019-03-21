CREATE TABLE IF NOT EXISTS users
 (
     userid serial NOT NULL,
     firstname text NOT NULL,
     lastname text NOT NULL,
     email text NOT NULL PRIMARY KEY,
     token text NOT NULL,
     password text NOT NULL,
 );

CREATE TABLE IF NOT EXISTS message
 (
    createdon date NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    status text NOT NULL,
    senderid integer NOT NULL,
    receiverid integer NOT NULL,
    messageid serial NOT NULL PRIMARY KEY,
 );
 
 CREATE TABLE IF NOT EXISTS group_table
 ( 
   group_name text NOT NULL,
    role text NOT NULL,
    user_id integer,
    group_id serial NOT NULL PRIMARY KEY,
 );

  CREATE TABLE IF NOT EXISTS cart
 (
    user_id integer NOT NULL PRIMARY KEY,
    role text NOT NULL,
    group_id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
 );




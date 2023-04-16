# REST API - Course Assignment
# Application Installation and Usage Instructions
##Prerequisites
Node.js v18.15.0 or higher
MySQL Workbench or a similar MySQL database management tool

##Installation

Clone the repository or download the project files to your local machine.
Navigate to the project root directory in your terminal or command prompt.
Run npm install to install all the required dependencies.
Database Setup
Open MySQL Workbench or your preferred MySQL database management tool.

Run the following SQL script to create the myTodo database:
CREATE SCHEMA myTodo;

Run the following SQL script to create an admin database user with all privileges:
CREATE USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'P@ssw0rd';
ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'P@ssw0rd';
GRANT ALL PRIVILEGES ON myTodo.* TO 'admin'@'localhost';

Update the .env file in the project root directory with the correct credentials provided under in the environment variables.

Run the application with the command npm start. Sequelize will create the necessary tables and relationships in the "myTodo" database.

##Usage
Use Postman or another API testing tool to test the available API endpoints. The server runs on port 3000 by default.

POSTMAN Documentation link:

https://documenter.getpostman.com/view/2s93XyTiRt?version=latest

To run tests, use the command npm test. This will run the tests with Jest.

# Environment Variables
HOST = "localhost"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "P@ssw0rd"
DATABASE_NAME = "myTodo"
DIALECT = "mysql"
PORT = "3000"
TOKEN_SECRET=48dd64ce6db61eb571578ea7be733b8d0fdd63ed8711e606175d35e1eb48349e1e1113fcff850c21ede10233737b4be6d2dfdc99f61ba77feb6f70e9c4d36696

credentials testuser:

name: "testuser",
email: "test@gmail.com",
password: "0000"

# Additional Libraries/Packages
cookie-parser: Middleware for parsing cookies from the request headers. Version: ~1.4.4
debug: A small debugging utility that makes it easier to log information during development. Version: ~2.6.9
dotenv: A package for loading environment variables from the .env file. Version: ^16.0.3
ejs: Embedded JavaScript templating engine for rendering server-side HTML templates. Version: ^3.1.8
express: A web framework for Node.js, used for handling HTTP requests and responses. Version: ^4.18.2
http-errors: Utility for creating HTTP error objects with status codes and messages. Version: ~1.6.3
jest: A testing framework for JavaScript, used for writing and running tests. Version: ^29.5.0
jsend: A package for formatting API responses in JSend format. Version: ^1.1.0
jsonwebtoken: A package for handling JSON Web Tokens, used for user authentication. Version: ^9.0.0
morgan: HTTP request logger middleware for Node.js, used for logging HTTP requests in the console. Version: ~1.9.1
mysql: A Node.js driver for MySQL, used for connecting to MySQL databases. Version: ^2.18.1
mysql2: A fast Node.js MySQL client with a focus on performance, used as a dialect for Sequelize. Version: ^3.1.2
sequelize: An ORM for Node.js, used for handling database operations. Version: ^6.29.0
supertest: A testing library for testing HTTP endpoints, used for writing API tests. Version: ^6.3.3

# NodeJS Version Used
This application was developed using Node.js v18.15.0

# POSTMAN Documentation link

https://documenter.getpostman.com/view/2s93XyTiRt?version=latest
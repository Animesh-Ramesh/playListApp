PlayListApp
Welcome to the PlayListApp GitHub repository! This project is a simple music playlist app that allows users to create and manage their own playlists.

Getting Started

Clone the repository by running the following command:
git clone https://github.com/ranimesh29/playListApp.git

Download and install MySQL server (https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/).

Start MYSQL server (mysql -u root) and create a new database for the project (CREATE DATABASE Playlist).

Create the required songs table using the ParseData Java Project.

Navigate to the "ParseData" directory by running the command cd playListApp/ParseData
Build the project using a build tool such as Maven. The project uses Maven, you can build it by running the command mvn clean install. 
Once the project is built, you can run it by executing the command mvn exec:java
Please note that these steps assume that you have Java and a build tool (Maven) already installed on your machine(https://maven.apache.org/index.html). 

Navigate to the root directory of the project and run the following command to install the dependencies:
mvn clean install
Start the Spring server by running:
./mvnw spring-boot:run
In a separate terminal, navigate to the client folder and install the required dependencies by running:
Copy code
npm install
Start the React development server by running:
Copy code
npm start
The app will be running at http://localhost:3000.

Features
Create and manage playlists
Add and remove songs from playlists
Search for songs
Built With
Spring Boot
MySQL
React
Redux
Firebase
Note
Please make sure to configure the database credentials in application.properties file located in src/main/resources before running the Spring server.




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

Please make sure to configure the database credentials in application.properties.

Please note that these steps assume that you have Java and a build tool (Maven) already installed on your machine(https://maven.apache.org/index.html). 

Run the Backend to expose API

Navigate to the project directory by running the command cd playlist

Build the project by running the command mvn clean install

Run the project by executing the command mvn spring-boot:run

Please make sure to configure the database credentials in application.properties file located in src/main/resources before running the Spring server.

Please note that these steps assume that you have Java and a build tool (Maven) already installed on your machine(https://maven.apache.org/index.html).

List of APIs exposed

GET /api/songs : This API will retrieve a list of all songs. It will accept an optional query parameter all which if set to true will return all songs, otherwise it will return a paginated list of songs.

The API GET /api/songs has pagination parameters that can be passed as query parameters in the request.

page: This parameter is used to specify the page number of the results to be returned. The default value is 0.

size: This parameter is used to specify the number of results per page. The default value is 20.

sort: This parameter is used to specify the sorting criteria for the results. The format is property,asc|desc

For example, to retrieve the second page of results with 10 results per page and sorting by title in ascending order, the following request can be made:
GET /api/songs?page=1&size=10&sort=title,asc

Please note that the specific behavior of these parameters may depend on the implementation of the findAll method in the SongService class.

GET /api/songs/title?name={title} : This API will retrieve a list of songs by title. It will accept a query parameter name which is the title of the song.

GET /api/songs/count : This API will retrieve the total number of songs in the database.

PUT /api/songs/id/rate : This API will update the rating of a song by id. It will accept a request body of int rating and query parameter "id" which is the id of the song.

Running UI

In a separate terminal, navigate to the playlistApp folder and install the required dependencies by running:

sudo npm install --legacy-peer-deps or npm install --legacy-peer-deps

Start the React development server by running:

sudo npm start or npm start

The app will be running at http://localhost:3000.


Features:-
Manage playlist
Search for songs
Update Star Rating

Built With:-
Spring Boot
MySQL
React


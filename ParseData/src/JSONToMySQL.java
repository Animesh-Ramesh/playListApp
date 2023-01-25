import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Properties;

public class JSONToMySQL {
    public static void main(String[] args) {
        Properties prop = new Properties();
        try (FileInputStream input = new FileInputStream("application.properties")) {
            prop.load(input);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        String url = prop.getProperty("spring.datasource.url");
        String username = prop.getProperty("spring.datasource.username");
        String password = prop.getProperty("spring.datasource.password");

        JSONParser parser = new JSONParser();
        try (Connection conn = DriverManager.getConnection(url, username, password)) {
            // Create the songs table
            String createTableSQL = "CREATE TABLE songs (id varchar(255) NOT NULL PRIMARY KEY, title varchar(255) NOT NULL, danceability double NOT NULL, energy double NOT NULL, mode bigint NOT NULL, acousticness double NOT NULL, tempo double NOT NULL, duration_ms bigint NOT NULL, num_sections bigint NOT NULL, num_segments bigint NOT NULL, star_rating int NOT NULL DEFAULT 0)";

            Statement createStatement = conn.createStatement();
            createStatement.execute(createTableSQL);
            createStatement.close();
            // Parse the JSON file
            Object obj = parser.parse(new FileReader("playlist.json"));
            JSONObject jsonObject = (JSONObject) obj;
            // Prepare the SQL statement
            String sql = "INSERT INTO songs (id, title, danceability, energy, mode, acousticness, tempo, duration_ms, num_sections, num_segments, star_rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement statement = conn.prepareStatement(sql);
            // Normalize the data
            JSONObject idMap = (JSONObject) jsonObject.get("id");
            JSONObject titleMap = (JSONObject) jsonObject.get("title");
            JSONObject danceabilityMap = (JSONObject) jsonObject.get("danceability");
            JSONObject energyMap = (JSONObject) jsonObject.get("energy");
            JSONObject modeMap = (JSONObject) jsonObject.get("mode");
            JSONObject acousticnessMap = (JSONObject) jsonObject.get("acousticness");
            JSONObject tempoMap = (JSONObject) jsonObject.get("tempo");
            JSONObject durationMap = (JSONObject) jsonObject.get("duration_ms");
            JSONObject numSectionsMap = (JSONObject) jsonObject.get("num_sections");
            JSONObject numSegmentsMap = (JSONObject) jsonObject.get("num_segments");
            // Iterate through the maps and add the data to the SQL statement
            for (int i = 0; i < 100; i++) {
                statement.setString(1, (String) idMap.get(String.valueOf(i)));
                statement.setString(2, (String) titleMap.get(String.valueOf(i)));
                statement.setDouble(3, (Double) danceabilityMap.get(String.valueOf(i)));
                statement.setDouble(4, (Double) energyMap.get(String.valueOf(i)));
                statement.setLong(5, (Long) modeMap.get(String.valueOf(i)));
                statement.setDouble(6, (Double) acousticnessMap.get(String.valueOf(i)));
                statement.setDouble(7, (Double) tempoMap.get(String.valueOf(i)));
                statement.setLong(8, (Long) durationMap.get(String.valueOf(i)));
                statement.setLong(9, (Long) numSectionsMap.get(String.valueOf(i)));
                statement.setLong(10, (Long) numSegmentsMap.get(String.valueOf(i)));
                statement.setInt(11,0);
                statement.addBatch();
            }
            statement.executeBatch();
            statement.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


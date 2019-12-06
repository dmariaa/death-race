package es.dmariaa.deathrace.server.data;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;

public class HighScoresList {
    private String highScoreFile = "data/HighScores.json";

    private ArrayList<HighScore> list;
    private ObjectMapper objectMapper;

    private HighScoresList() throws IOException {
        objectMapper = new ObjectMapper();
        list = ReadFromFile();
    }

    private static HighScoresList _instance;

    public static synchronized HighScoresList getInstance() throws IOException {
        if(_instance==null) {
            _instance = new HighScoresList();
        }
        return _instance;
    }

    private String GetHighScoresFileName() throws IOException {
        Resource resourcePath = new ClassPathResource(highScoreFile);
        Path file = Paths.get(resourcePath.getURI());
        String fileName = file.toString();
        return fileName;
    }

    private void WriteToFile() throws IOException {
            File highScoresJSONFile = new File(GetHighScoresFileName());

            if(!highScoresJSONFile.exists()) {
                highScoresJSONFile.createNewFile();
            }

            FileOutputStream fileOutputStream = new FileOutputStream(highScoresJSONFile);
            OutputStreamWriter writer = new OutputStreamWriter(fileOutputStream, "UTF-8");

            String json = objectMapper.writeValueAsString(list);
            writer.write(json);

            writer.flush();
            writer.close();
            fileOutputStream.close();
    }

    private ArrayList<HighScore> ReadFromFile() throws IOException {
        File highScoresJSONFile = new File(GetHighScoresFileName());

        if(!highScoresJSONFile.exists()) {
            return new ArrayList<HighScore>();
        }

        FileInputStream fileInputStream = new FileInputStream(highScoresJSONFile);
        InputStreamReader reader = new InputStreamReader(fileInputStream, "UTF-8");
        ArrayList<HighScore> readList = objectMapper.readValue(reader, new TypeReference<ArrayList<HighScore>>() {});
        return readList;
    }

    public String Get() throws JsonProcessingException {
        return objectMapper.writeValueAsString(list);
    }

    public String Add(HighScore highScore) throws IOException {
        list.add(highScore);
        Collections.sort(list);
        WriteToFile();
        return Get();
    }
}

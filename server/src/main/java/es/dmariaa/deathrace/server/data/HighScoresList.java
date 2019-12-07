package es.dmariaa.deathrace.server.data;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;


public class HighScoresList {
    Logger logger = LoggerFactory.getLogger(HighScoresList.class);

    private String highScoreFile = "HighScores.json";

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
        String fileName = DataUtilities.getInstance().getDataLocation(highScoreFile);
        return fileName;
    }

    private void WriteToFile() throws IOException {
            File highScoresJSONFile = new File(GetHighScoresFileName());

            if(!highScoresJSONFile.exists()) {
                highScoresJSONFile.getParentFile().mkdirs();
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

    public synchronized String Add(HighScore highScore) throws IOException {
        list.add(highScore);
        Collections.sort(list);
        WriteToFile();
        return Get();
    }
}

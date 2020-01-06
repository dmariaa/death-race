package es.dmariaa.deathrace.server.data;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.AnnotatedMember;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.UUID;

@Service
public class PlayerList {
    private String playerFile = "PlayersPreferences.json";

    private ObjectMapper objectMapper;

    private ArrayList<Player> list;

    private PlayerList() throws IOException {
        objectMapper = new ObjectMapper();
        list = ReadFromFile();
    }

    private String GetPlayerListFileName() {
        String fileName = DataUtilities.getInstance().getDataLocation(playerFile);
        return fileName;
    }

    private ArrayList<Player> ReadFromFile() throws IOException {
        File playerListFile = new File(GetPlayerListFileName());

        if(!playerListFile.exists()) {
            return new ArrayList<Player>();
        }

        FileInputStream fileInputStream = new FileInputStream(playerListFile);
        InputStreamReader reader = new InputStreamReader(fileInputStream, "UTF-8");
        ArrayList<Player> readList = objectMapper.readValue(reader, new TypeReference<ArrayList<Player>>() {});
        return readList;
    }

    private void WriteToFile() throws IOException {
        File playerListFile = new File(GetPlayerListFileName());

        if(!playerListFile.exists()) {
            playerListFile.getParentFile().mkdirs();
            playerListFile.createNewFile();
        }

        FileOutputStream fileOutputStream = new FileOutputStream(playerListFile);
        OutputStreamWriter writer = new OutputStreamWriter(fileOutputStream, "UTF-8");

        ObjectMapper mapper = new ObjectMapper();
        mapper.setAnnotationIntrospector(new JsonIgnoreDisabler());
        String json = mapper.writeValueAsString(list);
        writer.write(json);

        writer.flush();
        writer.close();
        fileOutputStream.close();
    }

    static class JsonIgnoreDisabler extends  JacksonAnnotationIntrospector {
        @Override
        public boolean hasIgnoreMarker(final AnnotatedMember m){
            return false;
        }
    }


    public ArrayList<Player> Get() throws JsonProcessingException {
        return list;
    }

    public synchronized Player Add(Player player) throws IOException {
        list.add(player);
        WriteToFile();
        return player;
    }

    public synchronized Player Replace(Player player) throws IOException {
        list.remove(player);
        list.add(player);
        return player;
    }

    public Player GetOne(String uuid) {
        UUID searchUUID;
        try {
            searchUUID = UUID.fromString(uuid);
        } catch(IllegalArgumentException e) {
            return null;
        }

        for(int i=0, length=list.size(); i < length; i++) {
            UUID playerUUID = list.get(i).getUuid();
            if(playerUUID.equals(searchUUID)) {
                return list.get(i);
            }
        }
        return null;
    }

    public Player GetOneByName(String name) {
        for(int i=0, length=list.size(); i < length; i++) {
            String userName = list.get(i).getName();
            if(userName.equals(name)) {
                return list.get(i);
            }
        }
        return null;
    }
}

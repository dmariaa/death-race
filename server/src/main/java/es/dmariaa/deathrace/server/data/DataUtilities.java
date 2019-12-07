package es.dmariaa.deathrace.server.data;

import es.dmariaa.deathrace.server.App;
import net.harawata.appdirs.AppDirs;
import net.harawata.appdirs.AppDirsFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.system.ApplicationHome;

import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;

public class DataUtilities {
    private static Logger logger = LoggerFactory.getLogger(DataUtilities.class);

    private static DataUtilities _instance;

    public static DataUtilities getInstance() {
        if(_instance==null) {
            _instance = new DataUtilities();
        }
        return _instance;
    }

    private DataUtilities() {
    }

    public String getDataLocation(String fileName)
    {
        // String home = (new ApplicationHome(App.class)).getDir().getPath();

        String home = AppDirsFactory.getInstance().getUserDataDir("death-race", null, "es.dmariaa");
        Path path = Paths.get(home, "data", fileName);
        logger.info(String.format("Retreived data location: %s", path.toString()));
        return path.toString();
    }
}

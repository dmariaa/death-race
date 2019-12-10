package es.dmariaa.deathrace.server.data;

public class LoginData {
    private String uuid;
    private String name;
    private String password;

    public LoginData(String uuid, String name, String password) {
        this.uuid = uuid;
        this.name = name;
        this.password = password;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

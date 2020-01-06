package es.dmariaa.deathrace.server.services;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RandomGenerator implements ApplicationContextAware {
    public String generateRandomPassword() {
        return UUID.randomUUID().toString();
    }

    public String generateRandomName(String prefix) {
        return String.format("%s %s", prefix, RandomStringUtils.randomAlphanumeric(8));
    }

    private static RandomGenerator _instance;

    public static RandomGenerator Instance() {
        return _instance;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        _instance = applicationContext.getBean(RandomGenerator.class);
    }
}

package com.edmunds.widgets;

import java.util.concurrent.TimeUnit;

import com.edmunds.widgets.responsive.WindowSize;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

import cucumber.api.CucumberOptions;
import cucumber.api.java.After;
import cucumber.api.java.Before;
import cucumber.api.testng.AbstractTestNGCucumberTests;

@CucumberOptions(format = "json:target/cucumber-report.json")

public class RunCukesTest extends AbstractTestNGCucumberTests {

    private static final String DEFAULT_BROWSER = "phantomjs";
    private static final String DEFAULT_URL = "http://localhost:5000";
    private static String baseUrl;
    private static WebDriver driver;

    @Before
    public void setUp() throws InterruptedException {
        baseUrl = System.getProperty("url");
        if (baseUrl == null) {
            baseUrl = DEFAULT_BROWSER;
        }
        String browser = System.getProperty("browser");
        if (browser == null) {
            browser = DEFAULT_URL;
        }
        setDriver(browser);
        setWindowSize(WindowSize.LARGE);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    }

    @After
    public void tearDown() {
        driver.quit();
    }

    public static String getUrl(String page) {
        return baseUrl + page;
    }

    private static void setDriver(String browser) {
        switch (browser) {
            case "firefox":
                driver = new FirefoxDriver(DesiredCapabilities.firefox());
                break;
            case "phantomjs":
            default:
                driver = new PhantomJSDriver(DesiredCapabilities.phantomjs());
        }
    }

    public static WebDriver getDriver() {
        return driver;
    }

    public static void navigate(String page) {
        driver.get(getUrl(page));
    }

    public static void setWindowSize(WindowSize windowSize) {
        driver.manage().window().setSize(windowSize.getDimension());
    }

}
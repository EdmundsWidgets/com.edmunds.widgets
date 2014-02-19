package com.edmunds.widgets.ui;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static com.edmunds.widgets.RunCukesTest.getDriver;

public class WaitFor {

    private static final long TIMEOUT_IN_SECONDS = 5;

    public static void applyingVehicleApiKey() {
        By locator = By.cssSelector("#vehicle-api-key-control div[data-section='change']");
        WebDriverWait wait = new WebDriverWait(getDriver(), TIMEOUT_IN_SECONDS);
        wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static void applyingDealerApiKey() {
        By locator = By.cssSelector("#dealer-api-key-control div[data-section='change']");
        WebDriverWait wait = new WebDriverWait(getDriver(), TIMEOUT_IN_SECONDS);
        wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static void applyingZipCode() {
        By locator = By.cssSelector("#zip-code-control div[data-section='change']");
        WebDriverWait wait = new WebDriverWait(getDriver(), TIMEOUT_IN_SECONDS);
        wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static void applyingZipCodeForTMVWidget(String zipCode) {
        By locator = By.cssSelector("#tmvwidget .tmvwidget-zip");
        WebDriverWait wait = new WebDriverWait(getDriver(), TIMEOUT_IN_SECONDS);
        wait.until(ExpectedConditions.textToBePresentInElementValue(locator, zipCode));
    }

    public static void presenceOfTMVWidget() {
        WebDriverWait wait = new WebDriverWait(getDriver(), TIMEOUT_IN_SECONDS);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("tmvwidget")));
    }

    public static void cssValue(WebElement element, String propertyName, String propertyValue) {
        WebDriverWait wait = new WebDriverWait(getDriver(), TIMEOUT_IN_SECONDS);
        wait.until(CustomExpectedConditions.cssValueToBePresentInElement(element, propertyName, propertyValue));
    }

}

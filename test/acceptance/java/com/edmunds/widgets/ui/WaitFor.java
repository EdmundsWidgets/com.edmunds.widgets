package com.edmunds.widgets.ui;

import static com.edmunds.widgets.RunCukesTest.getDriverWait;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class WaitFor {

    private WaitFor() {
        // Utility class
    }

    public static void applyingVehicleApiKey() {
        By locator = By.cssSelector("#vehicle-api-key-control div[data-section='change']");
        getDriverWait().until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static void applyingDealerApiKey() {
        By locator = By.cssSelector("#dealer-api-key-control div[data-section='change']");
        getDriverWait().until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static void applyingZipCode() {
        By locator = By.cssSelector("#zip-code-control div[data-section='change']");
        getDriverWait().until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static void applyingZipCodeForTMVWidget(String zipCode) {
        By locator = By.cssSelector("#tmvwidget .tmvwidget-zip");
        getDriverWait().until(ExpectedConditions.textToBePresentInElementValue(locator, zipCode));
    }

    public static void presenceOfTMVWidget() {
        getDriverWait().until(ExpectedConditions.presenceOfElementLocated(By.id("tmvwidget")));
    }

    public static void presenceOfNVCWidget() {
        getDriverWait().until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#nvcwidget iframe")));
    }

    public static void cssValue(WebElement element, String propertyName, String propertyValue) {
        getDriverWait().until(CustomExpectedConditions.cssValueToBePresentInElement(element, propertyName, propertyValue));
    }

}

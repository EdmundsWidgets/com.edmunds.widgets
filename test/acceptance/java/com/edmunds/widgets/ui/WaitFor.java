package com.edmunds.widgets.ui;

import static com.edmunds.widgets.RunCukesTest.getDriver;
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

    public static void stalenessOfTMVWidget() {
        WebElement element = getDriver().findElement(By.id("tmvwidget"));
        getDriverWait().until(ExpectedConditions.stalenessOf(element));
    }

    public static void presenceOfNVCWidget() {
        getDriverWait().until(ExpectedConditions.presenceOfElementLocated(By.id("nvcwidget")));
    }

    public static void stalenessOfNVCWidget() {
        WebElement element = getDriver().findElement(By.id("nvcwidget"));
        getDriverWait().until(ExpectedConditions.stalenessOf(element));
    }

    public static void stalenessOfElement(WebElement element) {
        getDriverWait().until(ExpectedConditions.stalenessOf(element));
    }

    public static void attributeValue(WebElement element, String attributeName, String attributeValue) {
        getDriverWait().until(CustomExpectedConditions.attributeValueToBePresentInElement(element, attributeName, attributeValue));
    }

    public static void attributeValue(By locator, String attributeName, String attributeValue) {
        getDriverWait().until(CustomExpectedConditions.attributeValueToBePresentInElement(locator, attributeName, attributeValue));
    }

    public static void cssValue(WebElement element, String propertyName, String propertyValue) {
        getDriverWait().until(CustomExpectedConditions.cssValueToBePresentInElement(element, propertyName, propertyValue));
    }

    public static void cssValue(By locator, String propertyName, String propertyValue) {
        getDriverWait().until(CustomExpectedConditions.cssValueToBePresentInElement(locator, propertyName, propertyValue));
    }

    public static void presenceOfIncludedMakes() {
        getDriverWait().until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".list-group-makes .list-group-item")));
    }

    public static void textToBePresentInMakesSelectOfTMVWidget(String text) {
        By locator = By.cssSelector("#tmvwidget select.tmvwidget-make option:first-child");
        getDriverWait().until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
    }

    public static void textToBePresentInMakesSelectOfNVCWidget(String text) {
        By locator = By.cssSelector("#nvcwidget .vehicle-style-configurator select:first-child option:first-child");
        getDriverWait().until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
    }

}

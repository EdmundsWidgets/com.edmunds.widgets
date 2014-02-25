package com.edmunds.widgets.ui;

import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;

public class CustomExpectedConditions {

    public static ExpectedCondition<Boolean> attributeValueToBePresentInElement(
            final WebElement element, final String attributeName, final String attributeValue) {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                try {
                    String value = element.getAttribute(attributeName);
                    return value != null ? value.equals(attributeValue) : attributeValue == null;
                } catch (StaleElementReferenceException e) {
                    return null;
                }
            }
            @Override
            public String toString() {
                return String.format("text ('%s') to be the value of ('%s') attribute",
                        attributeValue, attributeName);
            }
        };
    }

    public static ExpectedCondition<Boolean> attributeValueToBePresentInElement(
            final By locator, final String attributeName, final String attributeValue) {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                WebElement element = driver.findElement(locator);
                try {
                    String value = element.getAttribute(attributeName);
                    return value != null ? value.equals(attributeValue) : attributeValue == null;
                } catch (StaleElementReferenceException e) {
                    return null;
                }
            }
            @Override
            public String toString() {
                return String.format("text ('%s') to be the value of ('%s') attribute",
                        attributeValue, attributeName);
            }
        };
    }

    public static ExpectedCondition<Boolean> cssValueToBePresentInElement(
            final WebElement element, final String propertyName, final String propertyValue) {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                try {
                    String value = element.getCssValue(propertyName);
                    return value != null ? value.equals(propertyValue) : propertyValue == null;
                } catch (StaleElementReferenceException e) {
                    return null;
                }
            }
            @Override
            public String toString() {
                return String.format("text ('%s') to be the value of ('%s') CSS property",
                        propertyValue, propertyName);
            }
        };
    }

    public static ExpectedCondition<Boolean> cssValueToBePresentInElement(
            final By locator, final String propertyName, final String propertyValue) {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                WebElement element = driver.findElement(locator);
                try {
                    String value = element.getCssValue(propertyName);
                    return value != null ? value.equals(propertyValue) : propertyValue == null;
                } catch (StaleElementReferenceException e) {
                    return null;
                }
            }
            @Override
            public String toString() {
                return String.format("text ('%s') to be the value of ('%s') CSS property",
                        propertyValue, propertyName);
            }
        };
    }

}

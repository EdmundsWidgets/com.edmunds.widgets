package com.edmunds.widgets.ui;

import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;

public class CustomExpectedConditions {

    public static ExpectedCondition<Boolean> cssValueToBePresentInElement(
            final WebElement element, final String propertyName, final String propertyValue) {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                try {
                    String value = element.getCssValue(propertyName);
                    if (value != null) {
                        return value.equals(propertyValue);
                    } else {
                        return false;
                    }
                } catch (StaleElementReferenceException e) {
                    return null;
                }
            }
        };
    }

}

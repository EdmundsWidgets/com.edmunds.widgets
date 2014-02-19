package com.edmunds.widgets.ui;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static com.edmunds.widgets.RunCukesTest.getDriver;

public class TMVWidget {

    private WebElement element;

    public TMVWidget(WebElement element) {
        this.element = element;
    }

    public WebElement findZipCodeInput() {
        return element.findElement(By.tagName("input"));
    }

}

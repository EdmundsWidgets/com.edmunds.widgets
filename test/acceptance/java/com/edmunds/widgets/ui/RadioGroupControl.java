package com.edmunds.widgets.ui;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;

import java.util.List;

public class RadioGroupControl {

    private final WebElement element;

    public RadioGroupControl(WebElement element) {
        this.element = element;
    }

    public WebElement getSelectedOption() {
        List<WebElement> labels = element.findElements(By.tagName("label"));
        for (WebElement label : labels) {
            WebElement input = label.findElement(By.tagName("input"));
            if (input.isSelected()) {
                return label;
            }
        }
        throw new NoSuchElementException("No options are selected");
    }

    public void selectByText(String text) {
        List<WebElement> labelElements = element.findElements(By.tagName("label"));
        for (WebElement labelElement : labelElements) {
            if (labelElement.getText().equals(text)) {
                labelElement.click();
                break;
            }
        }
    }

    public void selectByPartialText(String text) {
        List<WebElement> labelElements = element.findElements(By.tagName("label"));
        for (WebElement labelElement : labelElements) {
            if (labelElement.getText().contains(text)) {
                labelElement.click();
                break;
            }
        }
    }

    public void selectByValue(String value) {
        List<WebElement> labelElements = element.findElements(By.tagName("input"));
        for (WebElement labelElement : labelElements) {
            if (labelElement.getAttribute("value").equals(value)) {
                labelElement.click();
                break;
            }
        }
    }

}

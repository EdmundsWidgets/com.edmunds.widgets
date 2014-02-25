package com.edmunds.widgets.ui;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;

public class IncludedMakesControl {

    private WebElement element;

    public IncludedMakesControl(WebElement element) {
        this.element = element;
    }

    public WebElement findItemByText(String text) {
        String xpath = String.format("*[contains(@class,'list-group-item')][text()='%s']", text);
        return element.findElement(By.xpath(xpath));
    }

    private boolean isItemSelected(WebElement element) {
        return element.findElement(By.tagName("input")).isSelected();
    }

    public void selectByText(String text) {
        WebElement element = findItemByText(text);
        if (!isItemSelected(element)) {
            element.click();
        }
    }

    public void selectByText(List<String> textStrings) {
        for (String text : textStrings) {
            selectByText(text);
        }
    }

    public void deselectByText(String text) {
        WebElement element = findItemByText(text);
        if (isItemSelected(element)) {
            element.click();
        }
    }

    public void deselectByText(List<String> textStrings) {
        for (String text : textStrings) {
            deselectByText(text);
        }
    }

    public List<WebElement> getItems() {
        return element.findElements(By.className("list-group-item"));
    }

    public List<WebElement> getSelectedItems() {
        List<WebElement> items = getItems();
        List<WebElement> selectedItems = new ArrayList<>();
        for (WebElement item : items) {
            if (isItemSelected(item)) {
                selectedItems.add(item);
            }
        }
        return selectedItems;
    }

}

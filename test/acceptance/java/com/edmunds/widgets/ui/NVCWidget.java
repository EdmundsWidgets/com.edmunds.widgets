package com.edmunds.widgets.ui;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

import java.util.ArrayList;
import java.util.List;

public class NVCWidget {

    private final WebElement element;

    public NVCWidget(WebElement element) {
        this.element = element;
    }

    public WebElement findMakesSelectElement() {
        return element.findElement(By.cssSelector(".vehicle-style-configurator select:first-child"));
    }

    public Select findMakesSelect() {
        return new Select(findMakesSelectElement());
    }

    public List<String> getMakeNames() {
        List<String> makeNames = new ArrayList<>();
        List<WebElement> options = findMakesSelect().getOptions();
        options.remove(0);
        for (WebElement option : options) {
            makeNames.add(option.getText());
        }
        return makeNames;
    }

}

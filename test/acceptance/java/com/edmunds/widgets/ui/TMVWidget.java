package com.edmunds.widgets.ui;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

import java.util.ArrayList;
import java.util.List;

public class TMVWidget {

    private WebElement element;

    public TMVWidget(WebElement element) {
        this.element = element;
    }

    public WebElement findMakesSelectElement() {
        return element.findElement(By.cssSelector("select.tmvwidget-make"));
    }

    public Select findMakesSelect() {
        return new Select(findMakesSelectElement());
    }

    public WebElement findZipCodeInput() {
        return element.findElement(By.tagName("input"));
    }

    public List<String> getMakeNames() {
        List<String> makeNames = new ArrayList<>();
        List<WebElement> options = findMakesSelect().getOptions();
        options.remove(0);
        for (WebElement option : options) {
            // TODO remove this condition when TMV widget will be refactored with new vehicle api
            if (!option.getText().equals("Alfa Romeo")) {
                makeNames.add(option.getText());
            }
        }
        return makeNames;
    }

}

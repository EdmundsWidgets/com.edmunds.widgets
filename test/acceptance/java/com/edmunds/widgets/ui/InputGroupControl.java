package com.edmunds.widgets.ui;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class InputGroupControl {

    private final WebElement element;

    public InputGroupControl(WebElement element) {
        this.element = element;
    }

    public WebElement getElement() {
        return element;
    }

    public void clickApplyButton() {
        findApplyButtonElement().click();
    }

    public void clickChangeButton() {
        findChangeButtonElement().click();
    }

    public boolean isAppliedValueEqualsTo(String value) {
        return findAppliedValueElement().getText().equals(value);
    }

    public WebElement findInputGroupElementByAttributeValue(String attributeName, String attributeValue) {
        String xpath = String.format("*[@%s='%s']", attributeName, attributeValue);
        return element.findElement(By.xpath(xpath));
    }

    public WebElement findApplySectionElement() {
        return findInputGroupElementByAttributeValue("data-section", "apply");
    }

    public WebElement findChangeSectionElement() {
        return findInputGroupElementByAttributeValue("data-section", "change");
    }

    public WebElement findApplyButtonElement() {
        return findApplySectionElement().findElement(By.tagName("button"));
    }

    public WebElement findChangeButtonElement() {
        return findChangeSectionElement().findElement(By.tagName("button"));
    }

    public WebElement findTooltipElement() {
        return element.findElement(By.className("tooltip"));
    }

    public WebElement findInputElement() {
        return findApplySectionElement().findElement(By.tagName("input"));
    }

    public WebElement findAppliedValueElement() {
        return findChangeSectionElement().findElement(By.className("form-control-text"));
    }

}

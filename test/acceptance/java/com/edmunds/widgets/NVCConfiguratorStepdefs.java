package com.edmunds.widgets;

import com.edmunds.widgets.ui.WaitFor;
import cucumber.api.java.en.Then;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static com.edmunds.widgets.RunCukesTest.getDriver;
import static com.edmunds.widgets.ui.WidgetConfigurator.findIncludeBorderCheckboxElement;
import static com.edmunds.widgets.ui.WidgetConfigurator.findNVCWidgetRootElement;
import static org.testng.Assert.assertEquals;

public class NVCConfiguratorStepdefs {

    @Then("^NVC widget should be displayed with border$")
    public void NVC_widget_should_be_displayed_with_border() {
        String propertyName = "border-top-width";
        String borderWidth = "1px";
        switchToNVCWidgetContent();
        WebElement widgetRootElement = findNVCWidgetRootElement();
        WaitFor.cssValue(widgetRootElement, propertyName, borderWidth);
        assertEquals(widgetRootElement.getCssValue(propertyName), borderWidth);
        switchToDefaultContent();
    }

    @Then("^NVC widget should be displayed without border$")
    public void NVC_widget_should_be_displayed_without_border() {
        String propertyName = "border-top-width";
        String borderWidth = "0px";
        switchToNVCWidgetContent();
        WebElement widgetRootElement = findNVCWidgetRootElement();
        WaitFor.cssValue(widgetRootElement, propertyName, borderWidth);
        assertEquals(widgetRootElement.getCssValue(propertyName), borderWidth);
        switchToDefaultContent();
    }

    @Then("^NVC widget should be displayed with '(.*)' border radius$")
    public void NVC_widget_should_be_displayed_with_border_radius(String borderRadius) {
        String propertyName = "border-top-left-radius";
        switchToNVCWidgetContent();
        WebElement widgetRootElement = findNVCWidgetRootElement();
        WaitFor.cssValue(widgetRootElement, propertyName, borderRadius);
        assertEquals(widgetRootElement.getCssValue(propertyName), borderRadius);
        switchToDefaultContent();
    }

    @Then("^width of NVC widget should be equal to '(.*)'$")
    public void width_of_NVC_widget_should_be_equal_to_value(String width) {
        // check iframe width
        WaitFor.attributeValue(By.cssSelector("#nvcwidget iframe"), "width", width.replace("px", ""));
        WebElement frameElement = findNVCWidgetRootElement().findElement(By.tagName("iframe"));
        assertEquals(frameElement.getAttribute("width") + "px", width);
        // check the width of the widget inside iframe
        boolean hasBorder = findIncludeBorderCheckboxElement().isSelected();
        if (hasBorder) {
            width = Long.valueOf(width.replace("px", "")) - 2 + "px";
        }
        String propertyName = "width";
        switchToNVCWidgetContent();
        WebElement widgetRootElement = findNVCWidgetRootElement();
        WaitFor.cssValue(widgetRootElement, propertyName, width);
        assertEquals(widgetRootElement.getCssValue(propertyName), width);
        switchToDefaultContent();
    }

    public void switchToNVCWidgetContent() {
        // at first, we need to wait for presence on the page
        WaitFor.presenceOfNVCWidget();
        WebElement frame = findNVCWidgetRootElement().findElement(By.tagName("iframe"));
        getDriver().switchTo().frame(frame);
        // then we need to wait for presence in iframe content
        WaitFor.presenceOfNVCWidget();
    }

    public void switchToDefaultContent() {
        getDriver().switchTo().defaultContent();
    }

}

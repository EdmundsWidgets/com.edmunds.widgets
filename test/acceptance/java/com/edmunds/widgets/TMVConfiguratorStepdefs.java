package com.edmunds.widgets;

import com.edmunds.widgets.ui.TMVWidget;
import com.edmunds.widgets.ui.WaitFor;
import cucumber.api.java.en.Then;
import org.openqa.selenium.WebElement;

import static com.edmunds.widgets.ui.WidgetConfigurator.*;
import static org.testng.Assert.assertEquals;

public class TMVConfiguratorStepdefs {

    @Then("^TMV widget should be displayed with border$")
    public void TMV_widget_should_be_displayed_with_border() {
        String propertyName = "border-top-width";
        String expectedValue = "1px";
        WebElement widgetRootElement = findTMVWidgetRootElement();
        WaitFor.cssValue(widgetRootElement, propertyName, expectedValue);
        assertEquals(widgetRootElement.getCssValue(propertyName), expectedValue);
    }

    @Then("^TMV widget should be displayed with '(.*)' ZIP code$")
    public void TMV_widget_should_be_displayed_with_ZIP_code(String zipCode) {
        WaitFor.applyingZipCodeForTMVWidget(zipCode);
        WebElement widgetRootElement = findTMVWidgetRootElement();
        TMVWidget widget = new TMVWidget(widgetRootElement);
        assertEquals(widget.findZipCodeInput().getAttribute("value"), zipCode);
    }

    @Then("^TMV widget should be displayed without border$")
    public void TMV_widget_should_be_displayed_without_border() {
        String propertyName = "border-top-width";
        String expectedValue = "0px";
        WebElement widgetRootElement = findTMVWidgetRootElement();
        WaitFor.cssValue(widgetRootElement, propertyName, expectedValue);
        assertEquals(widgetRootElement.getCssValue(propertyName), expectedValue);
    }

    @Then("^TMV widget should be displayed with '(.*)' border radius$")
    public void TMV_widget_should_be_displayed_with_border_radius(String borderRadius) {
        String propertyName = "border-top-left-radius";
        WebElement widgetRootElement = findTMVWidgetRootElement();
        WaitFor.cssValue(widgetRootElement, propertyName, borderRadius);
        assertEquals(widgetRootElement.getCssValue(propertyName), borderRadius);
    }

    @Then("^width of TMV widget should be equal to '(.*)'$")
    public void width_of_TMV_widget_should_be_equal(String width) {
        boolean hasBorder = findIncludeBorderCheckboxElement().isSelected();
        if (hasBorder) {
            width = Long.valueOf(width.replace("px", "")) - 2 + "px";
        }
        String propertyName = "width";
        WebElement widgetRootElement = findTMVWidgetRootElement();
        WaitFor.cssValue(widgetRootElement, propertyName, width);
        assertEquals(widgetRootElement.getCssValue(propertyName), width);
    }

}

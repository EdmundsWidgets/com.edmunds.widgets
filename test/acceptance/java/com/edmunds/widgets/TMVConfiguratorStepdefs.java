package com.edmunds.widgets;

import com.edmunds.widgets.ui.IncludedMakesControl;
import com.edmunds.widgets.ui.RadioGroupControl;
import com.edmunds.widgets.ui.TMVWidget;
import com.edmunds.widgets.ui.WaitFor;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;

import static com.edmunds.widgets.ui.WidgetConfigurator.*;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

public class TMVConfiguratorStepdefs {

    @When("I select '(.*)' layout")
    public void I_select_layout(String layoutName) {
        RadioGroupControl layoutRadioGroup = findLayotRadioGroup();
        layoutRadioGroup.selectByText(layoutName);
        assertEquals(layoutRadioGroup.getSelectedOption().getText(), layoutName);
    }

    @Then("^TMV widget should be displayed with '(.*)' ZIP code$")
    public void TMV_widget_should_be_displayed_with_ZIP_code(String zipCode) {
        WaitFor.applyingZipCodeForTMVWidget(zipCode);
        WebElement widgetRootElement = findTMVWidgetRootElement();
        TMVWidget widget = new TMVWidget(widgetRootElement);
        assertEquals(widget.findZipCodeInput().getAttribute("value"), zipCode);
    }

    @Then("^TMV widget should be displayed with border$")
    public void TMV_widget_should_be_displayed_with_border() {
        String propertyName = "border-top-width";
        String expectedValue = "1px";
        WebElement widgetRootElement = findTMVWidgetRootElement();
        WaitFor.cssValue(widgetRootElement, propertyName, expectedValue);
        assertEquals(widgetRootElement.getCssValue(propertyName), expectedValue);
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

    @Then("^TMV widget should be loaded with next makes:$")
    public void TMV_widget_should_be_loaded_with_next_makes(List<String> makeNames) {
        WaitFor.stalenessOfTMVWidget();
        WaitFor.textToBePresentInMakesSelectOfTMVWidget("Select a Make");
        TMVWidget widget = new TMVWidget(findTMVWidgetRootElement());
        assertEquals(widget.getMakeNames(), makeNames);
    }

    @Then("^TMV widget should be loaded with all makes$")
    public void TMV_widget_should_be_loaded_with_all_makes() {
        WaitFor.textToBePresentInMakesSelectOfTMVWidget("Select a Make");
        IncludedMakesControl includedMakes = findIncludedMakesControl();
        List<String> makeNames = new ArrayList<>();
        for (WebElement includedMakesItem : includedMakes.getItems()) {
            makeNames.add(includedMakesItem.getText());
        }
        TMVWidget widget = new TMVWidget(findTMVWidgetRootElement());
        assertEquals(makeNames, widget.getMakeNames());
    }

    @Then("^TMV widget should be loaded without makes$")
    public void TMV_widget_should_be_loaded_without_makes() {
        WaitFor.textToBePresentInMakesSelectOfTMVWidget("Makes not found");
        TMVWidget widget = new TMVWidget(findTMVWidgetRootElement());
        assertTrue(widget.getMakeNames().isEmpty());
    }

}

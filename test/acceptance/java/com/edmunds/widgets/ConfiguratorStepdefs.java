package com.edmunds.widgets;

import static com.edmunds.widgets.RunCukesTest.getDriver;
import static com.edmunds.widgets.ui.WidgetConfigurator.*;
import com.edmunds.widgets.ui.InputGroupControl;

import com.edmunds.widgets.ui.WaitFor;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

public class ConfiguratorStepdefs {

    @When("^I apply '(.*)' Vehicle Api key$")
    public void I_apply_Vehicle_Api_key(String vehicleApiKey) {
        InputGroupControl vehicleApiKeyControl = findVehicleApiKeyControl();
        vehicleApiKeyControl.findInputElement().sendKeys(vehicleApiKey);
        vehicleApiKeyControl.clickApplyButton();
        WaitFor.applyingVehicleApiKey();
    }

    @When("^I apply '(.*)' default ZIP code$")
    public void I_apply_default_ZIP_code(String zipCode) {
        InputGroupControl zipCodeControl = findZipCodeControl();
        zipCodeControl.findInputElement().sendKeys(zipCode);
        zipCodeControl.clickApplyButton();
        WaitFor.applyingZipCode();
    }

    @When("^I click 'Include border' checkbox$")
    public void I_click_Include_border_checkbox() {
        WebElement checkbox = findIncludeBorderCheckboxElement();
        checkbox.click();
        WebElement element = getDriver().findElement(By.name("borderWidth"));
        String expectedValue = checkbox.isSelected() ? "1px" : "0";
        assertEquals(element.getAttribute("value"), expectedValue);
    }

    @When("^I change the width of the widget to '(.*)'$")
    public void I_change_the_width_of_the_widget(String widthStr) {
        WebDriver driver = getDriver();
        Long width = Long.valueOf(widthStr.replace("px", ""));
        String script = "$('#width_slider').data('ui-slider').option('value', '" + width + "')";
        if (driver instanceof JavascriptExecutor) {
            ((JavascriptExecutor) driver).executeScript(script);
        }
        WebElement element = getDriver().findElement(By.name("width"));
        assertEquals(element.getAttribute("value"), widthStr);
    }

    @When("^I change border radius to '(.*)'$")
    public void I_change_border_radius_to_value(String borderRadiusStr) {
        WebDriver driver = getDriver();
        Long borderRadius = Long.valueOf(borderRadiusStr.replace("px", ""));
        String script = "$('#border_radius_slider').data('ui-slider').option('value', '" + borderRadius + "')";
        if (driver instanceof JavascriptExecutor) {
            ((JavascriptExecutor) driver).executeScript(script);
        }
        WebElement element = getDriver().findElement(By.name("borderRadius"));
        assertEquals(element.getAttribute("value"), borderRadiusStr);
    }

    @Then("^I should see '(.*)' as applied Vehicle Api key$")
    public void I_should_see_value_as_applied_Vehicle_Api_key(String expectedValue) {
        InputGroupControl vehicleApiKeyControl = findVehicleApiKeyControl();
        String value = vehicleApiKeyControl.findAppliedValueElement().getText();
        assertEquals(value, expectedValue);
    }

    @Then("^I should see '(.*)' as applied default ZIP code$")
    public void I_should_see_value_as_applied_default_ZIP_code(String expectedValue) {
        InputGroupControl zipCodeControl = findZipCodeControl();
        String value = zipCodeControl.findAppliedValueElement().getText();
        assertEquals(value, expectedValue);
    }

    @Then("^I should have possibility to apply default ZIP code$")
    public void I_should_have_possibility_to_apply_default_ZIP_code() {
        InputGroupControl zipCodeControl = findZipCodeControl();
        assertTrue(zipCodeControl.findInputElement().isEnabled());
        assertTrue(zipCodeControl.findApplyButtonElement().isEnabled());
    }

    @Then("^I should see '(.*)' 'Include border' checkbox$")
    public void I_should_see_checked_Include_border_checkbox(String expectedState) {
        String state = findIncludeBorderCheckboxElement().getAttribute("checked");
        if ("checked".equals(expectedState)) {
            assertEquals(state, "true");
        } else if ("unchecked".equals(expectedState)) {
            assertEquals(state, null);
        }
    }


    @Then("^I should see TMV widget$")
    public void I_should_see_tmv_widget() {
        assertTrue(findTMVWidgetRootElement().isDisplayed());
    }

    @Then("^I should see NVC widget$")
    public void I_should_see_nvc_widget() {
        WaitFor.presenceOfNVCWidget();
        assertTrue(findNVCWidgetRootElement().isDisplayed());
    }

    @Then("^I should see widget configurator$")
    public void I_should_see_widget_configurator() {
        assertTrue(findWidgetConfigurator().isDisplayed());
    }

    @Then("^'Default ZIP code' should be disabled$")
    public void default_zip_code_should_be_disabled() {
        InputGroupControl zipCodeControl = findZipCodeControl();
        assertFalse(zipCodeControl.findInputElement().isEnabled());
        assertFalse(zipCodeControl.findApplyButtonElement().isEnabled());
    }

    @Then("^list of 'Included makes' should be empty$")
    public void list_of_included_makes_should_be_empty() {
        WebElement list = findIncludedMakesList();
        List<WebElement> innerElements = list.findElements(By.xpath("*"));
        boolean isEmpty = innerElements.isEmpty() && list.getText().isEmpty();
        assertTrue(isEmpty, "List of Included makes should be empty");
    }

    @Then("^'Toggle all' makes checkbox should be disabled$")
    public void toggle_all_makes_checkbox_should_be_disabled() {
        assertFalse(findToggleAllMakesCheckbox().isEnabled());
    }

    @Then("^'Toggle all' makes checkbox should not be checked$")
    public void toggle_all_makes_checkbox_should_not_be_checked() {
        assertFalse(findToggleAllMakesCheckbox().isSelected());
    }

    @Then("^'Price to display' dropdown should contain next options:$")
    public void price_to_display_should_contain_options(List<String> options) {
        WebElement priceToDisplayElement = findPriceToDisplayElement();
        for (String option : options) {
            String xpath = "option[text()='" + option + "']";
            WebElement optionElement = priceToDisplayElement.findElement(By.xpath(xpath));
            assertTrue(optionElement.isDisplayed());
        }
    }

    @Then("^option with '(.*)' text should be selected in '(.*)' section$")
    public void option_with_text_should_be_selected_in_button_group(String text, String sectionName) {
        switch (sectionName) {
            case "Price to display":
                assertTrue(hasSelectedPriceToDisplay(text));
                break;
            case "Show vehicles":
                assertTrue(hasSelectedShowVehicles(text));
                break;
            case "Theme":
                assertTrue(hasSelectedTheme(text));
                break;
            case "Color Scheme":
                assertTrue(hasSelectedColorScheme(text));
                break;
            case "Layout":
                assertTrue(hasSelectedLayout(text));
                break;
        }
    }

    @Then("^'(.*)' value should be '(.*)'$")
    public void property_value_should_be(String propertyName, String value) {
        WebElement tooltipElement;
        switch (propertyName) {
            case "Width":
                tooltipElement = findWidthSliderElement().findElement(By.className("tooltip-inner"));
                assertTrue(tooltipElement.isDisplayed());
                assertTrue(tooltipElement.getText().equals(value));
                break;
            case "Border Radius":
                tooltipElement = findBorderRadiusSliderElement().findElement(By.className("tooltip-inner"));
                assertTrue(tooltipElement.isDisplayed());
                assertTrue(tooltipElement.getText().equals(value));
                break;
        }
    }

    @Then("^'Include border' checkbox should be checked$")
    public void include_border_checkbox_should_be_checked() {
        assertTrue(findIncludeBorderCheckboxElement().isSelected());
    }

}

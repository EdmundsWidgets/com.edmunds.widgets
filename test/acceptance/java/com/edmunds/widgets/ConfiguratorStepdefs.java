package com.edmunds.widgets;

import static com.edmunds.widgets.component.WidgetConfigurator.*;
import com.edmunds.widgets.component.InputGroupControl;

import cucumber.api.java.en.Then;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;

import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

public class ConfiguratorStepdefs {

    @Then("^I should see TMV widget$")
    public void I_should_see_tmv_widget() {
        assertTrue(findTMVWidgetRootElement().isDisplayed());
    }

    @Then("^I should see NVC widget$")
    public void I_should_see_nvc_widget() {
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

package com.edmunds.widgets;

import static com.edmunds.widgets.RunCukesTest.getDriver;
import static com.edmunds.widgets.ui.WidgetConfigurator.*;

import com.edmunds.widgets.ui.IncludedMakesControl;
import com.edmunds.widgets.ui.InputGroupControl;

import com.edmunds.widgets.ui.RadioGroupControl;
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

    @When("I select '(.*)' theme")
    public void I_select_theme(String themeName) {
        RadioGroupControl radioGroup = findThemeRadioGroup();
        radioGroup.selectByText(themeName);
        assertEquals(radioGroup.getSelectedOption().getText(), themeName);
    }

    @When("I select '(.*)' color scheme")
    public void I_select_color_scheme(String colorSchemeName) {
        RadioGroupControl radioGroup = findColorSchemeRadioGroup();
        radioGroup.selectByText(colorSchemeName);
        assertEquals(radioGroup.getSelectedOption().getText(), colorSchemeName);
    }

    @When("^I select makes in the list of Included makes:$")
    public void I_select_makes_in_the_list_of_Included_makes(List<String> makesList) {
        WaitFor.presenceOfIncludedMakes();
        IncludedMakesControl control = findIncludedMakesControl();
        control.selectByText(makesList);
        WaitFor.stalenessOfTMVWidget();
    }

    @When("^I deselect makes in the list of Included makes:$")
    public void I_deselect_makes_in_the_list_of_Included_makes(List<String> makesList) {
        WaitFor.presenceOfIncludedMakes();
        IncludedMakesControl control = findIncludedMakesControl();
        control.deselectByText(makesList);
        WaitFor.stalenessOfTMVWidget();
    }

    @When("^I click 'Toggle all' makes checkbox$")
    public void I_click_Toggle_all_makes_checkbox() {
        findToggleAllMakesCheckbox().click();
        WaitFor.stalenessOfTMVWidget();
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

    @Then("^list of Included makes should be loaded$")
    public void list_of_Included_makes_should_be_loaded() {
        WaitFor.presenceOfIncludedMakes();
    }

    @Then("^'Toggle all' makes checkbox should be selected$")
    public void Toggle_all_makes_checkbox_should_be_selected() {
        assertTrue(findToggleAllMakesCheckbox().isSelected());
    }

    @Then("^'Toggle all' makes checkbox should not be selected$")
    public void Toggle_all_makes_checkbox_should_not_be_selected() {
        assertFalse(findToggleAllMakesCheckbox().isSelected());
    }

    @Then("^all makes should be selected in the list of Included makes$")
    public void all_makes_should_be_selected_in_the_list_of_Included_makes() {
        List<WebElement> checkboxes = findIncludedMakesList().findElements(By.tagName("input"));
        boolean hasNotSelectedCheckbox = false;
        for (WebElement checkbox : checkboxes) {
            if (!checkbox.isSelected()) {
                hasNotSelectedCheckbox = true;
                break;
            }
        }
        assertFalse(hasNotSelectedCheckbox);
    }

    @Then("^all makes should not be selected in the list of Included makes$")
    public void all_makes_should_not_be_selected_in_the_list_of_Included_makes() {
        List<WebElement> checkboxes = findIncludedMakesList().findElements(By.tagName("input"));
        boolean hasSelectedCheckbox = false;
        for (WebElement checkbox : checkboxes) {
            if (checkbox.isSelected()) {
                hasSelectedCheckbox = true;
                break;
            }
        }
        assertFalse(hasSelectedCheckbox);
    }

}

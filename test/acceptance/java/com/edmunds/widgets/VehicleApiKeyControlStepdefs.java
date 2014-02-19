package com.edmunds.widgets;

import static com.edmunds.widgets.RunCukesTest.getDriver;

import static org.testng.Assert.assertTrue;
import static org.testng.Assert.assertFalse;

import com.edmunds.widgets.ui.InputGroupControl;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.And;

import cucumber.api.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class VehicleApiKeyControlStepdefs {

    private static String INPUT_GROUP_ELEMENT_ID = "vehicle-api-key-control";
    private InputGroupControl inputGroup;
    private String vehicleApiKey;

    public InputGroupControl findVehicleApiKeyControl() {
        WebElement element = getDriver().findElement(By.id(INPUT_GROUP_ELEMENT_ID));
        return new InputGroupControl(element);
    }

    @Given("I have a Vehicle Api key '(.*)'")
    public void I_have_a_vehicle_api_key(String vehicleApiKey) {
        this.vehicleApiKey = vehicleApiKey;
        inputGroup = findVehicleApiKeyControl();
        assertTrue(inputGroup.getElement().isDisplayed());
    }

    @Given("I see a Vehicle Api key section")
    public void i_see_vehicle_api_key_section() {
        inputGroup = findVehicleApiKeyControl();
        assertTrue(inputGroup.getElement().isDisplayed());
    }

    @When("I fill in my Vehicle Api key")
    public void I_fill_in_value_for_text_input() {
        inputGroup.findInputElement().sendKeys(vehicleApiKey);
    }

    @Then("I should see a tooltip with '(.*)' text")
    public void I_should_see_tooltip_with_text(String text) {
        waitForTooltipPresence();
        WebElement tooltipElement = inputGroup.findTooltipElement();
        assertTrue(tooltipElement.isDisplayed(), "tooltip should be displayed");
        String tooltipText = tooltipElement.findElement(By.className("tooltip-inner")).getText();
        assertTrue(tooltipText.equals(text), "tooltip should contain '" + text + "' text");
    }

    @Then("I should see entered Vehicle Api key as text")
    public void I_should_see_api_key_as_text() {
        waitForChangeSectionVisibility();
        assertTrue(inputGroup.isAppliedValueEqualsTo(vehicleApiKey));
    }

    @And("I should see enabled Vehicle Api key text input")
    public void I_should_see_enabled_text_input() {
        assertTrue(inputGroup.findInputElement().isEnabled());
    }

    @And("I should see disabled Vehicle Api key text input")
    public void I_should_see_disabled_text_input() {
        assertFalse(inputGroup.findInputElement().isEnabled());
    }

    @And("I should see enabled 'Apply' Vehicle Api key button")
    public void I_should_see_enabled_apply_button() {
        assertTrue(inputGroup.findApplyButtonElement().isEnabled());
    }

    @And("I should see disabled 'Apply' Vehicle Api key button")
    public void I_should_see_disabled_apply_button() {
        assertFalse(inputGroup.findApplyButtonElement().isEnabled());
    }

    @And("I should see enabled 'Change' Vehicle Api key button")
    public void I_should_see_enabled_change_button() {
        assertTrue(inputGroup.findChangeButtonElement().isEnabled());
    }

    @And("I should see disabled 'Change' Vehicle Api key button")
    public void I_should_see_disabled_change_button() {
        assertFalse(inputGroup.findChangeButtonElement().isEnabled());
    }

    @And("I click 'Apply' Vehicle Api key button")
    public void I_click_apply_button() {
        inputGroup.clickApplyButton();
    }

    @And("I click 'Change' Vehicle Api key button")
    public void I_click_change_button() {
        inputGroup.clickChangeButton();
    }

    public void waitForTooltipPresence() {
        String xpath = "//*[@id='" + INPUT_GROUP_ELEMENT_ID + "']/*[contains(@class,'tooltip')]";
        WebDriverWait wait = new WebDriverWait(getDriver(), 10);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath)));
    }

    public void waitForChangeSectionVisibility() {
        String xpath = "//*[@id='" + INPUT_GROUP_ELEMENT_ID + "']/*[@data-section='change']";
        WebDriverWait wait = new WebDriverWait(getDriver(), 10);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(xpath)));
    }

}

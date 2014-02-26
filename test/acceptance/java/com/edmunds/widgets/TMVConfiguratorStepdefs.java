package com.edmunds.widgets;

import com.edmunds.widgets.ui.IncludedMakesControl;
import com.edmunds.widgets.ui.RadioGroupControl;
import com.edmunds.widgets.ui.TMVWidget;
import com.edmunds.widgets.ui.WaitFor;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;

import static com.edmunds.widgets.RunCukesTest.getDriver;
import static com.edmunds.widgets.ui.WidgetConfigurator.*;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
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
        assertRootElementCssValue("border-top-width", "1px");
    }

    @Then("^TMV widget should be displayed without border$")
    public void TMV_widget_should_be_displayed_without_border() {
        assertRootElementCssValue("border-top-width", "0px");
    }

    @Then("^TMV widget should be displayed with '(.*)' border radius$")
    public void TMV_widget_should_be_displayed_with_border_radius(String borderRadius) {
        assertRootElementCssValue("border-top-left-radius", borderRadius);
    }

    @Then("^width of TMV widget should be equal to '(.*)'$")
    public void width_of_TMV_widget_should_be_equal(String width) {
        boolean hasBorder = findIncludeBorderCheckboxElement().isSelected();
        if (hasBorder) {
            width = Long.valueOf(width.replace("px", "")) - 2 + "px";
        }
        assertRootElementCssValue("width", width);
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

    @Then("^TMV widget should be rendered with (.*) color scheme for (.*) theme$")
    public void TMV_widget_should_be_rendered_with_color_scheme_for_theme(String colorSchemeName, String themeName) {
        switch (themeName) {
            case "Theme 1":
                checkColorSchemeForTheme1(colorSchemeName);
                break;
            case "Theme 2":
                checkColorSchemeForTheme2(colorSchemeName);
                break;
            case "Theme 3":
                checkColorSchemeForTheme3(colorSchemeName);
                break;
            default:
                assertFalse(true, "unexpected name of the theme");
        }
    }

    public void checkColorSchemeForTheme1(String colorSchemeName) {
        switch (colorSchemeName) {
            case "Light":
                // root
                assertRootElementCssValue("background-color", "rgba(242, 242, 242, 1)");
                assertRootElementCssValue("border-top-color", "rgba(219, 219, 219, 1)");
                assertRootElementCssValue("border-top-width", "1px");
                // inner
                assertInnerElementCssValue("border-top-width", "0px");
                // header
                assertHeaderElementCssValue("background-color", "rgba(219, 219, 219, 1)");
                assertHeaderElementCssValue("border-bottom-width", "0px");
                break;
            case "Dark":
                // root
                assertRootElementCssValue("background-color", "rgba(51, 51, 51, 1)");
                assertRootElementCssValue("border-top-color", "rgba(64, 64, 64, 1)");
                assertRootElementCssValue("border-top-width", "1px");
                // inner
                assertInnerElementCssValue("border-top-width", "0px");
                // header
                assertHeaderElementCssValue("background-color", "rgba(31, 31, 31, 1)");
                assertHeaderElementCssValue("border-bottom-width", "0px");
                break;
            default:
                assertFalse(true, "unexpected name of the color scheme");
        }
    }

    public void checkColorSchemeForTheme2(String colorSchemeName) {
        switch (colorSchemeName) {
            case "Light":
                // root
                assertRootElementCssValue("background-color", "rgba(242, 242, 242, 1)");
                assertRootElementCssValue("border-top-color", "rgba(219, 219, 219, 1)");
                assertRootElementCssValue("border-top-width", "1px");
                // inner
                assertInnerElementCssValue("border-top-color", "rgba(255, 255, 255, 1)");
                assertInnerElementCssValue("border-top-width", "1px");
                // header
                assertHeaderElementCssValue("border-bottom-color", "rgba(255, 255, 255, 1)");
                assertHeaderElementCssValue("border-bottom-width", "1px");
                break;
            case "Dark":
                // root
                assertRootElementCssValue("background-color", "rgba(51, 51, 51, 1)");
                assertRootElementCssValue("border-top-color", "rgba(64, 64, 64, 1)");
                assertRootElementCssValue("border-top-width", "1px");
                // inner
                assertInnerElementCssValue("border-top-width", "0px");
                // header
                assertHeaderElementCssValue("border-bottom-color", "rgba(77, 77, 77, 1)");
                assertHeaderElementCssValue("border-bottom-width", "1px");
                break;
            default:
                assertFalse(false, "unexpected name of the color scheme");
        }
    }

    public void checkColorSchemeForTheme3(String colorSchemeName) {
        switch (colorSchemeName) {
            case "Light":
                // root
                assertRootElementCssValue("border-top-width", "0px");
                // inner
                assertInnerElementCssValue("border-top-color", "rgba(200, 201, 201, 1)");
                assertInnerElementCssValue("border-top-width", "1px");
                // header
                assertHeaderElementCssValue("border-bottom-width", "0px");
                break;
            case "Dark":
                // root
                assertRootElementCssValue("border-top-width", "0px");
                // inner
                assertInnerElementCssValue("border-top-color", "rgba(64, 64, 64, 1)");
                assertInnerElementCssValue("border-top-width", "1px");
                // header
                assertHeaderElementCssValue("border-bottom-width", "0px");
                break;
            default:
                assertFalse(false, "unexpected name of the color scheme");
        }
    }

    public void assertRootElementCssValue(String propertyName, String propertyValue) {
        By locator = By.cssSelector("#tmvwidget");
        assertElementCssValue(locator, propertyName, propertyValue);
    }

    public void assertInnerElementCssValue(String propertyName, String propertyValue) {
        By locator = By.cssSelector("#tmvwidget .tmvwidget-inner");
        assertElementCssValue(locator, propertyName, propertyValue);
    }

    public void assertHeaderElementCssValue(String propertyName, String propertyValue) {
        By locator = By.cssSelector("#tmvwidget .tmvwidget-header");
        assertElementCssValue(locator, propertyName, propertyValue);
    }

    public void assertElementCssValue(By locator, String propertyName, String propertyValue) {
        WaitFor.cssValue(locator, propertyName, propertyValue);
        WebElement rootElement = getDriver().findElement(locator);
        assertEquals(rootElement.getCssValue(propertyName), propertyValue);
    }

}

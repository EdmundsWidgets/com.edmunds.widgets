package com.edmunds.widgets;

import com.edmunds.widgets.ui.IncludedMakesControl;
import com.edmunds.widgets.ui.NVCWidget;
import com.edmunds.widgets.ui.WaitFor;
import cucumber.api.java.en.Then;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;

import static com.edmunds.widgets.RunCukesTest.getDriver;
import static com.edmunds.widgets.ui.WidgetConfigurator.*;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

public class NVCConfiguratorStepdefs {

    private WebElement iframe;

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

    @Then("^NVC widget should be loaded with next makes:$")
    public void NVC_widget_should_be_loaded_with_next_makes(List<String> makeNames) {
        WaitFor.stalenessOfElement(iframe);
        switchToNVCWidgetContent();
        WaitFor.textToBePresentInMakesSelectOfNVCWidget("Select a Make");
        NVCWidget widget = new NVCWidget(findNVCWidgetRootElement());
        assertEquals(makeNames, widget.getMakeNames());
        switchToDefaultContent();
    }

    @Then("^NVC widget should be loaded with all makes$")
    public void NVC_widget_should_be_loaded_with_all_makes() {
        List<String> makeNames = getSelectedMakeNames();
        WaitFor.stalenessOfElement(iframe);
        switchToNVCWidgetContent();
        WaitFor.textToBePresentInMakesSelectOfNVCWidget("Select a Make");
        NVCWidget widget = new NVCWidget(findNVCWidgetRootElement());
        assertEquals(makeNames, widget.getMakeNames());
        switchToDefaultContent();
    }

    @Then("^NVC widget should be loaded without makes$")
    public void NVC_widget_should_be_loaded_without_makes() {
        WaitFor.stalenessOfElement(iframe);
        switchToNVCWidgetContent();
        WaitFor.textToBePresentInMakesSelectOfNVCWidget("Makes not found");
        NVCWidget widget = new NVCWidget(findNVCWidgetRootElement());
        assertTrue(widget.getMakeNames().isEmpty());
        switchToDefaultContent();
    }

    @Then("^NVC widget should be loaded$")
    public void NVC_widget_should_be_loaded() {
        WaitFor.presenceOfNVCWidget();
        iframe = findNVCWidgetRootElement().findElement(By.tagName("iframe"));
    }

    public void switchToNVCWidgetContent() {
        NVC_widget_should_be_loaded();
        getDriver().switchTo().frame(findNVCWidgetRootElement().findElement(By.tagName("iframe")));
        // then we need to wait for presence in iframe content
        WaitFor.presenceOfNVCWidget();
    }

    public void switchToDefaultContent() {
        getDriver().switchTo().defaultContent();
    }

    public List<String> getSelectedMakeNames() {
        IncludedMakesControl includedMakes = findIncludedMakesControl();
        List<String> makeNames = new ArrayList<>();
        for (WebElement includedMakesItem : includedMakes.getSelectedItems()) {
            makeNames.add(includedMakesItem.getText());
        }
        return makeNames;
    }

}

package com.edmunds.widgets.ui;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import static com.edmunds.widgets.RunCukesTest.getDriver;

public class WidgetConfigurator {

    public static WebElement findWidgetConfigurator() {
        return getDriver().findElement(By.id("widget-configurator"));
    }

    public static WebElement findTMVWidgetRootElement() {
        return getDriver().findElement(By.id("tmvwidget"));
    }

    public static WebElement findNVCWidgetRootElement() {
        return getDriver().findElement(By.id("nvcwidget"));
    }

    public static InputGroupControl findVehicleApiKeyControl() {
        WebElement element = getDriver().findElement(By.id("vehicle-api-key-control"));
        return new InputGroupControl(element);
    }

    public static InputGroupControl findDealerApiKeyControl() {
        WebElement element = getDriver().findElement(By.id("dealer-api-key-control"));
        return new InputGroupControl(element);
    }

    public static InputGroupControl findZipCodeControl() {
        WebElement element = getDriver().findElement(By.id("zip-code-control"));
        return new InputGroupControl(element);
    }

    public static RadioGroupControl findShowVehiclesRadioGroup() {
        WebElement element = getDriver().findElement(By.id("option_publication_state"));
        return new RadioGroupControl(element);
    }

    public static RadioGroupControl findThemeRadioGroup() {
        WebElement element = getDriver().findElement(By.id("option_theme"));
        return new RadioGroupControl(element);
    }

    public static RadioGroupControl findColorSchemeRadioGroup() {
        WebElement element = getDriver().findElement(By.id("option_colorscheme"));
        return new RadioGroupControl(element);
    }

    public static RadioGroupControl findLayotRadioGroup() {
        WebElement element = getDriver().findElement(By.id("option_layout"));
        return new RadioGroupControl(element);
    }

    public static WebElement findIncludedMakesList() {
        return getDriver().findElement(By.className("list-group-makes"));
    }

    public static IncludedMakesControl findIncludedMakesControl() {
        return new IncludedMakesControl(findIncludedMakesList());
    }

    public static WebElement findToggleAllMakesCheckbox() {
        return getDriver().findElement(By.id("toggleAllMakes"));
    }

    public static WebElement findPriceToDisplayElement() {
        return getDriver().findElement(By.name("priceToDisplay"));
    }

    public static WebElement findWidthSliderElement() {
        return getDriver().findElement(By.id("width_slider"));
    }

    public static WebElement findBorderRadiusSliderElement() {
        return getDriver().findElement(By.id("border_radius_slider"));
    }

    public static WebElement findIncludeBorderCheckboxElement() {
        return getDriver().findElement(By.id("include_border"));
    }

    public static boolean hasSelectedPriceToDisplay(String text) {
        Select select = new Select(findPriceToDisplayElement());
        WebElement selectedOption = select.getFirstSelectedOption();
        return selectedOption.getText().equals(text);
    }

    public static boolean hasSelectedShowVehicles(String text) {
        WebElement selectedOption = findShowVehiclesRadioGroup().getSelectedOption();
        return selectedOption.getText().equals(text);
    }

    public static boolean hasSelectedTheme(String text) {
        WebElement selectedOption = findThemeRadioGroup().getSelectedOption();
        return selectedOption.getText().equals(text);
    }

    public static boolean hasSelectedColorScheme(String text) {
        WebElement selectedOption = findColorSchemeRadioGroup().getSelectedOption();
        return selectedOption.getText().equals(text);
    }

    public static boolean hasSelectedLayout(String text) {
        WebElement selectedOption = findLayotRadioGroup().getSelectedOption();
        return selectedOption.getText().equals(text);
    }

}

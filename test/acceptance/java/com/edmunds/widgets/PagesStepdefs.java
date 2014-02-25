package com.edmunds.widgets;

import static com.edmunds.widgets.RunCukesTest.getDriver;
import static com.edmunds.widgets.RunCukesTest.navigate;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;

import java.util.List;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.And;

import cucumber.api.DataTable;

public class PagesStepdefs {

    private List<String> navLinks;

    @Given("I am on '(.*)' page")
    public void I_am_on_page(String page) {
        navigate(page);
    }

    @Given("I have opened '(.*)' page")
    public void I_have_opened_page(String page) {
        navigate(page);
    }

    @Given("there is a list of navigation links")
    public void there_is_a_list_of_navigation_links(DataTable table) {
        navLinks = table.asList(String.class);
    }

    @Then("the page should have '(.*)' in the title")
    public void the_page_should_have_title(String title) {
        assertEquals(getDriver().getTitle(), title);
    }

    @And("the page should have navigation in the header")
    public void the_page_should_have_navigation() {
        WebElement navbar = findNavbarElement();
        assertTrue(navbar.isDisplayed());
    }

    public WebElement findNavbarElement() {
        return getDriver().findElement(By.className("navbar-fixed-top"));
    }

    public WebElement findNavElement() {
        return findNavbarElement().findElement(By.className("navbar-nav"));
    }

    public void checkNavLinks() {
        WebElement nav = findNavElement();
        for (String linkText : navLinks) {
            WebElement linkElement = nav.findElement(By.partialLinkText(linkText));
            assertTrue(linkElement.isDisplayed());
        }
    }
}

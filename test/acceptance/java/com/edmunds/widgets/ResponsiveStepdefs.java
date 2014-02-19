package com.edmunds.widgets;

import com.edmunds.widgets.ui.WindowSize;
import static com.edmunds.widgets.RunCukesTest.setWindowSize;

import cucumber.api.java.en.Given;

public class ResponsiveStepdefs {

    @Given("the '(.*)' size of the browser window")
    public void browser_window_size(String size) {
        switch (size) {
            case "large":
                setWindowSize(WindowSize.LARGE);
                break;
            case "medium":
                setWindowSize(WindowSize.MEDIUM);
                break;
            case "small":
                setWindowSize(WindowSize.SMALL);
                break;
            case "extra-small":
                setWindowSize(WindowSize.EXTRA_SMALL);
                break;
            default:
                setWindowSize(WindowSize.MEDIUM);
        }
    }

}

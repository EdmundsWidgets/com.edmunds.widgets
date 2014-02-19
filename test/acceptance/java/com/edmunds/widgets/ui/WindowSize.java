package com.edmunds.widgets.ui;

import org.openqa.selenium.Dimension;

public enum WindowSize {

    // large desktops, 1200px and up
    LARGE(1280, 1024),

    // desktops, 992px and up
    MEDIUM(1024, 768),

    // tablets, 768px and up
    SMALL(768, 1024),

    // phones, less than 768px
    EXTRA_SMALL(480, 800);

    private int height;
    private int width;

    private WindowSize(int width, int height) {
        this.height = height;
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public int getWidth() {
        return width;
    }

    public Dimension getDimension() {
        return new Dimension(getWidth(), getHeight());
    }

}

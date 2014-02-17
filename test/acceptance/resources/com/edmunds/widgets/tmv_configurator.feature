Feature: TMV Widget
  As a user
  I want to configure own NVC widget

  @dev
  Scenario: Check defaults
    Given I am on '/tmv/configure' page
    Then I should see widget configurator
    Then I should see TMV widget
    Then 'Default ZIP code' should be disabled
    Then list of 'Included makes' should be empty
    Then 'Toggle all' makes checkbox should be disabled
    Then 'Toggle all' makes checkbox should not be checked
    Then 'Price to display' dropdown should contain next options:
      | Invoice, TMV amd MSRP |
      | Invoice and TMV       |
      | TMV only              |
    Then option with 'All' text should be selected in 'Show vehicles' section
    Then option with 'Invoice, TMV amd MSRP' text should be selected in 'Price to display' section
    Then option with 'Theme 1' text should be selected in 'Theme' section
    Then option with 'Light' text should be selected in 'Color Scheme' section
    Then option with 'Vertical' text should be selected in 'Layout' section
    Then 'Width' value should be '250px'
    Then 'Include border' checkbox should be checked
    Then 'Border Radius' value should be '5px'

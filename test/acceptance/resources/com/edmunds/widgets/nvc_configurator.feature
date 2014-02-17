Feature: NVC Widget Configurator
  As a user
  I want to configure own NVC widget

  @dev
  Scenario: Check defaults
    Given I am on '/nvc/configure' page
    Then I should see widget configurator
    Then I should see NVC widget
    Then 'Default ZIP code' should be disabled
    Then list of 'Included makes' should be empty
    Then 'Toggle all' makes checkbox should be disabled
    Then 'Toggle all' makes checkbox should not be checked
    Then option with 'Theme 1' text should be selected in 'Theme' section
    Then option with 'Light' text should be selected in 'Color Scheme' section
    Then 'Width' value should be '250px'
    Then 'Include border' checkbox should be checked
    Then 'Border Radius' value should be '5px'

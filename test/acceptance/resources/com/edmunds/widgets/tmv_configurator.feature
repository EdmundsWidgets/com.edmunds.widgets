Feature: TMV Widget
  As a user
  I want to configure own NVC widget

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

  @todo
  Scenario: I want to configure Vehicle Api key
    Given I am on '/tmv/configure' page

  Scenario: I want to configure default ZIP code
    Given I am on '/tmv/configure' page
    When I apply 'axr2rtmnj63qsth3ume3tv5f' Vehicle Api key
    Then I should see 'axr2rtmnj63qsth3ume3tv5f' as applied Vehicle Api key
    Then I should have possibility to apply default ZIP code
    When I apply '12345' default ZIP code
    Then I should see '12345' as applied default ZIP code
    Then TMV widget should be displayed with '12345' ZIP code

  @todo
  Scenario: I want to configure publications state of the vehicles
    Given I am on '/tmv/configure' page

  @todo
  Scenario: I want to configure included makes
    Given I am on '/tmv/configure' page

  @todo
  Scenario: I want to configure price to display
    Given I am on '/tmv/configure' page

  @todo
  Scenario: I want to configure theme of the widget
    Given I am on '/tmv/configure' page

  @todo
  Scenario: I want to configure color scheme of the widget
    Given I am on '/tmv/configure' page

  @todo
  Scenario: I want to configure layout of the widget
    Given I am on '/tmv/configure' page

  Scenario: I want to configure width of the widget
    Given I am on '/tmv/configure' page
    Then width of TMV widget should be equal to '250px'
    When I change the width of the widget to '321px'
    Then width of TMV widget should be equal to '321px'

  Scenario: I want to configure border of the widget
    Given I am on '/tmv/configure' page
    Then I should see 'checked' 'Include border' checkbox
    Then TMV widget should be displayed with border
    When I click 'Include border' checkbox
    Then I should see 'unchecked' 'Include border' checkbox
    Then TMV widget should be displayed without border
    When I click 'Include border' checkbox
    Then I should see 'checked' 'Include border' checkbox
    Then TMV widget should be displayed with border

  Scenario: I want to configure border radius of the widget
    Given I am on '/tmv/configure' page
    Then TMV widget should be displayed with '5px' border radius
    When I change border radius to '10px'
    Then TMV widget should be displayed with '10px' border radius

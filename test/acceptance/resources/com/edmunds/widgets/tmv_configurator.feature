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

  Scenario: I want to configure included makes
    Given I am on '/tmv/configure' page
    When I apply 'axr2rtmnj63qsth3ume3tv5f' Vehicle Api key
    Then list of Included makes should be loaded
    Then 'Toggle all' makes checkbox should not be selected
    When I select makes in the list of Included makes:
      | Audi    |
      | BMW     |
      | Porsche |
    Then TMV widget should be loaded with next makes:
      | Audi    |
      | BMW     |
      | Porsche |
    When I deselect makes in the list of Included makes:
      | BMW     |
      | Porsche |
    Then TMV widget should be loaded with next makes:
      | Audi    |
    When I click 'Toggle all' makes checkbox
    Then 'Toggle all' makes checkbox should be selected
    Then all makes should be selected in the list of Included makes
    Then TMV widget should be loaded with all makes
    When I click 'Toggle all' makes checkbox
    Then 'Toggle all' makes checkbox should not be selected
    Then all makes should not be selected in the list of Included makes
    Then TMV widget should be loaded without makes

  @todo
  Scenario: I want to configure price to display
    Given I am on '/tmv/configure' page

  Scenario Outline: I want to configure theme and color scheme of the widget
    Given I am on '/tmv/configure' page
    When I select <Color Scheme> color scheme for <Theme> theme
    Then TMV widget should be rendered with <Color Scheme> color scheme for <Theme> theme
  Examples:
    | Theme   | Color Scheme |
    | Theme 1 | Light        |
    | Theme 1 | Dark         |
    | Theme 2 | Light        |
    | Theme 2 | Dark         |
    | Theme 3 | Light        |
    | Theme 3 | Dark         |

  Scenario: I want to configure layout of the widget
    Given I am on '/tmv/configure' page
    When I select 'Horizontal' layout
    Then width of TMV widget should be equal to '680px'
    When I select 'Vertical' layout
    Then width of TMV widget should be equal to '250px'

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

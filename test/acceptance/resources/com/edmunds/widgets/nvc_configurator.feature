Feature: NVC Widget Configurator
  As a user
  I want to configure own NVC widget

  @todo
  Scenario: Check defaults
    Given I am on '/nvc/configure' page

  @todo
  Scenario: I want to configure Vehicle Api key
    Given I am on '/nvc/configure' page

  @todo
  Scenario: I want to configure Dealer Api key
    Given I am on '/nvc/configure' page

  @todo
  Scenario: I want to configure default ZIP code
    Given I am on '/nvc/configure' page

  Scenario: I want to configure included makes
    Given I am on '/nvc/configure' page
    Then NVC widget should be loaded
    When I apply 'axr2rtmnj63qsth3ume3tv5f' Vehicle Api key
    Then NVC widget should be loaded
    Then I should see 'axr2rtmnj63qsth3ume3tv5f' as applied Vehicle Api key
    When I apply 'axr2rtmnj63qsth3ume3tv5f' Dealer Api key
    Then NVC widget should be loaded
    When I apply '12345' default ZIP code
    Then NVC widget should be loaded
    Then I should see '12345' as applied default ZIP code
    Then list of Included makes should be loaded
    Then 'Toggle all' makes checkbox should not be selected
    When I select makes in the list of Included makes:
      | Audi    |
      | BMW     |
      | Porsche |
    Then NVC widget should be loaded with next makes:
      | Audi    |
      | BMW     |
      | Porsche |
    When I deselect makes in the list of Included makes:
      | BMW     |
      | Porsche |
    Then NVC widget should be loaded with next makes:
      | Audi    |
    When I click 'Toggle all' makes checkbox
    Then 'Toggle all' makes checkbox should be selected
    Then all makes should be selected in the list of Included makes
    Then NVC widget should be loaded with all makes
    When I click 'Toggle all' makes checkbox
    Then 'Toggle all' makes checkbox should not be selected
    Then all makes should not be selected in the list of Included makes
    Then NVC widget should be loaded without makes

  @todo
  Scenario: I want to configure tabs to display
    Given I am on '/nvc/configure' page

  @todo
  Scenario: I want to configure rename the tabs
    Given I am on '/nvc/configure' page

  @todo
  Scenario: I want to configure dealer keywords
    Given I am on '/nvc/configure' page

  @todo
  Scenario: I want to configure theme of the widget
    Given I am on '/nvc/configure' page

  Scenario Outline: I want to configure color scheme of the widget
    Given I am on '/nvc/configure' page
    Then NVC widget should be loaded
    When I select <Color Scheme> color scheme for <Theme> theme
    Then NVC widget should be rendered with <Color Scheme> color scheme for <Theme> theme
    Examples:
      | Theme   | Color Scheme |
      | Theme 1 | Light        |
      | Theme 1 | Dark         |
      | Theme 2 | Light        |
      | Theme 2 | Dark         |
      | Theme 3 | Light        |
      | Theme 3 | Dark         |

  Scenario: I want to configure width of the widget
    Given I am on '/nvc/configure' page
    Then width of NVC widget should be equal to '250px'
    When I change the width of the widget to '321px'
    Then width of NVC widget should be equal to '321px'

  Scenario: I want to configure border of the widget
    Given I am on '/nvc/configure' page
    Then I should see 'checked' 'Include border' checkbox
    Then NVC widget should be displayed with border
    When I click 'Include border' checkbox
    Then I should see 'unchecked' 'Include border' checkbox
    Then NVC widget should be displayed without border
    When I click 'Include border' checkbox
    Then I should see 'checked' 'Include border' checkbox
    Then NVC widget should be displayed with border

  Scenario: I want to configure border radius of the widget
    Given I am on '/nvc/configure' page
    Then NVC widget should be displayed with '5px' border radius
    When I change border radius to '10px'
    Then NVC widget should be displayed with '10px' border radius

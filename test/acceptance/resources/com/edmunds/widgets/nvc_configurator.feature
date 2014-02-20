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

  @todo
  Scenario: I want to configure included makes
    Given I am on '/nvc/configure' page

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

  @todo
  Scenario: I want to configure color scheme of the widget
    Given I am on '/nvc/configure' page

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

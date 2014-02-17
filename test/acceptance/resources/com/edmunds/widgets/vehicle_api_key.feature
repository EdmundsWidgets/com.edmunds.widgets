Feature: Vehicle Api key
  As a User
  I want to enter a Vehicle Api key

  Scenario Outline: I try to enter an invalid Vehicle Api key
    Given I am on '<page>' page
    Given I see a Vehicle Api key section
    Given I have a Vehicle Api key 'loremipsumdolorsitamet'
    And I should see enabled Vehicle Api key text input
    And I should see enabled 'Apply' Vehicle Api key button
    When I fill in my Vehicle Api key
    And I click 'Apply' Vehicle Api key button
    Then I should see a tooltip with 'Please enter a valid Vehicle API key' text
  Examples:
    | page            |
    | /tmv/configure  |
    | /nvc/configure  |

  Scenario Outline: I try to enter a valid Vehicle Api key
    Given I am on '<page>' page
    Given I see a Vehicle Api key section in the configurator
    Given I have a Vehicle Api key 'axr2rtmnj63qsth3ume3tv5f'
    And I should see enabled Vehicle Api key text input
    And I should see enabled 'Apply' Vehicle Api key button
    When I fill in my Vehicle Api key
    And I click 'Apply' Vehicle Api key button
    Then I should see entered Vehicle Api key as text
    And I should see enabled 'Change' Vehicle Api key button
  Examples:
    | page            |
    | /tmv/configure  |
    | /nvc/configure  |

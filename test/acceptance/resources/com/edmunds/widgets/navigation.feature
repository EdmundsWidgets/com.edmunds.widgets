Feature: Navigation
  To test cross-site navigation

  Scenario Outline: responsive
    Given the '<size>' size of the browser window
    Given I have opened '/' page
    Then the page should have 'Edmunds Widgets' in the title

    Examples:
      | size        |
      | large       |
      | medium      |
      | small       |
      | extra-small |
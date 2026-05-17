Feature: Special SauceDemo users

  As a test automation engineer
  I want to verify the known behavior of special SauceDemo users
  So that user-specific defects are covered explicitly

  Scenario: Error user cannot add every product to the cart
    Given I am logged in as "error_user"
    When I add "sauce-labs-bolt-t-shirt" to the cart
    Then the cart badge should not be visible
    And the "sauce-labs-bolt-t-shirt" button should show "Add to cart"

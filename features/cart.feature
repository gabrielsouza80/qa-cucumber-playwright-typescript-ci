Feature: Shopping cart

  As a logged-in SauceDemo user
  I want to manage my shopping cart
  So that I can review and modify items before checkout

  Background:
    Given I am logged in as "standard_user"

  # ─── Page structure ───────────────────────────────────────────────────────

  Scenario: Empty cart page displays required elements
    When I navigate to the cart page
    Then I should be on the cart page
    And the continue shopping button should be visible
    And the checkout button should be visible
    And the cart should be empty

  # ─── Cart contents ────────────────────────────────────────────────────────

  Scenario: Cart shows item added from inventory
    When I add "sauce-labs-backpack" to the cart
    And I navigate to the cart page
    Then the cart should contain 1 item
    And the cart should contain "Sauce Labs Backpack"

  Scenario: Cart shows multiple items added from inventory
    When I add "sauce-labs-backpack" to the cart
    And I add "sauce-labs-bike-light" to the cart
    And I navigate to the cart page
    Then the cart should contain 2 items
    And the cart should contain "Sauce Labs Backpack"
    And the cart should contain "Sauce Labs Bike Light"

  Scenario: Each cart item shows quantity of 1
    When I add "sauce-labs-backpack" to the cart
    And I navigate to the cart page
    Then the quantity for "sauce-labs-backpack" should be "1"

  # ─── Remove from cart ─────────────────────────────────────────────────────

  Scenario: Removing an item from cart updates the cart
    When I add "sauce-labs-backpack" to the cart
    And I add "sauce-labs-bike-light" to the cart
    And I navigate to the cart page
    And I remove "sauce-labs-backpack" from the cart
    Then the cart should contain 1 item
    And the cart should not contain "Sauce Labs Backpack"
    And the cart should contain "Sauce Labs Bike Light"

  Scenario: Removing all items leaves cart empty
    When I add "sauce-labs-backpack" to the cart
    And I navigate to the cart page
    And I remove "sauce-labs-backpack" from the cart
    Then the cart should be empty

  # ─── Navigation ───────────────────────────────────────────────────────────

  Scenario: Continue shopping button returns to inventory page
    When I navigate to the cart page
    And I click continue shopping
    Then I should see the products page title "Products"

  Scenario: Checkout button navigates to checkout step 1
    When I add "sauce-labs-backpack" to the cart
    And I navigate to the cart page
    And I proceed to checkout
    Then I should be on checkout step 1

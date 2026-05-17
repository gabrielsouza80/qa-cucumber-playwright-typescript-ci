Feature: Inventory / Products page

  As a logged-in SauceDemo user
  I want to browse and manage products on the inventory page
  So that I can add items to my cart and navigate the site

  Background:
    Given I am logged in as "standard_user"

  # ─── Page structure ───────────────────────────────────────────────────────

  Scenario: Inventory page displays all required elements
    Then I should see the products page title "Products"
    And the inventory list should be visible
    And the sort dropdown should be visible
    And the cart icon should be visible
    And the burger menu button should be visible

  Scenario: Inventory page shows exactly 6 products
    Then the inventory should contain 6 products

  # ─── Sorting ──────────────────────────────────────────────────────────────

  Scenario: Products are sorted A to Z by default
    Then the first product name should be "Sauce Labs Backpack"
    And the last product name should be "Test.allTheThings() T-Shirt (Red)"

  Scenario: Products can be sorted Z to A
    When I sort products by "Name (Z to A)"
    Then the first product name should be "Test.allTheThings() T-Shirt (Red)"
    And the last product name should be "Sauce Labs Backpack"

  Scenario: Products can be sorted by price low to high
    When I sort products by "Price (low to high)"
    Then the first product price should be "$7.99"
    And the last product price should be "$49.99"

  Scenario: Products can be sorted by price high to low
    When I sort products by "Price (high to low)"
    Then the first product price should be "$49.99"
    And the last product price should be "$7.99"

  # ─── Add / Remove from cart ───────────────────────────────────────────────

  Scenario: Adding a product updates the cart badge
    When I add "sauce-labs-backpack" to the cart
    Then the cart badge should show "1"
    And the "sauce-labs-backpack" button should show "Remove"

  Scenario: Adding multiple products updates the cart badge count
    When I add "sauce-labs-backpack" to the cart
    And I add "sauce-labs-bike-light" to the cart
    Then the cart badge should show "2"

  Scenario: Removing a product from inventory updates the cart badge
    When I add "sauce-labs-backpack" to the cart
    And I remove "sauce-labs-backpack" from the cart on inventory page
    Then the cart badge should not be visible
    And the "sauce-labs-backpack" button should show "Add to cart"

  Scenario: Cart badge is not visible when cart is empty
    Then the cart badge should not be visible

  # ─── Navigation ───────────────────────────────────────────────────────────

  Scenario: Clicking the cart icon navigates to the cart page
    When I click the cart icon
    Then I should be on the cart page

  Scenario: Clicking a product name navigates to the product detail page
    When I click on product name with id 4
    Then I should be on the product detail page for item 4

  Scenario: Clicking a product image navigates to the product detail page
    When I click on product image with id 4
    Then I should be on the product detail page for item 4

  # ─── Burger menu ──────────────────────────────────────────────────────────

  Scenario: Burger menu contains all expected links
    When I open the burger menu
    Then the burger menu should contain "All Items"
    And the burger menu should contain "About"
    And the burger menu should contain "Logout"
    And the burger menu should contain "Reset App State"

  Scenario: Logout from burger menu returns to login page
    When I open the burger menu
    And I click logout in the burger menu
    Then I should be on the login page

  Scenario: Reset App State clears the cart
    When I add "sauce-labs-backpack" to the cart
    And I reset the app state
    Then the cart badge should not be visible

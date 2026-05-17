Feature: Product detail page

  As a logged-in SauceDemo user
  I want to view product details
  So that I can make informed purchase decisions

  Background:
    Given I am logged in as "standard_user"
    And I navigate to product detail page for item 4

  # ─── Page structure ───────────────────────────────────────────────────────

  Scenario: Product detail page displays all required elements
    Then the product name should be "Sauce Labs Backpack"
    And the product price should be "$29.99"
    And the product description should be visible
    And the product image should be visible
    And the add to cart button should be visible
    And the back to products button should be visible

  # ─── Add / Remove ─────────────────────────────────────────────────────────

  Scenario: Adding product from detail page updates cart badge
    When I add the product to the cart from the detail page
    Then the cart badge should show "1"
    And the remove button should be visible

  Scenario: Removing product from detail page clears cart badge
    When I add the product to the cart from the detail page
    And I remove the product from the cart on the detail page
    Then the cart badge should not be visible
    And the add to cart button should be visible

  # ─── Navigation ───────────────────────────────────────────────────────────

  Scenario: Back to products button returns to inventory page
    When I click back to products
    Then I should see the products page title "Products"

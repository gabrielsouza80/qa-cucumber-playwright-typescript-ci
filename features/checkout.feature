Feature: Checkout

  As a logged-in SauceDemo user
  I want to complete the checkout process
  So that I can place an order

  Background:
    Given I am logged in as "standard_user"
    And I have "sauce-labs-backpack" in my cart
    And I am on checkout step 1

  # ─── Step 1: Your Information ─────────────────────────────────────────────

  Scenario: Checkout step 1 displays the correct title
    Then I should be on checkout step 1

  Scenario: Submitting empty form shows first name required error
    When I submit the checkout form without filling any fields
    Then I should see the checkout error "Error: First Name is required"

  Scenario: Submitting without last name shows last name required error
    When I fill in first name "John" and submit
    Then I should see the checkout error "Error: Last Name is required"

  Scenario: Submitting without postal code shows postal code required error
    When I fill in first name "John" and last name "Doe" and submit
    Then I should see the checkout error "Error: Postal Code is required"

  Scenario: Cancel on step 1 returns to cart
    When I cancel checkout on step 1
    Then I should be on the cart page

  Scenario: Valid information proceeds to step 2
    When I fill in checkout information "John" "Doe" "12345"
    Then I should be on checkout step 2

  # ─── Step 2: Overview ─────────────────────────────────────────────────────

  Scenario: Checkout step 2 shows payment information
    When I fill in checkout information "John" "Doe" "12345"
    Then the payment info should be "SauceCard #31337"

  Scenario: Checkout step 2 shows shipping information
    When I fill in checkout information "John" "Doe" "12345"
    Then the shipping info should be "Free Pony Express Delivery!"

  Scenario: Checkout step 2 shows correct item subtotal
    When I fill in checkout information "John" "Doe" "12345"
    Then the subtotal should contain "$29.99"

  Scenario: Checkout step 2 shows tax
    When I fill in checkout information "John" "Doe" "12345"
    Then the tax should contain "$2.40"

  Scenario: Checkout step 2 shows correct total
    When I fill in checkout information "John" "Doe" "12345"
    Then the total should contain "$32.39"

  Scenario: Checkout step 2 shows the ordered items
    When I fill in checkout information "John" "Doe" "12345"
    Then the order summary should contain 1 item

  Scenario: Checkout step 2 calculates totals for multiple items
    Given I have "sauce-labs-bike-light" in my cart
    And I am on checkout step 1
    When I fill in checkout information "John" "Doe" "12345"
    Then the order summary should contain 2 items
    And the subtotal should contain "$39.98"
    And the tax should contain "$3.20"
    And the total should contain "$43.18"

  Scenario: Cancel on step 2 returns to inventory
    When I fill in checkout information "John" "Doe" "12345"
    And I cancel checkout on step 2
    Then I should see the products page title "Products"

  # ─── Complete ─────────────────────────────────────────────────────────────

  Scenario: Finishing checkout shows confirmation page
    When I fill in checkout information "John" "Doe" "12345"
    And I finish the order
    Then I should be on the checkout complete page

  Scenario: Confirmation page shows thank you header
    When I fill in checkout information "John" "Doe" "12345"
    And I finish the order
    Then the confirmation header should be "Thank you for your order!"

  Scenario: Confirmation page shows dispatch message
    When I fill in checkout information "John" "Doe" "12345"
    And I finish the order
    Then the confirmation text should be "Your order has been dispatched, and will arrive just as fast as the pony can get there!"

  Scenario: Confirmation page shows pony express image
    When I fill in checkout information "John" "Doe" "12345"
    And I finish the order
    Then the pony express image should be visible

  Scenario: Back Home button returns to inventory after order
    When I fill in checkout information "John" "Doe" "12345"
    And I finish the order
    And I click back home
    Then I should see the products page title "Products"
    And the cart badge should not be visible
    And the "sauce-labs-backpack" button should show "Add to cart"

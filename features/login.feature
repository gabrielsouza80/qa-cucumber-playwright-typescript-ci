Feature: SauceDemo login

  As a SauceDemo user
  I want to log in with my credentials
  So that I can access the products page

  Scenario: Login with valid credentials
    Given I am on the SauceDemo login page
    When I log in with username "standard_user" and password "secret_sauce"
    Then I should see the products page

  Scenario: Login with invalid credentials
    Given I am on the SauceDemo login page
    When I log in with username "invalid_user" and password "invalid_password"
    Then I should see a login error message

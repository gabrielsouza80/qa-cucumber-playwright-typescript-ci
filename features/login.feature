Feature: Login

  As a SauceDemo user
  I want to log in with my credentials
  So that I can access the products page

  Background:
    Given I am on the SauceDemo login page

  # ─── Happy path ───────────────────────────────────────────────────────────

  Scenario Outline: Login succeeds for all valid user types
    When I log in with username "<username>" and password "secret_sauce"
    Then I should see the products page

    Examples:
      | username                |
      | standard_user           |
      | problem_user            |
      | performance_glitch_user |
      | error_user              |
      | visual_user             |

  # ─── Locked-out user ──────────────────────────────────────────────────────

  Scenario: Locked-out user cannot log in
    When I log in with username "locked_out_user" and password "secret_sauce"
    Then I should see the login error message "Epic sadface: Sorry, this user has been locked out."

  # ─── Invalid credentials ──────────────────────────────────────────────────

  Scenario Outline: Login is rejected for invalid credentials
    When I log in with username "<username>" and password "<password>"
    Then I should see the login error message "Epic sadface: Username and password do not match any user in this service"

    Examples:
      | username      | password         |
      | invalid_user  | invalid_password |
      | standard_user | wrong_password   |
      | STANDARD_USER | secret_sauce     |
      | standard_user | SECRET_SAUCE     |

  # ─── Missing fields ───────────────────────────────────────────────────────

  Scenario: Login is rejected when both fields are empty
    When I click the login button without entering credentials
    Then I should see the login error message "Epic sadface: Username is required"

  Scenario: Login is rejected when password is missing
    When I log in with username "standard_user" and password ""
    Then I should see the login error message "Epic sadface: Password is required"

  Scenario: Login is rejected when username is missing
    When I log in with username "" and password "secret_sauce"
    Then I should see the login error message "Epic sadface: Username is required"

  # ─── Error message UI ─────────────────────────────────────────────────────

  Scenario: Error banner can be dismissed
    When I log in with username "invalid_user" and password "invalid_password"
    Then I should see the login error message "Epic sadface: Username and password do not match any user in this service"
    When I close the login error message
    Then the login error message should not be visible

  Scenario: Input fields show error styling after failed login
    When I log in with username "invalid_user" and password "invalid_password"
    Then the username input should have an error style
    And the password input should have an error style

  # ─── Page structure ───────────────────────────────────────────────────────

  Scenario: Login page displays all required elements
    Then the login page should display the username field
    And the login page should display the password field
    And the login page should display the login button
    And the login page should display the Swag Labs logo

  Scenario: Password field masks typed characters
    When I type "secret_sauce" into the password field
    Then the password field type should be "password"

  # ─── Session & navigation ─────────────────────────────────────────────────

  Scenario: Logged-out user cannot access inventory via back button
    When I log in with username "standard_user" and password "secret_sauce"
    And I log out from the application
    And I press the browser back button
    Then I should be on the login page

  # ─── Security ─────────────────────────────────────────────────────────────

  Scenario: Login page is served over HTTPS
    Then the page URL should use HTTPS

  Scenario: SQL injection attempt is rejected
    When I log in with username "' OR '1'='1" and password "' OR '1'='1"
    Then I should see the login error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: XSS attempt in username field is not executed
    When I log in with username "<script>alert('xss')</script>" and password "secret_sauce"
    Then I should see the login error message "Epic sadface: Username and password do not match any user in this service"

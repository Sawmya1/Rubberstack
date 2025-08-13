Feature: Rudderstack Event Flow

  Scenario: Verify event delivery after sending API event
    Given I login to Rudderstack
    When I navigate to the Connections page
    And I store the Data Plane URL
    And I store the Write Key of my HTTP source
    And I send an API event to Rudderstack
    And I open the Webhook destination events tab
    Then I verify the delivered and failed event counts

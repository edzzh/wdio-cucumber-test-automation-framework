Feature: TestDevLab Automation Tests

  @testdevlab
  Scenario: User navigates to TestDevLab 'Test Automation' section
    Given User navigates to TestDevLab homepage
    When User opens 'Solutions' tab
      And User navigates to 'Test automation' section
    Then User is redirected to 'Test Automation' section

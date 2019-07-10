@feature-tag
Feature: The Facebook

  I want to open a social network page

  @test-1
  Scenario: Opening a social network page
    Given I open Facebook page
    Then I see 'Facebook' in the title

  @test-1 @focus
  Scenario: Different kind of opening
    Given I kinda open Facebook page
    Then I am very happy

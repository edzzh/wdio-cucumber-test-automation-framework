"use strict";

import { Given, When, Then } from "cucumber";
import TestDevLab from "../page-objects/testdevlab";

Given(/^User navigates to TestDevLab homepage$/, () => {
  // Open TestDevLab homepage
  browser.url("https://www.testdevlab.com/");
});

When(/^User opens '(.*?)' tab$/, (tabTitle) => {
  // Set the necessary navigation tab in TestDevLab class
  TestDevLab.setTdlHeaderNavigationSection(tabTitle);

  // Whait till navigation tab appears on HTML
  browser.waitUntil(() => {
    return TestDevLab.tdlHeaderNavigationSection.isVisible();
  }, 5000, `Couldn't locate navigation tab - ${tabTitle}`);

  // Open "Solutions" navigation TestDevLab
  browser.click(TestDevLab.tdlHeaderNavigationSection.selector);
});

When(/^User navigates to '(.*?)' section$/, (section) => {
  // Set the necessary drop down navigation tab in TestDevLab class
  TestDevLab.setTdlDropDownMenuSection(section);

  // Whait till navigation tab appears on HTML
  browser.waitUntil(() => {
    return TestDevLab.tdlDropDownMenuSection.isVisible();
  }, 5000, `Couldn't locate drop down menu tab - ${section}`);

  // Open "Test Automation" navigation TestDevLab
  browser.click(TestDevLab.tdlDropDownMenuSection.selector);
});

Then(/^User is redirected to 'Test Automation' section$/, () => {
  // Validate if user has been redirected to Test Automation section correctly
  browser.waitUntil(() => {
    return TestDevLab.mobileAndWebAutomationSection.isVisible();
  }, 5000, `Couldn't locate Test Automation section`)
});

"use strict";

// TestDevLab Page Object Class
class TestDevLab {
  constructor() {
    this.tdlNavigationTab = null;
    this.dropDownMenuTab = null;
  }

  get tdlHeaderNavigationSection() {
    return $(`//div[text()="${this.tdlNavigationTab}"]`);
  }

  get tdlDropDownMenuSection() {
    return $(`(//a[contains(@class, "menu-link-w-icon")]/div[text()="${this.dropDownMenuTab}"])[1]`);
  }

  get mobileAndWebAutomationSection() {
    return $(`//div[contains(@class, "test-automation-page")]//h1[text()="Automation for mobile, web & desktop"]`);
  }

  setTdlHeaderNavigationSection(navigationTab) {
    this.tdlNavigationTab = navigationTab;
  }

  setTdlDropDownMenuSection(menuTab) {
    this.dropDownMenuTab = menuTab;
  }
}

export default new TestDevLab();

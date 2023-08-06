import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import DuckDuckGoPage from './src/pages/DuckduckgoPage'

Given('I go to the Duckduckgo page', function () {
  this.browser = new DuckDuckGoPage()
  this.browser.load()
})

Then('I see {string} in the title', (title: string) => {
  cy.title().should('include', title)
})

Given('I fill the search input with the {string} term on the Search Engine page', function (text: string) {
  this.browser.fillSearch(text)
})

When('I click on the search button on the Search Engine page', function () {
  this.browser.search()
})

Then('the text {string} should be visible on the result page on the Search Engine page', function (text: string) {
  this.browser.resultText((elemText: string) => {
    expect(elemText).contains(text)
  })
})

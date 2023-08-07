export default class DuckduckgoPage {
  private _url = 'https://duckduckgo.com/'

  private _inputSearch = '#searchbox_input'
  private _btnSearch = '.searchbox_searchButton__F5Bwq'
  private _resultSearch = '#r1-0 > div.ikg2IXiCD14iVX7AdZo1 > h2 > a'

  load(): void {
    cy.visit(this._url)
    cy.get('body').should('be.visible')
  }

  fillSearch(text: string): void {
    cy.get(this._inputSearch).should('be.visible').type(text)
  }

  search(): void {
    cy.get(this._btnSearch).should('be.visible').click()
  }

  resultText():void {
    //cy.get(this._resultSearch, { timeout: 20000 }).then(($elem) => {
     //callback($elem.text())
      cy.get(this._resultSearch)
      .invoke('attr', 'href')
      .then((href) => console.log(href));
    }

  }



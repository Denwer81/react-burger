/// <reference types="cypress" />
// @ts-check

describe('app works correctly burger constructor page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients').as('ingredients')
  });

  it('should render constructor page', () => {
    cy.contains('Собери бургер');
  });

  it('should open and close ingredient modal', () => {
    cy.wait('@ingredients')
      .then(() => {
        cy.get('[class^=IngredientsCard_card__]').first().as('ingredient')

        cy.get('@ingredient').should('exist').click()
        cy.contains('Детали ингредиента')
        cy.get('[class^=Modal_closeButton__]').click()
      })
  });

  it('should post order', () => {
    const dataTransfer = new DataTransfer()

    cy.get('button').contains('Оформить заказ').click()

    cy.url().should('eq', 'http://localhost:3000/login')
    cy.get('input[name=email]').type('qqqqqq@qq.ru')
    cy.get('input[name=password]').type('qqqqqq')
    cy.get('button').should('have.text', 'Войти').click()

    cy.url().should('eq', 'http://localhost:3000/')
    cy.getCookie('accessToken').should('exist')

    cy.get('[class^=IngredientsCard_card__]').first().as('ingredient')

    cy.get('@ingredient').first()
      .trigger('dragstart', {
        dataTransfer
      })
    cy.get('[class^=BurgerConstructor_ingredientsList__]')
      .trigger('drop', {
        dataTransfer
      })

    cy.get('button').contains('Оформить заказ').click()
    cy.get('[class^=OrderDetails_id__]', { timeout: 20000 }).should('exist')
    cy.get('[class^=Modal_closeButton__]').click()
    cy.contains('В корзине пусто')
  })
})

// cypress/integration/conversion.spec.js

describe('Distance Conversion Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Substitua pela URL local ou URL correta de sua aplicação
  });

  it('should display the conversion app with a title', () => {
    cy.contains('h1', 'Conversor de Distâncias').should('be.visible');
  });

  it('should correctly convert 1 meter to feet', () => {
    cy.get('input[placeholder="Digite o valor em metros"]').clear().type('1');
    cy.get('input[placeholder="Digite o valor em pés"]').should('have.value', '3.28');
  });

  it('should correctly convert 3.28084 feet to meters', () => {
    cy.get('input[placeholder="Digite o valor em pés"]').clear().type('3.28084');
    cy.get('input[placeholder="Digite o valor em metros"]').should('have.value', '1.00');
  });

  it('should handle empty input for meters', () => {
    cy.get('input[placeholder="Digite o valor em metros"]').clear();
    cy.get('input[placeholder="Digite o valor em pés"]').should('have.value', '');
  });

  it('should handle empty input for feet', () => {
    cy.get('input[placeholder="Digite o valor em pés"]').clear();
    cy.get('input[placeholder="Digite o valor em metros"]').should('have.value', '');
  });

  it('should correctly update feet input when meters input is changed', () => {
    cy.get('input[placeholder="Digite o valor em metros"]').clear().type('2');
    cy.get('input[placeholder="Digite o valor em pés"]').should('have.value', '6.56');
  });

  it('should correctly update meters input when feet input is changed', () => {
    cy.get('input[placeholder="Digite o valor em pés"]').clear().type('6.56168');
    cy.get('input[placeholder="Digite o valor em metros"]').should('have.value', '2.00');
  });

  it('should handle non-numeric input in meters field', () => {
    cy.get('input[placeholder="Digite o valor em metros"]').clear().type('abc');
    cy.get('input[placeholder="Digite o valor em pés"]').should('have.value', '');
  });

  it('should handle non-numeric input in feet field', () => {
    cy.get('input[placeholder="Digite o valor em pés"]').clear().type('abc');
    cy.get('input[placeholder="Digite o valor em metros"]').should('have.value', '');
  });

  it('should convert large values correctly', () => {
    const largeMeterValue = 1000000000;
    const largeFeetValue = (largeMeterValue * 3.28084).toFixed(2);

    cy.get('input[placeholder="Digite o valor em metros"]').clear().type(largeMeterValue);
    cy.get('input[placeholder="Digite o valor em pés"]').should('have.value', largeFeetValue);

    cy.get('input[placeholder="Digite o valor em pés"]').clear().type(largeFeetValue);
    cy.get('input[placeholder="Digite o valor em metros"]').should('have.value', largeMeterValue.toFixed(2));
  });

  it('should handle very large input without crashing', () => {
    const veryLargeValue = 1e+12;
    const feetValue = (veryLargeValue * 3.28084).toFixed(2);
    const metersValue = (feetValue / 3.28084).toFixed(2);

    cy.get('input[placeholder="Digite o valor em metros"]').clear().type(veryLargeValue);
    cy.get('input[placeholder="Digite o valor em pés"]').should('have.value', feetValue);

    cy.get('input[placeholder="Digite o valor em pés"]').clear().type(feetValue);
    cy.get('input[placeholder="Digite o valor em metros"]').should('have.value', metersValue);
  });
});

const getInput = id => cy.get(id).next().find('input');

// Type commands
const clearText = '{selectall}{backspace}';

describe('Duration Input Mask', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  describe('Basic usage', () => {
    let $input;

    beforeEach(() => {
      $input = getInput('#basic-usage').focus();
    });

    it('accepts focus', () => {
      $input.should('have.focus').and('be.visible');
    });

    it('allows input deletion', () => {
      // cy.task('log', ['trimStart', typeof String.prototype.trimStart]);
      $input.type(clearText).should('have.value', 'foo');
    });

    it('masks 0 input to empty string', () => {
      $input.type(clearText).type('0').should('have.value', '');
    });


    // FIXME Cannot test multiple chars due to immediate maskOnChange behaviour
    it('masks input', () => {
      $input.type(clearText).type('2').should('have.value', '2s');
    });
  });
});

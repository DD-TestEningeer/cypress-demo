



// selenium => @Test(enabled =false), testNG => include/exclude


// .only - for selective test case execution
// .skip - for skipping the selected test case

describe('Selective Test Execution', () => {
    it.only('1) This test will run', () => {
      cy.log('Running only this test')
    })
  
    it.skip('2) This test will be skipped', () => {
      cy.log('This will not run')
    })
  })
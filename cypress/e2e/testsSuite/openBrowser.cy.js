// describe - test suite
// it - test case
// cy - refer as driver in case webdriver e.g driver.get(), driver.findElement()
// cy.visit(app url) => for opening web url
// cy.log("logging data to tests");  // in javascript => console.log("test message");
// cy.title() => checking title of the web page // selenium => driver.getTitle();

// test suite creation => 2 parameters - 1 Test Suite Name and 2 your arrow function
describe("Web Navigate Suite", () => {

    // First Test Case 1 => for google url  => test case title and arrow function
     // TestNG => @Test then test case name

  it("1) Verify the Google url", () => {


    // Test Case Steps 
    // Step 1 - Open the Browser  => Selenium => driver = new ChromeDriver();
    // Step 2 - Page Naviagation/ Open the google url  => driver.get("https://www.google.com");
    cy.visit("https://www.google.com");

  });


  // Test Case 2

  it("2) Verify the cypress url", ()=>{

    cy.visit("https://www.cypress.io/");


  }




  );


});

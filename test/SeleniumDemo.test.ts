import { should } from 'chai';
let webdriver = require('selenium-webdriver');
let fs = require('fs');
should();

// skipping this test run until configuring headless chrome for travis CI
describe.skip('Selenium Demo Test Suite', function () {
    let driver;
    // time out for test execution
    this.timeout(60000);
    
    before(function () {
        // initializing chrome driver
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        // maximizing chrome browser
        driver.manage().window().maximize();
    });
    
    afterEach(function () {
        let testCaseName: string = this.currentTest.title;
        let testCaseStatus: string = this.currentTest.state;
        if (testCaseStatus === 'failed') {
            console.log(`Test: ${testCaseName}, Status: Failed!`);
            // capturing screenshot if test fails
            driver.takeScreenshot().then((data) => {
                let screenshotPath = `TestResults/Screenshots/${testCaseName}.png`;
                console.log(`Saving Screenshot as: ${screenshotPath}`);
                fs.writeFileSync(screenshotPath, data, 'base64');
            });
        } else if (testCaseStatus === 'passed') {
            console.log(`Test: ${testCaseName}, Status: Passed!`);
        } else {
            console.log(`Test: ${testCaseName}, Status: Unknown!`);
        }
    });

    after(function () {
        driver.quit();
    });

    it('should fail to open google.com', function () {
        let Url: string = "http://www.bing.com";
        return driver.get(Url).then(() => {
            console.log(`Page "${Url}" opened`);
        }).then(() => {
            return driver.getCurrentUrl().then((currentUrl) => {
                currentUrl.should.include(
                    `www.google.com`,
                    `Expected url: www.google.com, Actual url: ${currentUrl}`);
            });
        });
    });

    it('should fail to search for nilay shah at bing.com', function () {
        let Url: string = "http://www.bing.com";
        return driver.get(Url).then(() => {
            console.log(`Page "${Url}" opened`);
        }).then(() => {
            return driver.getCurrentUrl().then((currentUrl) => {
                currentUrl.should.include(
                    `www.bing.com`,
                    `Expected url: www.google.com, Actual url: ${currentUrl}`);
            }).then(() => {
                let searchBox = driver.findElement(webdriver.By.name('q'));
                searchBox.sendKeys('nilay');
                return searchBox.getAttribute('value').then((value) => {
                    value.should.equal('nilay shah');
                });
            });
        });
    });

    it('should search for nilay shah at bing.com', function () {
        let Url: string = `http://www.bing.com`;
        return driver.get(Url).then(function () {
            console.log(`Page "${Url}" opened`);
        }).then(() => {
            return driver.getCurrentUrl().then((currentUrl) => {
                currentUrl.should.include(
                    `www.bing.com`,
                    `Expected url: www.bing.com, Actual url: ${currentUrl}`);
            }).then(() => {
                let searchBox = driver.findElement(webdriver.By.name('q'));
                searchBox.sendKeys('nilay shah');
                return searchBox.getAttribute('value').then((value) => {
                    value.should.equal('nilay shah');
                });
            });
        });
    });
});
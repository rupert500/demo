//Sitekit test
var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var assert = require('assert');

function verify(searchText,bodyText)
{
	//Verify is the search text is contained
	if (bodyText.indexOf(searchText) == -1)
	{
		assert.fail('The following text was not found in the contact section: ' + searchText);
	}
}


(async function sitekit() {
    var driver =  new webdriver.Builder()
							.forBrowser('chrome')
							.build();

    try {
		//Select site
		await driver.get('https://www.sitekit.net'); 
		//Click contact		
		await driver.findElement(By.linkText('contact')).click();
		//Search the contact section
		var element = await driver.findElement(By.id('contact'));
		await element.getText().then(function(text) {
			verify("Edinburgh",text);
			verify("London",text);
			verify("0845 299 0900",text);
		});
	}
	catch (e){
		console.error('Exception!\n',e.stack,'\n');
			}
	finally 
	{
        driver.quit();
    }
})();
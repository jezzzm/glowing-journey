const ppt = require('puppeteer');

module.exports = async (team) => {
  const url = 'https://nsfa.myclubmate.com.au/';

  const dropDowns = {
    club: 'select[name=ClubCode]',
    age: 'select[name="AgeGrp"]',
    team: 'select[name="Team"]'
  };

  const getResults = 'input[type=checkbox][name=showLiveResults]';
  const firstFixture = 'h2.coloured-heading + table tr:nth-child(2)';

  const browser = await ppt.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector(dropDowns.club);
  await page.select(dropDowns.club, team.club);
  await page.select(dropDowns.age, team.age);
  await page.select(dropDowns.team, team.team);

  await page.click(getResults);
  await page.waitForSelector(firstFixture);
  await page.waitFor(500);
  await page.screenshot({ path: 'screenshots/screenshot.png', fullPage: true });

  await browser.close();
};
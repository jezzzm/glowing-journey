const ppt = require('puppeteer');
const url = 'https://nsfa.myclubmate.com.au/';

// selectors

const dropDowns = {
  club: 'select[name=ClubCode]',
  age: 'select[name="AgeGrp"]',
  team: 'select[name="Team"]'
};

const myTeam = {
  club: 'LNCOV',
  age: 'R:MAA',
  team: 'MAA2 A' // TODO: tbc
};

const demoTeam = {
  club: 'LNCOV',
  age: 'R:U08SAPL',
  team: 'U8 SAL'
};

const getResults = 'input[type="checkbox"][name="showLiveResults"]';
const firstFixture = 'h2.coloured-heading + table tr:nth-child(2)';


interface NsfaTeam {
  readonly club: string,
  readonly age: string,
  readonly team: string
}

async function screenShotResults(team: NsfaTeam) {
  const browser = await ppt.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector(dropDowns.club);
  await page.select(dropDowns.club, team.club);
  await page.select(dropDowns.age, team.age);
  await page.select(dropDowns.team, team.team);

  await page.click(getResults);
  await page.waitForSelector(firstFixture);
  await page.screenshot({ path: 'screenshots/screenshot.png' });

  await browser.close();
}

screenShotResults(demoTeam);
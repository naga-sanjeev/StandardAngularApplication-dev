// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const baseUrl = 'http://192.168.245.29:3000'
// const baseUrl = 'http://192.168.17.29:3000'

export const environment = {
  production: false,
  register: baseUrl + '/postuserdata',
  listOfUsers: baseUrl + '/listofusers',
  login: baseUrl + '/login',
  usersData: baseUrl + '/usersData',
  barChart: baseUrl + '/getBarChartData',
  pieChart: baseUrl + '/getPieChartData',
  cardData: baseUrl + '/getCardData',
  tabData: baseUrl + '/getTabsData',
  dropdownData: baseUrl + '/getDropDownData',
  deleteTableData: baseUrl + '/delete',
  updateTableData: baseUrl + '/updateTableData',
  fileUpload: baseUrl + '/postImagePath',
  fetchImage: baseUrl + '/getImages',
  
  
  

};
module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'src/support/**/*.ts',
      'src/steps/**/*.ts'
    ],
    paths: ['features/**/*.feature'],
    format: [
      'progress',
      'json:reports/cucumber-report.json',
      'junit:reports/cucumber-report.xml'
    ],
    publishQuiet: true
  },
  report: {
    requireModule: ['ts-node/register'],
    require: [
      'src/support/**/*.ts',
      'src/steps/**/*.ts'
    ],
    paths: ['features/**/*.feature'],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      'junit:reports/cucumber-report.xml'
    ],
    publishQuiet: true
  }
};

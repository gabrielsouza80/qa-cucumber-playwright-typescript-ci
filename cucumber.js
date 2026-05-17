module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'src/support/**/*.ts',
      'src/steps/**/*.ts'
    ],
    paths: ['features/**/*.feature'],
    format: ['progress'],
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
      'html:reports/cucumber-report.html'
    ],
    publishQuiet: true
  }
};

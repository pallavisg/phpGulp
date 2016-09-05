      var configphp = ['./**/*.php', '!vendor/**/*.*', '!node_modules/**/*.*','!concat/**/*.*','!coverage/**/*.*'];
     var configcss = ['./**/*.css', '!vendor/**/*.*', '!node_modules/**/*.*','!concat/**/*.*','!coverage/**/*.*'];
     var configjs =  ['./**/*.js' , '!vendor/**/*.*', '!node_modules/**/*.*','!concat/**/*.*','!coverage/**/*.*'];
     var configJs = ['./**/*.js','!bower_components/**/*.*','!node_modules/**/*.*'];
     var concatsrc = 'ecomm_project/**/*.php';
     var rimraf2clean = ['bower_components','concat','coverage','doc','minifyCSS_dest','minifyHTML_dest','uglify_dest','Reports','phpcpd-Reports/*'];
     var confightml = ['./**/*.html', '!vendor/**/*.*', '!node_modules/**/*.*',,'!concat/**/*.*','!coverage/**/*.*'];
     var ignore = ['vendor/**/*.*', 'node_modules/**/*.*','uglify_dest/**/*.*','minifyHTML_dest/**/*.*','concat/**/*.*','coverage/**/*.*','bower_components/**/*.*','minifyCSS_dest/**/*.*','doc/**/*.*','build/**/*.*','Reports/**/*.*','phpcpd-Reports/**/*.*'];


module.exports.configphp = configphp;
module.exports.configcss = configcss;
module.exports.configjs = configjs;

module.exports.configJs = configJs;

module.exports.concatsrc = concatsrc;
module.exports.rimraf2clean = rimraf2clean;
module.exports.confightml = confightml;
module.exports.ignore = ignore;

//sonar configurations
var options = {
        sonar: {
            host: {
                url: 'http://172.27.59.62:9080'
            },
            jdbc: {
                url: 'jdbc:mysql://172.27.59.62:3306/sonar',
                username: 'sonar',
                password: 'sonar'
            },
            projectKey: 'sonar:gulp-sonar-runner:3.0.1',
            projectName: 'gulp_ecomm_pallavi',
            projectVersion: '1.0.0',
            // comma-delimited string of source directories 
            sources: 'ecomm_project',
            language: 'php',
            sourceEncoding: 'UTF-8',
            javascript: {
                lcov: {
                    reportPath: './sonar_report/lcov.info'
                }
            }
        }
};

module.exports.options = options;

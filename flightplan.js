// app root is /var/www/builtrightapp.com/server
// user is `dylan` 

var plan = require('flightplan');
var appName = 'builtright-server';
var username = 'dylan';

plan.target('prod', {
    host: '165.227.67.146',
    username: username,
    agent: process.env.SSH_AUTH_SOCK,
    webRoot: '/var/www/builtrightapp.com/server',
    ownerUser: 'dylan',
    repository: 'https://github.com/dylanlott/builtright-api.git',
    branchName: 'master',
    maxDeploys: 10
});

plan.remote('setup', function(remote) {
    remote.hostname();
    remote.with('cd ' + remote.runtime.webRoot, function() {
        remote.sudo('sudo git clone ' + remote.runtime.repository);
        remote.sudo('sudo npm install');
        remote.sudo('sudo pm2 start index.js');
    })
});

plan.local('deploy', function(local) {
    local.hostname();
    local.failsafe();
    local.exec('sudo git add . && git commit -am "flightplan push"');
    local.log('Committed to GitHub');
    local.exec('sudo git push origin master');
    local.log('Pushed to GitHub');
    local.unsafe();
});

plan.remote('deploy', function(remote) {
    remote.hostname();
    remote.with('cd ' + remote.runtime.webRoot, function() {
        remote.exec('sudo git pull origin master');
        remote.exec('sudo npm install');
        remote.failsafe();
        remote.exec('sudo pm2 restart index.js');
        remote.unsafe();
        remote.exec('sudo pm2 list');
        remote.log('Deploy successful');
    });
});

plan.remote('check', function(remote) {
    remote.exec('pm2 list');
});
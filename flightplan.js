var plan = require('flightplan');
var appName = 'builtright';
var username = 'deploy';
var startFile = 'bin/www';

plan.target('dev', {
	host: '159.203.106.53',
  username: 'root',
  agent: process.env.SSH_AUTH_SOCK,
	webRoot: '/var/www/dev.builtrightapp.com/server',
  ownerUser: 'root',
  repository: 'https://github.com/dylanlott/builtright-server.git',
  branchName: 'master',
  maxDeploys: 10
});

plan.target('prod', {
  host: '159.203.106.53',
  username: 'root',
  agent: process.env.SSH_AUTH_SOCK,
  webRoot: '/var/www/builtrightapp.com/feathers',
  repository: 'https://github.com/dylanlott/builtright-server.git',
  branchName: 'master'
});

plan.remote('setup', function(remote) {
  remote.hostname();
  remote.with('cd ' + remote.runtime.webRoot, function() {
    remote.sudo(`git clone ${remote.runtime.repository} .`);
    remote.sudo('npm install');
    remote.sudo('npm install -g nodal pm2');
    remote.sudo('nodal s');
  })
})

plan.remote('deploy', function(remote) {
  remote.hostname();
  remote.with('cd ' + remote.runtime.webRoot, function() {
    remote.sudo('git pull origin master');
    remote.sudo('npm install');
    remote.sudo('nodal s');
    remote.log('Deploy successful');
  });
});

plan.local('deploy', function(local) {
  local.hostname();
  local.exec('git add . && git commit -am "flightplan push"');
  local.log('Committed to GitHub');
  local.exec('git push origin master');
  local.log('Pushed to GitHub');
});

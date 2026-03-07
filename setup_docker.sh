#!/bin/bash
set -e

# 1. Update the apt package index and install required certificates (ca-certificates, curl)
sudo apt-get update
sudo apt-get install -y ca-certificates curl

# 2. Download Docker's official GPG key to /etc/apt/keyrings and set up the stable repository
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 3. Install docker-ce, docker-ce-cli, containerd.io, and docker-compose-plugin
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 4. Add the current user ($USER) to the 'docker' group to allow rootless execution
sudo usermod -aG docker $USER

# Inline Node.js verification using Promise.all
node -e "
const { exec } = require('child_process');

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

Promise.all([
  runCommand('docker --version'),
  runCommand('docker compose version')
]).then(([dockerVer, composeVer]) => {
  console.log('\n✅ Verification passed:');
  console.log('  - ' + dockerVer);
  console.log('  - ' + composeVer);
}).catch(err => {
  console.error('\n❌ Verification failed:', err.message);
});
"

# 5. Print a highly visible warning
echo ""
echo "=================================================================================="
echo "⚠️  CRITICAL ACTION REQUIRED ⚠️"
echo "=================================================================================="
echo "Docker Engine has been successfully installed, and your user ('$USER') has been added "
echo "to the 'docker' group."
echo ""
echo "HOWEVER, to run docker commands WITHOUT sudo, you MUST perform a full system reboot"
echo "or completely log out and log back in to apply the group membership changes."
echo "=================================================================================="
echo ""

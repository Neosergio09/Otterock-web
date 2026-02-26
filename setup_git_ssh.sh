#!/bin/bash

# 1. Set the global Git user.name
git config --global user.name "Sergio Bello"

# 2. Set the global Git user.email
git config --global user.email "tu-correo@ejemplo.com"

# 3. Generate the SSH key at ~/.ssh/id_ed25519 (Ed25519, no passphrase)
# Only generates if it doesn't already exist to prevent overwriting prompts.
if [ ! -f ~/.ssh/id_ed25519 ]; then
    ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -N "" -C "tu-correo@ejemplo.com" -q
else
    echo "SSH key already exists at ~/.ssh/id_ed25519. Skipping generation."
fi

# 4. Start the ssh-agent in the background and add the newly generated key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 5. Print the exact contents of the public key
echo "--- SSH PUBLIC KEY ---"
cat ~/.ssh/id_ed25519.pub
echo "----------------------"

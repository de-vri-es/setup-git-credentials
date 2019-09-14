# Configuring credentials

This action allows you to clone private repositories from GitHub by providing a `GIT_CREDENTIALS` secret.

The contents of `GIT_CREDENTIALTS` will be saved in the `$XDG_CONFIG_HOME/git/credentials` file,
and git will be configured to use these credentials.
The credentials file contains a list of URL patterns with authentication information.
See `man 7 git-credentials-store` for more details.

Additionally, `ssh` URLs for github repositories will be rewritten to `https`, so the credentials can be used.

It is advisable to generate an access token specifically for your workflow / actions.
Simply use the token in place of the password in the `GIT_CREDENTIALS`:

```
https://$username:$token@github.com/
```

# Why not use an SSH key?
Currently, Cargo (the Rust package manager) does not support SSH authentication other than through an SSH agent.
SSH agents are not meant to be used non-interactively, so HTTPS authentication is a simpler solution.

If you can use plain SSH keys, that would be a good solution too.

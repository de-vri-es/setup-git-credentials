# Configuring credentials

This action allows you to clone private git repositories using HTTP authentication.
The credentials should be passed to the action through the `credentials` parameter.
It is highly recommended to store the credentials in a secret and pass the secret to the action,
rather than hard-coding the credentials in the configuration file.

Note that the `checkout` action already allows you to clone the main repository.
This action is intended for downloading additional dependencies from private repositories.

The action stores the credentials in the file `$XDG_CONFIG_HOME/git/credentials`,
and configures git to use it by calling `git config --global credential.helper store`/
The credentials should be list of URL patterns with authentication information.
See `man 7 git-credentials-store` for more details.

Additionally, the action configures git to rewrite SSH URLs for GitHub repositories to HTTPS URLs.
This allows dependencies to be specified using a SSH URLs for developers,
while the CI system will automatically clone over HTTPS with the provided credentials.

It is advisable to generate an access token specifically for your workflow.
Simply use the token in place of an account password in the credentials.
Be sure to grant full access for the `repo` scope to the token,
otherwise the token can not be used to clone private repositories.
Without the right permissions, the clone will normally fail with a 404 error.

A sample configuration for a workflow is shown here:
```yaml
name: Rust
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: de-vri-es/setup-git-credentials@v2
      with:
        credentials: ${{secrets.GIT_CREDENTIALS}}
    - uses: actions/checkout@v1
    - name: Build
      run: cargo +stable build --color=always
    - name: Run tests
      run: cargo +stable test --color=always
```

The credentials secret would contain something like this:
```
https://$username:$token@github.com/
```

It is also possible to provide additional credentials for different domains in the credentials list.

# Why not use a plain SSH key?
In general, a plain SSH key would be a good solution too.
However, at the moment Cargo (the Rust package manager) does not support SSH authentication other than through an SSH agent.
SSH agents are not meant to be used non-interactively, so HTTPS authentication is a simpler solution.

If you can use plain SSH keys that may be easier.

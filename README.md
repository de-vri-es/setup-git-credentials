# Configuring credentials

This action allows you to clone private git repositories using HTTP authentication.
The credentials are taken from the `GIT_CREDENTIALS` variable by default.
This should be kept in a secret exposed to the action.

Note that the `checkout` action already allows you to clone the main repository.
This action is intended for downloading additional dependencies from private repositories.

The contents of the `GIT_CREDENTIALS` environment variable will be saved in the `$XDG_CONFIG_HOME/git/credentials` file,
and git will be configured to use these credentials.
The credentials file contains a list of URL patterns with authentication information.
See `man 7 git-credentials-store` for more details.

Additionally, the action configures git to rewrite SSH URLs for GitHub repositories to HTTPS URLs.
This allows dependencies to be specified using a SSH URLs for developers,
while the CI system will automatically use HTTPS with the provided credentials.

It is advisable to generate an access token specifically for your workflow.
Simply use the token in place of an account password in the `GIT_CREDENTIALS`.
Be sure to grant full access for the `repo` scope,
otherwise the token can not be used to clone private repositories.
This would normally result in 404 errors when downloading the repository.

A sample configuration for a workflow is shown here:
```yaml
name: Rust
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: fusion-engineering/setup-git-credentials@v1
      env:
        GIT_CREDENTIALS: ${{secrets.GIT_CREDENTIALS}}
    - uses: actions/checkout@v1
    - name: Build
      run: cargo +stable build --color=always
    - name: Run tests
      run: cargo +stable test --color=always
```

The `GIT_CREDENTIALS` secret would contain something like this:
```sh
https://$username:$token@github.com/
```

# Why not use a plain SSH key?
In general, a plain SSH key would be a good solution too.
However, at the moment Cargo (the Rust package manager) does not support SSH authentication other than through an SSH agent.
SSH agents are not meant to be used non-interactively, so HTTPS authentication is a simpler solution.

If you can use plain SSH keys that may be easier.

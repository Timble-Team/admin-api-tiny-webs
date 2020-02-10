# roles
role :app, %w(deploy@178.128.22.245)

# ssh
set :ssh_options,
    port: 22,
    user: 'root',
    keys: %w(~/.ssh/id_rsa),
    forward_agent: true,
    auth_methods: %w(publickey password)

# server
server '178.128.22.245',
    user: 'root',
    roles: %w(app)
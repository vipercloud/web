import * as Hapi from 'hapi';

const server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 5000
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply({ message: 'Hello World' });
    }
});

server.start()
    .then(() => console.info('Server started'))
    .catch(err => console.error(`Error starting server: ${err}`));

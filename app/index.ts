import * as Hapi from 'hapi';
import * as Joi from 'joi';
import * as Boom from 'boom';
import * as mongoose from 'mongoose';

(<any>mongoose).Promise = global.Promise;
if (process.env.NODE_ENV === 'production') {
    mongoose.connect('mongodb://db/vc-blog');
}
else {
    mongoose.connect('mongodb://localhost:27018/vc-blog');
}

var Entry = mongoose.model('Entry', new mongoose.Schema({
    title: String
}));

const server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 5000
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        Entry.find()
            .then(entries => reply(entries))
            .catch(err => reply(Boom.badImplementation(err)));
    },
});

server.route({
    method: 'POST',
    path: '/',
    config: {
        validate: {
            payload: {
                title: Joi.string()
            }
        }
    },
    handler: (request, reply) => {
        var entry = new Entry(request.payload);
        entry.save()
            .then(e => reply(e))
            .catch(err => reply(Boom.badImplementation(err)));
    }
});

server.start()
    .then(() => console.info('Server started'))
    .catch(err => console.error(`Error starting server: ${err}`));

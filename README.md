# vuejs-booster

This application demonstrates how to deploy to Minishift a project consisting of a back end (API) with express and MongoDB and a front end with Vuejs, using[nodeshift](https://github.com/bucharest-gold/nodeshift).

## Running the Booster

You can run this booster as node processes on your localhost, as pods on a local
[minishift](https://github.com/minishift/minishift/releases) installation, or
as part of a project in OpenShift Online V3.

### Localhost

To run the basic application on your local machine, just run the commands:

```
$ cd vuejs-booster/frontend
$ npm install
$ cd vuejs-booster/backend
$ npm install
$ npm run mongodb
```

Open another terminal and run:

```
$ cd vuejs-booster/backend
$ npm run localhost
```

Open another terminal and run:

```
$ cd vuejs-booster/frontend
$ npm run dev
```

Access [http://localhost:8080/](http://localhost:8080/)

### Minishift

Minishift should be started, and you should be logged in with a currently active project.

#### MongoDB

For the time being it is necessary to use the [`oc`](https://github.com/openshift/origin/releases)
command line tool to install the `mongodb` instance.

```sh
$ minishift start
$ oc new-app https://raw.githubusercontent.com/openshift/origin/master/examples/db-templates/mongodb-ephemeral-template.json -p DATABASE_SERVICE_NAME=contacts -p MONGODB_USER=default -p MONGODB_PASSWORD=default -p MONGODB_DATABASE=contacts
```

Once your mongodb pod is running, you can deploy the back-end part:

```
$ cd vuejs-booster/backend
$ npm run openshift
```

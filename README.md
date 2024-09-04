# Learn about the backend of PlantKeeper

## Original contributors

Rafael Dousse, Eva Ray, Quentin Surdez and Rachel Tranchida

## Launch backend locally

To set up and run the backend of the Plant Keeper application locally, follow the steps outlined below:

### 1. Clone the repository

First, clone the repository using the following command:

```bash
 git clone git@github.com:Plant-keeper/backend.git
```

### 2. Install Node.js and npm

Ensure you have Node.js and npm installed on your system. If not, you can install them using the following command (for
Debian/Ubuntu-based systems):

```bash
  sudo apt install nodejs npm
```

Alternatively, visit the [Node.js official website](https://nodejs.org/fr) for installation instructions tailored to
other operating systems.

### 3. Install Project Dependencies

Navigate to the root directory of the cloned repository and install the necessary dependencies using npm:

```bash
  cd backend
  npm install
```

### 4. Set up the PostgreSQL database

Add a `.env` file to the root directory of the project with the following content:

```bash
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=postgres
  DB_PASSWORD=1234
  DB_NAME=test
```

Next, you need to have docker installed on your machine. You can do this by following the instructions on the
[Docker website](https://docs.docker.com/get-docker/). Create a docker container running a PostgreSQL database with the
following command:

```bash
  docker run --name db-image-postgres -e POSTGRES_PASSWORD=1234 -d -p 5432:5432 postgres
```

For the backend to work properly, you must create a database named `test` in the PostgreSQL container. You must also
create a schema named `plantkeeper_test` in the `test` database. You can do this using an IDE like DataGrip or by
running the following commands:

```bash
  docker exec -it db-image-postgres psql -U postgres -c "CREATE DATABASE test"
  docker exec -it db-image-postgres psql -U postgres -d test -c "CREATE SCHEMA plantkeeper_test"
```

### 5. Set up the mailing system

To set up the mailing system, you must add the following environment variables to the `.env` file:

```bash
  MAIL_HOST=<your_mail_host>
  MAIL_PORT=<your_mail_port>
  MAIL_SECURE=<your_mail_secure>
  MAIL_USER=<your_mail_user>
  MAIL_PASS=<your_mail_pass>
  MAIL_SENDER_NAME=<your_mail_sender_name>
 ```

This mail adress will be used to send the alert mails to the users.

This is an example of how to set up a Gmail account:

```bash
  MAIL_HOST=smtp.gmail.com
  MAIL_PORT=465
  MAIL_SECURE=true
  MAIL_USER=your-email@gmail.com
  MAIL_PASS=your-email-password
  MAIL_SENDER_NAME=Your Name
 ```

### 6. Set up the communication with the frontend

The backend is set up to enable CORS only for the PlantKeeper deployed frontend. If you want to run the frontend
locally,
you must add the following address to the list of allowed origins in the `main.ts`. The `allowedOrigin` array should
look like this.

```bash
  const allowedOrigins = [
        'https://plantkeeper.ch',
        'http://localhost:3000',
      ];
```

### 7. Run the backend

To run the backend, use the following command:

```bash
  npm run start
```

The backend should now be running on `http://localhost:4000`.

### 8. Add data to the database

To populate the database with random data, you can send a get request to the `/seed` endpoint using a tool like Postman
or Insomnia. Alternatively, you can use the following curl command to do this:

```bash
  curl http://localhost:4000/api/v1/seed
```

If you don't want random data, you will have to use the web interface to add data to the database, which you
can access at `http://localhost:3000` (if the frontend is running).

# pups

Create `LOCAL - .env file` and add "NODE_ENV=development"

<!-- Run the app using docker-compose, `docker-compose down -v && docker-compose up --build` -->
Note: the docker is not properly set up.

To set up the development environment, you need to install the following dependencies:

1. Node.js and npm:
   - You can download Node.js and npm from [nodejs.org](https://nodejs.org/).

2. Gatsby:
   - To install Gatsby, run the following command in your terminal:
     ```sh
     npm install -g gatsby
     ```

3. JSON Server:
   - To install JSON Server, run the following command in your terminal:
     ```sh
     npm install -g json-server
     ```

After installing the dependencies, you can set up and run the application:

1. Install project dependencies:
   - Run the following command in your project directory to install the required dependencies:
     ```sh
     npm install
     ```

2. Start the Gatsby development server:
   - To start the Gatsby application, run the following command:
     ```sh
     gatsby develop
     ```

3. Start the JSON Server for API:
   - To start the JSON Server for your API, use the following command:
     ```sh
     json-server --watch json-server/db.json --port 3001
     ```
   - This is important as this is the server that holds all the puppy data and adopter data 

Now, your development environment should be set up and both the Gatsby application and JSON Server should be running.


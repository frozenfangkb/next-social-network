# Next Social Network

In order to make the app function, you must create a .env file.

You may use the existing `.env.example` file and populate the backend URL to the desired one.

To create an image with the Dockerfile, you may use the command:

`docker build --build-arg VITE_BACKEND_URL=<your_backend_url> -t next-social-network .`

Then, you just have to run the built image exporting the port `8080` which is the one used by this project.
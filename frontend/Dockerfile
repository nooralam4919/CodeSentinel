
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]\


# | Part             | Meaning                                               |
# | ---------------- | ----------------------------------------------------- |
# | `CMD`            | Run this command when the container starts            |
# | `npm`            | Use Node Package Manager                              |
# | `run`            | Execute a script from `package.json`                  |
# | `dev`            | Run the `dev` script (usually starts Vite)            |
# | `--`             | Pass the following arguments to Vite, not npm         |
# | `--host 0.0.0.0` | Allow access to the server from outside the container |
# | `--port 3000`    | Start Vite on port **3000**                           |

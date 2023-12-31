# Nestjs Prisma Api

## About the project

It is a back-end application for the development of a rest api using the core funmdamentals of Nesjs

The application consists of an api with a system for creating users with authentication, automated tests and more!

## Technologies used

- Typescript
- NestJs
- NodeJs
- Prisma
- Mysql
- JWT
- Jest
- Swagger

## How to run the project

Prerequisites: Have docker installed on your machine

```bash
# Clone repository
git clone https://github.com/poring86/nestjs-prisma.git

# Enter the back end project folder
cd nestjs-prisma

# Duplicate file env.example and replace information
cp .env.example .env

# Execute the project
docker compose up
# The project will listen on http://localhost:3000/
# You can see the api docs on http://localhost:3000/api

# Run the tests
npm run test

```

# Autor

Matheus de Lino Ferreira

https://www.linkedin.com/in/matheus-de-lino-ferreira-7a3929187/

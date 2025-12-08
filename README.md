<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with TypeORM and multi-database support.

## Features

- ✅ TypeORM integration with automatic database creation
- ✅ Multi-database support (PostgreSQL, MySQL, MariaDB, SQLite)
- ✅ Docker development environment with PostgreSQL and Adminer
- ✅ Hot reload in development mode
- ✅ TypeScript with ESLint and Prettier
- ✅ Database migrations support

## Prerequisites

- Node.js (v18 or higher)
- npm, pnpm, or yarn
- Docker and Docker Compose (for development with PostgreSQL)

## Project setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your database configuration:

```bash
# Choose your database type
DB_TYPE=postgres  # postgres, mysql, mariadb, or sqlite

# For PostgreSQL, MySQL, MariaDB:
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=nest
DB_PASSWORD=nest
DB_NAME=app

# For SQLite (ignore above if using sqlite):
# DB_NAME=database.sqlite
```

### 3. Database setup

#### Option A: Using Docker (Recommended for development)

Start PostgreSQL and Adminer with Docker Compose:

```bash
docker-compose up -d
```

This will start:

- **PostgreSQL** on port `5432`
- **Adminer** (database management UI) on port `8085`

Access Adminer at [http://localhost:8085](http://localhost:8085):

- Server: `database`
- Username: `nest`
- Password: `nest`
- Database: `app`

#### Option B: Using local database

Install and configure your preferred database locally, then update the `.env` file accordingly.

#### Option C: Using SQLite

For SQLite, install the driver:

```bash
npm install sqlite3
```

Update your `.env`:

```bash
DB_TYPE=sqlite
DB_NAME=database.sqlite
```

### 4. Database auto-creation

The application automatically creates the database if it doesn't exist. No manual database creation required!

## Compile and run the project

```bash
# development
npm run start

# watch mode (with hot reload)
npm run start:dev

# production mode
npm run start:prod
```

## Database migrations

```bash
# Generate a new migration
npm run migration:generate --name=CreateUsers

# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Show migration status
npm run migration:show
```

## Run tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Docker commands

```bash
# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Remove volumes (⚠️ deletes all data)
docker-compose down -v
```

## Supported databases

| Database   | Driver    | Configuration                            |
| ---------- | --------- | ---------------------------------------- |
| PostgreSQL | `pg`      | Host, Port, Username, Password, Database |
| MySQL      | `mysql2`  | Host, Port, Username, Password, Database |
| MariaDB    | `mysql2`  | Host, Port, Username, Password, Database |
| SQLite     | `sqlite3` | Database file path only                  |

## Development tools

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Nodemon**: Auto-restart on file changes
- **Docker**: Containerized development environment

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
npm install -g @nestjs/mau
mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# FridayFinance Challenge
## Technologies
This is my solution to the FridayFinance challenge.
It uses the following technologies:
* Vue 2.7
* Nuxt 2
* TailwindCSS 3
* Apollo Client 3
* Node 16
* Apollo Server 4
* Typescript 4.9
* Prisma 3
* PostgreSQL 13

## Features
The following features are implemented:
* Display a list of transactions.
* Display information about a transaction in another page.
* Change a transaction's category to an existing one.

Due to time constraints, the following things have not made it into
this solution:
* Create a new category.
* Internalization
* Tests
* Error management
* Sorting (currently uses date DESC)
* Responsive with media breakpoints

The following aspects have been taken into consideration:
* Filtering by reference, bank, account and date range
* Usage of Vuex store to centralize API Queries
* Pagination (20 items per page, offset based)
* Docker and Docker compose
* Automatic database creation and seeding
* Typescript
* Code architecture
* Linting - Formatting
* Commit names
* Atomic design for the frontend
* Loading indicators and some transitions
* UI/UX
* 404 and error page

## General overview
The application is split into two parts:
* The frontend, which is a Nuxt application following Atomic Design.
* The backend, which is a GraphQL API with an N-layer architecture
  (resolvers, services, repositories).

## Getting started
### Prerequisites
* Docker and Docker compose

### Installation
1. Clone the repository
2. Run `docker-compose up -d`

### Usage
#### Docker
1. Open http://localhost:5010 in your browser to access the SPA
2. Open http://localhost:5000/graphql to access the GraphQL playground
3. Postgres is available on port 5432 (user: postgres, password: password, database: ff)

## Notes:
Had to modify the transactions.csv as it had invalid dates 
(e.g. 2022-09-31) in September and November.
Both have been replaced to a day prior (2022-09-30 and 2022-11-30).

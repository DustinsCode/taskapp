# Database Info

Hello!

I decided to stick with using MongoDB for this project, as it is a NoSQL database and I have the most experience with it. Below, I will explain how to start it up and the existing tables.

# Startup

The database is nicely bundled in the docker compose folder along with the node server.

Simply run:

> `docker compose up`

# Tables

The tables will be created when the app starts up for the first time, but here is a brief write up of how they are structured

## Users:

| Field    | Type             | Description                                                                                             |
| -------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| \_id     | ObjectID         | The generated ID of the document                                                                        |
| username | String           | The user's entered username                                                                             |
| tasks    | List\<ObjectId\> | An array of references to the user's uncompleted tasks. This is what appears on the screen for the user |

## Tasks

| Field       | Type     | Description                                 |
| ----------- | -------- | ------------------------------------------- |
| \_id        | ObjectId | The generated ID of the document            |
| createdBy   | String   | Name of the user who created the task       |
| createdAt   | Date     | timestamp of the task's creation            |
| completed   | Boolean  | Task completion status                      |
| completedAt | Date     | Date the task was completed, otherwise null |
| description | String   | User entered task                           |

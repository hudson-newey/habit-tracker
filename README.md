# Goal Tracker

A goal tracking app that I created because I didn't like the existing applications

A live deployment (without device syncing) can be found at [grathium-industries.github.io/posts/deployments/habit-tracker](https://grathium-industries.github.io/posts/deployments/habit-tracker)

![image](https://github.com/hudson-newey/habit-tracker/assets/33742269/1e11c5bf-43b1-4394-8e7b-36788710213b)

## Features

- Create, edit, and delete goals, habits, tasks, and logbooks
- Associate habits, and tasks with goals
- Log progress on habits and tasks
- Have a "GitHub like" contribution graph for each habit
- Numerical and binary habit types
- A dark mode
- An insane syncing architecture that syncs data between devices

### The insane syncing architecture

- The client application can be used without a server
- While not connected to the server, it will maintain a "virtual database" and a changes record of all changes made to the "virtual database"
- Once the client connects to the server, it will send all changes to the server and request all tables that it doesn't have
- All data fetched from the API is then updated in the virtual database (for offline / remote use)
- All clients connected to the server then update
- Virtual database is then stored in service workers for offline use (**not yet implemented**)

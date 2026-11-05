# Nepal Informatics & Computing Society (NICS)

Welcome to the official website repository of the **Nepal Informatics & Computing Society (NICS)**!

NICS is a community built for students who are curious about technology, enjoy creating things, and want to learn more about the world of computing. This website serves as the online home of our community.

## Tech Stack

Here are some of the technologies used to build the website:

- **Next.js** – React framework for the application
- **React** – Building the user interface
- **TypeScript** – Writing more reliable code
- **Tailwind CSS** – Styling and responsive layouts
- **PostgreSQL (Neon)** – Database
- **Drizzle ORM** – Working with the database
- **Better Auth** – Authentication
- **MDX** – Writing content with Markdown and components

## Getting Started

Want to run the website on your own machine? Follow these steps.

### 1. Clone the repository

```bash
git clone https://github.com/nicsforyouth/website.git
cd website
```

### 2. Install the dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a file named `.env` in the root directory and add your database connection string:

```env
DATABASE_URL=your_database_connection_string
```

Depending on the features you want to run, you may also need other environment variables for authentication or application configuration.

### 4. Run the development server

```bash
npm run dev
```

Once the server starts, visit [http://localhost:3000](http://localhost:3000) to see the website.

## Available Commands

A few useful commands for working with the project:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the local development server |
| `npm run build` | Builds the website for production |
| `npm run start` | Runs the production build |
| `npm run lint` | Checks the code using ESLint |
| `npm run db:generate` | Generates database migrations |
| `npm run db:migrate` | Runs database migrations |
| `npm run generate:schemas` | Generates schemas |

## Contributing

We'd love to have more people contribute to the project!

If you have an idea, notice something that could be improved, or want to help make the website better, feel free to contribute.

Here's how you can get started:

1. Fork this repository.
2. Create a new branch for your changes.
3. Make your changes and test them locally.
4. Commit and push your work.
5. Open a pull request explaining what you changed.

Please try to keep your code readable and follow the existing project structure.

## Join the Community

Interested in what we're building or want to be part of the community?

Come say hello on our Discord server:

**[Join the NICS Discord Community](https://discord.gg/up2mxJvehk)**

You can also explore our other projects on [GitHub](https://github.com/nicsforyouth).

---

<p align="center">
  Made by the NICS community.
  <br />
  <strong>Learn, build, and grow together.</strong>
</p>

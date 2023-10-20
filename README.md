<h1 align="center">Source code for MrBB (Discord bot) designed to serve as a moderator bot for the BOAGC Discord server.</h1>

## Features

- **Moderation**: MrBB provides various moderation commands to help you manage your Discord server effectively. This includes features like kick, ban, mute, and more.

- **Automated Tasks**: The bot can perform automated tasks such as welcoming new members, assigning roles, etc.

- **Customization**: Working on...

## Getting Started

To add MrBB to your Discord server, you can use the following invite link: [Invite MrBB](https://www.favoslav.cz/mrbb/) (currently not possible)

Once the bot is added to your server, you can use the `/help` command to view the available commands and their usage.

# OR

To customize the bot, follow these steps:

1. Clone the repository: `git clone [https://github.com/your-repo](https://github.com/mrFavoslav/MrBeeBee).git`
2. Install dependencies: `npm install`
3. Set up environment variables: Copy the `.env.example` file to `.env` and update the variables with your own values.
4. Start the API server: `npm start`

## Usage

Here are a few examples of how to use MrBB's commands:

- Deletes [count] messages in current channel
  ```
  /purge [count]
  ```

- Adds [role] to everyone
  ```
  /role mass add [role]
  ```

- Adds [role] to [user]
  ```
  /role single add [role] [user]
  ```

- Removes [role] from everyone
  ```
  /role mass remove [role]
  ```

- Removes [role] from [user]
  ```
  /role single remove [role] [user]
  ```

For a complete list of available commands and their usage, please refer to the [Commands Documentation](#).

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, feel free to open an issue or submit a pull request.
To contribute to this project, please follow the [standard Git workflow](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository#The-Standard-Git-Workflow) and [CONTRIBUTING](./CONTRIBUTING.md).

1. Fork this repository
2. Create a new branch for your changes: `git checkout -b my-feature`
3. Commit your changes: `git commit -am "Add my feature"`
4. Push the branch: `git push origin my-feature`
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

We would like to acknowledge the following open source projects that helped inspire and guide the development of MrBB:

- [Discord.js](https://discord.js.org)
- [GCommands](https://garlic-team.js.org/docs/#/)

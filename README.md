# Tech-Blog
Common Tech Blog website written in model view controller style

# Demonstration Video
TBD

# Description 
This small website is made to allow the user to make blog posts about technologies. The user will be able to register an account and be able to add their own posts 
and view other bloggers posts as well. While the user can view other users' blog posts, they will only be able edit those that are their own.

# Technologies
The main technologies in making this program work include:
1. Handlebars
2. MySql2 (NPM Package)
3. MySql
4. Express
5. bcrypt
6. dotenv
7. express-session
8. sequelize
9. connect-session-sequelize

# Installation
Below contains the required steps to be able to run this program correclty:
1. To install the program, first you must clone the github repo in a directory of your choice on your machine
2. After cloning the repo, navigate to the repo directory in gitbash or terminal and run `npm install` to install the required packages.
3. After the packages are installed, open the repo in VSCode 
4. In vscode, open the intergrated terminal and type in `mysql -u root -p`
5. Enter your mysql password
6. Once you are in mysql, run `source db/schema.sql`
7. run `quit` to exit mysql
8. Naviagte to the `.env` file and type in your mysql password in the appropriate field titled `DB_PASSWORD`
9. To start the application, run `npm start` or `npm run watch` in the integrated terminal to start the server with nodemon

# Purpose
This applicaion mimicks a blogs website that contains crucial elements of a common contemporary website. The use of a view engine and cookies greatly
enhances the user experience by allowing the server to save important information about the users themselves and their information. The login and logout features heavily rely on cookies and will allow the user to have their own unique information available on the site. 

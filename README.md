# This is an structure ready to build your own stuff
I came from Django where login, sessions, database is all
already configured for you. So, I use this repo to add
things that I'm testing and using. 

Basicly, it's a base structure for test things and learn 
without have to waste time doing the setup of project.

# Things that are already configured
* <b>AngularJS</b>    - need to explain?
* <b>Bower</b>        - install front-end things;
* <b>Redis</b>        - used to store sessionsIds;
* <b>MongoDB</b>      - used to store users;
* <b>Mocha & Chai</b> - for unit tests
* <b>Socket.io</b>    - use websockets in node.. This 'example' comes with a mini-chat!

# Make ready for use
    sudo npm install -g bower
    sudo npm install -g mocha
    
    npm install
    bower install
    
Obviously, you need to install Redis and MongoDB to you system. Google how do it if you don't know,
is pretty easy, just a command and will be installed.

Now is ready for you change all you want.
If you want things working you can use the follow commands:

    npm start # this start the server
    npm test  # run the tests to be sure 

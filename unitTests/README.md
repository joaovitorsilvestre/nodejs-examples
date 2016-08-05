# Structure

When you want create unit tests to your node.js scripts, the best way is to use 
Mocha and Chai together. Mocha is what do the tests, and Chai is used to throw errors
in a more intuitively way.

What tests do is assert that the returned data from functions and modules
are just as you expect them to be. Then, if in future you need to change some
lines of code, you make your changes and run the unit test to make sure that
this changes doesn't affect the functionality of the module.

<h2>Requirements</h2>
In this example we use <b>mongoose</b> because what we where testing was the models.
But to create tests you only need Mocha and Chai installed. You can install with the follow commands:
```
npm install mocha
npm install chai
```
To execute the tests:
```
mocha ./tests/models/user.js ## here you can change to test only one test
mocha ./tests/*/*.js         ## this will run all tests that mocha could find
```

<hr>

Also you can run all tests with npm, you'll just need to can change the <b>package.json</b> as follows:
```
{
  ...
  "scripts": {
    "test": "mocha ./tests/*/*.js"
  }
  ...
}
```
After you save, just execute in shell:
```
npm test
```

# Best practices about unit tests
* You doesn't need to create tests to all your code, but it would be great if you
do. Also, if you want to use the module after in another application, you really
should create a unit test to this.

* Your tests should cover much possibilities as possible. For instance, you have the
model <b>user</b> that have a method that verify if the password that was given matchs
with that is in the database.
So, you'll need to test if there's no error to connect to database, or if the user that 
you're tring to test the password even exists, etc.

* You also can create folder called <b>integration</b>. That will contain
all the tests that test all your features working together to assert that them 
work perfectly well.

<h2>Example of structure of tests folder</h2>
```
/tests
  /commons
  /controllers
  /middlewares
  /models
  /integration
```

# References
<a href="https://mochajs.org/">Mocha API</a> </br>
<a href="http://chaijs.com/api/">Chai API</a> </br>
<a href="https://www.terlici.com/2014/08/25/best-practices-express-structure.html">Best practices for express app structure</a>

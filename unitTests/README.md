# Unit tests with Mocha & Chai

To create unit tests to node.js, best way is to use Mocha and Chai together.
Mocha is what do the tests, and Chai is used to throw error in a more
intuictive way.

What tests do is assert that the returned data from functions and modules
are just as you expect them to be. Then, if in future you need to change some
lines of code, you make your changes and run the unit test to make sure that
this changes doesn't affect the functionality of module or function.

<h3>Best practices with tests</h3>
You doesn't need to create tests to all your code, but it would be great if you
do. If you want to use the module before in another application, you really
should create a unit test to this.

You also can create folder called <b>integration</b>. That will contain
all the tests that test all your features to assert that them work perfectly together.

Your folder tests can be:
```
/tests
  /models
  /middlewares
  /controllers
  /commons
```

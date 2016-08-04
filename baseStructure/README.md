# Structure
This is an example of MVC structure:
```
/commons
/controllers
  /home
  home.js
/models
/public
/views
app.js
package.json
```

<h3> Controllers </h3>
In controllers we should have a file with will only import and handle what
file will be used when determined page is requested.
<b>home.js</b> only handle with the url path. We have a folder that will have
all the files that have the logic. This file inside controllers that will be
imported in <b>app.js</b>.

For instance, we will have this paths that user can make a request:
* <b>/accounts/login</b>
* <b>/accounts/register</b>

So, we will use the principal controller to handle specifcly the request. Think
that an user make a request to our server using <b>/accounts/login</b>, our
<b>home.js</b> get this request and pass to file <b>accounts/login.js</b> that
has all the logic and that will make the response.

<h3> Models </h3>
Use a folder called <b>models</b> to keep models organized. Se also the
baseStructure folder to see a full example of structure based on MVC.

<h4> Best practices </h4>

* Models should not know about external world, the same about others models.
* Only models should have access to database, all hard work should be done by
them. For instance, if your controller <b>login</b> need to verify if a password
is correct, who will do the search in db for the user is the model, the model
has an function called <b>passwordCompare</b> and it will return if the password
match.
* Each model need to have their own <b>.js</b> file. It means that the models
<b>product</b> and <b>cart</b> should be in their own files, with their own
functions and methods.

<h3> Public </h3>
This is where you store you scripts and styles that will be accessible in
front-end. You can put a folder called <b>lib</b> to store external scripts as
angular, bootstrap, etc. All files in this folder will be accessible by any
user, so, have sure about what you store here.

<h3> Middlewares </h3>
We have two levels that middlewares can have:
* level of app - that is applicated directly in <b>app.js</b>
* level of controllers - that is used in controllers

In level of app you use:
```
#./app.js
...
app.use(yourMiddleware);
```
In controller:
```
#./accounts.js
...
router.use('/', yourMiddleware, login)
```

<h3> Views </h3>
You should create a folder for each route. If you have a route called
<b>accounts</b>, you should have a folder in views to each view, as you see:
```
/views
  /home
    login.ejs
    register.ejs
```

The extension <b>.ejs</b> comes from a template engine that we are using in this
example. You can use any other that you want, you just need to specficate in
<b>app.js</b>.

<h3> Tests </h3>
Here is where you save your unit tests. For each <b>controller</b>,
<b>model</b>, <b>middleware</b> should have a test. MAke sure to test every
piece of code that you have. To do unit tests, in this example we used
Mocha & Chai, that is one of the best combinations to use.

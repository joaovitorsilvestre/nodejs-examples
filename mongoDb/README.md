# Structure
You shold use a folder called <b>models</b> to keep models organized. This is the directory that
you will use to keep your models, in this example we have a model called <b>user.js</b> that's
pretty simple and just have two 'fields', that's to store username and password of our user.

You can also check the
<a href="http://github.com/joaovitorsilvestre/nodejs-example/tree/master/baseStructure">baseStructure</a> 
example to see a full structure based on MVC.

<h2>Requirements</h2>
In this example we use <b>mongoose</b> to do all the hard work to us. To install you can use:
```
npm install mongoose --save
```

# Best practices about models

* Models should not know about external world, the same about others models.
* Only models should have access to database, all hard work should be done by
them. For instance, if your controller <b>login</b> need to verify if a password
is correct, who will do the search in db for the user is the model, the model
has an function called <b>passwordCompare</b> and it will return if the password
match.
* Each model need to have their own <b>.js</b> file. It means that the models
<b>product</b> and <b>cart</b> should be in their own files, with their own
functions and methods.

# References
<a href="http://mongoosejs.com/docs/guide.html">Mongoose API</a> </br>
<a href="https://www.terlici.com/2014/08/25/best-practices-express-structure.html">Best practices for express app structure</a>

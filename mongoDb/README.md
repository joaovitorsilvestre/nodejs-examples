# Structure
Use a folder called <b>models</b> to keep models organized. Se also the
baseStructure folder to see a full example of structure based on MVC.

# Best practices

* Models should not know about external world, the same about others models.
* Only models should have access to database, all hard work should be done by
them. For instance, if your controller <b>login</b> need to verify if a password
is correct, who will do the search in db for the user is the model, the model
has an function called <b>passwordCompare</b> and it will return if the password
match.
* Each model need to have their own <b>.js</b> file. It means that the models
<b>product</b> and <b>cart</b> should be in their own files, with their own
functions and methods.

# Refs
https://www.terlici.com/2014/08/25/best-practices-express-structure.html

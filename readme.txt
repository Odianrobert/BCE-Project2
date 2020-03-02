some very basic stuff set up, like static -> public in express, and dev dependencies for eslint and nodemon 

I didn't export or import anyting, except for requiring packages like express and mysql 

basic html outline in index, console.log call in linked front end script ( just to test that it was synced up, style.css should be linked to as its exactly the same )

// to run eslint on a file ( lets make sure we do this locally before pushing to the repo )
npx eslint yourfile.js --fix
//retest after linting 

install all dependencies ( dev and production ) with npm i 
install dependenties at production time with npm i --production 

-these git commands set your working branch-
create a new folder 
git init 
git remote add origin git@github.com:Odianrobert/BCE-Project2.git
git fetch origin *branchName*
git checkout *branchName*
    //make your changes then commit as normal
git status
git add (not dot, only the files you need pushed)
git commit -m "whatever"
git push

New Line

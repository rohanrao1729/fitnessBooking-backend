npm init
node install mongodb,express
node index.js

POST
-----------------------------------------
http://localhost:5100/add/bookClass/gym

{
"email" :"example@gmail.com"
}

POST
--------------------------------
http://localhost:5100/add/createClass

{

"name" :"school",
"capacity": 5,
}


POST
---------------------
http://localhost:5100/add/cancelClass/gym

{
"email":"hello@gmail.com"
}


GET
----------------------------
http://localhost:5100/add/getAllUsers

GET
-------------------------------
http://localhost:5100/add/getUser/h5@gmail.com
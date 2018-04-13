# Greenfield

General Component Hierarchy:
 - App.js ---> stateful
 
   - NavBar.js ---> stateless
       
   - Search.js ---> stateful
   
   - Dashboard.js ---> stateless
   
   - Login.js ---> stateful
 
   - AddSource.js ---> stateful
   
   - Feed.js ---> stateless
     - File.js ---> stateless

Description:
App.js - Parent component where we are sending all axios requests to server. Also, maintaining all state in App.js except for state dealing with inputs and 'select' onChange events. 

NavBar.js - Level 2 component which consists of the AddSource and Login buttons (event handlers shoot back up to App.js)

Dashboard.js - Level 2 component which contains all sources a user likes. This component also provides an event handler to delete favorites.

Login.js - Level 2 component which consists of a username, password, and email input. When the 'submit' button is clicked, input values get sent back up to App.js.

AddSource.js - Level 2 component enabling user to add sources to the feed. User can add tags to their source.  Tags must be separated by commas.

Feed.js - Level 2 component which maps through sources sent back from server. Uses its child component 'Files', in the map function. 

File.js - Level 3 component with JSX markup for individual sources. Includes image, description, url, title, vote #, and share # for each source. 

Modules used that may confuse you: 
  1.) url-metaData - used to grab important info from a link provided by the client (img, description, title...)
  2.) lodash - used for its helper functions like uniq(array). 
  3.) react-tag-input - used to render tags in drag and drop format, on client side (AddSource.js)
  4.) knex - Query library used in place of raw sql queries. 
   
   
 

    

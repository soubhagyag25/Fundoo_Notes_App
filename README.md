**Express API**
Ques:How to perform crud opertions in Fundoo Notes once the user is authenticated?

Ans:Follow these steps:

1. Authenticate the User
First, User needs to log in to get an authentication token. You’ve already done this, so you have a token.

2. Use the Token to Access Protected Routes
User will use the token obtained from the login response to access the CRUD operations for notes. The token must be included in the Authorization header of the request.

3. Perform CRUD Operations
Here’s how User can perform CRUD operations with the token:

1. Create a Note
HTTP Method: POST
Endpoint: http://localhost:5000/api/v1/notes
Headers:

Authorization: Bearer <your-token>
Body:

json
Copy code
{
  "title": "Note Title",
  "description": "Note Description"
}
Example Request using Thunder Client or Postman:

Set method to POST
URL: http://localhost:5000/api/v1/notes
Add the Authorization header with value Bearer <your-token>
Add the JSON body
Response:

A success message and the created note data.
2. Get All Notes
HTTP Method: GET
Endpoint: http://localhost:5000/api/v1/notes
Headers:

Authorization: Bearer <your-token>
Example Request:

Set method to GET
URL: http://localhost:5000/api/v1/notes
Add the Authorization header with value Bearer <your-token>
Response:

A list of all notes created by User.
3. Get a Note by ID
HTTP Method: GET
Endpoint: http://localhost:5000/api/v1/notes/:noteId (Replace :noteId with the actual note ID)
Headers:

Authorization: Bearer <your-token>
Example Request:

Set method to GET
URL: http://localhost:5000/api/v1/notes/1 (for note with ID 1)
Add the Authorization header with value Bearer <your-token>
Response:

The details of the specified note.
4. Update a Note
HTTP Method: PUT
Endpoint: http://localhost:5000/api/v1/notes/:noteId (Replace :noteId with the actual note ID)
Headers:

Authorization: Bearer <your-token>
Body:

json
Copy code
{
  "title": "Updated Title",
  "description": "Updated Description"
}
Example Request:

Set method to PUT
URL: http://localhost:5000/api/v1/notes/1 (for note with ID 1)
Add the Authorization header with value Bearer <your-token>
Add the JSON body
Response:

A success message and the updated note data.
5. Delete a Note
HTTP Method: DELETE
Endpoint: http://localhost:5000/api/v1/notes/:noteId (Replace :noteId with the actual note ID)
Headers:

Authorization: Bearer <your-token>
Example Request:

Set method to DELETE
URL: http://localhost:5000/api/v1/notes/1 (for note with ID 1)
Add the Authorization header with value Bearer <your-token>
Response:

A success message indicating that the note was deleted.
6. Archive a Note
HTTP Method: POST
Endpoint: http://localhost:5000/api/v1/notes/:noteId/archive (Replace :noteId with the actual note ID)
Headers:

Authorization: Bearer <your-token>
Example Request:

Set method to POST
URL: http://localhost:5000/api/v1/notes/1/archive (for note with ID 1)
Add the Authorization header with value Bearer <your-token>
Response:

A success message indicating that the note was archived.
Summary
Login to get a token.
Use the token in the Authorization header to perform CRUD operations on notes.
Perform CRUD operations using appropriate HTTP methods and endpoints.
If you need any further clarification or have specific questions about using these endpoints, feel free to ask!

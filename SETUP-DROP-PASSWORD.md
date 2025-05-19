# Setting Up Drop Password in Sanity

To create a password for the drop page, follow these steps:

## 1. Start your Sanity Studio

Make sure your project is running:

```bash
npm run dev
```

## 2. Navigate to Sanity Studio

Open your browser and go to:

```
http://localhost:3000/studio
```

## 3. Create a Drop Password Document

1. In the Sanity Studio sidebar, you should see "Drop Password" as a document type
2. Click on "Drop Password" to create a new document
3. Enter your desired password in the "Password" field
4. Click "Publish" to save the document

## 4. Test Your Password

1. Navigate to the drop page at: `http://localhost:3000/drop`
2. Enter the password you just created
3. You should now be able to access the protected content

## Troubleshooting

If you don't see the "Drop Password" document type in Sanity Studio:
1. Verify that the schema has been properly loaded
2. Check the browser console for any errors
3. Make sure the `dropPasswordType.ts` file is correctly imported in your schema index file

## Notes

- Only one drop password document is used (the first one found in the database)
- If you want to change the password, simply edit the existing document
- The password is stored as plain text in Sanity, so choose something specific to this purpose
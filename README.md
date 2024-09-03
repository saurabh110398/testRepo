

Tech Stack:
1. Reactjs
2. Tailwind CSS
3. Shadcn UI
4. Clerk
5. Supabase.

##Important dependencies

1. Shadcn UI
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
/**
jsConfig.json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
**/

npx shadcn-ui@latest init

2. Install 
accordion button carousel card drawer input label 
radio-group select textarea


3. Superbase setup
 3.1. .env file
 3.2. utils/superbase.js
 3.3. npm i @supabase/supabase-js

4. Clerk user mgmt:
  4.1. npm install @clerk/clerk-react 
  4.2. .env file
  4.3. main.jsx 
  4.4. Dark mode: npm install @clerk/themes


5. Connect Superbase with clerk 
https://supabase.com/partners/integrations/clerk

6. Icons
From lucid react , downloaded along with shadcn ui.

7. React spinners: npm i react-spinners

8. Markdown Editor: 
npm i @uiw/react-md-editor

9. React hook form with zod:
npm i react-hook-form zod @hookform/resolvers


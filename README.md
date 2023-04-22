### File Explorer app

![demo1](/assets/demo1.png)
![demo1](/assets/demo2.png)

deployed link: https://file-explorer-chi.vercel.app/

- npm i from root folder
- create .env file from root and add API key 'SECRET_API_KEY'

## Data shape

Data {
id: string;
type: "folder" | "file";
parent: string | null;
name: string;
ext?: string | undefined;
}

- Root folders have parent: null
- Sub folders and files have parent === root folder's id
- Some files have ext values, some dont

### Tech Stack

- Next.js / React
- Typescript
- Tailwind.css
- Cypress
- Git Actions/ Workflow
- deployed using Vercel

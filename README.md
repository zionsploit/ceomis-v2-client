# CEOMIS

## Installation

### Clone the repository

``` bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
```

### Install dependencies
You can use any of the following package managers:
``` bash
# npm
npm install

# yarn
yarn install

# pnpm (recommended)
pnpm install

# bun
bun install
```

### Create .env file
Create a file named .env (or .env.local) in the root directory and add the following content:
env
```bash
# Required session & security keys
IRON_SESSION_PASSWORD="0!DB0R6MEDn_.G=L0cGNB6qHj3U5tZ+B"
SESSION_PASSWORD=300ZPKM2R0STXN1PIS397PL6RXZH3BJG
SESSION_SALT=DFPV7ZAKY17XV7Q6

# Environment
NODE_ENV=production

# API & Frontend URLs (change these in production!)
NEXT_PUBLIC_API_URL="http://0.0.0.0:3001/api"
NEXT_PUBLIC_SERVER_URL="http://0.0.0.0:3001"
```

> Important Security Note
> The values shown above are examples only.
> Never commit .env to version control.
> In real production, generate strong, unique random values (at least 32 characters) for all secret keys.

### Run the application
``` bash
# Development mode (recommended while developing)
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
The app should now be running at:
<ul>
    <li>Frontend: http://localhost:3000 (most common Next.js default)</li>
    <li>Backend/API: http://0.0.0.0:3001 (as configured)</li>
</ul>

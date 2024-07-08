# User Authentication and Organisation Management

## Setup

1. Clone the repository:
    ```
    git clone https://github.com/your-repo/user-auth-organisation.git
    cd user-auth-organisation
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    JWT_SECRET=your_jwt_secret
    ```

4. Run migrations to create tables in Supabase:
    ```
    psql -h your_supabase_host -U your_supabase_user -d your_supabase_db -f migrations/create_tables.sql
    ```

5. Start the server:
    ```
    npm start
    ```

6. Run tests:
    ```
    npm test
    ```

## API Endpoints

### Auth
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login an existing user

### Organisations
- GET `/api/organisations` - Get all organisations for a user
- GET `/api/organisations/:orgId` - Get a specific organisation by ID
- POST `/api/organisations` - Create a new organisation
- POST `/api/organisations/:orgId/addUser` - Add a user to an organisation

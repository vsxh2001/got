# got

server side and mangment panel for got game

## setup

to create the database run

```bash
docker run --name got-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=got -d postgres
```

then to create the backend

```bash
cd backend
source .env.dev
fastapi dev app/main.py
```

finaly for the frontend

```bash
cd frontend
npm run dev
```

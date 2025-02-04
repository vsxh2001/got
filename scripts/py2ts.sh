#! /bin/bash

pydantic2ts --module ./backend/db/models/__init__.py --output ./frontend/src/api_types/models.ts

if git status --porcelain | grep -q " M frontend/src/api_types/models.ts"; then
    echo "❌ pydentic models and ts are not in sync"
    exit 1
fi

if git status --porcelain | grep -q "?? frontend/src/api_types"; then
    echo "❌ pydentic models and ts are not in sync"
    exit 1
fi

echo "✅ pydantic models and ts are in sync"
exit 0

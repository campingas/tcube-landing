set dotenv-load := true

install:
    pnpm install

dev:
    pnpm vite

check:
    pnpm tsc --noEmit

lint:
    pnpm eslint src --max-warnings 0

fmt:
    pnpm prettier --write src index.html

verify: fmt check lint

build:
    pnpm vite build

preview: build
    pnpm vite preview

analyse:
    ANALYZE=true pnpm vite build

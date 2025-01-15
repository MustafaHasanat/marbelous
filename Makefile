dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

acp:
	git add . && git commit -m "feat: adding features" && git push

init-migrate:
	npx prisma migrate dev --name init && npx prisma generate

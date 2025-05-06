# Лабораторна робота 8

## Тема: Неперервна інтеграція

## Мета: ознайомитися з принципами і практиками неперервної інтеграції, сформувати навички автоматизації CI/CD процесів в GitHub Actions

## Завдання:

1. Завершити наступні практичні роботи на GitHub Skills, надати посилання на репозиторії з виконаним завданням у звіті:
- Hello GitHub Actions: https://github.com/alexhostischev/skills-hello-github-actions/blob/main/report.md
- Publish Packages: https://github.com/alexhostischev/skills-publish-packages/blob/main/report.md

2. Було створено Github Actions Workflow з 2 triggers та 1 job:

https://github.com/hifichevymane/kpz-lab-6/blob/main/.github/workflows/publish.yml:
```yml
name: Publish Frontend App

on:
  workflow_dispatch:

  push:
    branches:
      - main
      - "feature/**"

permissions:
  contents: read
  packages: write
  attestations: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup and build project
        run: |
          npm install -g pnpm
          pnpm install
          pnpm run build

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository_owner }}/${{ github.event.repository.name }}:latest
```

Ці зміни були внесені у гілку `github-actions` та потім замерджені у main гілку:

<img width="1435" alt="Screenshot 2025-05-06 at 22 27 18" src="https://github.com/user-attachments/assets/aa754432-756d-44db-a09d-4d1be210783b" />

Після успішного виконання воркфлоу у вкладці Packages зʼявився наш докер образ https://github.com/alexhostischev/kpz-lab-8/pkgs/container/kpz-lab-8:

<img width="770" alt="Screenshot 2025-05-06 at 22 23 24" src="https://github.com/user-attachments/assets/fafafd9c-c8aa-42e3-8576-62eb9a36741d" />

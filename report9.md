# Лабораторна робота 9

## Тема: Неперервна доставка

## Мета: ознайомитися з принципами і практиками неперервної доставки, сформувати навички роботи з хмарними сервісами Azure

## Завдання:
1. Створити Azure App Service у власній підписці Azure:
  a. Створити ресурсну групу (resource group)
  б.Створити всередині ресурсної групи App Servicе. При створенні вибрати деплой контейнеру замість коду

<img width="798" alt="Screenshot 2025-05-06 at 22 39 02" src="https://github.com/user-attachments/assets/a2f25f74-74c0-44cb-ae86-08ecb1848618" />
<img width="728" alt="Screenshot 2025-05-06 at 22 43 27" src="https://github.com/user-attachments/assets/6c2ddc8f-f894-4d52-9b1c-c968df0aed0b" />
<img width="1141" alt="Screenshot 2025-05-06 at 22 44 18" src="https://github.com/user-attachments/assets/8e4a1e73-6775-4f41-8431-0504b0ae140b" />
<img width="1410" alt="Screenshot 2025-05-06 at 22 44 27" src="https://github.com/user-attachments/assets/41686f0c-e5c3-4bbd-8b34-044df5470e7a" />

2. Було створено Azure Service principal у CloudShell, який буде використовуватись для доступу GitHub до вашої підписки Azure
<img width="1437" alt="Screenshot 2025-05-06 at 22 47 38" src="https://github.com/user-attachments/assets/844bed8c-439b-417c-b7da-156032ab6845" />
Введемо ось цю команду щод отримати дані для користування Microsoft Azure у Github Actions
<img width="1430" alt="Screenshot 2025-05-06 at 22 48 36" src="https://github.com/user-attachments/assets/ebe8c261-3fea-4834-a166-38ea246a449f" />

3. Поверніться до вашого github-репозиторію. Перейдіть в settings -> secrets and variables -> actions, та натисніть New Repository Secret. В полі Name введіть AZURE_CREDENTIALS а в поле Secret скопіюйте повністю вивід
команди з пункту 2е. Слідкуйте за тим щоб в кінці секрету на було пробілу або переходу рядка, натисніть Add Secret
<img width="1189" alt="Screenshot 2025-05-06 at 22 50 36" src="https://github.com/user-attachments/assets/fe7096f6-acfa-4b15-897a-0b3f21de91c1" />

4. Додати нову job в ваш github workflow, створений на попередньому занятті. В неї додати наступні степи:
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

      - name: Setup and build frontend
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

      - name: Login to Microsoft Azure
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: kpz-lab-9-hostischev
          images: ghcr.io/${{ github.repository_owner }}/${{ github.event.repository.name }}:latest
```
Ось увесь оновлений код нашого воркфлоу.

5. Запустіть воркфлоу та пересвідчиться що він завершився успішно.
<img width="1440" alt="Screenshot 2025-05-06 at 23 02 00" src="https://github.com/user-attachments/assets/93da8240-a48a-4703-8491-5217ba1fac5f" />

6. В логах степу Deploy to Azure Web App знайдіть рядок який починається з App Service Application Url та клікніть по посиланню. Ви маєте побачити веб сторінку з
Вашим фронт-ендом. Якщо сторінку не видно – почекайте кілька хвилин та поверніться
<img width="1037" alt="Screenshot 2025-05-06 at 22 55 26" src="https://github.com/user-attachments/assets/3036c48e-a708-432e-9cff-e7813fcaec53" />

Перейдемо по посиланню у логах та подивимося на результат:
<img width="899" alt="Screenshot 2025-05-06 at 22 57 14" src="https://github.com/user-attachments/assets/72280d96-205b-4d9c-8b72-9bd4bdcfcd49" />

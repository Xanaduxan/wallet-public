# 💸 Wallet Public

Веб-приложение для управления личными финансами. Позволяет регистрироваться, вести учёт расходов по категориям и получать доступ к данным через современный API. Проект включает клиентскую часть на React и серверную часть на NestJS.

## 🧱 Стек технологий

### 🔹 Клиент (`/client`)

```
- React
- TypeScript
- Axios
- React Router DOM
```

### 🔹 Сервер (`/server`)

```
- NestJS
- TypeScript
- MongoDB (через Mongoose)
- JWT (аутентификация)
- Валидация с `class-validator`
```

---

## 📁 Структура проекта

```
/
├── client/ # интерфейс пользователя (SPA)
│ └── src/
│ ├── api/
│ ├── components/
│ ├── context/
│ ├── hooks/
│ ├── utils/
│ └── App.tsx

├── server/ # REST API
│ └── src/
│ ├── auth/ # регистрация, логин, JWT
│ ├── users/ # управление пользователями
│ ├── costs/ # CRUD операций с расходами
│ ├── config/ # настройки и переменные
│ └── app.module.ts

yaml
Копировать
Редактировать
```

---

## 🚀 Быстрый старт

### 📦 1. Установи зависимости

#### Backend:

```bash
cd server
npm install
```

#### Frontend:

```
cd ../client
npm install

Для сервера (server/.env)
MONGODB_URI=mongodb://localhost:27017/wallet
JWT_SECRET=your_jwt_secret
PORT=5000

Для клиента (client/.env)
REACT_APP_API_URL=http://localhost:5000
```

▶️ 3. Запусти проект

```
Backend:


cd server
npm run start:dev
Frontend:


cd client
npm start
Приложение откроется на http://localhost:3000

🧪 Тестирование

# backend
cd server
npm run test

# frontend
cd client
npm test
```

✅ Основной функционал

```
Регистрация и авторизация пользователя

CRUD операции с расходами

Категории расходов

Хранение токенов, защита маршрутов

Подключение к MongoDB

Удобный интерфейс
```

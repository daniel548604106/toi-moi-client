AWS BASE_URL = 'https://master.dnyititrtbx22.amplifyapp.com'
Vercel BASE_URL = https://toi-moi-client-danielyeh548604106-gmailcom.vercel.app/

![Logo](https://ik.imagekit.io/4liibdxmxfn/images/users/user-peter548604106-cover-1624546491192_fBp5lDxtY)

# Toi & Moi (You & Me)

Toi&Moi is a fullstack social platform designated to connect people from distances away, users are able to build their own profile and connect with people from around the world with realtime messaging and friend system. (Idea originated from starting a Facebook clone)

⭐ Live Demo (https://master.d1qbxrer92lk46.amplifyapp.com)

## Screenshots

![App Screenshot](https://ik.imagekit.io/4liibdxmxfn/images/users/user-peter548604106-cover-1624548236774_5Z3g7HK3Qq)

## Features

📱 Realtime Communication & Notification

![螢幕錄製-2021-06-25-上午10 53 21](https://user-images.githubusercontent.com/61279365/123363915-147dac80-d5a6-11eb-99ec-b06e194dc3c8.gif)

🌎 i18n - Internationalization

![螢幕錄製-2021-06-25-下午7 33 28](https://user-images.githubusercontent.com/61279365/123419339-b0caa200-d5ec-11eb-9c5f-e40fd2788e84.gif)

🌗 Light/dark mode toggle

![螢幕錄製-2021-06-25-上午10 38 20](https://user-images.githubusercontent.com/61279365/123364070-5d356580-d5a6-11eb-9974-d3c3809458e7.gif)

📧. Customized EDM (Cross Email Service Provider Compatibile)

![截圖 2021-06-26 下午2 53 07](https://user-images.githubusercontent.com/61279365/123504865-5c77fe80-d68e-11eb-9bbd-2ff42768c952.png)

## Tech Stack

**Client**

✨ Next.js, Redux, TailwindCSS , Socket.io-client , MJML(Customized EDM)

**Server**

✨ Node.js, Express.js , Socket.io , Nodemailer

**Database**

✨ MongoDB

## Deployment

🌟 **Heroku**
－ Easy to maintain and operate. Suitable for traffical level of a non-product website.

## Demo

Live Demo
https://toi-moi.herokuapp.com/
https://master.d1qbxrer92lk46.amplifyapp.com

## Problems Ecountered

- Problem: tailwindcss group-focus not working on mobile
- Fix: change it to useClickAway custom hook
- Problem: Next/Image responsive not available without setting a width or height
- Fix: CSS Fix
- Problem: react-konva outputs Must use import to load ES Module [error]
- Fix: The problem lies in SSR, as react-konva doesn't support SSR , so instead of importing react-konva in a page component, wrap it inside a regular component, and use dynamic import with SSR:false .
- Unlimited Rerender when trying to destructure redux state

## Deployment

- AWS Amplify

## CI/CD

- Github Actions

  1. Start by creating a yml file with basic configurations as follows

     # we can specify our target branch to trigger actions on push or pull request.

     on:

     push:
     branches : [master]
     pull_requests:
     branches : [master]

     # A workflow run is made up of one or more jobs that can run sequentially or in parallel

     jobs:

     build:

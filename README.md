![Logo](https://ik.imagekit.io/4liibdxmxfn/images/users/user-peter548604106-cover-1624546491192_fBp5lDxtY)

# Toi & Moi (You & Me)

Toi&Moi is a fullstack social platform designated to connect people from distances away, users are able to build their own profile and connect with people from around the world with realtime messaging and friend system. (Idea originated from starting a Facebook clone)

β­ Live Demo (https://toi-moi-client-danielyeh548604106-gmailcom.vercel.app/)

## Screenshots

![App Screenshot](https://ik.imagekit.io/4liibdxmxfn/images/users/user-peter548604106-cover-1624548236774_5Z3g7HK3Qq)

## Features

π± Realtime Communication & Notification

![θ’εΉιθ£½-2021-06-25-δΈε10 53 21](https://user-images.githubusercontent.com/61279365/123363915-147dac80-d5a6-11eb-99ec-b06e194dc3c8.gif)

π i18n - Internationalization

![θ’εΉιθ£½-2021-06-25-δΈε7 33 28](https://user-images.githubusercontent.com/61279365/123419339-b0caa200-d5ec-11eb-9c5f-e40fd2788e84.gif)

π Light/dark mode toggle

![θ’εΉιθ£½-2021-06-25-δΈε10 38 20](https://user-images.githubusercontent.com/61279365/123364070-5d356580-d5a6-11eb-9974-d3c3809458e7.gif)

π§. Customized EDM (Cross Email Service Provider Compatibile)

![ζͺε 2021-06-26 δΈε2 53 07](https://user-images.githubusercontent.com/61279365/123504865-5c77fe80-d68e-11eb-9bbd-2ff42768c952.png)

## Tech Stack

**Client**

β¨ Next.js, Redux-toolkit, Typescript, TailwindCSS , Socket.io-client , MJML(Customized EDM) , Emoji-Picker-React , Framer-motion

**Server**

β¨ Node.js, Express.js , Socket.io , Nodemailer

**Database**

β¨ MongoDB

## Deployment

π **Server - Heroku**
οΌ Easy to maintain and operate. Suitable for traffical level of a non-product website , and supports WebSocket as well!
π **Client - Vercel**
οΌ Fast deploy and works best with Next.js, awesome!


## Problems Encountered

- Problem: tailwindcss group-focus not working on mobile
- Fix: change it to useClickAway custom hook
- Problem: Nextjs Image by default does not support Blob File extension
- Fix: Add an "unoptimized" props on the Image Component
  Reference: https://github.com/vercel/next.js/discussions/19732
- Problem: Next/Image responsive not available without setting a width or height
- Fix: CSS Fix
- Problem: react-konva outputs Must use import to load ES Module [error]
- Fix: The problem lies in SSR, as react-konva doesn't support SSR , so instead of importing react-konva in a page component, wrap it inside a regular component, and use dynamic import with SSR:false .
- Unlimited Rerender when trying to destructure redux state
- Blob File is not received from Server as BodyParser doesn't include file uploads. Need Extra package to parse formData
- Install express-formidable , then the data will be visible .
  ιθ¦εͺιε°δ½Ώη¨ formData ηθ·―εΎδ½Ώη¨ formidable()οΌparse εΊδΎηθ³ζζε¨ req.files ε req.fields θ£‘ι’
  Reference: https://www.npmjs.com/package/express-formidable

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

AWS BASE_URL = 'https://master.dnyititrtbx22.amplifyapp.com'
Vercel BASE_URL = https://toi-moi-client-danielyeh548604106-gmailcom.vercel.app/

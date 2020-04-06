import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../shared/App'
import 'isomorphic-fetch'

import express from 'express'


const app = express()
app.use(express.static('build/static'))

app.get('/api/users', (req, res, next)=>{
  res.send([
    {name: 'RaseL'},
    {name: 'alex'},
    {name: 'jackson'}
  ])
})



app.get('*', async(req, res, next)=>{
  let response = await fetch('http://localhost:3000/api/users')
  let initialData =  await response.json()  

  let markup = renderToString(<App initialData={initialData} />)
  const templete = `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Server side render App</title>
      <link rel="stylesheet" href="/css/main.css">
      <script src="/js/bundle.js" defer></script>
      <script>window.__initialData__ = ${JSON.stringify(initialData)}</script>
    </head>
    <body>
      <div id="root">${markup}</div>
    </body>
    </html>
  `
  res.send(templete)
})



app.listen(3000, ()=>console.log("server is listening on port 3000"))
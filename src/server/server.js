import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import App from '../shared/App'
import routes from '../shared/routes'

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

app.get('/api/news', (req, res, next)=>{
  res.send([ "news one", "news two", "news three" ])
})



app.get('*', async(req, res, next)=>{
  
  // get this type route ==> { path: '/', component: [Function: User], exact: true }
  let currentRoute = routes.find(route=> matchPath(req.url, route))

  // take initialData return and static requestInitialData call from every component......
  let requestInitialData;
  if(currentRoute){
    // console.log(currentRoute);
    requestInitialData = currentRoute.component.requestInitialData && currentRoute.component.requestInitialData()
  }

  let initialData = await Promise.resolve(requestInitialData)
  const context = { initialData }  // send component current url match like => props.staticContext = { initialData: [{}] } 

  let markup = renderToString(
    <StaticRouter location={req.url} context={context} >
      <App initialData={initialData} />
    </StaticRouter> 
   )


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
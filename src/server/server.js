import React from 'react'
import fs from 'fs'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import serialize  from 'serialize-javascript'
import App from '../shared/App'
import routes from '../shared/routes'

import { Provider } from 'react-redux'
import configStore  from '../store'

import 'isomorphic-fetch'

import express from 'express'

const app = express()
app.use("/static", express.static('build/static'))

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
  const store = configStore()
  const promises = routes.reduce((acc, route)=>{    
    if(matchPath(req.url, route) && route.component && route.component.initialAction) {  
      // initial data fetch and dispath all initialAction our component.. and store fullfill.
      acc.push(Promise.resolve(store.dispatch(route.component.initialAction()))) 
    }
    return acc
  }, [])

  Promise.all(promises)
    .then((result)=>{
      // console.log(result);
      let markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={{}} >
            <App/>
          </StaticRouter> 
        </Provider>
       )
        
      // already state full fill...... 
      // now send this data from client/browser side store. 
      let initialData = store.getState();

      let jsfiles = fs.readdirSync('build/static/js')
      let cssfiles = fs.readdirSync('build/static/css')
      
      const templete = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Server side render App</title>    
          ${jsfiles.map(js=>`<script src="/static/js/${js}" defer ></script>`)}
          ${cssfiles.map(css=>`<link rel="stylesheet" href="/static/css/${css}"/>`)}
          <script>window.__initialData__ = ${serialize(initialData)}</script>
        </head>
        <body>
          <div id="root">${markup}</div>
        </body>
        </html>
      `
      res.send(templete)
    })
    .catch(next)
})



app.listen(3000, ()=>console.log("server is listening on port 3000"))







if(window.document){
  window.document.body.innerHTML = 
  window.document.body.innerHTML.replace(/<\/script>,<script/g, '</script><script ')
  window.document.body.innerHTML = 
  window.document.body.innerHTML.replace(/,<script/, '<script ')
}
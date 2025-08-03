import{a as v,S as q,i as c}from"./assets/vendor-5YrzWRhu.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const $="51572255-4a923f4e22b79815f5c68f565",E="https://pixabay.com/api/",P=15;async function y(e,t=1){const o=new URLSearchParams({key:$,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:P});try{return(await v.get(`${E}?${o}`)).data}catch(n){throw console.error("Error fetching images:",n),new Error("Failed to fetch images from Pixabay API")}}let d;function p(){d=new q(".gallery a",{captionsData:"alt",captionDelay:250,overlayOpacity:.9})}function u(){d?d.refresh():p()}function R(e){const t=document.querySelector(".gallery");t.innerHTML="";const o=e.map(n=>`
    <li class="gallery-item">
      <a href="${n.largeImageURL}">
        <img src="${n.webformatURL}" alt="${n.tags}" loading="lazy">
        <div class="info">
          <p><b>Likes:</b> ${n.likes}</p>
          <p><b>Views:</b> ${n.views}</p>
          <p><b>Comments:</b> ${n.comments}</p>
          <p><b>Downloads:</b> ${n.downloads}</p>
        </div>
      </a>
    </li>
  `).join("");t.insertAdjacentHTML("beforeend",o),u()}function M(){const e=document.querySelector(".gallery");e.innerHTML=""}function h(){document.querySelector(".loader").classList.remove("is-hidden")}function g(){document.querySelector(".loader").classList.add("is-hidden")}function b(){document.querySelector(".load-more").classList.remove("is-hidden")}function L(){document.querySelector(".load-more").classList.add("is-hidden")}function w(){document.querySelector(".end-message").classList.remove("is-hidden")}function H(){document.querySelector(".end-message").classList.add("is-hidden")}p();const I=document.querySelector(".form"),O=document.querySelector(".load-more");let i=1,a="",f=0,m=0;const x=()=>m>=15&&i*15<f,A=()=>i*15>=f,B=()=>{const e=document.querySelector(".gallery-item");e&&window.scrollBy({top:e.getBoundingClientRect().height*2,behavior:"smooth"})},S=e=>{console.error("Error:",e),c.error({title:"Error",message:"Failed to load images. Please try again later.",position:"topRight",timeout:3e3})};I.addEventListener("submit",async e=>{if(e.preventDefault(),a=e.currentTarget.searchQuery.value.trim(),!a){c.warning({title:"Warning",message:"Please enter search query",position:"topRight"});return}i=1,L(),H(),M(),h();try{const{hits:t,totalHits:o}=await y(a,i);if(f=o,m=t.length,!t.length){c.info({title:"Info",message:"No images found for your query",position:"topRight"});return}R(t),u(),x()?b():w()}catch(t){S(t)}finally{g()}});O.addEventListener("click",async()=>{i++,h(),L();try{const{hits:e}=await y(a,i);m+=e.length,document.querySelector(".gallery").insertAdjacentHTML("beforeend",e.map(o=>`
      <li class="gallery-item">
        <a href="${o.largeImageURL}">
          <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy">
          <div class="info">
            <p><b>Likes:</b> ${o.likes}</p>
            <p><b>Views:</b> ${o.views}</p>
            <p><b>Comments:</b> ${o.comments}</p>
            <p><b>Downloads:</b> ${o.downloads}</p>
          </div>
        </a>
      </li>
    `).join("")),u(),B(),A()?w():b()}catch(e){S(e)}finally{g()}});
//# sourceMappingURL=index.js.map

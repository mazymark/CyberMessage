import{r as a,c as C,q as k,w as E,o as F,j as e,F as l,f as S,N as D,a as I,b as q,d as P,e as U,g as p,h as i,u as O}from"./index-eUafOpAa.js";function A({currentUser:c,setCurrentUser:h}){const[r,g]=a.useState([]),[o,d]=a.useState(""),[x,n]=a.useState(!1),[m,f]=a.useState(null);a.useEffect(()=>{const s=C(i,"messages"),t=k(s,E("uid","==",c.uid)),M=F(t,b=>{const w=b.docs.map(u=>({id:u.id,...u.data()}));g(w)});return()=>M()},[c.uid]),a.useEffect(()=>{document.addEventListener("keydown",s=>{s.key==="Escape"&&n(!1)})},[]);async function j(s){try{await U(p(i,"messages",s))}catch(t){console.error("Error deleting message:",t.message)}}async function N(s){if(s.preventDefault(),!m||o.length<3)return;const t=p(i,"messages",m.id);await O(t,{message:o}),d(""),n(!1)}function v(s){n(!0),f(s)}function y(){n(!1)}return e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[x&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overlay"}),e.jsxs("div",{className:"update-modal",children:[e.jsx("input",{className:"update-message-input",type:"text",placeholder:"Update your message here...",value:o,onChange:s=>d(s.target.value)}),e.jsx("button",{onClick:N,className:"update-message-button",children:"Update"}),e.jsx(l,{className:"close-modal",icon:S,onClick:y})]})]}),e.jsx(D,{currentUser:c,setCurrentUser:h}),e.jsx("h1",{className:"posts-header",children:"My Messages"}),e.jsxs("div",{id:"message-wrapper",children:[r.length===0&&e.jsx("div",{className:"loader"}),r.map(s=>e.jsxs("div",{className:"message-box my-messages-box",children:[e.jsxs("div",{className:"profile",children:[e.jsx("img",{className:"message-image",src:s.icon,alt:"Message Image"}),e.jsxs("h4",{className:"user-name",children:["@",s.username," "]}),e.jsx("h3",{className:"user-message",children:s.message}),e.jsx("h6",{className:"timestamp",children:s.timestamp})]}),e.jsxs("div",{className:"update-delete-wrapper",children:[e.jsx(l,{className:"update-icon",icon:I,onClick:()=>v(s)}),e.jsx(l,{className:"delete-icon",icon:q,onClick:()=>j(s.id)})]})]},s.id))]})]}),e.jsx(P,{})]})}export{A as default};

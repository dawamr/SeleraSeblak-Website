import{c as b,j as e}from"./createLucideIcon.DXTdAQmi.js";import{r as i}from"./index.DhYZZe0J.js";import{t as w,s as S}from"./menu.BIgff9kc.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=b("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=b("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=b("Wallet",[["path",{d:"M21 12V7H5a2 2 0 0 1 0-4h14v4",key:"195gfw"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h16v-5",key:"195n9w"}],["path",{d:"M18 12a2 2 0 0 0 0 4h4v-4Z",key:"vllfpd"}]]),C=[{id:"1",name:"SeleraSeblak Jakarta Pusat",address:"Jl. Thamrin No. 10, Jakarta Pusat"},{id:"2",name:"SeleraSeblak Jakarta Selatan",address:"Jl. Sudirman No. 25, Jakarta Selatan"},{id:"3",name:"SeleraSeblak Jakarta Utara",address:"Jl. Kelapa Gading No. 5, Jakarta Utara"}];function G(){const[h,P]=i.useState(""),[x,M]=i.useState(""),[l,d]=i.useState("qris"),[q,F]=i.useState("pickup");i.useState(C[0].id);const[t,A]=i.useState(""),[g,D]=i.useState([]),[r,c]=i.useState({}),[m,f]=i.useState(!1),[y,v]=i.useState(0);i.useEffect(()=>{const a=localStorage.getItem("seleraSeblakCart");a&&D(JSON.parse(a))},[]);const j=(a,s)=>{if(!a)return 0;const n=s?.selectedToppings.reduce((u,I)=>{const K=w.find(W=>W.id===I);return u+(K?.price||0)},0)||0,E=S.find(u=>u.id===s?.selectedSpicyLevel)?.price||0;return a.basePrice+n+E},o=a=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(a),L=()=>{let a={};return h||(a.name="Nama Lengkap wajib diisi."),x||(a.whatsappNumber="Nomor WhatsApp wajib diisi."),c(a),Object.keys(a).length===0},J=async()=>{if(f(!0),c(s=>({...s,promoCode:void 0})),await new Promise(s=>setTimeout(s,1e3)),t.length===8&&/^[A-Z0-9]+$/.test(t))v(.1),alert("Kode promo berhasil diterapkan!");else{v(0);let s="Kode promo tidak valid.";t.length!==8?s="Kode promo harus 8 karakter.":/^[A-Z0-9]+$/.test(t)||(s="Kode promo hanya boleh berisi huruf dan angka."),c(n=>({...n,promoCode:s}))}f(!1)},N=a=>{a.preventDefault(),L()&&alert("Fitur Checkout belum tersedia")},p=g.reduce((a,s)=>a+j(s.menuItem,s.orderDetails)*s.quantity,0),k=p*y,T=p-k;return e.jsx("div",{className:"min-h-screen bg-gray-50 p-4 md:p-8",children:e.jsx("div",{className:"mx-auto max-w-4xl space-y-6",children:e.jsxs("div",{className:"grid gap-6 md:grid-cols-2",children:[e.jsxs("div",{className:"h-fit rounded-lg border bg-card text-card-foreground shadow-sm",children:[e.jsxs("div",{className:"flex flex-col space-y-1.5 p-6",children:[e.jsx("p",{className:"text-lg font-semibold leading-none tracking-tight",children:"Ringkasan Pesanan"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Detail pesanan Anda"})]}),e.jsxs("div",{className:"p-6 pt-0",children:[g.map(a=>e.jsxs("div",{className:"flex items-start space-x-4",children:[e.jsx("div",{className:"relative h-24 w-24 overflow-hidden rounded-lg",children:e.jsx("img",{src:a.menuItem.image,alt:a.menuItem.name,className:"object-cover w-full h-full"})}),e.jsxs("div",{className:"flex-1 space-y-1",children:[e.jsx("h3",{className:"font-medium",children:a.menuItem.name}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Topping: ",a.orderDetails.selectedToppings.map(s=>w.find(n=>n.id===s)?.name).join(", ")||"Tidak ada"]}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Level Pedas: ",S.find(s=>s.id===a.orderDetails.selectedSpicyLevel)?.name]}),e.jsxs("p",{className:"mt-2 font-medium",children:[a.quantity," x ",o(j(a.menuItem,a.orderDetails))]})]})]},a.menuItem.id)),e.jsxs("div",{className:"mt-6 border-t pt-4",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium",children:"Subtotal"}),e.jsx("span",{className:"font-medium",children:o(p)})]}),y>0&&e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium",children:"Discount"}),e.jsxs("span",{className:"font-medium",children:["-",o(k)]})]}),e.jsxs("div",{className:"flex justify-between mt-2",children:[e.jsx("span",{className:"font-bold",children:"Total"}),e.jsx("span",{className:"font-bold",children:o(T)})]})]})]})]}),e.jsxs("div",{className:"rounded-lg border bg-card text-card-foreground shadow-sm",children:[e.jsxs("div",{className:"flex flex-col space-y-1.5 p-6",children:[e.jsx("p",{className:"text-lg font-semibold leading-none tracking-tight",children:"Informasi Pengiriman"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Masukkan detail pengiriman Anda"})]}),e.jsx("div",{className:"p-6 pt-0",children:e.jsxs("form",{onSubmit:N,className:"space-y-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"name",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Nama Lengkap"}),e.jsx("input",{type:"text",id:"name",className:"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",placeholder:"Masukkan nama lengkap",value:h,onChange:a=>P(a.target.value),required:!0}),r.name&&e.jsx("p",{className:"text-red-500 text-xs italic",children:r.name})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"whatsapp",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Nomor WhatsApp"}),e.jsx("input",{type:"tel",id:"whatsapp",className:"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",placeholder:"Masukkan nomor WhatsApp",value:x,onChange:a=>M(a.target.value),required:!0}),r.whatsappNumber&&e.jsx("p",{className:"text-red-500 text-xs italic",children:r.whatsappNumber})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("label",{className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Metode Pembayaran"}),e.jsxs("div",{className:"grid gap-3",children:[e.jsxs("div",{className:"flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-accent [&:has(:checked)]:bg-accent",children:[e.jsx("input",{type:"radio",id:"qris",name:"paymentMethod",value:"qris",className:"aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",checked:l==="qris",onChange:()=>d("qris")}),e.jsx("label",{htmlFor:"qris",className:"flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(Z,{className:"h-4 w-4"}),e.jsx("span",{children:"QRIS"})]})})]}),e.jsxs("div",{className:"flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-accent [&:has(:checked)]:bg-accent",children:[e.jsx("input",{type:"radio",id:"mbanking",name:"paymentMethod",value:"mbanking",className:"aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",checked:l==="mbanking",onChange:()=>d("mbanking")}),e.jsx("label",{htmlFor:"mbanking",className:"flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(R,{className:"h-4 w-4"}),e.jsx("span",{children:"m-Banking"})]})})]}),e.jsxs("div",{className:"flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-accent [&:has(:checked)]:bg-accent",children:[e.jsx("input",{type:"radio",id:"cash",name:"paymentMethod",value:"cash",className:"aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",checked:l==="cash",onChange:()=>d("cash")}),e.jsx("label",{htmlFor:"cash",className:"flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(V,{className:"h-4 w-4"}),e.jsx("span",{children:"Bayar di Tempat"})]})})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("label",{className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Metode Pengambilan"}),e.jsx("div",{className:"grid gap-3",children:e.jsxs("div",{className:"flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-accent [&:has(:checked)]:bg-accent",children:[e.jsx("input",{type:"radio",id:"pickup",name:"pickupMethod",value:"pickup",className:"aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",checked:q==="pickup",onChange:()=>F("pickup"),disabled:!0}),e.jsx("label",{htmlFor:"pickup",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Ambil di Toko (Segera Hadir)"})]})})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Lokasi Pengambilan"}),e.jsx("select",{className:"flex h-9 w-full appearance-none items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&[data-state=open]]:ring-2 [&[data-state=open]]:ring-ring [&:focus-visible]:outline-none [&:focus-visible]:ring-2 [&:focus-visible]:ring-ring disabled:cursor-not-allowed disabled:opacity-50",defaultValue:"jakarta",children:C.map(a=>e.jsx("option",{value:a.name,children:a.name},a.id))})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{htmlFor:"promo",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Kode Promo (Opsional)"}),e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",id:"promo",className:"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",placeholder:"Masukkan kode promo",value:t,onChange:a=>A(a.target.value),maxLength:8}),e.jsx("button",{type:"button",className:`bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors ml-2 ${m?"animate-pulse":""}`,onClick:J,disabled:m,children:m?"Menerapkan...":"Gunakan"})]}),r.promoCode&&e.jsx("p",{className:"text-red-500 text-xs italic",children:r.promoCode})]}),e.jsx("button",{className:"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full bg-red-500 hover:bg-red-600 text-white",onClick:N,children:"Selesaikan Pesanan"})]})})]})]})})})}export{G as default};

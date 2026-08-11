import{r,j as e}from"./index-66GeUErX.js";import{c as N,N as H,X as A,F as $,S as U}from"./Footer-eqRVt-2V.js";import{M as G,u as q,P as V,a as _,b as B,L as D,m as w}from"./proxy-Bf-sf8xl.js";import{S as K}from"./sprout-DOPv7NDk.js";import{S as I}from"./search-CuGsTrb_.js";import{T as Z}from"./tractor-DioQZn7z.js";/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=N("BadgeIndianRupee",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"M8 8h8",key:"1bis0t"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"m13 17-5-1h1a4 4 0 0 0 0-8",key:"nu2bwa"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=N("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=N("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=N("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=N("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=N("Landmark",[["line",{x1:"3",x2:"21",y1:"22",y2:"22",key:"j8o0r"}],["line",{x1:"6",x2:"6",y1:"18",y2:"11",key:"10tf0k"}],["line",{x1:"10",x2:"10",y1:"18",y2:"11",key:"54lgf6"}],["line",{x1:"14",x2:"14",y1:"18",y2:"11",key:"380y"}],["line",{x1:"18",x2:"18",y1:"18",y2:"11",key:"1kevvc"}],["polygon",{points:"12 2 20 7 4 7",key:"jkujk7"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=N("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);class Y extends r.Component{getSnapshotBeforeUpdate(n){const s=this.props.childRef.current;if(s&&n.isPresent&&!this.props.isPresent){const i=this.props.sizeRef.current;i.height=s.offsetHeight||0,i.width=s.offsetWidth||0,i.top=s.offsetTop,i.left=s.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function ee({children:t,isPresent:n}){const s=r.useId(),i=r.useRef(null),f=r.useRef({width:0,height:0,top:0,left:0}),{nonce:g}=r.useContext(G);return r.useInsertionEffect(()=>{const{width:u,height:d,top:x,left:l}=f.current;if(n||!i.current||!u||!d)return;i.current.dataset.motionPopId=s;const o=document.createElement("style");return g&&(o.nonce=g),document.head.appendChild(o),o.sheet&&o.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${d}px !important;
            top: ${x}px !important;
            left: ${l}px !important;
          }
        `),()=>{document.head.removeChild(o)}},[n]),e.jsx(Y,{isPresent:n,childRef:i,sizeRef:f,children:r.cloneElement(t,{ref:i})})}const ne=({children:t,initial:n,isPresent:s,onExitComplete:i,custom:f,presenceAffectsLayout:g,mode:u})=>{const d=q(te),x=r.useId(),l=r.useCallback(p=>{d.set(p,!0);for(const y of d.values())if(!y)return;i&&i()},[d,i]),o=r.useMemo(()=>({id:x,initial:n,isPresent:s,custom:f,onExitComplete:l,register:p=>(d.set(p,!1),()=>d.delete(p))}),g?[Math.random(),l]:[s,l]);return r.useMemo(()=>{d.forEach((p,y)=>d.set(y,!1))},[s]),r.useEffect(()=>{!s&&!d.size&&i&&i()},[s]),u==="popLayout"&&(t=e.jsx(ee,{isPresent:s,children:t})),e.jsx(V.Provider,{value:o,children:t})};function te(){return new Map}const M=t=>t.key||"";function F(t){const n=[];return r.Children.forEach(t,s=>{r.isValidElement(s)&&n.push(s)}),n}const re=({children:t,custom:n,initial:s=!0,onExitComplete:i,presenceAffectsLayout:f=!0,mode:g="sync",propagate:u=!1})=>{const[d,x]=_(u),l=r.useMemo(()=>F(t),[t]),o=u&&!d?[]:l.map(M),p=r.useRef(!0),y=r.useRef(l),k=q(()=>new Map),[v,S]=r.useState(l),[a,c]=r.useState(l);B(()=>{p.current=!1,y.current=l;for(let h=0;h<a.length;h++){const m=M(a[h]);o.includes(m)?k.delete(m):k.get(m)!==!0&&k.set(m,!1)}},[a,o.length,o.join("-")]);const b=[];if(l!==v){let h=[...l];for(let m=0;m<a.length;m++){const j=a[m],R=M(j);o.includes(R)||(h.splice(m,0,j),b.push(j))}g==="wait"&&b.length&&(h=b),c(F(h)),S(l);return}const{forceRender:C}=r.useContext(D);return e.jsx(e.Fragment,{children:a.map(h=>{const m=M(h),j=u&&!d?!1:l===a||o.includes(m),R=()=>{if(k.has(m))k.set(m,!0);else return;let z=!0;k.forEach(T=>{T||(z=!1)}),z&&(C==null||C(),c(y.current),u&&(x==null||x()),i&&i())};return e.jsx(ne,{isPresent:j,initial:!p.current||s?void 0:!1,custom:j?void 0:n,presenceAffectsLayout:f,mode:g,onExitComplete:j?void 0:R,children:h},m)})})},se="http://localhost:5000";function ae(t=""){const n=t.toLowerCase();return n.includes("kisan")||n.includes("income")||n.includes("samman")||n.includes("pension")||n.includes("maan dhan")?O:n.includes("loan")||n.includes("credit")||n.includes("finance")||n.includes("kcc")?L:n.includes("insurance")||n.includes("bima")||n.includes("crop insurance")?U:n.includes("machinery")||n.includes("equipment")||n.includes("irrigation")||n.includes("sinchai")||n.includes("tractor")?Z:J}function E(t=""){const n=t.toLowerCase();return n.includes("insurance")||n.includes("bima")?"Insurance":n.includes("loan")||n.includes("credit")||n.includes("kcc")||n.includes("finance")?"Finance":n.includes("machinery")||n.includes("equipment")||n.includes("tractor")?"Machinery":n.includes("irrigation")||n.includes("sinchai")||n.includes("water")?"Irrigation":n.includes("kisan")||n.includes("farmer")||n.includes("pension")?"Farmer Support":"Agriculture"}function ie(){return e.jsxs("div",{className:`
                bg-white
                dark:bg-neutral-900
                rounded-3xl
                p-7
                shadow-soft
                animate-pulse
            `,children:[e.jsx("div",{className:`
                    w-14 h-14
                    rounded-2xl
                    bg-neutral-200
                    dark:bg-neutral-800
                    mb-5
                `}),e.jsx("div",{className:`
                    h-6
                    bg-neutral-200
                    dark:bg-neutral-800
                    rounded
                    w-3/4
                    mb-4
                `}),e.jsx("div",{className:`
                    h-4
                    bg-neutral-200
                    dark:bg-neutral-800
                    rounded
                    w-full
                    mb-2
                `}),e.jsx("div",{className:`
                    h-4
                    bg-neutral-200
                    dark:bg-neutral-800
                    rounded
                    w-5/6
                    mb-6
                `}),e.jsx("div",{className:`
                    h-10
                    bg-neutral-200
                    dark:bg-neutral-800
                    rounded-xl
                    w-32
                `})]})}function le({scheme:t,index:n}){const s=ae(t.title),i=E(t.title);return e.jsxs(w.article,{initial:{opacity:0,y:24},animate:{opacity:1,y:0},transition:{duration:.4,delay:Math.min(n*.05,.5)},whileHover:{y:-5},className:`
                group
                bg-white
                dark:bg-neutral-900
                rounded-3xl
                p-6
                sm:p-7
                shadow-soft
                hover:shadow-lifted
                border
                border-neutral-100
                dark:border-neutral-800
                transition-all
                duration-300
                flex
                flex-col
            `,children:[e.jsxs("div",{className:"flex items-start justify-between gap-4 mb-6",children:[e.jsx("div",{className:`
                        w-14 h-14
                        rounded-2xl
                        bg-secondary-100
                        dark:bg-secondary-900
                        text-secondary-700
                        dark:text-secondary-300
                        flex
                        items-center
                        justify-center
                        shrink-0
                        group-hover:scale-105
                        transition-transform
                    `,children:e.jsx(s,{size:26})}),e.jsx("span",{className:`
                        inline-flex
                        items-center
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        bg-primary-50
                        dark:bg-primary-950
                        text-primary-700
                        dark:text-primary-300
                        border
                        border-primary-100
                        dark:border-primary-900
                    `,children:i})]}),e.jsx("h2",{className:`
                    text-xl
                    sm:text-2xl
                    font-display
                    font-semibold
                    text-neutral-900
                    dark:text-neutral-50
                    leading-snug
                    mb-3
                `,children:t.title}),e.jsx("p",{className:`
                    text-neutral-600
                    dark:text-neutral-400
                    leading-relaxed
                    mb-6
                    flex-1
                `,children:t.description||"Government scheme and support program for farmers and agricultural development."}),e.jsxs("div",{className:`
                    flex
                    items-center
                    justify-between
                    gap-3
                    pt-5
                    border-t
                    border-neutral-100
                    dark:border-neutral-800
                `,children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:`
                            w-7 h-7
                            rounded-full
                            bg-neutral-100
                            dark:bg-neutral-800
                            flex
                            items-center
                            justify-center
                        `,children:e.jsx(L,{size:14})}),e.jsxs("div",{children:[e.jsx("p",{className:`
                                text-xs
                                text-neutral-500
                                dark:text-neutral-500
                            `,children:"Source"}),e.jsx("p",{className:`
                                text-sm
                                font-medium
                                text-neutral-700
                                dark:text-neutral-300
                            `,children:t.source||"Government Portal"})]})]}),t.url&&e.jsxs("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",className:`
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2.5
                            rounded-xl
                            bg-primary-700
                            hover:bg-primary-800
                            dark:bg-primary-600
                            dark:hover:bg-primary-500
                            text-white
                            text-sm
                            font-medium
                            transition-colors
                            duration-200
                            group/button
                        `,children:["View",e.jsx(X,{size:15,className:`
                                group-hover/button:translate-x-0.5
                                transition-transform
                            `})]})]})]})}function he(){const[t,n]=r.useState([]),[s,i]=r.useState(!0),[f,g]=r.useState(!1),[u,d]=r.useState(""),[x,l]=r.useState(""),[o,p]=r.useState("All"),y=async(a=!1)=>{a?g(!0):i(!0),d("");try{const c=await fetch(`${se}/api/schemes`,{method:"GET",headers:{Accept:"application/json"}});if(!c.ok)throw new Error(`Server returned ${c.status}`);const b=await c.json();if(b.status!=="success")throw new Error(b.message||"Unable to fetch schemes");n(Array.isArray(b.schemes)?b.schemes:[])}catch(c){console.error("Schemes API Error:",c),d("Unable to load government schemes. Please make sure the backend server is running.")}finally{i(!1),g(!1)}};r.useEffect(()=>{y()},[]);const k=r.useMemo(()=>{const a=new Set;return t.forEach(c=>{a.add(E(c.title))}),["All",...Array.from(a).sort()]},[t]),v=r.useMemo(()=>{const a=x.trim().toLowerCase();return t.filter(c=>{const b=(c.title||"").toLowerCase(),C=(c.description||"").toLowerCase(),h=E(c.title);return(!a||b.includes(a)||C.includes(a))&&(o==="All"||h===o)})},[t,x,o]),S=()=>{l(""),p("All")};return e.jsxs("div",{className:`
                min-h-screen
                bg-neutral-50
                dark:bg-neutral-950
            `,children:[e.jsx(H,{}),e.jsxs("section",{className:`
                    relative
                    overflow-hidden
                    px-4
                    sm:px-6
                    lg:px-10
                    pt-12
                    sm:pt-16
                    pb-10
                `,children:[e.jsx("div",{className:`
                        absolute
                        inset-0
                        pointer-events-none
                    `,children:e.jsx("div",{className:`
                            absolute
                            top-0
                            left-1/2
                            -translate-x-1/2
                            w-[500px]
                            h-[300px]
                            bg-primary-100/40
                            dark:bg-primary-900/10
                            blur-3xl
                            rounded-full
                        `})}),e.jsxs("div",{className:`
                        relative
                        max-w-6xl
                        mx-auto
                        text-center
                    `,children:[e.jsx(w.div,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},className:`
                            inline-flex
                            items-center
                            justify-center
                            w-16
                            h-16
                            rounded-2xl
                            bg-primary-100
                            dark:bg-primary-900
                            text-primary-700
                            dark:text-primary-300
                            mb-6
                        `,children:e.jsx(K,{size:30})}),e.jsx(w.h1,{initial:{opacity:0,y:15},animate:{opacity:1,y:0},className:`
                            text-4xl
                            sm:text-5xl
                            lg:text-6xl
                            font-display
                            font-semibold
                            text-primary-800
                            dark:text-primary-200
                            tracking-tight
                            mb-5
                        `,children:"Government Schemes"}),e.jsx(w.p,{initial:{opacity:0,y:15},animate:{opacity:1,y:0},transition:{delay:.1},className:`
                            max-w-2xl
                            mx-auto
                            text-base
                            sm:text-lg
                            text-neutral-600
                            dark:text-neutral-400
                            leading-relaxed
                        `,children:"Discover the latest government schemes, financial assistance, insurance and agricultural support programs available for farmers."}),e.jsxs(w.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.2},className:`
                            inline-flex
                            items-center
                            gap-2
                            mt-6
                            px-4
                            py-2
                            rounded-full
                            bg-white
                            dark:bg-neutral-900
                            border
                            border-neutral-200
                            dark:border-neutral-800
                            shadow-sm
                        `,children:[e.jsxs("span",{className:`
                                relative
                                flex
                                w-2.5
                                h-2.5
                            `,children:[e.jsx("span",{className:`
                                    absolute
                                    inline-flex
                                    h-full
                                    w-full
                                    rounded-full
                                    bg-green-400
                                    opacity-75
                                    animate-ping
                                `}),e.jsx("span",{className:`
                                    relative
                                    inline-flex
                                    rounded-full
                                    w-2.5
                                    h-2.5
                                    bg-green-500
                                `})]}),e.jsx("span",{className:`
                                text-sm
                                font-medium
                                text-neutral-700
                                dark:text-neutral-300
                            `,children:"Live government scheme data"})]})]})]}),e.jsx("section",{className:`
                    px-4
                    sm:px-6
                    lg:px-10
                    pb-8
                `,children:e.jsx("div",{className:`
                        max-w-6xl
                        mx-auto
                    `,children:e.jsxs("div",{className:`
                            bg-white
                            dark:bg-neutral-900
                            rounded-3xl
                            border
                            border-neutral-200
                            dark:border-neutral-800
                            p-4
                            sm:p-5
                            shadow-soft
                        `,children:[e.jsxs("div",{className:`
                                flex
                                flex-col
                                lg:flex-row
                                gap-4
                            `,children:[e.jsxs("div",{className:`
                                    relative
                                    flex-1
                                `,children:[e.jsx(I,{size:20,className:`
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-neutral-400
                                    `}),e.jsx("input",{type:"text",value:x,onChange:a=>l(a.target.value),placeholder:`
                                        Search government schemes...
                                    `,className:`
                                        w-full
                                        h-12
                                        pl-12
                                        pr-12
                                        rounded-xl
                                        bg-neutral-50
                                        dark:bg-neutral-950
                                        border
                                        border-neutral-200
                                        dark:border-neutral-800
                                        text-neutral-900
                                        dark:text-neutral-100
                                        placeholder:text-neutral-400
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-primary-500/30
                                        focus:border-primary-500
                                        transition
                                    `}),x&&e.jsx("button",{onClick:()=>l(""),className:`
                                            absolute
                                            right-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-neutral-400
                                            hover:text-neutral-700
                                            dark:hover:text-neutral-200
                                        `,children:e.jsx(A,{size:18})})]}),e.jsxs("button",{onClick:()=>y(!0),disabled:f,className:`
                                    h-12
                                    px-5
                                    rounded-xl
                                    bg-primary-700
                                    hover:bg-primary-800
                                    disabled:opacity-60
                                    text-white
                                    font-medium
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    transition-colors
                                `,children:[e.jsx(P,{size:18,className:f?"animate-spin":""}),f?"Refreshing...":"Refresh"]})]}),e.jsxs("div",{className:`
                                flex
                                flex-wrap
                                items-center
                                gap-2
                                mt-4
                            `,children:[e.jsxs("div",{className:`
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    text-neutral-500
                                    mr-1
                                `,children:[e.jsx(Q,{size:16}),"Filter:"]}),k.map(a=>e.jsx("button",{onClick:()=>p(a),className:`
                                        px-4
                                        py-2
                                        rounded-full
                                        text-sm
                                        font-medium
                                        transition-all
                                        ${o===a?`
                                                    bg-primary-700
                                                    text-white
                                                `:`
                                                    bg-neutral-100
                                                    dark:bg-neutral-800
                                                    text-neutral-600
                                                    dark:text-neutral-300
                                                    hover:bg-neutral-200
                                                    dark:hover:bg-neutral-700
                                                `}
                                    `,children:a},a))]})]})})}),e.jsx("section",{className:`
                    px-4
                    sm:px-6
                    lg:px-10
                    pb-16
                `,children:e.jsxs("div",{className:`
                        max-w-6xl
                        mx-auto
                    `,children:[!s&&!u&&e.jsxs("div",{className:`
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-center
                                justify-between
                                gap-3
                                mb-6
                            `,children:[e.jsxs("div",{children:[e.jsxs("p",{className:`
                                        text-neutral-900
                                        dark:text-neutral-100
                                        font-semibold
                                    `,children:[v.length," ",v.length===1?"scheme":"schemes"]}),e.jsx("p",{className:`
                                        text-sm
                                        text-neutral-500
                                        dark:text-neutral-500
                                    `,children:"Latest available government scheme information"})]}),(x||o!=="All")&&e.jsxs("button",{onClick:S,className:`
                                        inline-flex
                                        items-center
                                        gap-2
                                        text-sm
                                        text-primary-700
                                        dark:text-primary-300
                                        hover:underline
                                    `,children:[e.jsx(A,{size:15}),"Clear filters"]})]}),s&&e.jsx("div",{className:`
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-6
                            `,children:Array.from({length:6}).map((a,c)=>e.jsx(ie,{},c))}),!s&&u&&e.jsxs(w.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:`
                                max-w-xl
                                mx-auto
                                text-center
                                py-16
                                px-6
                                bg-white
                                dark:bg-neutral-900
                                rounded-3xl
                                border
                                border-neutral-200
                                dark:border-neutral-800
                            `,children:[e.jsx("div",{className:`
                                    w-16
                                    h-16
                                    mx-auto
                                    mb-5
                                    rounded-2xl
                                    bg-red-100
                                    dark:bg-red-950
                                    text-red-600
                                    dark:text-red-400
                                    flex
                                    items-center
                                    justify-center
                                `,children:e.jsx(L,{size:28})}),e.jsx("h2",{className:`
                                    text-xl
                                    font-semibold
                                    text-neutral-900
                                    dark:text-neutral-100
                                    mb-2
                                `,children:"Unable to load schemes"}),e.jsx("p",{className:`
                                    text-neutral-600
                                    dark:text-neutral-400
                                    mb-6
                                `,children:u}),e.jsxs("button",{onClick:()=>y(),className:`
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-5
                                    py-3
                                    rounded-xl
                                    bg-primary-700
                                    hover:bg-primary-800
                                    text-white
                                    font-medium
                                `,children:[e.jsx(P,{size:17}),"Try Again"]})]}),!s&&!u&&v.length===0&&e.jsxs(w.div,{initial:{opacity:0},animate:{opacity:1},className:`
                                    text-center
                                    py-16
                                    px-6
                                    bg-white
                                    dark:bg-neutral-900
                                    rounded-3xl
                                    border
                                    border-neutral-200
                                    dark:border-neutral-800
                                `,children:[e.jsx("div",{className:`
                                        w-16
                                        h-16
                                        mx-auto
                                        mb-5
                                        rounded-2xl
                                        bg-neutral-100
                                        dark:bg-neutral-800
                                        text-neutral-500
                                        flex
                                        items-center
                                        justify-center
                                    `,children:e.jsx(I,{size:28})}),e.jsx("h2",{className:`
                                        text-xl
                                        font-semibold
                                        text-neutral-900
                                        dark:text-neutral-100
                                        mb-2
                                    `,children:"No schemes found"}),e.jsx("p",{className:`
                                        text-neutral-600
                                        dark:text-neutral-400
                                        mb-5
                                    `,children:"Try searching for a different scheme or category."}),e.jsxs("button",{onClick:S,className:`
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-primary-700
                                        text-white
                                        font-medium
                                    `,children:["Clear Filters",e.jsx(W,{size:17})]})]}),!s&&!u&&v.length>0&&e.jsx("div",{className:`
                                    grid
                                    grid-cols-1
                                    md:grid-cols-2
                                    gap-6
                                `,children:e.jsx(re,{children:v.map((a,c)=>e.jsx(le,{scheme:a,index:c},a.url||a.id||c))})})]})}),e.jsx($,{})]})}export{he as default};

var U=window.Caido;var D=new Set,p=({id:_,cssText:Z})=>{if(D.has(_)||document.querySelector(`#${_}`))return;const q=document.createElement("style");q.id=_,q.textContent=Z,q.classList.add("evenbetterapi-css-module"),document.head.appendChild(q),D.add(_)},Y=p;var s=`
.eb-checkbox__input {
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    width: 1.15em;
    height: 1.15em;
    border: .1em solid grey;
    border-radius: 4px;
    display: inline-grid;
    place-content: center;
    margin: 0;
}
.eb-checkbox__input:checked:before {
    transform: scale(1);
}
.eb-checkbox__input:before {
    content: "";
    transform: scale(0);
    width: .65em;
    height: .65em;
    border-radius: 2px;
    box-shadow: inset 1em 1em var(--c-fg-secondary);
}
.eb-button__label {
    display: inline-flex;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`,P=()=>{Y({id:"checkbox",cssText:s});const _=document.createElement("div");return _.classList.add("eb-button__label"),_.innerHTML=`<div class="eb-checkbox">
            <div class="formkit-outer" data-family="box" data-type="checkbox" data-complete="true">
                <label class="formkit-wrapper eb-checkbox__wrapper" data-checked="true">
                    <span class="formkit-inner eb-checkbox__inner">
                        <input class="formkit-input eb-checkbox__input" type="checkbox">
                        <span class="formkit-decorator" aria-hidden="true"></span>
                    </span>
                </label>
            </div>
        </div>
    `,_};function b(_){const Z=document.createElement("div");Z.classList.add("c-menu-bar"),Z.style.width="100%";const q=document.createElement("div");q.classList.add("p-menubar","p-component"),q.setAttribute("data-pc-name","menubar"),q.setAttribute("data-pc-section","root");const K=document.createElement("div");K.classList.add("p-menubar-start"),K.setAttribute("data-pc-section","start");const z=document.createElement("div");z.classList.add("c-settings__title"),z.style.padding="0 var(--c-space-4)",z.style.fontWeight="700",z.textContent=_.title,K.appendChild(z);const F=document.createElement("ul");F.classList.add("p-menubar-root-list"),_.items.forEach((J)=>{const Q=document.createElement("li");Q.classList.add("p-menuitem"),Q.setAttribute("role","menuitem");const j=document.createElement("div");j.classList.add("p-menuitem-content"),j.setAttribute("data-pc-section","content");const W=document.createElement("div");W.classList.add("c-settings__item"),W.setAttribute("data-is-active","true"),W.addEventListener("click",()=>{q.classList.remove("p-menubar-mobile-active")});const $=document.createElement("a");if($.setAttribute("href",J.url),$.setAttribute("draggable","false"),$.draggable=!1,$.classList.add("p-menuitem-link"),X.eventManager.on("onPageOpen",(N)=>{if(N.newUrl===J.url){if(J.onOpen)J.onOpen();$.style.backgroundColor="rgba(255,255,255,.04)",$.style.borderRadius="var(--c-border-radius-2)"}else $.style.backgroundColor="",$.style.borderRadius=""}),J.icon){const N=document.createElement("i");N.classList.add("c-icon","fas",J.icon),N.style.marginRight="var(--c-space-2)",$.appendChild(N)}const h=document.createElement("span");h.textContent=J.title,$.appendChild(h),W.appendChild($),j.appendChild(W),Q.appendChild(j),F.appendChild(Q)});const G=document.createElement("a");G.setAttribute("role","button"),G.setAttribute("tabindex","0"),G.classList.add("p-menubar-button"),G.setAttribute("aria-haspopup","true"),G.setAttribute("aria-expanded","false"),G.setAttribute("aria-label","Navigation"),G.setAttribute("data-pc-section","button"),G.setAttribute("aria-controls","pv_id_3"),G.innerHTML='<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon" aria-hidden="true" data-pc-section="menubuttonicon"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.3226 3.6129H0.677419C0.497757 3.6129 0.325452 3.54152 0.198411 3.41448C0.0713707 3.28744 0 3.11514 0 2.93548C0 2.75581 0.0713707 2.58351 0.198411 2.45647C0.325452 2.32943 0.497757 2.25806 0.677419 2.25806H13.3226C13.5022 2.25806 13.6745 2.32943 13.8016 2.45647C13.9286 2.58351 14 2.75581 14 2.93548C14 3.11514 13.9286 3.28744 13.8016 3.41448C13.6745 3.54152 13.5022 3.6129 13.3226 3.6129ZM13.3226 7.67741H0.677419C0.497757 7.67741 0.325452 7.60604 0.198411 7.479C0.0713707 7.35196 0 7.17965 0 6.99999C0 6.82033 0.0713707 6.64802 0.198411 6.52098C0.325452 6.39394 0.497757 6.32257 0.677419 6.32257H13.3226C13.5022 6.32257 13.6745 6.39394 13.8016 6.52098C13.9286 6.64802 14 6.82033 14 6.99999C14 7.17965 13.9286 7.35196 13.8016 7.479C13.6745 7.60604 13.5022 7.67741 13.3226 7.67741ZM0.677419 11.7419H13.3226C13.5022 11.7419 13.6745 11.6706 13.8016 11.5435C13.9286 11.4165 14 11.2442 14 11.0645C14 10.8848 13.9286 10.7125 13.8016 10.5855C13.6745 10.4585 13.5022 10.3871 13.3226 10.3871H0.677419C0.497757 10.3871 0.325452 10.4585 0.198411 10.5855C0.0713707 10.7125 0 10.8848 0 11.0645C0 11.2442 0.0713707 11.4165 0.198411 11.5435C0.325452 11.6706 0.497757 11.7419 0.677419 11.7419Z" fill="currentColor"></path></svg>',G.addEventListener("click",()=>{q.classList.toggle("p-menubar-mobile-active"),F.style.zIndex=q.classList.contains("p-menubar-mobile-active")?"1200":""}),window.addEventListener("resize",()=>{if(window.innerWidth<955)q.classList.add("p-menubar-mobile");else q.classList.remove("p-menubar-mobile"),q.classList.remove("p-menubar-mobile-active")}),window.dispatchEvent(new Event("resize"));const H=document.createElement("div");if(H.classList.add("p-menubar-end"),H.setAttribute("data-pc-section","end"),H.style.display="flex",H.style.gap=".5em",H.style.alignItems="center",_.customButtons)_.customButtons.forEach((J)=>{H.appendChild(J)});return q.appendChild(K),q.appendChild(G),q.appendChild(F),q.appendChild(H),Z.appendChild(q),Z}var V;(function(K){K["INFO"]="info";K["ERROR"]="error";K["WARN"]="warn"})(V||(V={}));window.global=window;class S{log(_,Z){const K=`${(new Date()).toString()} [EvenBetterAPI]`;switch(_){case V.INFO:console.log(`${K} [INFO] ${Z}`);break;case V.ERROR:console.error(`${K} [ERROR] ${Z}`);break;case V.WARN:console.warn(`${K} [WARN] ${Z}`);break;default:console.log(`${K} [UNKNOWN] ${Z}`)}}info(_){this.log(V.INFO,_)}error(_){this.log(V.ERROR,_)}warn(_){this.log(V.WARN,_)}}var i=new S,f=i;class E{events={};registerEvent(_,Z){this.events[_]=Z}triggerEvent(_,Z){const q=this.events[_];if(q)q.trigger(Z);else console.error(`Event "${_}" not registered.`)}on(_,Z){const q=this.events[_];if(q)q.addHandler(Z);else console.error(`Event "${_}" not registered.`)}initEvents(){f.info(`Initializing ${Object.keys(this.events).length} custom events`);for(let _ in this.events)this.events[_].init()}}class x{handlers=[];addHandler(_){this.handlers.push(_)}init(){const _=setInterval(()=>{if(r())clearInterval(_),this.trigger()},25)}trigger(){this.handlers.forEach((_)=>_())}}var r=()=>{return document.querySelector(".c-authenticated")!==null};class k{handlers=[];addHandler(_){this.handlers.push(_)}init(){new MutationObserver((Z)=>{for(let q of Z)if(q.type==="childList")q.addedNodes.forEach((K)=>{const z=K;if(K.nodeType===1&&z.classList.contains("p-contextmenu"))this.trigger(z)})}).observe(document.body,{childList:!0,subtree:!0})}trigger(_){this.handlers.forEach((Z)=>Z(_))}}class y{handlers=[];eventManager;constructor(_){this.eventManager=_}addHandler(_){this.handlers.push(_)}init(){let _=window.location.href;const Z=new MutationObserver(()=>{if(window.location.href!==_){let K=new URL(window.location.href).hash,z=new URL(_).hash;if(_=window.location.href,K.includes("?custom-path="))K=K.split("?custom-path=")[1];if(z.includes("?custom-path="))z=z.split("?custom-path=")[1];document.querySelector(".c-content")?.setAttribute("data-page",K),this.trigger({newUrl:K,oldUrl:z})}}),q={subtree:!0,childList:!0};Z.observe(document,q)}trigger(_){if(f.info(`Page updated: ${_.oldUrl} -> ${_.newUrl}`),_.newUrl.startsWith("#/settings/"))this.eventManager.triggerEvent("onSettingsTabOpen",_.newUrl.replace("#/settings/",""));this.handlers.forEach((Z)=>Z(_))}}class T{handlers=[];addHandler(_){this.handlers.push(_)}init(){}trigger(_){f.info(`Settings tab opened: ${_}`),this.handlers.forEach((Z)=>Z(_))}}var l=`
  .evenbetter-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
  }
  
  .evenbetter-modal__content {
    background-color: var(--c-bg-default);
    padding: 1rem;
    border-radius: 5px;
    width: 50%;
    max-width: 500px;
  }
  
  .evenbetter-modal__content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .evenbetter-modal__content-header-title {
    font-size: 1.1rem;
    margin: 0;
  }
  
  .evenbetter-modal__content-body {
    margin-bottom: 1rem;
  }
  
  .evenbetter-modal__content-body-text {
    font-size: 0.9rem;
    color: var(--c-fg-subtle);
    word-break: break-word;
    user-select: text !important;
    -webkit-user-select: text !important;
  
    white-space: break-spaces;
    overflow: auto;
    max-height: 40em;
  }
  
  .evenbetter-modal__content-body a {
    color: var(--c-fg-default);
  }
  
  .evenbetter-modal__content-body-close {
    background-color: var(--c-bg-subtle);
    border: 1px solid var(--c-header-cell-border);
    color: #fff;
    padding: 0.5rem;
    width: 100%;
    margin-top: 0.5rem;
    cursor: pointer;
    transition: 0.2s ease background-color;
  }
  
  .evenbetter-modal__content-body-close:hover {
    background-color: var(--c-bg-default);
  }
`;document.addEventListener("keydown",(_)=>{if(_.key==="Escape")O()});var m=({title:_,content:Z})=>{Y({id:"evenbetterapi-modal",cssText:l});const q=document.createElement("div");q.classList.add("evenbetter-modal"),q.innerHTML=`
      <div class="evenbetter-modal__content">
        <div class="evenbetter-modal__content-header">
          <h2 class="evenbetter-modal__content-header-title"></h2>
        </div>
        <div class="evenbetter-modal__content-body">
          <p class="evenbetter-modal__content-body-text"></p>
          <button class="evenbetter-modal__content-body-close">
            Close
          </button>
        </div>
      </div>
    `;const K=q.querySelector(".evenbetter-modal__content-header-title");if(!K)throw new Error("Modal title not found");K.textContent=_;const z=q.querySelector(".evenbetter-modal__content-body-text");if(!z)throw new Error("Modal body not found");return z.innerHTML=Z,q.setAttribute("data-modal-title",_),q.querySelector(".evenbetter-modal__content-body-close")?.addEventListener("click",O),q},a=()=>{return document.querySelector(".evenbetter-modal")!==null},O=()=>{document.querySelector(".evenbetter-modal")?.remove()},I=({title:_,content:Z})=>{if(a())O();const q=m({title:_,content:Z});document.body.appendChild(q)};var o=`
.v-toast--fade-in {
    animation: fadeIn 0.15s ease-in-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.v-toast--fade-out {
    animation: fadeOut 0.15s ease-in-out forwards;
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
`,n=(_,Z,q)=>{const K=document.createElement("div");K.classList.add("v-toast"),K.classList.add(`v-toast--${q}`);const z=document.createElement("div");z.setAttribute("role","alert"),z.classList.add("v-toast__item"),z.classList.add(`v-toast__item--${Z}`),z.classList.add(`v-toast__item--${q}`),K.appendChild(z);const F=document.createElement("div");F.classList.add("v-toast__icon"),z.appendChild(F);const G=document.createElement("p");return G.classList.add("v-toast__text"),G.textContent=_,z.appendChild(G),K.classList.add("v-toast--fade-in"),K},B=(_)=>{const{message:Z,type:q,position:K,duration:z}=_;Y({id:"eb-toast",cssText:o});let F=document.querySelector(`.v-toast--${K}`);if(!F)F=document.createElement("div"),F.classList.add("v-toast"),F.classList.add(`v-toast--${K}`),document.body.appendChild(F);const G=n(Z,q,K);F.appendChild(G),setTimeout(()=>{G.classList.add("v-toast--fade-out"),setTimeout(()=>{G.remove()},150)},z-150)};function w(_,Z="Search...",q=!1,K){Y({id:"eb-text-input",cssText:t});const z=document.createElement("div");z.classList.add("formkit-outer","c-text-input__outer"),z.setAttribute("style",`width: ${_};`);const F=document.createElement("div");F.classList.add("formkit-wrapper"),F.style.display="flex";const G=document.createElement("div");G.classList.add("formkit-inner","eb-text-input__inner");const H=document.createElement("div");H.classList.add("c-text-input__prefix"),H.setAttribute("style","align-self: center; color: var(--c-fg-subtle);");const J=document.createElement("i");if(J.classList.add("c-icon","fas"),K)J.classList.add(K);const Q=document.createElement("input");if(Q.setAttribute("placeholder",Z),Q.setAttribute("spellcheck","false"),Q.classList.add("formkit-input","c-text-input__input"),Q.setAttribute("type","text"),Q.setAttribute("style","width: 100%; background: transparent; border: 0; outline: 0; color: inherit; box-sizing: border-box; line-height: inherit;"),K)H.appendChild(J);if(G.appendChild(H),G.appendChild(Q),q){const j=document.createElement("button");j.innerHTML='<i class="fas fa-copy"></i>',j.setAttribute("style","background: transparent; border: 0; outline: 0; cursor: pointer; padding: 0; margin-left: 10px;"),j.addEventListener("click",()=>{navigator.clipboard.writeText(Q.value),X.toast.showToast({message:"Copied to clipboard",position:"bottom",type:"info",duration:1000})}),G.appendChild(j)}return F.appendChild(G),z.appendChild(F),z}var t=`
.eb-text-input__inner {
    gap: var(--c-space-1); 
    flex: 1; 
    display: flex; 
    align-items: center; 
    padding-left: var(--c-space-2); 
    padding-right: var(--c-space-2); 
    box-sizing: border-box; 
    border: var(--c-border-width-1) solid var(--c-border-default); 
    border-radius: var(--c-border-radius-2); 
    color: var(--c-fg-default); 
    background-color: var(--c-bg-default); 
    min-height: var(--c-space-10);
}
.eb-text-input__inner:focus-within {
    border: var(--c-border-width-2) solid var(--c-border-secondary);
}
`;class R{handlers=[];commandObserver=null;selectedCommand=null;addHandler(_){this.handlers.push(_)}init(){const _=(K)=>{this.commandObserver=new MutationObserver((z)=>{const F=Z();if(F!==this.selectedCommand)this.selectedCommand=F}),this.commandObserver.observe(K,{attributes:!0,subtree:!0})},Z=()=>{return document.querySelector("[command-item][aria-selected='true']")};new MutationObserver((K)=>{for(let z of K)if(z.type==="childList")z.addedNodes.forEach((F)=>{const G=F;if(F.nodeType===1&&G.hasAttribute("command-theme"))_(G)}),z.removedNodes.forEach((F)=>{const G=F;if(F.nodeType===1&&G.hasAttribute("command-theme")){if(!this.selectedCommand)return;const H=this.selectedCommand.getAttribute("data-value");if(H)this.trigger(H);if(this.commandObserver)this.commandObserver.disconnect(),this.commandObserver=null}})}).observe(document.body,{childList:!0,subtree:!0})}trigger(_){this.handlers.forEach((Z)=>Z(_))}}var M=[],C=(_)=>{_.on("onCommandRun",(Z)=>{const q=M.find((K)=>K.commandName===Z);if(!q)return;e(q)})},e=(_)=>{const Z=document.createElement("div");Z.classList.add("custom");const q=document.createElement("div");q.setAttribute("command-root",""),Z.appendChild(q);const K=document.createElement("div");K.setAttribute("command-dialog",""),q.appendChild(K);const z=document.createElement("div");z.setAttribute("command-dialog-mask",""),z.style.display="flex",z.style.justifyContent="center",z.style.alignItems="center",z.addEventListener("click",()=>{Z.remove()}),K.appendChild(z);const F=document.createElement("div");F.setAttribute("command-dialog-wrapper",""),F.style.minWidth="600px",F.style.padding="1em",F.style.margin="0",z.appendChild(F);const G=document.createElement("div");G.setAttribute("command-dialog-body",""),G.style.display="flex",G.style.gap="0.5em",F.addEventListener("click",(Q)=>{Q.stopPropagation()}),F.appendChild(G);const H=X.components.createTextInput("100%",_.promptPlaceholder);H.style.zIndex="100",H.addEventListener("click",(Q)=>{Q.stopPropagation()}),G.appendChild(H);const J=U.ui.button({label:"Submit",variant:"primary"});J.addEventListener("click",()=>{const Q=H.querySelector("input");_.onPrompt(Q.value),Z.remove()}),G.appendChild(J),document.body.appendChild(Z),H.querySelector("input")?.focus(),H.addEventListener("keydown",(Q)=>{if(Q.key==="Enter")J.click();if(Q.key==="Escape")Z.remove()})},_1=(_,Z,q)=>{M.push({commandName:_,promptPlaceholder:Z,onPrompt:q})},g={createPromptCommand:_1};var v=async()=>{if(localStorage.getItem("previousPath"))setTimeout(()=>{window.location.hash=localStorage.getItem("previousPath")||"",localStorage.removeItem("previousPath")},200);const _=new WebSocket("ws://localhost:8081");_.addEventListener("open",()=>{X.toast.showToast({message:"Connected to Caido Hot Reloading Server",duration:2000,type:"success",position:"bottom"})}),_.addEventListener("close",()=>{X.toast.showToast({message:"Disconnected from Caido Hot Reloading Server",duration:2000,type:"error",position:"bottom"})}),_.addEventListener("message",(K)=>{try{const z=JSON.parse(K.data),F=z.event,G=z.data;switch(F){case"caido:loadJS":Z(G,"");break;case"caido:loadCSS":Z("",G);break;case"caido:reload":localStorage.setItem("previousPath",window.location.hash),location.reload();break;default:console.error("Unknown event type received:",F)}}catch(z){console.error("Error parsing WebSocket message:",z)}});const Z=async(K,z)=>{const F=await q();if(!F)return;const G={input:{data:F.data,migrations:F.migrations}};if(K)G.input.data.js=K;if(z)G.input.data.css=z;return U.graphql.updateViewerSettings(G)},q=async()=>{return await U.graphql.userSettings().then((K)=>{return K.viewer.settings})}};var K1=`
  :root {
    --c-table-background: #2b2e35;
    --c-table-even-item-row: #353942;
    --c-table-item-row-hover: var(--c-bg-default);
  }
  .c-evenbetter_table_card-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .c-evenbetter_table-container {
    overscroll-behavior-y: none;
    overflow: auto;
    height: 100%;
    border-radius: 5px !important;
  }
  .c-evenbetter_table_header-row {
    min-width: fit-content;
    width: 100%;
    white-space: nowrap;
    border-bottom: 2px solid var(--c-bg-default);
    background-color: var(--c-table-background);
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .c-evenbetter_table_header-cell {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: var(--c-space-2) var(--c-space-4);
    color: var(--c-fg-subtle);
    user-select: none;
    min-width: var(--1e00f3f4);
    box-sizing: border-box;
    border-right: .1em solid var(--c-bg-default);
  }
  [data-sortable="true"][data-is-resizing="false"]
    .c-evenbetter_table_header-cell {
    cursor: pointer;
  }
  [data-align="start"] .c-evenbetter_header-cell_wrapper {
    flex-direction: row;
  }
  .c-evenbetter_header-cell_wrapper {
    display: inline-flex;
    gap: var(--c-space-2);
    width: 100%;
  }
  .c-evenbetter_header-cell_content {
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
  }
  .c-evenbetter_table-item-cell {
    min-width: var(--cellWidth);
    display: inline-flex;
    align-items: center;
    padding: 0 1rem;
    width: var(--cellWidth);
    height: 100%;
    box-sizing: border-box;
  }
  .c-evenbetter_table-item-cell__inner {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .c-evenbetter_table-item-row {
    display: flex;
    min-width: fit-content;
    height: 42px;
    box-sizing: border-box;
    white-space: nowrap;
    border-bottom: 0.1em solid var(--c-bg-default);
    width: 100%;
  }
  .c-evenbetter_table-item-row:hover {
    background-color: var(--c-table-item-row-hover);
  }
  .c-evenbetter_table_row[data-is-even="true"] {
    background-color: var(--c-table-even-item-row);
  }
  .c-evenbetter_table_row:hover {
    cursor: pointer;
    background-color: var(--c-table-item-row-hover);
  }
  .c-evenbetter_table_header-cell:last-child {
    border-right: none;
  }
  .c-evenbetter_table {
    outline: none;
    width: 100%;
    height: 100%;
    display: flex;
}`,Z1=()=>{return'<div class="c-evenbetter_table_card-body"><div class="c-evenbetter_table-container" data-is-empty="false" data-is-loading="false" style="overflow-y: auto;"><div class="c-evenbetter_table_header-row"></div><div class="c-table__wrapper" style="margin-top: 0px;"></div></div></div>'},c=(_)=>{return new L(_)};class L{_;tableElement;tableWrapper;constructor(_){this.config=_;Y({id:"eb-table-css",cssText:K1}),this.tableElement=document.createElement("div"),this.tableElement.className="c-evenbetter_table",this.tableElement.style.overflow="auto",this.tableElement.style.width="100%",this.tableElement.style.height=this.config.tableHeight,this.tableElement.setAttribute("data-row-height",this.config.rowHeight||"42px"),this.tableElement.innerHTML=Z1(),this.tableWrapper=this.tableElement.querySelector(".c-table__wrapper");const Z=this.tableElement.querySelector(".c-evenbetter_table_card-body");if(!Z)throw new Error("Card body not found");Z.style.height=this.config.tableHeight,Z.style.width="100%";const q=this.tableElement.querySelector(".c-evenbetter_table_header-row");if(!q)throw new Error("Column row not found");this.config.columns.forEach((K)=>{q.innerHTML+=`<div class="c-evenbetter_table_header-cell" data-sortable="true" data-resizable="true" data-align="start" data-is-resizing="false" style="--1e00f3f4: 4rem; width: max(${K.width}, 56px);"><div class="c-evenbetter_header-cell_wrapper"><div class="c-evenbetter_header-cell_content">${K.name}</div></div></div>`})}filterRows(_){const Z=this.tableWrapper.querySelectorAll(".c-evenbetter_table_row");let q=1;Z.forEach((K,z)=>{const F=K,G=K.querySelectorAll(".c-evenbetter_table-item-cell");let H=!1;if(G.forEach((J)=>{if(J.textContent?.toLowerCase().includes(_.toLowerCase()))H=!0}),H)F.style.display="flex",F.setAttribute("data-is-even",(q%2===0).toString()),q++;else F.style.display="none",F.removeAttribute("data-is-even")})}clearRows(){this.tableWrapper.innerHTML=""}addRow(_,Z){const q=(this.tableWrapper.children.length+1)%2===0,K=document.createElement("div");K.className="c-evenbetter_table_row",K.setAttribute("data-is-even",q.toString());const z=document.createElement("div");if(z.className="c-evenbetter_table-item-row",this.config.rowHeight)z.style.height=this.config.rowHeight;if(_.forEach((F)=>{const G=this.config.columns.find((Q)=>Q.name===F.columnName)?.width,H=document.createElement("div");H.className="c-evenbetter_table-item-cell",H.setAttribute("data-column-id",F.columnName),H.setAttribute("data-align","start"),H.style.setProperty("--cellWidth",`max(${G}, 56px)`);const J=document.createElement("div");if(J.className="c-evenbetter_table-item-cell__inner",typeof F.value==="string")J.textContent=F.value;else J.appendChild(F.value);H.appendChild(J),z.appendChild(H)}),Z)z.addEventListener("click",Z);K.appendChild(z),this.tableWrapper.appendChild(K)}getHTMLElement(){return this.tableElement}static createTable(_){return new L(_)}}var q1=function(){const _=new E,Z=new x,q=new T,K=new y(_),z=new k,F=new R;return _.registerEvent("onCaidoLoad",Z),_.registerEvent("onSettingsTabOpen",q),_.registerEvent("onPageOpen",K),_.registerEvent("onContextMenuOpen",z),_.registerEvent("onCommandRun",F),_.initEvents(),C(_),{modal:{openModal:I,closeModal:O},toast:{showToast:B},components:{createTable:c,createNavigationBar:b,createCheckbox:P,createTextInput:w},eventManager:_,loadCSS:Y,promptCommands:g,hotReloading:v}},A;if(typeof window!=="undefined"&&window.EvenBetterAPI)A=window.EvenBetterAPI;else if(A=q1(),typeof window!=="undefined")window.EvenBetterAPI=A;var X=A;var d=function(){Y({id:"custom-css",cssText:z1});const _=G1(),Z=document.createElement("div");Z.style.gap="0.5em",Z.style.height="100%",Z.style.display="flex",Z.style.flexDirection="column";const q=X.components.createNavigationBar({title:"Example",items:[{title:"Example",url:"#/example",icon:"fa-home"},{title:"Hello",url:"#/hello",icon:"fa-cog"}],customButtons:[U.ui.button({label:"Click me",variant:"primary"})]});Z.appendChild(q);const K=document.createElement("div");K.style.display="flex",K.style.flexDirection="column",K.style.backgroundColor="var(--c-bg-subtle)",K.style.height="100%";const z=document.createElement("div");z.style.display="flex",z.style.alignItems="center",z.style.gap="0.5em",z.style.padding="1em";const F=U.ui.button({label:"Click me",variant:"primary",size:"medium"});F.addEventListener("click",()=>{X.toast.showToast({message:"Button clicked!",type:"success",duration:2000,position:"bottom"})}),z.appendChild(F);const G=X.components.createTextInput("15em","Search...");return G.addEventListener("input",(H)=>{const J=H.target.value;_.filterRows(J)}),z.appendChild(G),K.appendChild(z),K.appendChild(_.getHTMLElement()),Z.appendChild(K),Z},z1=`
.c-content[data-page="#/hello"],
.c-content[data-page="#/example"] {
  overflow: auto;
}
`,u=["Caido","EvenBetterAPI","Caido > Burp","Hello, Caido!","Hello, World!","Comic Sans is the best font","This is a random sentence"],F1=()=>{const _=new Map;return _.set("Name",u[Math.floor(Math.random()*u.length)]),_.set("Value","Value "+Math.floor(Math.random()*100)),_.set("Version","v"+Math.floor(Math.random()*10)+".0"),_.set("Date",(new Date()).toLocaleDateString()),_},G1=()=>{const _=Array.from({length:20},()=>F1()),Z=X.components.createTable({tableHeight:"40em",columns:[{name:"Name",width:"15em"},{name:"Value",width:"15em"},{name:"Version",width:"10em"},{name:"Date",width:"10em"}]});return _.forEach((q)=>{const K=q.get("Name")||"",z=q.get("Value")||"",F=q.get("Version")||"",G=q.get("Date")||"";Z.addRow([{columnName:"Name",value:K},{columnName:"Value",value:z},{columnName:"Version",value:F},{columnName:"Date",value:G}])}),Z};U.navigation.addPage("/example",{body:d()});U.navigation.addPage("/hello",{body:d()});U.sidebar.registerItem("Example","/example");X.eventManager.on("onCaidoLoad",()=>{X.modal.openModal({title:"Hello, World!",content:"This is a modal"})});

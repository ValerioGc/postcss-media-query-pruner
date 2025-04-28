"use strict";Object.defineProperties(exports,{__esModule:{value:!0},
[Symbol.toStringTag]:{value:"Module"}});const e=require("path"),t=require("fs")
;function r(e){
return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e
}function s(e){if(Object.prototype.hasOwnProperty.call(e,"__esModule"))return e
;var t=e.default;if("function"==typeof t){var r=function e(){
return this instanceof e?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)
};r.prototype=t.prototype}else r={}
;return Object.defineProperty(r,"__esModule",{value:!0
}),Object.keys(e).forEach((function(t){
var s=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,s.get?s:{
enumerable:!0,get:function(){return e[t]}})})),r}var i,n={exports:{}}
;function o(){if(i)return n.exports;i=1;var e=String,t=function(){return{
isColorSupported:!1,reset:e,bold:e,dim:e,italic:e,underline:e,inverse:e,
hidden:e,strikethrough:e,black:e,red:e,green:e,yellow:e,blue:e,magenta:e,cyan:e,
white:e,gray:e,bgBlack:e,bgRed:e,bgGreen:e,bgYellow:e,bgBlue:e,bgMagenta:e,
bgCyan:e,bgWhite:e,blackBright:e,redBright:e,greenBright:e,yellowBright:e,
blueBright:e,magentaBright:e,cyanBright:e,whiteBright:e,bgBlackBright:e,
bgRedBright:e,bgGreenBright:e,bgYellowBright:e,bgBlueBright:e,bgMagentaBright:e,
bgCyanBright:e,bgWhiteBright:e}}
;return n.exports=t(),n.exports.createColors=t,n.exports}
const l=s(Object.freeze(Object.defineProperty({__proto__:null,default:{}
},Symbol.toStringTag,{value:"Module"})));var a,h,u,c,p,f;function d(){
if(h)return a;h=1;let e=o(),t=l;class r extends Error{constructor(e,t,s,i,n,o){
super(e),
this.name="CssSyntaxError",this.reason=e,n&&(this.file=n),i&&(this.source=i),
o&&(this.plugin=o),
void 0!==t&&void 0!==s&&("number"==typeof t?(this.line=t,this.column=s):(this.line=t.line,
this.column=t.column,
this.endLine=s.line,this.endColumn=s.column)),this.setMessage(),
Error.captureStackTrace&&Error.captureStackTrace(this,r)}setMessage(){
this.message=this.plugin?this.plugin+": ":"",
this.message+=this.file?this.file:"<css input>",
void 0!==this.line&&(this.message+=":"+this.line+":"+this.column),
this.message+=": "+this.reason}showSourceCode(r){if(!this.source)return""
;let s=this.source;null==r&&(r=e.isColorSupported);let i=e=>e,n=e=>e,o=e=>e
;if(r){let{bold:r,gray:s,red:l}=e.createColors(!0)
;n=e=>r(l(e)),i=e=>s(e),t&&(o=e=>t(e))}
let l=s.split(/\r?\n/),a=Math.max(this.line-3,0),h=Math.min(this.line+2,l.length),u=String(h).length
;return l.slice(a,h).map(((e,t)=>{let r=a+1+t,s=" "+(" "+r).slice(-u)+" | "
;if(r===this.line){if(e.length>160){
let t=20,r=Math.max(0,this.column-t),l=Math.max(this.column+t,this.endColumn+t),a=e.slice(r,l),h=i(s.replace(/\d/g," "))+e.slice(0,Math.min(this.column-1,t-1)).replace(/[^\t]/g," ")
;return n(">")+i(s)+o(a)+"\n "+h+n("^")}
let t=i(s.replace(/\d/g," "))+e.slice(0,this.column-1).replace(/[^\t]/g," ")
;return n(">")+i(s)+o(e)+"\n "+t+n("^")}return" "+i(s)+o(e)})).join("\n")}
toString(){let e=this.showSourceCode()
;return e&&(e="\n\n"+e+"\n"),this.name+": "+this.message+e}}
return a=r,r.default=r,a}function m(){if(c)return u;c=1;const e={after:"\n",
beforeClose:"\n",beforeComment:"\n",beforeDecl:"\n",beforeOpen:" ",
beforeRule:"\n",colon:": ",commentLeft:" ",commentRight:" ",emptyBody:"",
indent:"    ",semicolon:!1};class t{constructor(e){this.builder=e}atrule(e,t){
let r="@"+e.name,s=e.params?this.rawValue(e,"params"):""
;if(void 0!==e.raws.afterName?r+=e.raws.afterName:s&&(r+=" "),
e.nodes)this.block(e,r+s);else{let i=(e.raws.between||"")+(t?";":"")
;this.builder(r+s+i,e)}}beforeAfter(e,t){let r
;r="decl"===e.type?this.raw(e,null,"beforeDecl"):"comment"===e.type?this.raw(e,null,"beforeComment"):"before"===t?this.raw(e,null,"beforeRule"):this.raw(e,null,"beforeClose")
;let s=e.parent,i=0;for(;s&&"root"!==s.type;)i+=1,s=s.parent
;if(r.includes("\n")){let t=this.raw(e,null,"indent")
;if(t.length)for(let e=0;e<i;e++)r+=t}return r}block(e,t){
let r,s=this.raw(e,"between","beforeOpen")
;this.builder(t+s+"{",e,"start"),e.nodes&&e.nodes.length?(this.body(e),
r=this.raw(e,"after")):r=this.raw(e,"after","emptyBody"),
r&&this.builder(r),this.builder("}",e,"end")}body(e){let t=e.nodes.length-1
;for(;t>0&&"comment"===e.nodes[t].type;)t-=1;let r=this.raw(e,"semicolon")
;for(let s=0;s<e.nodes.length;s++){let i=e.nodes[s],n=this.raw(i,"before")
;n&&this.builder(n),this.stringify(i,t!==s||r)}}comment(e){
let t=this.raw(e,"left","commentLeft"),r=this.raw(e,"right","commentRight")
;this.builder("/*"+t+e.text+r+"*/",e)}decl(e,t){
let r=this.raw(e,"between","colon"),s=e.prop+r+this.rawValue(e,"value")
;e.important&&(s+=e.raws.important||" !important"),t&&(s+=";"),this.builder(s,e)
}document(e){this.body(e)}raw(t,r,s){let i
;if(s||(s=r),r&&(i=t.raws[r],void 0!==i))return i;let n=t.parent
;if("before"===s){if(!n||"root"===n.type&&n.first===t)return""
;if(n&&"document"===n.type)return""}if(!n)return e[s];let o=t.root()
;if(o.rawCache||(o.rawCache={}),void 0!==o.rawCache[s])return o.rawCache[s]
;if("before"===s||"after"===s)return this.beforeAfter(t,s);{
let e="raw"+((l=s)[0].toUpperCase()+l.slice(1))
;this[e]?i=this[e](o,t):o.walk((e=>{if(i=e.raws[r],void 0!==i)return!1}))}var l
;return void 0===i&&(i=e[s]),o.rawCache[s]=i,i}rawBeforeClose(e){let t
;return e.walk((e=>{
if(e.nodes&&e.nodes.length>0&&void 0!==e.raws.after)return t=e.raws.after,
t.includes("\n")&&(t=t.replace(/[^\n]+$/,"")),!1})),t&&(t=t.replace(/\S/g,"")),t
}rawBeforeComment(e,t){let r;return e.walkComments((e=>{
if(void 0!==e.raws.before)return r=e.raws.before,
r.includes("\n")&&(r=r.replace(/[^\n]+$/,"")),!1
})),void 0===r?r=this.raw(t,null,"beforeDecl"):r&&(r=r.replace(/\S/g,"")),r}
rawBeforeDecl(e,t){let r;return e.walkDecls((e=>{
if(void 0!==e.raws.before)return r=e.raws.before,
r.includes("\n")&&(r=r.replace(/[^\n]+$/,"")),!1
})),void 0===r?r=this.raw(t,null,"beforeRule"):r&&(r=r.replace(/\S/g,"")),r}
rawBeforeOpen(e){let t;return e.walk((e=>{if("decl"!==e.type&&(t=e.raws.between,
void 0!==t))return!1})),t}rawBeforeRule(e){let t;return e.walk((r=>{
if(r.nodes&&(r.parent!==e||e.first!==r)&&void 0!==r.raws.before)return t=r.raws.before,
t.includes("\n")&&(t=t.replace(/[^\n]+$/,"")),!1})),t&&(t=t.replace(/\S/g,"")),t
}rawColon(e){let t;return e.walkDecls((e=>{
if(void 0!==e.raws.between)return t=e.raws.between.replace(/[^\s:]/g,""),!1})),t
}rawEmptyBody(e){let t;return e.walk((e=>{
if(e.nodes&&0===e.nodes.length&&(t=e.raws.after,void 0!==t))return!1})),t}
rawIndent(e){if(e.raws.indent)return e.raws.indent;let t;return e.walk((r=>{
let s=r.parent;if(s&&s!==e&&s.parent&&s.parent===e&&void 0!==r.raws.before){
let e=r.raws.before.split("\n");return t=e[e.length-1],t=t.replace(/\S/g,""),!1}
})),t}rawSemicolon(e){let t;return e.walk((e=>{
if(e.nodes&&e.nodes.length&&"decl"===e.last.type&&(t=e.raws.semicolon,
void 0!==t))return!1})),t}rawValue(e,t){let r=e[t],s=e.raws[t]
;return s&&s.value===r?s.raw:r}root(e){
this.body(e),e.raws.after&&this.builder(e.raws.after)}rule(e){
this.block(e,this.rawValue(e,"selector")),
e.raws.ownSemicolon&&this.builder(e.raws.ownSemicolon,e,"end")}stringify(e,t){
if(!this[e.type])throw new Error("Unknown AST node type "+e.type+". Maybe you need to change PostCSS stringifier.")
;this[e.type](e,t)}}return u=t,t.default=t,u}function g(){if(f)return p;f=1
;let e=m();function t(t,r){new e(r).stringify(t)}return p=t,t.default=t,p}
var w,y,b,x,v,S,C,O,k,P,A,E,R,M,B,I,U,j,F,_,L,z,D,N,T,W,$,V,J,G,Y,q,Q,Z,H,K,X,ee,te,re,se,ie,ne,oe,le,ae,he,ue,ce,pe={}
;function fe(){
return w||(w=1,pe.isClean=Symbol("isClean"),pe.my=Symbol("my")),pe}
function de(){if(b)return y;b=1;let e=d(),t=m(),r=g(),{isClean:s,my:i}=fe()
;function n(e,t){let r=new e.constructor;for(let s in e){
if(!Object.prototype.hasOwnProperty.call(e,s))continue
;if("proxyCache"===s)continue;let i=e[s],o=typeof i
;"parent"===s&&"object"===o?t&&(r[s]=t):"source"===s?r[s]=i:Array.isArray(i)?r[s]=i.map((e=>n(e,r))):("object"===o&&null!==i&&(i=n(i)),
r[s]=i)}return r}function o(e,t){if(t&&void 0!==t.offset)return t.offset
;let r=1,s=1,i=0;for(let n=0;n<e.length;n++){if(s===t.line&&r===t.column){i=n
;break}"\n"===e[n]?(r=1,s+=1):r+=1}return i}class l{get proxyOf(){return this}
constructor(e={}){this.raws={},this[s]=!1,this[i]=!0
;for(let t in e)if("nodes"===t){this.nodes=[]
;for(let r of e[t])"function"==typeof r.clone?this.append(r.clone()):this.append(r)
}else this[t]=e[t]}addToError(e){
if(e.postcssNode=this,e.stack&&this.source&&/\n\s{4}at /.test(e.stack)){
let t=this.source
;e.stack=e.stack.replace(/\n\s{4}at /,`$&${t.input.from}:${t.start.line}:${t.start.column}$&`)
}return e}after(e){return this.parent.insertAfter(this,e),this}assign(e={}){
for(let t in e)this[t]=e[t];return this}before(e){
return this.parent.insertBefore(this,e),this}cleanRaws(e){
delete this.raws.before,delete this.raws.after,e||delete this.raws.between}
clone(e={}){let t=n(this);for(let r in e)t[r]=e[r];return t}cloneAfter(e={}){
let t=this.clone(e);return this.parent.insertAfter(this,t),t}cloneBefore(e={}){
let t=this.clone(e);return this.parent.insertBefore(this,t),t}error(t,r={}){
if(this.source){let{end:e,start:s}=this.rangeBy(r)
;return this.source.input.error(t,{column:s.column,line:s.line},{
column:e.column,line:e.line},r)}return new e(t)}getProxyProcessor(){return{
get:(e,t)=>"proxyOf"===t?e:"root"===t?()=>e.root().toProxy():e[t],
set:(e,t,r)=>(e[t]===r||(e[t]=r,
"prop"!==t&&"value"!==t&&"name"!==t&&"params"!==t&&"important"!==t&&"text"!==t||e.markDirty()),
!0)}}markClean(){this[s]=!0}markDirty(){if(this[s]){this[s]=!1;let e=this
;for(;e=e.parent;)e[s]=!1}}next(){if(!this.parent)return
;let e=this.parent.index(this);return this.parent.nodes[e+1]}positionBy(e){
let t=this.source.start
;if(e.index)t=this.positionInside(e.index);else if(e.word){
let r="document"in this.source.input?this.source.input.document:this.source.input.css,s=r.slice(o(r,this.source.start),o(r,this.source.end)).indexOf(e.word)
;-1!==s&&(t=this.positionInside(s))}return t}positionInside(e){
let t=this.source.start.column,r=this.source.start.line,s="document"in this.source.input?this.source.input.document:this.source.input.css,i=o(s,this.source.start),n=i+e
;for(let o=i;o<n;o++)"\n"===s[o]?(t=1,r+=1):t+=1;return{column:t,line:r}}prev(){
if(!this.parent)return;let e=this.parent.index(this)
;return this.parent.nodes[e-1]}rangeBy(e){let t={
column:this.source.start.column,line:this.source.start.line},r=this.source.end?{
column:this.source.end.column+1,line:this.source.end.line}:{column:t.column+1,
line:t.line};if(e.word){
let s="document"in this.source.input?this.source.input.document:this.source.input.css,i=s.slice(o(s,this.source.start),o(s,this.source.end)).indexOf(e.word)
;-1!==i&&(t=this.positionInside(i),r=this.positionInside(i+e.word.length))
}else e.start?t={column:e.start.column,line:e.start.line
}:e.index&&(t=this.positionInside(e.index)),e.end?r={column:e.end.column,
line:e.end.line
}:"number"==typeof e.endIndex?r=this.positionInside(e.endIndex):e.index&&(r=this.positionInside(e.index+1))
;return(r.line<t.line||r.line===t.line&&r.column<=t.column)&&(r={
column:t.column+1,line:t.line}),{end:r,start:t}}raw(e,r){
return(new t).raw(this,e,r)}remove(){
return this.parent&&this.parent.removeChild(this),this.parent=void 0,this}
replaceWith(...e){if(this.parent){let t=this,r=!1
;for(let s of e)s===this?r=!0:r?(this.parent.insertAfter(t,s),
t=s):this.parent.insertBefore(t,s);r||this.remove()}return this}root(){
let e=this;for(;e.parent&&"document"!==e.parent.type;)e=e.parent;return e}
toJSON(e,t){let r={},s=null==t;t=t||new Map;let i=0;for(let n in this){
if(!Object.prototype.hasOwnProperty.call(this,n))continue
;if("parent"===n||"proxyCache"===n)continue;let e=this[n]
;if(Array.isArray(e))r[n]=e.map((e=>"object"==typeof e&&e.toJSON?e.toJSON(null,t):e));else if("object"==typeof e&&e.toJSON)r[n]=e.toJSON(null,t);else if("source"===n){
let s=t.get(e.input);null==s&&(s=i,t.set(e.input,i),i++),r[n]={end:e.end,
inputId:s,start:e.start}}else r[n]=e}
return s&&(r.inputs=[...t.keys()].map((e=>e.toJSON()))),r}toProxy(){
return this.proxyCache||(this.proxyCache=new Proxy(this,this.getProxyProcessor())),
this.proxyCache}toString(e=r){e.stringify&&(e=e.stringify);let t=""
;return e(this,(e=>{t+=e})),t}warn(e,t,r){let s={node:this}
;for(let i in r)s[i]=r[i];return e.warn(t,s)}}return y=l,l.default=l,y}
function me(){if(v)return x;v=1;let e=de();class t extends e{constructor(e){
super(e),this.type="comment"}}return x=t,t.default=t,x}function ge(){
if(C)return S;C=1;let e=de();class t extends e{get variable(){
return this.prop.startsWith("--")||"$"===this.prop[0]}constructor(e){
e&&void 0!==e.value&&"string"!=typeof e.value&&(e={...e,value:String(e.value)}),
super(e),this.type="decl"}}return S=t,t.default=t,S}function we(){if(k)return O
;k=1;let e,t,r,s,i=me(),n=ge(),o=de(),{isClean:l,my:a}=fe();function h(e){
return e.map((e=>(e.nodes&&(e.nodes=h(e.nodes)),delete e.source,e)))}
function u(e){if(e[l]=!1,e.proxyOf.nodes)for(let t of e.proxyOf.nodes)u(t)}
class c extends o{get first(){if(this.proxyOf.nodes)return this.proxyOf.nodes[0]
}get last(){
if(this.proxyOf.nodes)return this.proxyOf.nodes[this.proxyOf.nodes.length-1]}
append(...e){for(let t of e){let e=this.normalize(t,this.last)
;for(let t of e)this.proxyOf.nodes.push(t)}return this.markDirty(),this}
cleanRaws(e){
if(super.cleanRaws(e),this.nodes)for(let t of this.nodes)t.cleanRaws(e)}each(e){
if(!this.proxyOf.nodes)return;let t,r,s=this.getIterator()
;for(;this.indexes[s]<this.proxyOf.nodes.length&&(t=this.indexes[s],
r=e(this.proxyOf.nodes[t],t),!1!==r);)this.indexes[s]+=1
;return delete this.indexes[s],r}every(e){return this.nodes.every(e)}
getIterator(){
this.lastEach||(this.lastEach=0),this.indexes||(this.indexes={}),this.lastEach+=1
;let e=this.lastEach;return this.indexes[e]=0,e}getProxyProcessor(){return{
get:(e,t)=>"proxyOf"===t?e:e[t]?"each"===t||"string"==typeof t&&t.startsWith("walk")?(...r)=>e[t](...r.map((e=>"function"==typeof e?(t,r)=>e(t.toProxy(),r):e))):"every"===t||"some"===t?r=>e[t](((e,...t)=>r(e.toProxy(),...t))):"root"===t?()=>e.root().toProxy():"nodes"===t?e.nodes.map((e=>e.toProxy())):"first"===t||"last"===t?e[t].toProxy():e[t]:e[t],
set:(e,t,r)=>(e[t]===r||(e[t]=r,
"name"!==t&&"params"!==t&&"selector"!==t||e.markDirty()),!0)}}index(e){
return"number"==typeof e?e:(e.proxyOf&&(e=e.proxyOf),
this.proxyOf.nodes.indexOf(e))}insertAfter(e,t){
let r,s=this.index(e),i=this.normalize(t,this.proxyOf.nodes[s]).reverse()
;s=this.index(e);for(let n of i)this.proxyOf.nodes.splice(s+1,0,n)
;for(let n in this.indexes)r=this.indexes[n],s<r&&(this.indexes[n]=r+i.length)
;return this.markDirty(),this}insertBefore(e,t){
let r,s=this.index(e),i=0===s&&"prepend",n=this.normalize(t,this.proxyOf.nodes[s],i).reverse()
;s=this.index(e);for(let o of n)this.proxyOf.nodes.splice(s,0,o)
;for(let o in this.indexes)r=this.indexes[o],s<=r&&(this.indexes[o]=r+n.length)
;return this.markDirty(),this}normalize(r,o){
if("string"==typeof r)r=h(t(r).nodes);else if(void 0===r)r=[];else if(Array.isArray(r)){
r=r.slice(0);for(let e of r)e.parent&&e.parent.removeChild(e,"ignore")
}else if("root"===r.type&&"document"!==this.type){r=r.nodes.slice(0)
;for(let e of r)e.parent&&e.parent.removeChild(e,"ignore")
}else if(r.type)r=[r];else if(r.prop){
if(void 0===r.value)throw new Error("Value field is missed in node creation")
;"string"!=typeof r.value&&(r.value=String(r.value)),r=[new n(r)]
}else if(r.selector||r.selectors)r=[new s(r)];else if(r.name)r=[new e(r)];else{
if(!r.text)throw new Error("Unknown node type in node creation");r=[new i(r)]}
return r.map((e=>(e[a]||c.rebuild(e),
(e=e.proxyOf).parent&&e.parent.removeChild(e),
e[l]&&u(e),e.raws||(e.raws={}),void 0===e.raws.before&&o&&void 0!==o.raws.before&&(e.raws.before=o.raws.before.replace(/\S/g,"")),
e.parent=this.proxyOf,e)))}prepend(...e){e=e.reverse();for(let t of e){
let e=this.normalize(t,this.first,"prepend").reverse()
;for(let t of e)this.proxyOf.nodes.unshift(t)
;for(let t in this.indexes)this.indexes[t]=this.indexes[t]+e.length}
return this.markDirty(),this}push(e){
return e.parent=this,this.proxyOf.nodes.push(e),this}removeAll(){
for(let e of this.proxyOf.nodes)e.parent=void 0
;return this.proxyOf.nodes=[],this.markDirty(),this}removeChild(e){let t
;e=this.index(e),
this.proxyOf.nodes[e].parent=void 0,this.proxyOf.nodes.splice(e,1)
;for(let r in this.indexes)t=this.indexes[r],t>=e&&(this.indexes[r]=t-1)
;return this.markDirty(),this}replaceValues(e,t,r){
return r||(r=t,t={}),this.walkDecls((s=>{
t.props&&!t.props.includes(s.prop)||t.fast&&!s.value.includes(t.fast)||(s.value=s.value.replace(e,r))
})),this.markDirty(),this}some(e){return this.nodes.some(e)}walk(e){
return this.each(((t,r)=>{let s;try{s=e(t,r)}catch(i){throw t.addToError(i)}
return!1!==s&&t.walk&&(s=t.walk(e)),s}))}walkAtRules(e,t){
return t?e instanceof RegExp?this.walk(((r,s)=>{
if("atrule"===r.type&&e.test(r.name))return t(r,s)})):this.walk(((r,s)=>{
if("atrule"===r.type&&r.name===e)return t(r,s)})):(t=e,this.walk(((e,r)=>{
if("atrule"===e.type)return t(e,r)})))}walkComments(e){
return this.walk(((t,r)=>{if("comment"===t.type)return e(t,r)}))}walkDecls(e,t){
return t?e instanceof RegExp?this.walk(((r,s)=>{
if("decl"===r.type&&e.test(r.prop))return t(r,s)})):this.walk(((r,s)=>{
if("decl"===r.type&&r.prop===e)return t(r,s)})):(t=e,this.walk(((e,r)=>{
if("decl"===e.type)return t(e,r)})))}walkRules(e,t){
return t?e instanceof RegExp?this.walk(((r,s)=>{
if("rule"===r.type&&e.test(r.selector))return t(r,s)})):this.walk(((r,s)=>{
if("rule"===r.type&&r.selector===e)return t(r,s)})):(t=e,this.walk(((e,r)=>{
if("rule"===e.type)return t(e,r)})))}}return c.registerParse=e=>{t=e
},c.registerRule=e=>{s=e},c.registerAtRule=t=>{e=t},c.registerRoot=e=>{r=e},O=c,
c.default=c,c.rebuild=t=>{
"atrule"===t.type?Object.setPrototypeOf(t,e.prototype):"rule"===t.type?Object.setPrototypeOf(t,s.prototype):"decl"===t.type?Object.setPrototypeOf(t,n.prototype):"comment"===t.type?Object.setPrototypeOf(t,i.prototype):"root"===t.type&&Object.setPrototypeOf(t,r.prototype),
t[a]=!0,t.nodes&&t.nodes.forEach((e=>{c.rebuild(e)}))},O}function ye(){
if(A)return P;A=1;let e=we();class t extends e{constructor(e){
super(e),this.type="atrule"}append(...e){
return this.proxyOf.nodes||(this.nodes=[]),super.append(...e)}prepend(...e){
return this.proxyOf.nodes||(this.nodes=[]),super.prepend(...e)}}
return P=t,t.default=t,e.registerAtRule(t),P}function be(){if(R)return E;R=1
;let e,t,r=we();class s extends r{constructor(e){super({type:"document",...e
}),this.nodes||(this.nodes=[])}toResult(r={}){
return new e(new t,this,r).stringify()}}return s.registerLazyResult=t=>{e=t
},s.registerProcessor=e=>{t=e},E=s,s.default=s,E}function xe(){
return B?M:(B=1,M={nanoid:(e=21)=>{let t="",r=0|e
;for(;r--;)t+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[64*Math.random()|0]
;return t},customAlphabet:(e,t=21)=>(r=t)=>{let s="",i=0|r
;for(;i--;)s+=e[Math.random()*e.length|0];return s}})}function ve(){
if(U)return I;U=1
;let{existsSync:r,readFileSync:s}=t,{dirname:i,join:n}=e,{SourceMapConsumer:o,SourceMapGenerator:a}=l
;class h{constructor(e,t){if(!1===t.map)return
;this.loadAnnotation(e),this.inline=this.startWith(this.annotation,"data:")
;let r=t.map?t.map.prev:void 0,s=this.loadMap(t.from,r)
;!this.mapFile&&t.from&&(this.mapFile=t.from),
this.mapFile&&(this.root=i(this.mapFile)),s&&(this.text=s)}consumer(){
return this.consumerCache||(this.consumerCache=new o(this.text)),
this.consumerCache}decodeInline(e){
let t=e.match(/^data:application\/json;charset=utf-?8,/)||e.match(/^data:application\/json,/)
;if(t)return decodeURIComponent(e.substr(t[0].length))
;let r=e.match(/^data:application\/json;charset=utf-?8;base64,/)||e.match(/^data:application\/json;base64,/)
;if(r)return s=e.substr(r[0].length),
Buffer?Buffer.from(s,"base64").toString():window.atob(s);var s
;let i=e.match(/data:application\/json;([^,]+),/)[1]
;throw new Error("Unsupported source map encoding "+i)}getAnnotationURL(e){
return e.replace(/^\/\*\s*# sourceMappingURL=/,"").trim()}isMap(e){
return"object"==typeof e&&("string"==typeof e.mappings||"string"==typeof e._mappings||Array.isArray(e.sections))
}loadAnnotation(e){let t=e.match(/\/\*\s*# sourceMappingURL=/g);if(!t)return
;let r=e.lastIndexOf(t.pop()),s=e.indexOf("*/",r)
;r>-1&&s>-1&&(this.annotation=this.getAnnotationURL(e.substring(r,s)))}
loadFile(e){
if(this.root=i(e),r(e))return this.mapFile=e,s(e,"utf-8").toString().trim()}
loadMap(e,t){if(!1===t)return!1;if(t){if("string"==typeof t)return t
;if("function"!=typeof t){if(t instanceof o)return a.fromSourceMap(t).toString()
;if(t instanceof a)return t.toString();if(this.isMap(t))return JSON.stringify(t)
;throw new Error("Unsupported previous source map format: "+t.toString())}{
let r=t(e);if(r){let e=this.loadFile(r)
;if(!e)throw new Error("Unable to load previous source map: "+r.toString())
;return e}}}else{if(this.inline)return this.decodeInline(this.annotation)
;if(this.annotation){let t=this.annotation
;return e&&(t=n(i(e),t)),this.loadFile(t)}}}startWith(e,t){
return!!e&&e.substr(0,t.length)===t}withContent(){
return!!(this.consumer().sourcesContent&&this.consumer().sourcesContent.length>0)
}}return I=h,h.default=h,I}function Se(){if(F)return j;F=1
;let{nanoid:t}=xe(),{isAbsolute:r,resolve:s}=e,{SourceMapConsumer:i,SourceMapGenerator:n}=l,{fileURLToPath:o,pathToFileURL:a}=l,h=d(),u=ve(),c=l,p=Symbol("fromOffsetCache"),f=Boolean(i&&n),m=Boolean(s&&r)
;class g{get from(){return this.file||this.id}constructor(e,i={}){
if(null==e||"object"==typeof e&&!e.toString)throw new Error(`PostCSS received ${e} instead of CSS string`)
;if(this.css=e.toString(),
"\ufeff"===this.css[0]||"￾"===this.css[0]?(this.hasBOM=!0,
this.css=this.css.slice(1)):this.hasBOM=!1,
this.document=this.css,i.document&&(this.document=i.document.toString()),
i.from&&(!m||/^\w+:\/\//.test(i.from)||r(i.from)?this.file=i.from:this.file=s(i.from)),
m&&f){let e=new u(this.css,i);if(e.text){this.map=e;let t=e.consumer().file
;!this.file&&t&&(this.file=this.mapResolve(t))}}
this.file||(this.id="<input css "+t(6)+">"),this.map&&(this.map.file=this.from)}
error(e,t,r,s={}){let i,n,o;if(t&&"object"==typeof t){let e=t,s=r
;if("number"==typeof e.offset){let s=this.fromOffset(e.offset);t=s.line,r=s.col
}else t=e.line,r=e.column;if("number"==typeof s.offset){
let e=this.fromOffset(s.offset);n=e.line,i=e.col}else n=s.line,i=s.column
}else if(!r){let e=this.fromOffset(t);t=e.line,r=e.col}
let l=this.origin(t,r,n,i);return o=l?new h(e,void 0===l.endLine?l.line:{
column:l.column,line:l.line},void 0===l.endLine?l.column:{column:l.endColumn,
line:l.endLine},l.source,l.file,s.plugin):new h(e,void 0===n?t:{column:r,line:t
},void 0===n?r:{column:i,line:n},this.css,this.file,s.plugin),o.input={column:r,
endColumn:i,endLine:n,line:t,source:this.css
},this.file&&(a&&(o.input.url=a(this.file).toString()),o.input.file=this.file),o
}fromOffset(e){let t,r;if(this[p])r=this[p];else{let e=this.css.split("\n")
;r=new Array(e.length);let t=0
;for(let s=0,i=e.length;s<i;s++)r[s]=t,t+=e[s].length+1;this[p]=r}
t=r[r.length-1];let s=0;if(e>=t)s=r.length-1;else{let t,i=r.length-2
;for(;s<i;)if(t=s+(i-s>>1),e<r[t])i=t-1;else{if(!(e>=r[t+1])){s=t;break}s=t+1}}
return{col:e-r[s]+1,line:s+1}}mapResolve(e){
return/^\w+:\/\//.test(e)?e:s(this.map.consumer().sourceRoot||this.map.root||".",e)
}origin(e,t,s,i){if(!this.map)return!1
;let n,l,h=this.map.consumer(),u=h.originalPositionFor({column:t,line:e})
;if(!u.source)return!1;"number"==typeof s&&(n=h.originalPositionFor({column:i,
line:s
})),l=r(u.source)?a(u.source):new URL(u.source,this.map.consumer().sourceRoot||a(this.map.mapFile))
;let c={column:u.column,endColumn:n&&n.column,endLine:n&&n.line,line:u.line,
url:l.toString()};if("file:"===l.protocol){
if(!o)throw new Error("file: protocol is not available in this PostCSS build")
;c.file=o(l)}let p=h.sourceContentFor(u.source);return p&&(c.source=p),c}
toJSON(){let e={}
;for(let t of["hasBOM","css","file","id"])null!=this[t]&&(e[t]=this[t])
;return this.map&&(e.map={...this.map
},e.map.consumerCache&&(e.map.consumerCache=void 0)),e}}
return j=g,g.default=g,c&&c.registerInput&&c.registerInput(g),j}function Ce(){
if(L)return _;L=1;let e,t,r=we();class s extends r{constructor(e){
super(e),this.type="root",this.nodes||(this.nodes=[])}normalize(e,t,r){
let s=super.normalize(e)
;if(t)if("prepend"===r)this.nodes.length>1?t.raws.before=this.nodes[1].raws.before:delete t.raws.before;else if(this.first!==t)for(let i of s)i.raws.before=t.raws.before
;return s}removeChild(e,t){let r=this.index(e)
;return!t&&0===r&&this.nodes.length>1&&(this.nodes[1].raws.before=this.nodes[r].raws.before),
super.removeChild(e)}toResult(r={}){return new e(new t,this,r).stringify()}}
return s.registerLazyResult=t=>{e=t},s.registerProcessor=e=>{t=e
},_=s,s.default=s,r.registerRoot(s),_}function Oe(){if(D)return z;D=1;let e={
comma:t=>e.split(t,[","],!0),space:t=>e.split(t,[" ","\n","\t"]),split(e,t,r){
let s=[],i="",n=!1,o=0,l=!1,a="",h=!1
;for(let u of e)h?h=!1:"\\"===u?h=!0:l?u===a&&(l=!1):'"'===u||"'"===u?(l=!0,
a=u):"("===u?o+=1:")"===u?o>0&&(o-=1):0===o&&t.includes(u)&&(n=!0),
n?(""!==i&&s.push(i.trim()),i="",n=!1):i+=u;return(r||""!==i)&&s.push(i.trim()),
s}};return z=e,e.default=e,z}function ke(){if(T)return N;T=1;let e=we(),t=Oe()
;class r extends e{get selectors(){return t.comma(this.selector)}
set selectors(e){
let t=this.selector?this.selector.match(/,\s*/):null,r=t?t[0]:","+this.raw("between","beforeOpen")
;this.selector=e.join(r)}constructor(e){
super(e),this.type="rule",this.nodes||(this.nodes=[])}}
return N=r,r.default=r,e.registerRule(r),N}function Pe(){if(J)return V;J=1
;let{dirname:t,relative:r,resolve:s,sep:i}=e,{SourceMapConsumer:n,SourceMapGenerator:o}=l,{pathToFileURL:a}=l,h=Se(),u=Boolean(n&&o),c=Boolean(t&&s&&r&&i)
;return V=class{constructor(e,t,r,s){
this.stringify=e,this.mapOpts=r.map||{},this.root=t,
this.opts=r,this.css=s,this.originalCSS=s,
this.usesFileUrls=!this.mapOpts.from&&this.mapOpts.absolute,
this.memoizedFileURLs=new Map,
this.memoizedPaths=new Map,this.memoizedURLs=new Map}addAnnotation(){let e
;e=this.isInline()?"data:application/json;base64,"+this.toBase64(this.map.toString()):"string"==typeof this.mapOpts.annotation?this.mapOpts.annotation:"function"==typeof this.mapOpts.annotation?this.mapOpts.annotation(this.opts.to,this.root):this.outputFile()+".map"
;let t="\n"
;this.css.includes("\r\n")&&(t="\r\n"),this.css+=t+"/*# sourceMappingURL="+e+" */"
}applyPrevMaps(){for(let e of this.previous()){
let r,s=this.toUrl(this.path(e.file)),i=e.root||t(e.file)
;!1===this.mapOpts.sourcesContent?(r=new n(e.text),
r.sourcesContent&&(r.sourcesContent=null)):r=e.consumer(),
this.map.applySourceMap(r,s,this.toUrl(this.path(i)))}}clearAnnotation(){
if(!1!==this.mapOpts.annotation)if(this.root){let e
;for(let t=this.root.nodes.length-1;t>=0;t--)e=this.root.nodes[t],
"comment"===e.type&&e.text.startsWith("# sourceMappingURL=")&&this.root.removeChild(t)
}else this.css&&(this.css=this.css.replace(/\n*\/\*#[\S\s]*?\*\/$/gm,""))}
generate(){
if(this.clearAnnotation(),c&&u&&this.isMap())return this.generateMap();{let e=""
;return this.stringify(this.root,(t=>{e+=t})),[e]}}generateMap(){
if(this.root)this.generateString();else if(1===this.previous().length){
let e=this.previous()[0].consumer()
;e.file=this.outputFile(),this.map=o.fromSourceMap(e,{ignoreInvalidMapping:!0})
}else this.map=new o({file:this.outputFile(),ignoreInvalidMapping:!0
}),this.map.addMapping({generated:{column:0,line:1},original:{column:0,line:1},
source:this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>"})
;return this.isSourcesContent()&&this.setSourcesContent(),
this.root&&this.previous().length>0&&this.applyPrevMaps(),
this.isAnnotation()&&this.addAnnotation(),
this.isInline()?[this.css]:[this.css,this.map]}generateString(){
this.css="",this.map=new o({file:this.outputFile(),ignoreInvalidMapping:!0})
;let e,t,r=1,s=1,i="<no source>",n={generated:{column:0,line:0},original:{
column:0,line:0},source:""};this.stringify(this.root,((o,l,a)=>{
if(this.css+=o,l&&"end"!==a&&(n.generated.line=r,
n.generated.column=s-1,l.source&&l.source.start?(n.source=this.sourcePath(l),
n.original.line=l.source.start.line,
n.original.column=l.source.start.column-1,this.map.addMapping(n)):(n.source=i,
n.original.line=1,n.original.column=0,this.map.addMapping(n))),t=o.match(/\n/g),
t?(r+=t.length,e=o.lastIndexOf("\n"),s=o.length-e):s+=o.length,l&&"start"!==a){
let e=l.parent||{raws:{}}
;("decl"===l.type||"atrule"===l.type&&!l.nodes)&&l===e.last&&!e.raws.semicolon||(l.source&&l.source.end?(n.source=this.sourcePath(l),
n.original.line=l.source.end.line,
n.original.column=l.source.end.column-1,n.generated.line=r,
n.generated.column=s-2,
this.map.addMapping(n)):(n.source=i,n.original.line=1,n.original.column=0,
n.generated.line=r,n.generated.column=s-1,this.map.addMapping(n)))}}))}
isAnnotation(){
return!!this.isInline()||(void 0!==this.mapOpts.annotation?this.mapOpts.annotation:!this.previous().length||this.previous().some((e=>e.annotation)))
}isInline(){if(void 0!==this.mapOpts.inline)return this.mapOpts.inline
;let e=this.mapOpts.annotation
;return(void 0===e||!0===e)&&(!this.previous().length||this.previous().some((e=>e.inline)))
}isMap(){return void 0!==this.opts.map?!!this.opts.map:this.previous().length>0}
isSourcesContent(){
return void 0!==this.mapOpts.sourcesContent?this.mapOpts.sourcesContent:!this.previous().length||this.previous().some((e=>e.withContent()))
}outputFile(){
return this.opts.to?this.path(this.opts.to):this.opts.from?this.path(this.opts.from):"to.css"
}path(e){if(this.mapOpts.absolute)return e;if(60===e.charCodeAt(0))return e
;if(/^\w+:\/\//.test(e))return e;let i=this.memoizedPaths.get(e);if(i)return i
;let n=this.opts.to?t(this.opts.to):"."
;"string"==typeof this.mapOpts.annotation&&(n=t(s(n,this.mapOpts.annotation)))
;let o=r(n,e);return this.memoizedPaths.set(e,o),o}previous(){
if(!this.previousMaps)if(this.previousMaps=[],this.root)this.root.walk((e=>{
if(e.source&&e.source.input.map){let t=e.source.input.map
;this.previousMaps.includes(t)||this.previousMaps.push(t)}}));else{
let e=new h(this.originalCSS,this.opts);e.map&&this.previousMaps.push(e.map)}
return this.previousMaps}setSourcesContent(){let e={}
;if(this.root)this.root.walk((t=>{if(t.source){let r=t.source.input.from
;if(r&&!e[r]){e[r]=!0
;let s=this.usesFileUrls?this.toFileUrl(r):this.toUrl(this.path(r))
;this.map.setSourceContent(s,t.source.input.css)}}}));else if(this.css){
let e=this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>"
;this.map.setSourceContent(e,this.css)}}sourcePath(e){
return this.mapOpts.from?this.toUrl(this.mapOpts.from):this.usesFileUrls?this.toFileUrl(e.source.input.from):this.toUrl(this.path(e.source.input.from))
}toBase64(e){
return Buffer?Buffer.from(e).toString("base64"):window.btoa(unescape(encodeURIComponent(e)))
}toFileUrl(e){let t=this.memoizedFileURLs.get(e);if(t)return t;if(a){
let t=a(e).toString();return this.memoizedFileURLs.set(e,t),t}
throw new Error("`map.absolute` option is not available in this PostCSS build")}
toUrl(e){let t=this.memoizedURLs.get(e);if(t)return t
;"\\"===i&&(e=e.replace(/\\/g,"/"))
;let r=encodeURI(e).replace(/[#?]/g,encodeURIComponent)
;return this.memoizedURLs.set(e,r),r}}}function Ae(){if(H)return Z;H=1
;let e=we(),t=Se(),r=function(){if(Q)return q;Q=1
;let e=ye(),t=me(),r=ge(),s=Ce(),i=ke(),n=function(){if(Y)return G;Y=1
;const e="'".charCodeAt(0),t='"'.charCodeAt(0),r="\\".charCodeAt(0),s="/".charCodeAt(0),i="\n".charCodeAt(0),n=" ".charCodeAt(0),o="\f".charCodeAt(0),l="\t".charCodeAt(0),a="\r".charCodeAt(0),h="[".charCodeAt(0),u="]".charCodeAt(0),c="(".charCodeAt(0),p=")".charCodeAt(0),f="{".charCodeAt(0),d="}".charCodeAt(0),m=";".charCodeAt(0),g="*".charCodeAt(0),w=":".charCodeAt(0),y="@".charCodeAt(0),b=/[\t\n\f\r "#'()/;[\\\]{}]/g,x=/[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,v=/.[\r\n"'(/\\]/,S=/[\da-f]/i
;return G=function(C,O={}){
let k,P,A,E,R,M,B,I,U,j,F=C.css.valueOf(),_=O.ignoreErrors,L=F.length,z=0,D=[],N=[]
;function T(e){throw C.error("Unclosed "+e,z)}return{back:function(e){N.push(e)
},endOfFile:function(){return 0===N.length&&z>=L},nextToken:function(C){
if(N.length)return N.pop();if(z>=L)return;let O=!!C&&C.ignoreUnclosed
;switch(k=F.charCodeAt(z),k){case i:case n:case l:case a:case o:E=z;do{
E+=1,k=F.charCodeAt(E)}while(k===n||k===i||k===l||k===a||k===o)
;M=["space",F.slice(z,E)],z=E-1;break;case h:case u:case f:case d:case w:case m:
case p:{let e=String.fromCharCode(k);M=[e,e,z];break}case c:
if(j=D.length?D.pop()[1]:"",
U=F.charCodeAt(z+1),"url"===j&&U!==e&&U!==t&&U!==n&&U!==i&&U!==l&&U!==o&&U!==a){
E=z;do{if(B=!1,E=F.indexOf(")",E+1),-1===E){if(_||O){E=z;break}T("bracket")}
for(I=E;F.charCodeAt(I-1)===r;)I-=1,B=!B}while(B)
;M=["brackets",F.slice(z,E+1),z,E],z=E
}else E=F.indexOf(")",z+1),P=F.slice(z,E+1),
-1===E||v.test(P)?M=["(","(",z]:(M=["brackets",P,z,E],z=E);break;case e:case t:
R=k===e?"'":'"',E=z;do{if(B=!1,E=F.indexOf(R,E+1),-1===E){if(_||O){E=z+1;break}
T("string")}for(I=E;F.charCodeAt(I-1)===r;)I-=1,B=!B}while(B)
;M=["string",F.slice(z,E+1),z,E],z=E;break;case y:
b.lastIndex=z+1,b.test(F),E=0===b.lastIndex?F.length-1:b.lastIndex-2,
M=["at-word",F.slice(z,E+1),z,E],z=E;break;case r:
for(E=z,A=!0;F.charCodeAt(E+1)===r;)E+=1,A=!A
;if(k=F.charCodeAt(E+1),A&&k!==s&&k!==n&&k!==i&&k!==l&&k!==a&&k!==o&&(E+=1,
S.test(F.charAt(E)))){for(;S.test(F.charAt(E+1));)E+=1
;F.charCodeAt(E+1)===n&&(E+=1)}M=["word",F.slice(z,E+1),z,E],z=E;break;default:
k===s&&F.charCodeAt(z+1)===g?(E=F.indexOf("*/",z+2)+1,
0===E&&(_||O?E=F.length:T("comment")),
M=["comment",F.slice(z,E+1),z,E],z=E):(x.lastIndex=z+1,
x.test(F),E=0===x.lastIndex?F.length-1:x.lastIndex-2,
M=["word",F.slice(z,E+1),z,E],D.push(M),z=E)}return z++,M},position:function(){
return z}}}}();const o={empty:!0,space:!0};return q=class{constructor(e){
this.input=e,
this.root=new s,this.current=this.root,this.spaces="",this.semicolon=!1,
this.createTokenizer(),this.root.source={input:e,start:{column:1,line:1,offset:0
}}}atrule(t){let r,s,i,n=new e
;n.name=t[1].slice(1),""===n.name&&this.unnamedAtrule(n,t),this.init(n,t[2])
;let o=!1,l=!1,a=[],h=[];for(;!this.tokenizer.endOfFile();){
if(r=(t=this.tokenizer.nextToken())[0],
"("===r||"["===r?h.push("("===r?")":"]"):"{"===r&&h.length>0?h.push("}"):r===h[h.length-1]&&h.pop(),
0===h.length){if(";"===r){
n.source.end=this.getPosition(t[2]),n.source.end.offset++,this.semicolon=!0
;break}if("{"===r){l=!0;break}if("}"===r){if(a.length>0){
for(i=a.length-1,s=a[i];s&&"space"===s[0];)s=a[--i]
;s&&(n.source.end=this.getPosition(s[3]||s[2]),n.source.end.offset++)}
this.end(t);break}a.push(t)}else a.push(t);if(this.tokenizer.endOfFile()){o=!0
;break}}
n.raws.between=this.spacesAndCommentsFromEnd(a),a.length?(n.raws.afterName=this.spacesAndCommentsFromStart(a),
this.raw(n,"params",a),
o&&(t=a[a.length-1],n.source.end=this.getPosition(t[3]||t[2]),
n.source.end.offset++,
this.spaces=n.raws.between,n.raws.between="")):(n.raws.afterName="",
n.params=""),l&&(n.nodes=[],this.current=n)}checkMissedSemicolon(e){
let t=this.colon(e);if(!1===t)return;let r,s=0
;for(let i=t-1;i>=0&&(r=e[i],"space"===r[0]||(s+=1,2!==s));i--);
throw this.input.error("Missed semicolon","word"===r[0]?r[3]+1:r[2])}colon(e){
let t,r,s,i=0;for(let[n,o]of e.entries()){
if(r=o,s=r[0],"("===s&&(i+=1),")"===s&&(i-=1),0===i&&":"===s){if(t){
if("word"===t[0]&&"progid"===t[1])continue;return n}this.doubleColon(r)}t=r}
return!1}comment(e){let r=new t
;this.init(r,e[2]),r.source.end=this.getPosition(e[3]||e[2]),
r.source.end.offset++;let s=e[1].slice(2,-2)
;if(/^\s*$/.test(s))r.text="",r.raws.left=s,r.raws.right="";else{
let e=s.match(/^(\s*)([^]*\S)(\s*)$/)
;r.text=e[2],r.raws.left=e[1],r.raws.right=e[3]}}createTokenizer(){
this.tokenizer=n(this.input)}decl(e,t){let s=new r;this.init(s,e[0][2])
;let i,n=e[e.length-1]
;for(";"===n[0]&&(this.semicolon=!0,e.pop()),s.source.end=this.getPosition(n[3]||n[2]||function(e){
for(let t=e.length-1;t>=0;t--){let r=e[t],s=r[3]||r[2];if(s)return s}
}(e)),s.source.end.offset++;"word"!==e[0][0];)1===e.length&&this.unknownWord(e),
s.raws.before+=e.shift()[1]
;for(s.source.start=this.getPosition(e[0][2]),s.prop="";e.length;){let t=e[0][0]
;if(":"===t||"space"===t||"comment"===t)break;s.prop+=e.shift()[1]}
for(s.raws.between="";e.length;){if(i=e.shift(),":"===i[0]){s.raws.between+=i[1]
;break}
"word"===i[0]&&/\w/.test(i[1])&&this.unknownWord([i]),s.raws.between+=i[1]}
"_"!==s.prop[0]&&"*"!==s.prop[0]||(s.raws.before+=s.prop[0],
s.prop=s.prop.slice(1));let o,l=[]
;for(;e.length&&(o=e[0][0],"space"===o||"comment"===o);)l.push(e.shift())
;this.precheckMissedSemicolon(e);for(let r=e.length-1;r>=0;r--){
if(i=e[r],"!important"===i[1].toLowerCase()){s.important=!0
;let t=this.stringFrom(e,r)
;t=this.spacesFromEnd(e)+t," !important"!==t&&(s.raws.important=t);break}
if("important"===i[1].toLowerCase()){let t=e.slice(0),i="";for(let e=r;e>0;e--){
let r=t[e][0];if(i.trim().startsWith("!")&&"space"!==r)break;i=t.pop()[1]+i}
i.trim().startsWith("!")&&(s.important=!0,s.raws.important=i,e=t)}
if("space"!==i[0]&&"comment"!==i[0])break}
e.some((e=>"space"!==e[0]&&"comment"!==e[0]))&&(s.raws.between+=l.map((e=>e[1])).join(""),
l=[]),
this.raw(s,"value",l.concat(e),t),s.value.includes(":")&&!t&&this.checkMissedSemicolon(e)
}doubleColon(e){throw this.input.error("Double colon",{offset:e[2]},{
offset:e[2]+e[1].length})}emptyRule(e){let t=new i
;this.init(t,e[2]),t.selector="",t.raws.between="",this.current=t}end(e){
this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),
this.semicolon=!1,
this.current.raws.after=(this.current.raws.after||"")+this.spaces,
this.spaces="",
this.current.parent?(this.current.source.end=this.getPosition(e[2]),
this.current.source.end.offset++,
this.current=this.current.parent):this.unexpectedClose(e)}endFile(){
this.current.parent&&this.unclosedBlock(),
this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),
this.current.raws.after=(this.current.raws.after||"")+this.spaces,
this.root.source.end=this.getPosition(this.tokenizer.position())}
freeSemicolon(e){if(this.spaces+=e[1],this.current.nodes){
let t=this.current.nodes[this.current.nodes.length-1]
;t&&"rule"===t.type&&!t.raws.ownSemicolon&&(t.raws.ownSemicolon=this.spaces,
this.spaces="",
t.source.end=this.getPosition(e[2]),t.source.end.offset+=t.raws.ownSemicolon.length)
}}getPosition(e){let t=this.input.fromOffset(e);return{column:t.col,line:t.line,
offset:e}}init(e,t){this.current.push(e),e.source={input:this.input,
start:this.getPosition(t)
},e.raws.before=this.spaces,this.spaces="","comment"!==e.type&&(this.semicolon=!1)
}other(e){let t=!1,r=null,s=!1,i=null,n=[],o=e[1].startsWith("--"),l=[],a=e
;for(;a;){
if(r=a[0],l.push(a),"("===r||"["===r)i||(i=a),n.push("("===r?")":"]");else if(o&&s&&"{"===r)i||(i=a),
n.push("}");else if(0===n.length){if(";"===r){if(s)return void this.decl(l,o)
;break}if("{"===r)return void this.rule(l);if("}"===r){
this.tokenizer.back(l.pop()),t=!0;break}":"===r&&(s=!0)
}else r===n[n.length-1]&&(n.pop(),0===n.length&&(i=null))
;a=this.tokenizer.nextToken()}
if(this.tokenizer.endOfFile()&&(t=!0),n.length>0&&this.unclosedBracket(i),t&&s){
if(!o)for(;l.length&&(a=l[l.length-1][0],
"space"===a||"comment"===a);)this.tokenizer.back(l.pop());this.decl(l,o)
}else this.unknownWord(l)}parse(){let e
;for(;!this.tokenizer.endOfFile();)switch(e=this.tokenizer.nextToken(),e[0]){
case"space":this.spaces+=e[1];break;case";":this.freeSemicolon(e);break;case"}":
this.end(e);break;case"comment":this.comment(e);break;case"at-word":
this.atrule(e);break;case"{":this.emptyRule(e);break;default:this.other(e)}
this.endFile()}precheckMissedSemicolon(){}raw(e,t,r,s){
let i,n,l,a,h=r.length,u="",c=!0
;for(let p=0;p<h;p+=1)i=r[p],n=i[0],"space"!==n||p!==h-1||s?"comment"===n?(a=r[p-1]?r[p-1][0]:"empty",
l=r[p+1]?r[p+1][0]:"empty",
o[a]||o[l]||","===u.slice(-1)?c=!1:u+=i[1]):u+=i[1]:c=!1;if(!c){
let s=r.reduce(((e,t)=>e+t[1]),"");e.raws[t]={raw:s,value:u}}e[t]=u}rule(e){
e.pop();let t=new i
;this.init(t,e[0][2]),t.raws.between=this.spacesAndCommentsFromEnd(e),
this.raw(t,"selector",e),this.current=t}spacesAndCommentsFromEnd(e){let t,r=""
;for(;e.length&&(t=e[e.length-1][0],"space"===t||"comment"===t);)r=e.pop()[1]+r
;return r}spacesAndCommentsFromStart(e){let t,r=""
;for(;e.length&&(t=e[0][0],"space"===t||"comment"===t);)r+=e.shift()[1];return r
}spacesFromEnd(e){let t,r=""
;for(;e.length&&(t=e[e.length-1][0],"space"===t);)r=e.pop()[1]+r;return r}
stringFrom(e,t){let r="";for(let s=t;s<e.length;s++)r+=e[s][1]
;return e.splice(t,e.length-t),r}unclosedBlock(){let e=this.current.source.start
;throw this.input.error("Unclosed block",e.line,e.column)}unclosedBracket(e){
throw this.input.error("Unclosed bracket",{offset:e[2]},{offset:e[2]+1})}
unexpectedClose(e){throw this.input.error("Unexpected }",{offset:e[2]},{
offset:e[2]+1})}unknownWord(e){throw this.input.error("Unknown word "+e[0][1],{
offset:e[0][2]},{offset:e[0][2]+e[0][1].length})}unnamedAtrule(e,t){
throw this.input.error("At-rule without name",{offset:t[2]},{
offset:t[2]+t[1].length})}}}();function s(e,s){let i=new t(e,s),n=new r(i);try{
n.parse()}catch(o){
throw"production"!==process.env.NODE_ENV&&"CssSyntaxError"===o.name&&s&&s.from&&(/\.scss$/i.test(s.from)?o.message+="\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser":/\.sass/i.test(s.from)?o.message+="\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser":/\.less$/i.test(s.from)&&(o.message+="\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser")),
o}return n.root}return Z=s,s.default=s,e.registerParse(s),Z}function Ee(){
if(X)return K;X=1;class e{constructor(e,t={}){
if(this.type="warning",this.text=e,t.node&&t.node.source){
let e=t.node.rangeBy(t)
;this.line=e.start.line,this.column=e.start.column,this.endLine=e.end.line,
this.endColumn=e.end.column}for(let r in t)this[r]=t[r]}toString(){
return this.node?this.node.error(this.text,{index:this.index,plugin:this.plugin,
word:this.word}).message:this.plugin?this.plugin+": "+this.text:this.text}}
return K=e,e.default=e,K}function Re(){if(te)return ee;te=1;let e=Ee();class t{
get content(){return this.css}constructor(e,t,r){
this.processor=e,this.messages=[],
this.root=t,this.opts=r,this.css=void 0,this.map=void 0}toString(){
return this.css}warn(t,r={}){
r.plugin||this.lastPlugin&&this.lastPlugin.postcssPlugin&&(r.plugin=this.lastPlugin.postcssPlugin)
;let s=new e(t,r);return this.messages.push(s),s}warnings(){
return this.messages.filter((e=>"warning"===e.type))}}return ee=t,t.default=t,ee
}function Me(){if(se)return re;se=1;let e={};return re=function(t){
e[t]||(e[t]=!0,"undefined"!=typeof console&&console.warn)}}function Be(){
if(ne)return ie;ne=1
;let e=we(),t=be(),r=Pe(),s=Ae(),i=Re(),n=Ce(),o=g(),{isClean:l,my:a}=fe(),h=Me()
;const u={atrule:"AtRule",comment:"Comment",decl:"Declaration",
document:"Document",root:"Root",rule:"Rule"},c={AtRule:!0,AtRuleExit:!0,
Comment:!0,CommentExit:!0,Declaration:!0,DeclarationExit:!0,Document:!0,
DocumentExit:!0,Once:!0,OnceExit:!0,postcssPlugin:!0,prepare:!0,Root:!0,
RootExit:!0,Rule:!0,RuleExit:!0},p={Once:!0,postcssPlugin:!0,prepare:!0}
;function f(e){return"object"==typeof e&&"function"==typeof e.then}
function d(e){let t=!1,r=u[e.type]
;return"decl"===e.type?t=e.prop.toLowerCase():"atrule"===e.type&&(t=e.name.toLowerCase()),
t&&e.append?[r,r+"-"+t,0,r+"Exit",r+"Exit-"+t]:t?[r,r+"-"+t,r+"Exit",r+"Exit-"+t]:e.append?[r,0,r+"Exit"]:[r,r+"Exit"]
}function m(e){let t
;return t="document"===e.type?["Document",0,"DocumentExit"]:"root"===e.type?["Root",0,"RootExit"]:d(e),
{eventIndex:0,events:t,iterator:0,node:e,visitorIndex:0,visitors:[]}}
function w(e){return e[l]=!1,e.nodes&&e.nodes.forEach((e=>w(e))),e}let y={}
;class b{get content(){return this.stringify().content}get css(){
return this.stringify().css}get map(){return this.stringify().map}
get messages(){return this.sync().messages}get opts(){return this.result.opts}
get processor(){return this.result.processor}get root(){return this.sync().root}
get[Symbol.toStringTag](){return"LazyResult"}constructor(t,r,n){let o
;if(this.stringified=!1,
this.processed=!1,"object"!=typeof r||null===r||"root"!==r.type&&"document"!==r.type)if(r instanceof b||r instanceof i)o=w(r.root),
r.map&&(void 0===n.map&&(n.map={}),
n.map.inline||(n.map.inline=!1),n.map.prev=r.map);else{let t=s
;n.syntax&&(t=n.syntax.parse),n.parser&&(t=n.parser),t.parse&&(t=t.parse);try{
o=t(r,n)}catch(l){this.processed=!0,this.error=l}o&&!o[a]&&e.rebuild(o)
}else o=w(r);this.result=new i(t,o,n),this.helpers={...y,postcss:y,
result:this.result
},this.plugins=this.processor.plugins.map((e=>"object"==typeof e&&e.prepare?{
...e,...e.prepare(this.result)}:e))}async(){
return this.error?Promise.reject(this.error):this.processed?Promise.resolve(this.result):(this.processing||(this.processing=this.runAsync()),
this.processing)}catch(e){return this.async().catch(e)}finally(e){
return this.async().then(e,e)}getAsyncError(){
throw new Error("Use process(css).then(cb) to work with async plugins")}
handleError(e,t){let r=this.result.lastPlugin;try{
if(t&&t.addToError(e),this.error=e,"CssSyntaxError"!==e.name||e.plugin){
if(r.postcssVersion&&"production"!==process.env.NODE_ENV){r.postcssPlugin
;let e=r.postcssVersion,t=this.result.processor.version,s=e.split("."),i=t.split(".")
;s[0]!==i[0]||(parseInt(s[1]),parseInt(i[1]))}
}else e.plugin=r.postcssPlugin,e.setMessage()}catch(s){console&&console.error}
return e}prepareVisitors(){this.listeners={};let e=(e,t,r)=>{
this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push([e,r])}
;for(let t of this.plugins)if("object"==typeof t)for(let r in t){
if(!c[r]&&/^[A-Z]/.test(r))throw new Error(`Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`)
;if(!p[r])if("object"==typeof t[r])for(let s in t[r])e(t,"*"===s?r:r+"-"+s.toLowerCase(),t[r][s]);else"function"==typeof t[r]&&e(t,r,t[r])
}this.hasListener=Object.keys(this.listeners).length>0}async runAsync(){
this.plugin=0;for(let r=0;r<this.plugins.length;r++){
let t=this.plugins[r],s=this.runOnRoot(t);if(f(s))try{await s}catch(e){
throw this.handleError(e)}}if(this.prepareVisitors(),this.hasListener){
let e=this.result.root;for(;!e[l];){e[l]=!0;let r=[m(e)];for(;r.length>0;){
let e=this.visitTick(r);if(f(e))try{await e}catch(t){let e=r[r.length-1].node
;throw this.handleError(t,e)}}}
if(this.listeners.OnceExit)for(let[r,s]of this.listeners.OnceExit){
this.result.lastPlugin=r;try{if("document"===e.type){
let t=e.nodes.map((e=>s(e,this.helpers)));await Promise.all(t)
}else await s(e,this.helpers)}catch(t){throw this.handleError(t)}}}
return this.processed=!0,this.stringify()}runOnRoot(e){this.result.lastPlugin=e
;try{if("object"==typeof e&&e.Once){if("document"===this.result.root.type){
let t=this.result.root.nodes.map((t=>e.Once(t,this.helpers)))
;return f(t[0])?Promise.all(t):t}return e.Once(this.result.root,this.helpers)}
if("function"==typeof e)return e(this.result.root,this.result)}catch(t){
throw this.handleError(t)}}stringify(){if(this.error)throw this.error
;if(this.stringified)return this.result;this.stringified=!0,this.sync()
;let e=this.result.opts,t=o
;e.syntax&&(t=e.syntax.stringify),e.stringifier&&(t=e.stringifier),
t.stringify&&(t=t.stringify)
;let s=new r(t,this.result.root,this.result.opts).generate()
;return this.result.css=s[0],this.result.map=s[1],this.result}sync(){
if(this.error)throw this.error;if(this.processed)return this.result
;if(this.processed=!0,this.processing)throw this.getAsyncError()
;for(let e of this.plugins)if(f(this.runOnRoot(e)))throw this.getAsyncError()
;if(this.prepareVisitors(),this.hasListener){let e=this.result.root
;for(;!e[l];)e[l]=!0,this.walkSync(e)
;if(this.listeners.OnceExit)if("document"===e.type)for(let t of e.nodes)this.visitSync(this.listeners.OnceExit,t);else this.visitSync(this.listeners.OnceExit,e)
}return this.result}then(e,t){
return"production"!==process.env.NODE_ENV&&("from"in this.opts||h("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),
this.async().then(e,t)}toString(){return this.css}visitSync(e,t){
for(let[s,i]of e){let e;this.result.lastPlugin=s;try{e=i(t,this.helpers)
}catch(r){throw this.handleError(r,t.proxyOf)}
if("root"!==t.type&&"document"!==t.type&&!t.parent)return!0
;if(f(e))throw this.getAsyncError()}}visitTick(e){
let t=e[e.length-1],{node:r,visitors:s}=t
;if("root"!==r.type&&"document"!==r.type&&!r.parent)return void e.pop()
;if(s.length>0&&t.visitorIndex<s.length){let[e,i]=s[t.visitorIndex]
;t.visitorIndex+=1,
t.visitorIndex===s.length&&(t.visitors=[],t.visitorIndex=0),this.result.lastPlugin=e
;try{return i(r.toProxy(),this.helpers)}catch(n){throw this.handleError(n,r)}}
if(0!==t.iterator){let s,i=t.iterator
;for(;s=r.nodes[r.indexes[i]];)if(r.indexes[i]+=1,
!s[l])return s[l]=!0,void e.push(m(s));t.iterator=0,delete r.indexes[i]}
let i=t.events;for(;t.eventIndex<i.length;){let e=i[t.eventIndex]
;if(t.eventIndex+=1,
0===e)return void(r.nodes&&r.nodes.length&&(r[l]=!0,t.iterator=r.getIterator()))
;if(this.listeners[e])return void(t.visitors=this.listeners[e])}e.pop()}
walkSync(e){e[l]=!0;let t=d(e);for(let r of t)if(0===r)e.nodes&&e.each((e=>{
e[l]||this.walkSync(e)}));else{let t=this.listeners[r]
;if(t&&this.visitSync(t,e.toProxy()))return}}warnings(){
return this.sync().warnings()}}return b.registerPostcss=e=>{y=e
},ie=b,b.default=b,n.registerLazyResult(b),t.registerLazyResult(b),ie}
const Ie=r(function(){if(ce)return ue;ce=1
;let e=ye(),t=me(),r=we(),s=d(),i=ge(),n=be(),o=function(){if($)return W;$=1
;let e=ye(),t=me(),r=ge(),s=Se(),i=ve(),n=Ce(),o=ke();function l(a,h){
if(Array.isArray(a))return a.map((e=>l(e)));let{inputs:u,...c}=a;if(u){h=[]
;for(let e of u){let t={...e,__proto__:s.prototype};t.map&&(t.map={...t.map,
__proto__:i.prototype}),h.push(t)}}
if(c.nodes&&(c.nodes=a.nodes.map((e=>l(e,h)))),c.source){
let{inputId:e,...t}=c.source;c.source=t,null!=e&&(c.source.input=h[e])}
if("root"===c.type)return new n(c);if("decl"===c.type)return new r(c)
;if("rule"===c.type)return new o(c);if("comment"===c.type)return new t(c)
;if("atrule"===c.type)return new e(c)
;throw new Error("Unknown node type: "+a.type)}return W=l,l.default=l,W
}(),l=Se(),a=Be(),h=Oe(),u=de(),c=Ae(),p=function(){if(he)return ae;he=1
;let e=be(),t=Be(),r=function(){if(le)return oe;le=1;let e=Pe(),t=Ae()
;const r=Re();let s=g(),i=Me();class n{get content(){return this.result.css}
get css(){return this.result.css}get map(){return this.result.map}
get messages(){return[]}get opts(){return this.result.opts}get processor(){
return this.result.processor}get root(){if(this._root)return this._root
;let e,r=t;try{e=r(this._css,this._opts)}catch(s){this.error=s}
if(this.error)throw this.error;return this._root=e,e}get[Symbol.toStringTag](){
return"NoWorkResult"}constructor(t,i,n){let o
;i=i.toString(),this.stringified=!1,
this._processor=t,this._css=i,this._opts=n,this._map=void 0;let l=s
;this.result=new r(this._processor,o,this._opts),this.result.css=i;let a=this
;Object.defineProperty(this.result,"root",{get:()=>a.root})
;let h=new e(l,o,this._opts,i);if(h.isMap()){let[e,t]=h.generate()
;e&&(this.result.css=e),t&&(this.result.map=t)
}else h.clearAnnotation(),this.result.css=h.css}async(){
return this.error?Promise.reject(this.error):Promise.resolve(this.result)}
catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}
sync(){if(this.error)throw this.error;return this.result}then(e,t){
return"production"!==process.env.NODE_ENV&&("from"in this._opts||i("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),
this.async().then(e,t)}toString(){return this._css}warnings(){return[]}}
return oe=n,n.default=n,oe}(),s=Ce();class i{constructor(e=[]){
this.version="8.5.3",this.plugins=this.normalize(e)}normalize(e){let t=[]
;for(let r of e)if(!0===r.postcss?r=r():r.postcss&&(r=r.postcss),
"object"==typeof r&&Array.isArray(r.plugins))t=t.concat(r.plugins);else if("object"==typeof r&&r.postcssPlugin)t.push(r);else if("function"==typeof r)t.push(r);else{
if("object"!=typeof r||!r.parse&&!r.stringify)throw new Error(r+" is not a PostCSS plugin")
;if("production"!==process.env.NODE_ENV)throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.")
}return t}process(e,s={}){
return this.plugins.length||s.parser||s.stringifier||s.syntax?new t(this,e,s):new r(this,e,s)
}use(e){return this.plugins=this.plugins.concat(this.normalize([e])),this}}
return ae=i,i.default=i,s.registerProcessor(i),e.registerProcessor(i),ae
}(),f=Re(),m=Ce(),w=ke(),y=g(),b=Ee();function x(...e){
return 1===e.length&&Array.isArray(e[0])&&(e=e[0]),new p(e)}
return x.plugin=function(e,t){let r,s=!1;function i(...r){
console&&console.warn&&!s&&(s=!0,
process.env.LANG&&process.env.LANG.startsWith("cn"));let i=t(...r)
;return i.postcssPlugin=e,i.postcssVersion=(new p).version,i}
return Object.defineProperty(i,"postcss",{get:()=>(r||(r=i()),r)
}),i.process=function(e,t,r){return x([i(r)]).process(e,t)},i
},x.stringify=y,x.parse=c,
x.fromJSON=o,x.list=h,x.comment=e=>new t(e),x.atRule=t=>new e(t),
x.decl=e=>new i(e),x.rule=e=>new w(e),x.root=e=>new m(e),x.document=e=>new n(e),
x.CssSyntaxError=s,
x.Declaration=i,x.Container=r,x.Processor=p,x.Document=n,x.Comment=t,
x.Warning=b,
x.AtRule=e,x.Result=f,x.Input=l,x.Rule=w,x.Root=m,x.Node=u,a.registerPostcss(x),
ue=x,x.default=x,ue}())
;Ie.stringify,Ie.fromJSON,Ie.plugin,Ie.parse,Ie.list,Ie.document,Ie.comment
;const Ue=Ie.atRule
;Ie.rule,Ie.decl,Ie.root,Ie.CssSyntaxError,Ie.Declaration,Ie.Container,
Ie.Processor,
Ie.Document,Ie.Comment,Ie.Warning,Ie.AtRule,Ie.Result,Ie.Input,Ie.Rule,
Ie.Root,Ie.Node;const je=Object.assign(((e={})=>{
const{enableLogging:t=!0,include:r=["*"],exclude:s=[],sortingEnabled:i=!1,sort:n="mobileFirst",logger:o={
info:console.log,error:console.error}}=e;return{
postcssPlugin:"postcss-media-query-pruner",Once(e){
const l=e.source?.input?.file||"",a=t&&function(e){
return!e||(1===r.length&&"*"===r[0]||r.some((t=>e.includes(t))))&&!s.some((t=>e.includes(t)))
}(l),h=new Map,u=new Map;e.walkAtRules("media",(e=>{const t=e.params
;h.has(t)||(h.set(t,Ue({name:"media",params:t})),u.set(t,new Set))
;const r=h.get(t),s=u.get(t);e.nodes?.forEach((e=>{const t=e.toString().trim()
;s.has(t)||(s.add(t),r.append(e.clone()))})),e.remove()}))
;let c=Array.from(h.keys());i&&c.sort(((e,t)=>{
const r=e=>parseFloat((e.match(/min-width:\s*(\d+)/)||[])[1]||"0"),s=r(e),i=r(t)
;return"mobileFirst"===n?s-i:i-s})),c.forEach((t=>{e.append(h.get(t))
})),a&&!globalThis.__postcssMediaQuerySummaryLogged&&(o.info("✨[postcss-media-query-pruner] - Optimization completed"),
globalThis.__postcssMediaQuerySummaryLogged=!0)}}}),{postcss:!0})
;exports.default=je;


// Programmed by  Javier Chavez

//1)rounding function

function redond(n,d){
var valor=n-Math.trunc(n);
valor=Math.round(valor*Math.pow(10,d));
valor=Math.trunc(n)+(valor/Math.pow(10,d));
return valor;
}

//2)rounding.more 

function redondmas(n){
return Math.trunc(n)+1    
}

//3)round.less 

function redondmenos(n){
return Math.trunc(n)    
}


//4) scalar addition/subtraction function with array

function sumare(e,a){
var b=[]; 
var matriz=[];   
for(var i=0;i<a.length;i++){
for(var j=0;j<a[0].length;j++){
b.push(a[i][j]+e);
}
matriz.push(b);
b=[];
} 
return matriz   
}

//5)scalar multiplication function with arrays 

function multe(e,a){
var b=[]; 
var matriz=[];   
for(var i=0;i<a.length;i++){
for(var j=0;j<a[0].length;j++){
b.push(a[i][j]*e);
}
matriz.push(b);
b=[];
} 
return matriz   
}

//6) matrix sum function 

function sumam(){
var matriz=[];    
var fila=[]; 
var a=arguments[0]; 
var b; 
for(var h=1;h<arguments.length;h++){
b=arguments[h]
if(a.length==b.length){
for(var i=0;i<a.length;i++){
for(var j=0;j<a[i].length;j++){
if(a[i].length==b[i].length){
fila.push(a[i][j]+b[i][j]);   
}else{return 'Error : Dimension'} 
}
matriz.push(fila);
fila=[];
}    
}else{return 'Error : Dimension'}
a=matriz;
matriz=[];
}
return a
}

//7) matrix multiplication function 

function multm(){
var a;
var b;
var c=[];
var d;
var e;
var matriz=arguments[0];
for(var h=1;h<arguments.length;h++){
var b=arguments[h];
a=matriz;
matriz=[];    
for(var i=0;i<a.length;i++){
for(var j=0;j<a[i].length;j++){
c.push(b[j]);   
d=multe(a[i][j],c);
if(j==0){e=d}
else{e=sumam(e,d)}
c=[];
}
matriz.push(e[0]);
}
}
return matriz
}

//8) delete row function 
function elimf(m,n){
var matriz=[];
for(var i=0;i<m.length;i++){
if(i!=n){matriz.push(m[i])}
}  
return matriz  
}
    
//9)delete column function 
function elimc(m,n){
var a=[];    
var matriz=[];
for(var i=0;i<m.length;i++){
for(var j=0;j<m[0].length;j++){
if(j!=n){a.push(m[i][j])}
} 
matriz.push(a);
a=[];   
}  
return matriz  
}

//10)determinant function of a matrix 
function deter(a){
var b=[];
var c=[];
var d=[];
var matriz=[];
var e=[];
var f=arguments[0].length-2
var band=0;   
var valor; 
var acumulado=1;
var det=1;
for(var h=0;h<f;h++){
for(var i=0;i<a.length;i++){
for(var p=0;p<a.length;p++){
if(a[0][0]==0){    
valor=a[0];
a.shift();
a.push(valor);
acumulado=Math.pow(-1,a.length+1)*acumulado;
}
}    
b.push(a[i]);
if(i==0){
if(b[0][0]!=0){   
acumulado=acumulado*(b[0][0] )  
b=multe(1/b[0][0],b)}   
}else{
if(b[0][0]!=0){   
acumulado=acumulado*(-b[0][0] )  
b=multe(-1/b[0][0],b)}
}  
c.push(b[0]);
b=[];
}
b.push(c[0]);
matriz.push(c[0]);
for(var m=0;m<a.length;m++){
for(var n=0;n<a.length;n++){
for(var o=0;o<a.length;o++){
if(m==o && a[n][o]==0){
band = band+1;
}}} 
if(band==a.length){return 0}
band=0;  
}
for(var j=1;j<c.length;j++){
e.push(c[j]);
if(c[j][0]==0){d=e}  
else{d=sumam(b,e)}  
e=[];
matriz.push(d[0]);
}
matriz=elimc(matriz,0);
matriz=elimf(matriz,0);
a=matriz;
matriz=[];
c=[];
b=[];
}
if(a.length==1){det=a[0][0]}
else{
det=(a[0][0]*a[1][1])-(a[1][0]*a[0][1])
det=det*acumulado;
}
a=arguments[0];
return det
}
    
//11)transpose function 

function transpm(a){
var b=[];
var c=[];
var band=a.length;
if(band<a[0].length){band=a[0].length}   
for(var h=0;h<band;h++){
for(var i=0;i<a.length;i++){
for(var j=0;j<a[0].length;j++){
if(j==h ){b.push(a[i][j])}
} 
}
c.push(b);  
b=[]; 
} 
return c
}
    
//12)attached matrix function

function adjm(a){
var b=[];
var c=[];
var e;
var matriz=[];   
for(var i=0;i<a.length;i++){
for(var j=0;j<a.length;j++){
b=elimf(a,i);
b=elimc(b,j);
e=Math.pow(-1,i+j+2)*deter(b);
c.push(e);
} 
matriz.push(c);
b=[];
c=[]; 
}
return matriz    
}
    
//13)inverse matrix function 
    
function inverm(a){
var b=a.map(function(x){return x});
var matriz=transpm(adjm(a))  ;
matriz=multe(1/deter(b),matriz);
return matriz
}
    
//14)function solution system of equations 
    
function solves(a){
var b=[]; 
var c=[];
var matriz=a 
for(var i=0;i<a.length-1;i++){
b.push(a[matriz.length-1][i]);
c.push(b);
b=[];   
}
matriz.pop();
matriz=multm(inverm(matriz),c);
return matriz
}

//15)unit conversion function

function convert(u1,u2,v){
if(u1=='mm'&& u2=='cm'){return v*0.1}
if(u1=='mm'&& u2=='m'){return v*0.001}
if(u1=='cm'&& u2=='mm'){return v*10}
if(u1=='cm'&& u2=='m'){return v*0.01}
if(u1=='m'&& u2=='mm'){return v*1000}
if(u1=='m'&& u2=='cm'){return v*100}
if(u1=='ft'&& u2=='mm'){return v*304.8}
if(u1=='ft'&& u2=='cm'){return v*30.48}
if(u1=='ft'&& u2=='m'){return v*0.3048}
if(u1=='mm'&& u2=='ft'){return v*1/304.8}
if(u1=='cm'&& u2=='ft'){return v*1/30.48}
if(u1=='m'&& u2=='ft'){return v*1/0.304}
if(u1=='ft'&& u2=='in'){return v*12}
if(u1=='in'&& u2=='ft'){return v*1/12}
if(u1=='in'&& u2=='mm'){return v*25.4}
if(u1=='in'&& u2=='cm'){return v*2.54}
if(u1=='in'&& u2=='m'){return v*0.0254}
if(u1=='yd'&& u2=='mm'){return v*914.4}
if(u1=='yd'&& u2=='cm'){return v*91.44}
if(u1=='yd'&& u2=='m'){return v*0.9144}
if(u1=='yd'&& u2=='in'){return v*36}
if(u1=='yd'&& u2=='ft'){return v*3}
if(u1=='mm'&& u2=='yd'){return v*1/914.4}
if(u1=='cm'&& u2=='yd'){return v*1/91.44}
if(u1=='m'&& u2=='yd'){return v*1/0.9144}
if(u1=='in'&& u2=='yd'){return v*1/36}
if(u1=='ft'&& u2=='yd'){return v*1/3}
if(u1=='mi'&& u2=='yd'){return v*1760}
if(u1=='mi'&& u2=='mm'){return v*1609344}
if(u1=='mi'&& u2=='cm'){return v*160934.4}
if(u1=='mi'&& u2=='m'){return v*1609.344}
if(u1=='mi'&& u2=='in'){return v*63360}
if(u1=='mi'&& u2=='ft'){return v*5280}
if(u1=='mm'&& u2=='mi'){return v*1/1609344}
if(u1=='cm'&& u2=='mi'){return v*1/160934.4}
if(u1=='m'&& u2=='mi'){return v*1/1609.344}
if(u1=='in'&& u2=='mi'){return v*1/63360}
if(u1=='ft'&& u2=='mi'){return v*1/5280}
if(u1=='yd'&& u2=='mi'){return v*1/1760}
if(u1=='km'&& u2=='mi'){return v* 1/1.609344}
if(u1=='km'&& u2=='yd'){return v*1093.61}
if(u1=='km'&& u2=='ft'){return v*1/0.0003048}
if(u1=='km'&& u2=='in'){return v*1/0.0000254}
if(u1=='km'&& u2=='mm'){return v*1000000}
if(u1=='km'&& u2=='cm'){return v*100000}
if(u1=='km'&& u2=='m'){return v*1000}
if(u1=='mi'&& u2=='km'){return v*1.609344}
if(u1=='yd'&& u2=='km'){return v*1/1093.61}
if(u1=='ft'&& u2=='km'){return v*0.0003048}
if(u1=='in'&& u2=='km'){return v*0.0000254}
if(u1=='mm'&& u2=='km'){return v*1/1000000}
if(u1=='cm'&& u2=='km'){return v*1/100000}
if(u1=='m'&& u2=='km'){return v*1/1000}
if(u1=='K'&& u2=='F'){return (9/5*(v-273.15))+32}
if(u1=='F'&& u2=='K'){return (5/9*(v-32))+273.15}
if(u1=='C'&& u2=='K'){return v+273.15}
if(u1=='K'&& u2=='C'){return v-273.15}
if(u1=='g'&& u2=='kg'){return v*1/1000}
if(u1=='g'&& u2=='oz'){return v*0.0352739619}
if(u1=='g'&& u2=='lb'){return v*0.00220462262 }
if(u1=='kg'&& u2=='g'){return v*1000}
if(u1=='oz'&& u2=='g'){return v*1/0.0352739619}
if(u1=='lb'&& u2=='g'){return v*1/0.00220462262}
if(u1=='kg'&& u2=='oz'){return v*35.2739619}
if(u1=='kg'&& u2=='lb'){return v*2.20462262}
}
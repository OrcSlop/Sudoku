var gridBoxes=[];

const originalC=[
1, 2, 3, 4, 5, 6, 7, 8, 9,
4, 5, 6, 7, 8, 9, 1, 2, 3,
7, 8, 9, 1, 2, 3, 4, 5, 6,
2, 3, 4, 5, 6, 7, 8, 9, 1, 
5, 6, 7, 8, 9, 1, 2, 3, 4,
8, 9, 1, 2, 3, 4, 5, 6, 7,
3, 4, 5, 6, 7, 8, 9, 1, 2,
6, 7, 8, 9, 1, 2, 3, 4, 5,
9, 1, 2, 3, 4, 5, 6, 7, 8];

const originalCopy=[
[1, 2, 3, 4, 5, 6, 7, 8, 9],
[4, 5, 6, 7, 8, 9, 1, 2, 3],
[7, 8, 9, 1, 2, 3, 4, 5, 6],
[2, 3, 4, 5, 6, 7, 8, 9, 1], 
[5, 6, 7, 8, 9, 1, 2, 3, 4],
[8, 9, 1, 2, 3, 4, 5, 6, 7],
[3, 4, 5, 6, 7, 8, 9, 1, 2],
[6, 7, 8, 9, 1, 2, 3, 4, 5],
[9, 1, 2, 3, 4, 5, 6, 7, 8]
]

const correctC=[1, 2, 3, 4, 5, 6, 7, 8, 9];
var sortedC=[];
var check=true;

var col1=[];
var col2=[];
var col3=[];
var col4=[];
var col5=[];
var col6=[];
var col7=[];
var col8=[];
var col9=[];

var row1=[];
var row2=[];
var row3=[];
var row4=[];
var row5=[];
var row6=[];
var row7=[];
var row8=[];
var row9=[];

const allCol=[col1, col2, col3, col4, col5, col6, col7, col8, col9];
const allRow=[row1, row2, row3, row4, row5, row6, row7, row8, row9];



const test=[[1, 2, 3], 2, 3];



function createBoxes(){
    for (let i=1; i<=81; i++){
            gridBoxes[i]=document.createElement("button");
            document.getElementById("sBody").appendChild(gridBoxes[i]);
            gridBoxes[i].classList.add("gridSquare");
            gridBoxes[i].id="square-"+i.toString();
            document.getElementById("square-"+i.toString()).innerHTML=i;
            document.getElementById("square-"+i.toString()).value=i;
    }
}

function addLines(){
    for (let i=3; i<=75;i+=9){
        gridBoxes[i].classList.add("rightBorder");
    }
    for (let i=6; i<=78;i+=9){
        gridBoxes[i].classList.add("rightBorder");
    }
    for(let i=19; i<=27;i++){
        gridBoxes[i].classList.add("bottomBorder");
    }
    for(let i=46; i<=54;i++){
        gridBoxes[i].classList.add("bottomBorder");
    }
}

function assignValues(){
    
    for (let i=1; i<=81; i++){
        document.getElementById("square-"+i.toString()).value=originalC[i-1];
        document.getElementById("square-"+i.toString()).innerHTML=document.getElementById("square-"+i.toString()).value;
    }
}

var transitionArray=[];
var iterationNum=100;
var iterationNum2=Math.floor(12*Math.random());
var group;
var vh=0;
var chosenNums=[];
var variable=0;

function shuffle(){
//Rows
    for(let l=1;l<=iterationNum;l++){
        group=Math.floor(3*Math.random());
        vh=Math.floor(2*Math.random());
        while(chosenNums.length < 2){
            let r = Math.floor(Math.random() * 3);
            if(chosenNums.indexOf(r) === -1) chosenNums.push(r);
        }
        if(vh==0){
            if(group==0){
                for(let i=0;i<9;i++){
                    transitionArray[i]=parseInt(allRow[chosenNums[0]][i]);
                    allRow[chosenNums[0]][i]=allRow[chosenNums[1]][i];
                    allRow[chosenNums[1]][i]=transitionArray[i];
                }
                update();
            } else if(group==1){
                for(let i=0;i<9;i++){
                    transitionArray[i]=parseInt(allRow[chosenNums[0]+3][i]);
                    allRow[chosenNums[0]+3][i]=allRow[chosenNums[1]+3][i];
                    allRow[chosenNums[1]+3][i]=transitionArray[i];
                }
                update();
            } else if(group==2){
                for(let i=0;i<9;i++){
                    transitionArray[i]=parseInt(allRow[chosenNums[0]+6][i]);
                    allRow[chosenNums[0]+6][i]=allRow[chosenNums[1]+6][i];
                    allRow[chosenNums[1]+6][i]=transitionArray[i];
                }
                update();
            }
            chosenNums.splice(0,2);
        } else if(vh==1){
            if(group==0){
                for(let i=0;i<9;i++){
                    transitionArray[i]=parseInt(allCol[chosenNums[0]][i]);
                    allCol[chosenNums[0]][i]=allCol[chosenNums[1]][i];
                    allCol[chosenNums[1]][i]=transitionArray[i];
                }
                update();
            }
        }
    }
}

let aStart=true;

function update(){
    for(let i=0;i<9;i++){
        for(let n=0;n<9;n++){
            if(aStart){
                allRow[i][n]=originalC[i*9+n];
                allCol[i][n]=originalC[i+n*9];
                if(i==8&&n==8){
                    aStart=false;
                }
            } else if(vh==0){
                document.getElementById("square-"+(i*9+n+1).toString()).innerHTML=parseInt(allRow[i][n]);
                allCol[i][n]=allRow[n][i];
            } else if(vh==1){
                document.getElementById("square-"+(i+n*9+1).toString()).innerHTML=parseInt(allCol[i][n]);
                allRow[i][n]=allCol[n][i];
            }
        }
    }
    
}

function checkValidity(){
    update();
    for(let i=0;i<=8;i++){
        //sortedC=allCol[i].sort(function(a, b){return a-b});
        for(u=0;u<9;u++){
             sortedC[u]=parseInt(sortedC[u]);
        }
        for(let r=0;r<9;r++){
            if(check){
            if(sortedC[r]==correctC[r]){
                console.log("correctCase");
            } else{
                 check=false;
                 console.log("Not Correct");
                }
            }
        }
    }
    check=true;
}





createBoxes();
addLines();
assignValues();
//checkValidity();
update();
shuffle();

console.table(allRow);
console.table(allCol);
console.table(originalCopy);

const btns = document.querySelectorAll("button");

for(const btn of btns){
    btn.addEventListener("click",()=>{
        console.log("button clicked!");
    });
}
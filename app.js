const fullDay = 1000*60*60*24;
const quoteURL = new URL('https://api.api-ninjas.com/v1/quotes');
const imageURL = new URL('https://picsum.photos/seed/picsum/200/300?blur');
const tip = document.querySelector(".tip");
const writer = document.querySelector(".writer");
const container = document.querySelector(".container");
const apiKey = 'JYJx6IwO94fx3fWUi97pbw==3EmWVMtjrJWTfnq8';

function tipGenerate(){
    const tipRequest = new Request(quoteURL,{
        method:'GET',
        headers:{
            'x-api-key':`${apiKey}`
        }
    });
    const imageRequest = new Request(imageURL,{
        method:'GET'
    });
    
    const getTip = fetch(tipRequest)
    .then(response=>{
        if(!response.ok) throw new Error('Invalid');
        return response.json();
    })
    .then(dataObj=>{
        console.log(dataObj);
        
        return dataObj;
    })
    .catch(error=>{
        console.log(error.message);
    });
    
    const getImage = 
    fetch(imageRequest)
    .then(response=>{
        if(!response.ok) throw new Error('Invalid');
        return response.blob();
    })
    .then(imageBlob=>{
        // console.log(data);
        let url = URL.createObjectURL(imageBlob);
        console.log(url);
        return url;
    })
    .catch(error=>{
        console.log(error.message);
    });
    
    Promise.all([getTip,getImage])
    .then(([dataObj,dataBlob])=>{
        console.log(dataObj,dataBlob);
        let output = ` <img class="w-full h-full" src="${dataBlob}" alt="bg">

        <div class="md:w-[500px] h-auto absolute bg-[#010101b7] p-4 md:p-8 rounded-[1.75rem]">
            <h1 class="text-blue-400 text-[2rem] md:text-[3rem] text-center ">Tip of the Day</h1>

            <p class="text-white text-[1rem] md:text-[2rem] tip">'${dataObj[0].quote}'</p>

            <span class="w-max text-white mt-4 ml-auto flex items-center justify-end text-[1rem] md:text-[1.3rem]"> Written By<span class="text-blue-500 ml-2 writer">${dataObj[0].author}</span></span>
        </div>`
        container.innerHTML = output;
    })
    .catch(error=>{
        console.error(error);
    })
}
window.addEventListener("DOMContentLoaded",function(){
    tipGenerate();
    setInterval(tipGenerate,fullDay);
});


 



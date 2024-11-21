console.log(this)
// const wordsContainer = document.querySelector('.words-container')
const wordsBody = document.querySelector('.words-body')

let copyBtn = document.getElementById('copy-Btn')

const searchform = document.getElementById('search-form')
const inputEle = document.querySelector('#inputEle')

// const spinner = document.querySelector('#spinner')
const loader = document.querySelector('.loader')

copyBtn.disabled = true; // initially disable means this function not work untill false.


// const toggleCopyButton = () => {
//     if (wordsBody.textContent) {
//         copyBtn.disabled = false; // OR direct written this line after data id fetch
// if content is available then show or work btn
//     } else {
//         copyBtn.disabled = true;
//     }
// };



// ------------- all event listner in the last -----------------

// searchform.addEventListener('submit', (e)=>{
//     e.preventDefault()
//     getInputWord();
// })


const getInputWord = ()=>{

   let searchedWord = inputEle.value;
   //console.log(searchedWord);
   validateInputWord(searchedWord); 
}

const validateInputWord = (searchedWord) => {
    if (searchedWord === '') {
        alert('Please fill the field.');
    }
    else if (/^[A-Za-z]+$/.test(searchedWord)) { //🔖📗  regular expression : Check if the input contains only alphabetic characters
        
        fetchData(searchedWord); // run only if vali //! 🔖📗     /^[A-Za-z]+$/.test("good")
//!    true
//!    /^[A-Za-z]+$/.test("good5")
//!    false
//!    /^[A-Za-z]+$/.test("good%")
//!    false

    } 
    else {
        alert('Please enter only alphabetic characters.');
    }
};       


const fetchData = async (searchedWord) => {
    try{
        loader.style.display="block"; //📗🔖 show spinner just before data resp coming.
        wordsBody.style.display = "none";  // body hide need when we wanna see body already exist for show. but but second search still need to hide otherwiae body and spinner both show at same time. 

        const URL = `https://api.datamuse.com/words?rel_syn=${searchedWord}`;
        const res = await fetch(URL)
        const data = await res.json();
        console.log("data", data);

        loader.style.display="none"; //📗🔖 after comming data laoder element is to be hidden.

        showData(data)
        // wordsBody.style.display = "block";  // body show bcz we have hidden above so, this good way to doit.

        // toggleCopyButton(); // Enable the copy button after data is fetched

    }catch(err){
      alert(err)
    }
}



const showData = (synonymWordsObjArr) => {
    wordsBody.style.display = "block"; 
    //👇 Variables declared with let or const are 🔖block-scoped, meaning they are only accessible within the { } block in which they are defined. and also inner block or child block.
    let wordhtml;  // it will become array. ( if we are looping via forEach() and =+ 
    console.log("wordhtml ar", wordhtml); //output: undefined why ? NOTE: by default it holds undefined bcz we have not defined it initial that way show undefined. it will become array so if u print before then show undefined or what u assigend i nitially.
    

   
    // wordsBody.innerHTML = wordhtml.join(" ");
   
    
    //  for(let i=0; i<30; i++){

    //     console.log(data[i]);
    //     const wordTemp = document.createElement('div')
    //     wordTemp.className = 'wordBox';
    //     wordTemp.innerHTML = data[i].word;
    //     wordsBody.append(wordTemp)

        // or 

        // wordsBody.innerHTML = wordsBody.innerHTML +`
        // <div class= 'wordBox'>${ data[i].word}</div>`

    //  }

    //?  word = synonymWordsObjArr.map(SingleWordData => {

        // console.log(SingleWordData.word);
        // const wordTemp = document.createElement('span')
        // wordTemp.className = 'word';
        // wordTemp.innerHTML = SingleWordData.word;
        // wordsBody.append(wordTemp)

        // or 

        //  wordsBody.innerHTML = wordsBody.innerHTML +`
        // <span class= 'word'>${SingleWordData.word}</span>`


        //?  return `<span class= 'word'>${SingleWordData.word}</span>`;
        // wordsBody.style.display = "block";

    //? });

    //? wordsBody.innerHTML = word.join("");
    // let wordjoinOut = word.join("");
    // console.log(wordjoinOut);
    
    //  ==================== via map() ========================

     if (synonymWordsObjArr.length > 0) { 

      //📗🔖here forEach() fails so real usecase of filter() and map()  forEach() fails bcz forEach() dont return anything or not create new array.
      //🤔👇Why does wordhtml contain an array in the if block but not outside?
        wordhtml = synonymWordsObjArr.map(SingleWordData => { //🔥 wordhtml is  array. 📗🔖it only show as array in same scoop means in if scoop
            console.log(SingleWordData);
            console.log(SingleWordData.word);

            // return SingleWordData.word;
            return `<span class= 'word'> ${SingleWordData.word} </span>`; // this line or template literal pass as one string element. thats why wordhtml become an Array.

        });
        /*📗🔖 here wordhtml is array of string*/console.log("wordhtml in same scoop", wordhtml); //WHY WHY WHY 🤔🤔🤔🤔 output: [] but if we write outside it then undefiend why not accesss ?
        // console.log("wordhtml join() ke sath 👉", wordhtml.join(" ")); //📗🔖 now all element is just one string.bcz of join() method /*📗🔖 here wordhtml is larger single string or say combine array element now just one string*/
        wordsBody.innerHTML = wordhtml.join(" "); //here join() Combine array into a single string and aslo here join() is used to remove , comman
        // wordsBody.innerHTML = wordhtml.join(" "); //here join() Combine array into a single string and aslo here join() is used to remove , comman
        //📗🔖 wordsBody.textContent = wordhtml; //here join() Combine array into a single string and aslo here join() is used to remove , comman

     } else {
        wordhtml = "No search results found!"; //🔥 wordhtml is assigned a string
        wordsBody.innerHTML = wordhtml;
     }
     // wordsBody.style.display = "block"; // NOTE: write here or at starting all fine. it doesn't relevent to if else.
     console.log("wordhtml arrrr", wordhtml);


    //  ==================== via forEach() ========================

    //? NOTE: need to manually construct the string outside the forEach loop since forEach does not return a new array.

//?      if (synonymWordsObjArr.length > 0) { 
//?          let wordhtml = ""; // Initialize an empty string. same name another above create variable bcz that will become array of string so that =+ can append.
//?          synonymWordsObjArr.forEach(SingleWordData => {
//?              wordhtml = wordhtml + `<span class='word'>${SingleWordData.word}</span>`; //📗🔖 Append each word and =+ via this style Array has been created. NOTE:📗🔖this line or template literal pass as one string element
//?        Note: ouside if we need to declare it also so that it can be array and hold all apenend
//?          });
//?          console.log("wordhtml after forEach", wordhtml); // Outputs the full string of HTML
//?          wordsBody.innerHTML = wordhtml; // Assign the constructed string to innerHTML
//?      } else {
//?          let wordhtml = "No search results found!"; // Assign a string if no results are found
//?          wordsBody.innerHTML = wordhtml;
//?      }
//? }
// toggleCopyButton(); // Enable the copy button after data is fetched
// or 
copyBtn.disabled = false;
}



let copyData=()=>{
   
    // let copied = wordsBody.textContent;
    // window.navigator.clipboard.writeText(copied);
    // console.log("copied",copied);

//📗🔖note: if we wanna try any method to this so we need to put a parenthes firstly then put any method with it. wordsBody.textContent
    let words = (wordsBody.textContent).split(" "); // 📗🔖 split() usecase when it see space in string from there it ctreateds as one one element like this it create array.
    console.log("words",words); //NOTE: init some Empty array  now words varible is array after using split(). 😢😔but split() also created empty array bcz of space was there that space now empty array eleemrnt.
    
    // ======== 📗🔖 remove empty array ========

    let filteredWords = words.filter(word =>{
        return word.length !== 0;
    });

    console.log("wordssss",filteredWords);
    
    let wordToCopy = filteredWords;
    // let wordToCopy = filteredWords.join(", ")
    navigator.clipboard.writeText(wordToCopy);
    
    showToast();
}


const showToast=()=>{

 let toastEle = document.querySelector('.toast')
 toastEle.style.display="block";

 setTimeout(()=>{
    toastEle.removeAttribute("style")
 },1000)
}

// --------- all event listner -------------

searchform.addEventListener('submit', (e)=>{
    e.preventDefault()
    getInputWord();
})

copyBtn.addEventListener('click', ()=>{

    copyData();
    
    // showToast(); still exist
})
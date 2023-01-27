
let arrofFeedback = [
    {
        "company":"ByteGrad",
        "badgeLetter":"B",
        "upvoteCount":593,
        "badgeColor": "rgb(15,211,211,0.8)",
        "text":"Hi #ByteGrad, I really like the courses. 😁 I just wish that you would produce more of them and faster. That would be great, as I want to be a dev!"
    },
    {
        "company":"Starbucks",
        "badgeLetter":"S",
        "upvoteCount":563,
        "badgeColor": "rgb(211,34,211,0.8)",
        "text":"I really wish #Starbucks would use hand wrappers for hot drinks as a standard, I keep burning my hands and am tired of bothering the employee."
    },
    {
        "company":"Netflix",
        "badgeLetter":"N",
        "upvoteCount":486,
        "badgeColor": "rgb(12,34,211,0.8)",
        "text":"since yday on mobile #netflix keeps buffering the video, it keeps happening even when I redownload the app. I'm in an area with decent internet btw"

    },
    {
        "company":"McDonald's",
        "badgeLetter":"M",
        "upvoteCount":377,
        "badgeColor": "rgb(32,34,18,0.8)",
        "text":"It's a real shame that my local #mcdonald's removed milkshakes from the menu. they were the reason I go to mcdonald's. 😩 please bring them back!"
    },
    {
        "company":"Amazon",
        "badgeLetter":"A",
        "upvoteCount":156,
        "badgeColor": "rgb(123,211,90,0.7)",
        "text":"Im an #amazon prime member but don't really watch the prime video offering. instead of that I would want an option for even faster delivery 😎"
    }, 
    {
        "company":"Netflix",
        "badgeLetter":"N",
        "upvoteCount":88,
        "badgeColor": "rgb(150,150,18,0.8)",
        "text":"would be great if #netflix could announce content removals further ahead. 😊 I dont want to get into a show only for it to be gone soon. thanks"

    },
    {
        "company":"Microsoft",
        "badgeLetter":"M",
        "upvoteCount":41,
        "badgeColor": "rgb(32,78,109,0.8)",
        "text":"i've been using #microsoft teams for a couple weeks now and 1 thing that really sticks out is that navigation is too difficult. please simplify it."
    },
    {
        "company":"Nike",
        "badgeLetter":"N",
        "upvoteCount":39,
        "badgeColor": "rgb(65,142,56,0.8)",
        "text":"hi #nike I love your running shoes but it's very difficult to return them after a purchase. had to do a lot of phone calls to make it work. thanks 👍"
    },
    {
        "company":"McDonald's",
        "badgeLetter":"M",
        "upvoteCount":22,
        "badgeColor": "rgb(65,89,188,0.8)",
        "text":"#mcdonald's the past few times I've been some items were missing from my order. only noticed this when I got home. straws, nuggets, fries, they missed"
    },
    {
        "company":"Adidas",
        "badgeLetter":"A",
        "upvoteCount":9,
        "badgeColor": "rgb(178,111,165,0.8)",
        "text":"i like your website #adidas, but your sizing guide needs some work. it suggested an L for me but when it arrived it was too big. still kept it btw 😎"
    }

]

//display feedback
displayFeedback(arrofFeedback);

//Display the company selection to view the specific company feedback only
displayCompanySelection();



/*
    Function to display data to html
*/ 

function displayFeedback(arr){

    const feedbackDiv = document.querySelector('.feedbackDiv');
    feedbackDiv.textContent = "";

    for(let i = 0 ; i < arr.length ; i++){

        const feedback = document.createElement('Div');
        feedback.classList.add('feedback','feedback1','row');

        const feedback_col1 = `<div class="col-12 col-md-12 col-lg-2 fback-col fback-col1">` + 
                                    `<button class="btn upVoteParent">` + 
                                    `<i class="caret fa-solid fa-caret-up d-block"></i>` + 
                                    `<span class="upVote">${arr[i]['upvoteCount']}</span>`  + 
                                    ` </button> ` +
                                `</div>`
        ;

        const feedback_col2 = `<div class=" col-2 col-md-2 col-lg-2  fback-col fback-col2 pt-2 fback_badgeParent">
                                <p class="badgge d-flex justify-content-center align-items-center" style="background:${arr[i]['badgeColor']};">${arr[i]['badgeLetter']}</p> 
                            </div> `
        ;

        const feedback_col3 = `<div class="col-10 col-md-10  col-lg-8  fback-col  fback-col3 fback_content ">
                                    <p class="fback_company"> #${arr[i]['company']}</p>
                                    <p class="fback_text">${arr[i]['text']}
                                    </p>
                                </div>`; 

        feedback.innerHTML = (feedback_col1 + feedback_col2 + feedback_col3);

        feedbackDiv.append(feedback);

    }   
    //set transition 
    //setTransition();


    //remove transition when mouseout
    //unsetTransition();

    //show whole feedback text if list is click
    showWholeFeedbackText();

    //function to process upvotecount   
    upVote();
}




/*
    Set css transition on a selected feedback 
*/

/* function setTransition(){
    const getAllfeedback = document.getElementsByClassName("feedback");
    for(let i = 0 ; i < getAllfeedback.length ; i++){
        getAllfeedback[i].addEventListener('mouseover',function(){
            getAllfeedback[i].style.backgroundColor = "rgb(255, 255, 255,1)";
            getAllfeedback[i].style.cursor = "pointer";
            getAllfeedback[i].style.transition = "all 0.2s linear 0.1s";
            getAllfeedback[i].style.paddingLeft = "2px";
        });
    }
} */

/*
    unSet css transition on a selected feedback 
*/

/* function unsetTransition(){
    const getAllfeedback = document.getElementsByClassName("feedback");
    for(let i = 0 ; i < getAllfeedback.length ; i++){
        getAllfeedback[i].addEventListener('mouseout',function(){
            getAllfeedback[i].style.paddingLeft = "unset";
            getAllfeedback[i].style.backgroundColor = "unset";
            getAllfeedback[i].style.cursor = "unset";
        });
    }
} */


/* 

    when feedback text is click it should show the whole text

*/

function showWholeFeedbackText(){

    //column where text and company name are
    const getAllfeedbackText = document.getElementsByClassName("fback-col3");

    //parent element of the three columns in feedback
    const getAllfeedbackTextParentElement = document.getElementsByClassName("feedback");
    
    for(let i = 0 ; i < getAllfeedbackText.length ;i++){
        getAllfeedbackText[i].addEventListener("click",function(){
            
            //get the height if it is set
            let height = getAllfeedbackText[i].offsetHeight;

            //parent of selected feedbackText
            let singleFeedbackText  = getAllfeedbackTextParentElement[i];
                    
            //get the 3 column then change its height to display the full content of feedback text
            let getThreeColumns = singleFeedbackText.getElementsByTagName("div");

            if(height === 70){
                        
                //unsetting the height to display full feedbacktext
                for(j = 0 ; j < getThreeColumns.length ; j++){
                    getThreeColumns[j].style.height = "140px";
                    getThreeColumns[j].style.transition = "all 1s ease";

                }  
            }else{

                //setting the height to display full feedbacktext
                for(j = 0 ; j < getThreeColumns.length ; j++){
                    getThreeColumns[j].style.height = "70px";
                    }  
            }

        });
    }

}


//Display the company selection to view the specific company feedback only

function displayCompanySelection(){
    const list_wrapper = document.querySelector('.list-wrapper');
    for(let i = 0 ; i < arrofFeedback.length ; i++){
        let insertCompany = `<li><button class="company_button">#${arrofFeedback[i]["company"]}</button></li>`;
        list_wrapper.insertAdjacentHTML("beforeend", insertCompany);
    }

    //add eventlistener to buttons
    selectedCompanyButton();
    
}

//Listene if one of the company option is click

function showSpecificCompanyFeedback(companyName){
    
    let specificCompanyFeedback = arrofFeedback.filter(element=> element["company"] == companyName );

    displayFeedback(specificCompanyFeedback);

}

//add action listener to all button with companyname text to show a particular company's feedback only

function selectedCompanyButton(){

    let companyButtons = document.getElementsByClassName("company_button");
    
    for(let i = 0 ; i < companyButtons.length ; i++){
        companyButtons[i].addEventListener("click",function(){
            showSpecificCompanyFeedback(companyButtons[i].textContent.replace("#",""));
        });
    }
    

    let showAll = document.querySelector(".showAll");
    showAll.addEventListener("click",function(){
        //redisplay all feedback
        displayFeedback(arrofFeedback);
        
    });

}

//increment if caret up is click .. this means that u have the same experience just like the others ..


function upVote(){
    
    const getAllupVote = document.getElementsByClassName("upVote");
    const getAllupVoteParent = document.getElementsByClassName("upVoteParent");
    const getAllcaretUp = document.getElementsByClassName("caret");

    for(let i  = 0 ; i < getAllupVote.length ; i++){
        getAllupVoteParent[i].addEventListener("click",function(){
            
            //check if it is caret up or down 
            let arrOfcaretClassName = Object.values(getAllcaretUp[i].classList);

            //change the icon
            if(arrOfcaretClassName.indexOf("fa-caret-up") > -1){
                getAllcaretUp[i].classList.remove("fa-caret-up");
                getAllcaretUp[i].classList.add("fa-caret-down");
                arrofFeedback[i]["upvoteCount"]  = parseInt(getAllupVote[i].textContent) + 1;
                getAllupVote[i].textContent = arrofFeedback[i]["upvoteCount"];
            }else{
                getAllcaretUp[i].classList.remove("fa-caret-down");
                getAllcaretUp[i].classList.add("fa-caret-up");
                arrofFeedback[i]["upvoteCount"]  = parseInt(getAllupVote[i].textContent) - 1;
                getAllupVote[i].textContent = arrofFeedback[i]["upvoteCount"];
            }
            
        });
    }

}

//process newly added feedback 

function addNewFeedback(){

    const submitButton = document.getElementById("submit");
    const textArea = document.querySelector("#insert-feedback");

    //get the hashtag

    const formEl = document.querySelector(".form");
    formEl.addEventListener('submit',event => {
        event.preventDefault();
        const newFeedback = {};

        let splitText = textArea.value.split(" ");
        let getCompanyName = splitText.filter(word => word[0] == "#");
        console.log(getCompanyName.length)
            if(getCompanyName.length == 1 && getCompanyName.toString().length >= 5){
                newFeedback['company'] = getCompanyName.toString().replace("#","");
                newFeedback['badgeLetter'] = newFeedback['company'][0].toUpperCase();
                newFeedback['upvoteCount'] = 0;
                
                let randomColor = "rgb("+Math.floor(Math.random() * 200) + "," +
                Math.floor(Math.random() * 200) + "," + 
                Math.floor(Math.random() * 200) + ",0.8)"

                newFeedback['badgeColor'] = randomColor;
                newFeedback['text'] = textArea.value;

                //add to array of feedback 
                arrofFeedback.push(newFeedback);
                displayFeedback(arrofFeedback);


                //add the new compny name option to companyname section
                let list_wrapper = document.querySelector('.list-wrapper');
                let insertCompany = `<li><button class="company_button">#${newFeedback['company']}</button></li>`;
                list_wrapper.insertAdjacentHTML("beforeend", insertCompany);

                    
                textArea.classList.add("form-valid");
                setTimeout(()=>{
                    textArea.classList.remove("form-valid");
                },2000)
            }else{
                textArea.classList.add("form-invalid");
                setTimeout(()=>{
                    textArea.classList.remove("form-invalid");
                },2000)
            }


    });

}

addNewFeedback();
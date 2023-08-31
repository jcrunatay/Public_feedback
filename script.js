const url = 'https://bytegrad.com/course-assets/js/1/api/feedbacks';
const submit = document.querySelector("#submit");
const spinnerWrapperEl = document.querySelector('.spinner-wrapper'); 
const company_list_wrappers = document.querySelectorAll('.list-wrapper');
const feedbackDiv = document.querySelector('.feedbackDiv');

function displayCompanySelection(arrfeedbacks){
     //reset everytime
    const list_wrappers = document.querySelectorAll('.list-wrapper');
    let arrCompanies = [];
    arrfeedbacks.forEach(feedback => {
        if(!arrCompanies.includes(feedback['company'])){
            list_wrappers.forEach(list_wrapper => {
                let insertCompany = `<li><button class="company_button">#${feedback["company"]}</button></li>`;
            list_wrapper.insertAdjacentHTML("beforeend", insertCompany);
            arrCompanies.push(feedback['company']);
            });

        }
    });
}

//get all user feedback
async function userfeedback(){
    const response = await fetch(`${url}`);
    const data = await response.json();
    return data;
}


const renderFeedbackItem = (feedback) =>{
    //get a color for the badge
    let randomColor = "rgb("+Math.floor(Math.random() * 200) + "," +
    Math.floor(Math.random() * 200) + "," + 
    Math.floor(Math.random() * 200) + ",0.8)"
    const badgeColor = randomColor;
    const feedback_content_wrapper = document.createElement('Div');
    feedback_content_wrapper.classList.add('feedback','feedback1','row');


    const new_feedback = ` <div class="col-auto col-md-2 fback-col fback-col1 pt-2">
                                <button class="btn upVoteParent"> 
                                <i class="caret fa-solid fa-caret-up d-block pe-none"></i>  
                                <span class="upVote pe-none">${feedback['upvoteCount']}</span>  
                                </button>
                            </div>                               
                            <div class="col-auto col-md-2 fback-col fback-col2 pt-3 fback_badgeParent">
                                <p class="badgge d-flex justify-content-center align-items-center" style="background:${badgeColor};">${feedback['badgeLetter']}</p> 
                            </div> 
                            
                            <div class="col col-md-8 fback-col  fback-col3 fback_content">
                                    <p class="fback_company"> #${feedback['company']}</p>
                                    <p class="fback_text">${feedback['text']}
                                    </p>
                            </div>
                            `
    ;

    feedback_content_wrapper.innerHTML = new_feedback;
    feedbackDiv.append(feedback_content_wrapper);
}


//to render feedback items and display company names
async function displayFeedback(){

    const data = await userfeedback();

    //reset everytime
    company_list_wrappers.forEach(company_list_wrapper => {
        company_list_wrapper.innerHTML = `<li><button class="company_button company--active">#Feedback</button></li>`;
    });
    
    //remove spinner
    spinnerWrapperEl.classList.add('d-none');

    data['feedbacks'].forEach(feedback => {

        renderFeedbackItem(feedback);

    });


    displayCompanySelection(data['feedbacks']);
    feedbackDiv.addEventListener('click',upvoteClickHandler);
    feedbackDiv.addEventListener('click',expandFeedback);

}    
document.addEventListener('DOMContentLoaded',displayFeedback);


//action for upvote button
const upvoteClickHandler = (event) => {
    //get the clickEl
    const clickEl = event.target;

    //check if upvoteBtn is click
    const upVoteBtn = clickEl.className.includes('upVoteParent');

    if(upVoteBtn) {
        
        //disable button to remove
        upVoteBtn.disabled = true;

        //remove the caret
        clickEl.querySelector('.fa-caret-up').remove();
    
        // get currently displayed upvote count as number (+)
        let upvoteCount = +clickEl.querySelector('.upVote').textContent;

        clickEl.querySelector('.upVote').textContent = ++upvoteCount;
    }
}

const expandFeedback = (event) => {

    //get the clickEl
    const clickEl = event.target;

    //check if the clicked element is the text inside container
    const isfback_col3_child = clickEl.className.includes('fback');


    if(isfback_col3_child){
        
    //get the container that will be expand
    const fback_col3 = clickEl.closest('.fback-col3')
    
    fback_col3.classList.toggle('h-100');

    }

}

//display feedback accdg to click company
async function displaySpecificCompanyFeedback(event){
    const feedbackItem = document.querySelectorAll('.feedback');
    feedbackItem.forEach(item => {
        item.remove();
    });

    //add spinner
    spinnerWrapperEl.classList.remove('d-none');

    //get all feedback
    const data = await userfeedback();

    //get the click element
    const clickEl = event.target;

    //check if the click button is the one with company_button class
    const isCompanyBtnClass = clickEl.className.includes('company_button');

    if(isCompanyBtnClass){
        //get the current active button 
        const current_companies__active = document.querySelectorAll('.company--active');

        current_companies__active.forEach(current_company__active => {
            current_company__active.classList.remove('company--active'); //remove bg-color
        });

        //set the new bg-color to newly click company
        clickEl.classList.add('company--active');
        const allCompanyBtn = document.querySelectorAll('.company_button');
        allCompanyBtn.forEach(companyBtn => {
            if(companyBtn.textContent === clickEl.textContent)
                companyBtn.classList.add('company--active');
        });

        //get the name of clicked Company
        const selectedCompanyName = clickEl.textContent.replace("#","");

        if( selectedCompanyName === "Feedback"){
            displayFeedback();
            return;
        }
        
        const dataByCompany = data['feedbacks'].filter((feedback) => feedback['company'] === selectedCompanyName );
        dataByCompany.forEach(feedback => {       
            renderFeedbackItem(feedback);
        });

        //remove spinner 
        spinnerWrapperEl.classList.add('d-none');
    }
}

company_list_wrappers.forEach(company_list_wrapper => {
    company_list_wrapper.addEventListener('click',displaySpecificCompanyFeedback);
});


const submitHandler = async (event) => {

    event.preventDefault();
    const textArea = document.querySelector("#insert-feedback");

    let splitText = textArea.value.split(" ");
    let getCompanyName = splitText.filter(word => word[0] == "#");

    if (textArea.value.includes('#') && textArea.value.length >= 5) {
        textArea.classList.add('form-valid');
        textArea.classList.remove('form-invalid');

        setTimeout(() => {
            textArea.classList.remove('form-valid');
        }, 1000);

    } else {
        textArea.classList.remove('form-valid');
        textArea.classList.add('form-invalid');
    
        // focus textarea
        textArea.focus();

        // stop this function execution
        return;
    }

    // we have text, now extract other info from text
    const company = getCompanyName[0].replace("#","");
    const badgeLetter = company[0];
    const upvoteCount = 0;
    const daysAgo = 0;


    const feedbackItem = {
        upvoteCount: upvoteCount,
        company: company,
        badgeLetter: badgeLetter,
        daysAgo: daysAgo,
        text: textArea.value
    };

    const option = {
        method: 'POST',
        body: JSON.stringify(feedbackItem),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }

    // send feedback item to server
    fetch(`${url}`,option).then(response => {
        if (!response.ok) {
            console.log('Something went wrong');
            return;
        }
        
        console.log('Successfully submitted');

    }).catch(error => console.log(error));

    // clear textarea
    textArea.value = '';

    const feedbackItems = document.querySelectorAll('.feedback');
    feedbackItems.forEach(item => {
        item.remove();
    });

    //get data 
    const data = await userfeedback();

    //reset everytime
    displayFeedback(data);
    

}
submit.addEventListener('click',submitHandler)






let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';



const allCardSection = document.getElementById('allSection');
const mainContainer = document.querySelector('main');
const filteredSection = document.getElementById('filterSection');

const totalAvNum = document.getElementById('totalAvNum');
const interviewAvNUM = document.getElementById('interviewAvNUM');
const rejectedAvNUM = document.getElementById('rejectedAvNUM');
const oF = document.getElementById('oF');



let total = document.getElementById('total');
let interviewCount = document.getElementById('interview');
let rejectedCount = document.getElementById('rejected');
let AvailableJobNumber = document.getElementById('AvailableJobNumber');

function calculateCount() {
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;


    if (currentStatus === 'toggleInterviewBtn') {
        AvailableJobNumber.innerText = interviewList.length;
    }
    else if (currentStatus === 'toggleRejectedBtn') {
        AvailableJobNumber.innerText = rejectedList.length;
    }
    else {
        AvailableJobNumber.innerText = allCardSection.children.length;
    }

}

const toggleAllBtn = document.getElementById('toggleAllBtn');
const toggleInterviewBtn = document.getElementById('toggleInterviewBtn');
const toggleRejectedBtn = document.getElementById('toggleRejectedBtn');

function toggleClick(id) {
    toggleAllBtn.classList.remove("text-base-300", "bg-[#3b82f6]");
    toggleInterviewBtn.classList.remove("text-base-300", "bg-[#3b82f6]");
    toggleRejectedBtn.classList.remove("text-base-300", "bg-[#3b82f6]");

    toggleAllBtn.classList.add("text-base-500", "bg-base-300");
    toggleInterviewBtn.classList.add("text-base-500", "bg-base-300");
    toggleRejectedBtn.classList.add("text-base-500", "bg-base-300");

    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.add("text-base-300", "bg-[#3b82f6]");
    selected.classList.remove("text-base-500", "bg-base-300");


    if (id == 'toggleInterviewBtn') {
        allCardSection.classList.add('hidden');
        filteredSection.classList.remove('hidden');



        renderInterview();
    }
    else if (id == 'toggleAllBtn') {
        allCardSection.classList.remove('hidden');
        filteredSection.classList.add('hidden');


    }
    else if (id == 'toggleRejectedBtn') {
        allCardSection.classList.add('hidden');
        filteredSection.classList.remove('hidden');

        renderRejected();
    }
    calculateCount();
}



mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('interview_Button')) {

        const parentNode = event.target.parentNode.parentNode;
        console.log(parentNode)

        const companyName = parentNode.querySelector('.company_name').innerText;
        const jobRole = parentNode.querySelector('.job_role').innerText;
        const salaryWork = parentNode.querySelector('.salary_work').innerText;
        const cngStatus = 'Interview';
        const job_descriptions = parentNode.querySelector('.job_descriptions').innerText;

        parentNode.querySelector('.Not_Applied').innerText = 'Interview';
        parentNode.querySelector('.Not_Applied').className = "w-[120px] text-center py-1   font-medium border-2 border-dashed border-green-800 bg-green-300 shadow";
        const cardInfo = {
            companyName,
            jobRole,
            salaryWork,
            cngStatus,
            job_descriptions
        }

        const match = interviewList.find(item => item.companyName === cardInfo.companyName);


        if (!match) {
            interviewList.push(cardInfo)
        }

        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName);

        if (currentStatus == 'toggleRejectedBtn') {
            renderInterview()
        }



        calculateCount();
    }

    else if (event.target.classList.contains('rejected_Button')) {

        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company_name').innerText;
        const jobRole = parentNode.querySelector('.job_role').innerText;
        const salaryWork = parentNode.querySelector('.salary_work').innerText;
        const job_descriptions = parentNode.querySelector('.job_descriptions').innerText;
        const cngStatus = 'Rejected';
        parentNode.querySelector('.Not_Applied').innerText = 'Rejected';
        parentNode.querySelector('.Not_Applied').className = "w-[120px] text-center py-1   font-medium border-2 border-dashed border-red-800 bg-red-300 shadow";
        const cardInfo = {
            companyName,
            jobRole,
            salaryWork,
            cngStatus,
            job_descriptions
        }

        const companyExist = rejectedList.find(item => item.companyName == companyName);

        if (!companyExist) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.companyName != companyName);

        if (currentStatus == 'toggleRejectedBtn') {
            renderRejected();
        }


        calculateCount();
    }
    // delbtn
    else if (event.target.closest('.dltBtn')) {
        const card = event.target.closest('.card_container');
        const companyName = card.querySelector('.company_name').innerText;
        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);
        card.remove('hidden');
        alert(`🚨Deleted successfully ✅✅  
 ⌛at ${new Date().toLocaleString()} `)
        calculateCount();
    }

})




function renderInterview() {

    filteredSection.innerHTML = '';

    if (interviewList.length === 0) {
        filteredSection.innerHTML = `
        <div class=" text-center bg-base-200  shadow rounded-lg py-3 md:py-10">
                <img class="mx-auto" src="jobs.png" alt="">
                <p class="text-xl">No jobs available</p>
                <p>Check back soon for new job opportunities</p>
            </div>
        `;
        return;
    }

    for (let interview of interviewList) {
        // console.log(interview);
        let div = document.createElement('div');
        div.className = 'card-container bg-base-100 rounded-xl border border-[#64748B] p-6 flex mb-4 border-l-10 border-green-500';
        div.innerHTML = `
           <div class="space-y-4  ">
                    <div>
                        <!-- company name  -->
                        <h1 class="company_name  font-medium text-[1.25rem]">
                        ${interview.companyName} </h1>
                        <!-- job role  -->
                        <p class="job_role  font-light"> ${interview.jobRole}</p>
                    </div>
                    <!-- salary and work time  -->
                    <p class="salary_work   text-xs"> ${interview.salaryWork}</p>

                    <!-- apply or reject this screen show  -->
                    <div class="space-y-3">
                        <p id="appliedBtn" class="Not_Applied w-[120px] text-center py-1   font-medium border-2 border-dashed border-green-800 bg-green-300 shadow">
                             Interview
                        </p>
                        <!-- job_descriptions -->
                        <p class="job_descriptions  text-[14px] md:text-[1rem]">
                         ${interview.job_descriptions}</p>
                    </div>

                    <!-- button main  -->
                    <div class="space-x-3">
                        <!-- interviewButton  -->
                        <button id="interviewButton"
                            class="interview_Button  btn btn-outline btn-success">Interview</button>

                        <!-- rejectedButton  -->
                        <button id="rejectedButton" class="rejected_Button btn btn-outline btn-error">Rejected</button>
                    </div>
              
                </div>
               

        `
        filteredSection.appendChild(div)
    }
}

//rejected page show design
function renderRejected() {

    filteredSection.innerHTML = '';


    if (rejectedList.length === 0) {
        filteredSection.innerHTML = `
        <div class=" text-center bg-base-200  shadow rounded-lg py-3 md:py-10">
                <img class="mx-auto" src="jobs.png" alt="">
                <p class="text-xl">No jobs available</p>
                <p>Check back soon for new job opportunities</p>
            </div> 
        `;
        return;
    }



    if (rejectedList.length === 0) {
        filteredSection.innerHTML = emptyCard;
        return;
    }

    for (let rejected of rejectedList) {
        // console.log(interview);
        let div = document.createElement('div');
        div.className = 'card-container bg-base-100 rounded-xl border border-[#64748B] p-6 flex mb-4 border-l-10 border-red-500';
        div.innerHTML = `
            <div class="space-y-4">
                    <div>
                        <!-- company name  -->
                        <h1 class="company_name  font-medium text-[1.25rem]">
                        ${rejected.companyName} </h1>
                        <!-- job role  -->
                        <p class="job_role  font-light"> ${rejected.jobRole}</p>
                    </div>
                    <!-- salary and work time  -->
                    <p class="salary_work   text-xs"> ${rejected.salaryWork}</p>

                    <!-- apply or reject this screen show  -->
                    <div class="space-y-3">
                        <p id="appliedBtn" class="Not_Applied w-[120px] text-center py-1   font-medium border-2 border-dashed border-red-800 bg-red-300 shadow">
                             Rejected
                        </p>
                        <!-- job_descriptions -->
                        <p class="job_descriptions  text-[14px] md:text-[1rem]">
                         ${rejected.job_descriptions}</p>
                    </div>

                    <!-- button main  -->
                    <div class="space-x-3">
                        <!-- interviewButton  -->
                        <button id="interviewButton"
                            class="interview_Button  btn btn-outline btn-success">Interview</button>

                        <!-- rejectedButton  -->
                        <button id="rejectedButton" class="rejected_Button btn btn-outline btn-error">Rejected</button>
                    </div>


                </div>

                
                        
        `
        filteredSection.appendChild(div)
    }
}
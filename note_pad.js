const newMission = document.querySelector('.input-mission');
const newMissionAddBtn = document.querySelector('.btn-mission-add');
const missionList = document.querySelector('.mission-list');

newMissionAddBtn.addEventListener('click', newMissionAdd);
missionList.addEventListener('click', missionDeletedCompleted);
document.addEventListener('DOMContentLoaded', scanLocalStorage);


function missionDeletedCompleted(e) {
    const clickedComponent = e.target;
    if (clickedComponent.classList.contains('mission-btn-completed')) {
        clickedComponent.parentElement.classList.toggle('mission-completed');
    }
    if (clickedComponent.classList.contains('mission-btn-delete')) {
        if (confirm('Are You Sure?')) {
            clickedComponent.parentElement.classList.toggle('dispose');
            const deletedMission = clickedComponent.parentElement.children[0].innerText;
            console.log(deletedMission);
            deleteFromLocalStorage(deletedMission);
            clickedComponent.parentElement.addEventListener('transitionend', function () {
                clickedComponent.parentElement.remove();
            });
        }

    }
}
 
function newMissionAdd(e) {
    e.preventDefault();
    if (newMission.value.length > 0) {
        missionItemCreate(newMission.value);
        //adding local Storage
        addLocalStorage(newMission.value);
        //clear value(text) after deletion.
        newMission.value = '';
    }
    else {
        alert('Notes cannot be empty.')
    }
}
function addLocalStorage(newMission) {
    let missions = localStoragetoArray();
    missions.push(newMission);
    localStorage.setItem('missions', JSON.stringify(missions));
}
function scanLocalStorage() {
    let missions = localStoragetoArray();
    missions.forEach(function (mission) {
        missionItemCreate(mission);
    });

}
function deleteFromLocalStorage(mission) {
    let missions = localStoragetoArray();
    //item deletion with suplice
    const deletedMissionIndex = missions.indexOf(mission);
    console.log(deletedMissionIndex);
    missions.splice(deletedMissionIndex, 1);
    localStorage.setItem('missions', JSON.stringify(missions));

}
function missionItemCreate(mission) {
    const missionDiv = document.createElement('div');
    missionDiv.classList.add('mission-item');
    //li creation
    const missionLi = document.createElement('li');
    missionLi.classList.add('mission-description');
    missionLi.innerText = mission;
    missionDiv.appendChild(missionLi);

    const missionCompletedBtn = document.createElement('button');
    missionCompletedBtn.classList.add('mission-btn');
    missionCompletedBtn.classList.add('mission-btn-completed');
    missionCompletedBtn.innerHTML = '<i class="fas fa-check-double"></i>';

    missionDiv.appendChild(missionCompletedBtn);
    
    const missionDeletedBtn = document.createElement('button');
    missionDeletedBtn.classList.add('mission-btn');
    missionDeletedBtn.setAttribute("id", "sil1");
    missionDeletedBtn.classList.add('mission-btn-delete');
    missionDeletedBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

    missionDiv.appendChild(missionDeletedBtn);
    missionList.appendChild(missionDiv);


}
function localStoragetoArray() {
    let missions;
    if (localStorage.getItem('missions') === null) {
        missions = [];
    } else {
        missions = JSON.parse(localStorage.getItem('missions'));
    }
    return missions;
}

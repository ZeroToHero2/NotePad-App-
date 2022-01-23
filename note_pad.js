const newMission = document.querySelector('.input-mission');
const newMissionAddBtn = document.querySelector('.btn-mission-add');
const missionList = document.querySelector('.mission-list');
//const missiondeneme = document.getElementById("add1");

newMissionAddBtn.addEventListener('click', newMissionAdd);
missionList.addEventListener('click', missionDeletedCompleted);
document.addEventListener('DOMContentLoaded', scanLocalStorage);
//missiondeneme.addEventListener('click', trialf);

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
    //,tem deletion with suplice
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
    // li yi divin içine ekledik.
    missionDiv.appendChild(missionLi);
    //ul ye oluşturduğumuz div i ekleme
    //missionList.appendChild(missionDiv);

    //tamamlandı button ekle
    const missionCompletedBtn = document.createElement('button');
    missionCompletedBtn.classList.add('mission-btn');
    // missionCompletedBtn.classList.add('input-mission')
    missionCompletedBtn.classList.add('mission-btn-completed');
    missionCompletedBtn.innerHTML = '<i class="fas fa-check-double"></i>';
    //div e ekle
    missionDiv.appendChild(missionCompletedBtn);
    // sil button ekle
    const missionDeletedBtn = document.createElement('button');
    missionDeletedBtn.classList.add('mission-btn');
    missionDeletedBtn.setAttribute("id", "sil1");
    missionDeletedBtn.classList.add('mission-btn-delete');
    missionDeletedBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    //div e ekle
    missionDiv.appendChild(missionDeletedBtn);
    //ulye oluşturduğumuz div i ekle.
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
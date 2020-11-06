document.addEventListener('DOMContentLoaded', init);

function init() {
    createCss();
    loadConfig().then(connectToLinks);
}

function createModal(spot, projects) {
    let selectedProject = null;

    const root = document.createElement('div');
    const body = document.createElement('div');
    const content = document.createElement('div');
    const close = document.createElement('button');
    const title = document.createElement('div');
    const price = document.createElement('div');
    const selectWrapper = document.createElement('div');
    const selectDescription = document.createElement('div');
    const selectInput = document.createElement('div');
    const comment = document.createElement('div');
    const reserve = document.createElement('button');

    price.classList.add('price-view');
    selectDescription.classList.add('select-description');
    selectInput.classList.add('select-input');
    selectWrapper.classList.add('select-wrapper');
    comment.classList.add('comment');
    title.classList.add('title');
    root.classList.add('modal');
    close.classList.add('modal-close');
    content.classList.add('modal-content');
    body.classList.add('modal-body');


    close.innerHTML = '&times;';
    title.innerText = spot.title;
    selectDescription.innerText = `Выберите дом`;
    reserve.innerText = `Забронировать`;

    const select = document.createElement('select');
    for (let project of projects) {
        const option = document.createElement('option');
        option.innerText = project.title;
        option.setAttribute('value', project.id);
        select.appendChild(option);
    }
    const updateActiveProject = () => {
        const id = select.options[select.selectedIndex].value;
        selectedProject = projects.find(project => project.id == id);
        comment.innerHTML = selectedProject.description;
        price.innerText = `${selectedProject.price} рублей.`;
    }
    select.addEventListener('change', updateActiveProject);
    updateActiveProject();

    selectInput.appendChild(select);   
    selectWrapper.appendChild(selectDescription);
    selectWrapper.appendChild(selectInput);
    content.appendChild(title);
    content.appendChild(selectWrapper);
    content.appendChild(price);
    content.appendChild(comment);
    content.appendChild(reserve);

    body.appendChild(close);
    body.appendChild(content);
    root.appendChild(body);
    setTimeout(() => root.classList.add('visible'), 50);
    const closeModal = () => {
        root.classList.remove('visible');
        setTimeout(() => {
            document.body.classList.remove('t-body_popupshowed', 't702__body_popupshowed');
            document.body.removeChild(root)
        }, 500);
    }
    close.addEventListener('click', closeModal);
    window.addEventListener('click', event => {
        if (event.target == root) {
            closeModal();
        }
    });
    document.body.classList.add('t-body_popupshowed', 't702__body_popupshowed');
    document.body.appendChild(root);

    reserve.addEventListener('click', () => {
        document.querySelector('input[name="house"]').value = selectedProject.title;
        document.querySelector('input[name="price"]').value = selectedProject.price;
        document.querySelector('input[name="site"]').value = spot.title;
        closeModal();
        setTimeout(() => document.querySelector('#rec245052635 a').click(), 500);
    })
}

function createCss() {
    const css = `
    #rec245052635 {
        display: none;
    }
 .modal-content .price-view {
      font-family: 'Montserrat',Arial,sans-serif;
  }
.modal {
    position: fixed; 
    z-index: 999999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,.6);
  }
  .modal-body {
    transform: translateY(30%);
  }
  .modal.visible .modal-body {
    transform: translateY(0); 
  }
  .modal-body {
    transition: all 0.5s;
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 620px;
  }
  .modal-close {
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .modal-close:hover,
  .modal-close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .modal-content .title {
    font-family: 'Montserrat',Arial,sans-serif;
    font-weight: 600;
    color: #8e9dcc;
    line-height: 1.17;
    font-size: 30px;
    margin-bottom: 12px;
    text-transform: capitalize;
  }

  .modal-content .select-wrapper {
    display: flex;
    flex-basis: 50%;
    align-items: center;
    flex: 0;
    max-width: 300px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .modal-content .select-wrapper .select-description {
    font-size: 16px;
    font-family: 'Montserrat',Arial,sans-serif;
    font-weight: 300;
    color: #000000;
  }
  .modal-content .select-input {
    position: relative;
    margin-left: 15px;
  }
  .modal-content .select-input select {
    font-family: 'Montserrat',Arial,sans-serif;
    font-weight: 300;
    line-height: 1.55;
    width: 100%;
    border: 1px #ddd solid;
    background: #ffffff;
    color: #000;
    box-sizing: border-box;
    cursor: pointer;
    padding: 2px 50px 2px 10px;
    border-radius: 1px;
    appearance: none;
    font-size: 16px;
  }
  .modal-content .select-input:after {
    content: ' ';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 5px 0 5px;
    border-color: #000 transparent transparent transparent;
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    pointer-events: none;
  }
  .modal-content .comment {
    font-family: 'Montserrat',Arial,sans-serif;
    font-weight: 300;
    color: #000000;
    font-size: 16px;
    line-height: 1.45;
    margin-top: 20px;
    margin-bottom: 12px;
  }
  .modal-content button {
    height: 60px;
    border: 0 none;
    font-size: 16px;
    white-space: normal;
    padding-left: 30px;
    padding-right: 30px;
    display: block;
    width: 50%;
    font-family: Montserrat;
    font-weight: 600;
    color: #ffffff;
    background-color: #8e9dcc;
    border-radius:1px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.4s;
  }
  .modal-content button:hover {
    background-color: #deb05b !important;
    color: #ffffff !important;
  }
  .modal-content button {
      outline: none;
  }
  .spot-disabled {
      color: #8fbc8f;
      cursor: default;
  }
`;
    const style = document.createElement('style');
    style.innerHTML = css;
    document.body.appendChild(style);
}

function connectToLinks(config) {
    const spotsById = config.spots.reduce((all, spot) => ({ ...all, [spot.id]: spot }), {});
    const showSpotModal = (event, spotId) => {
        event.preventDefault();
        createModal(spotsById[spotId], config.projects);
    };
    const spotLinksById = Array.from(document.querySelectorAll('a'))
        .reduce((all, link) => {
            const href = link.getAttribute('href') || '';
            const parsed = href.match(/#spot-popup:(\d+)/);
            if (parsed) {
                const id = parsed[1];
                all[id] = link;
            }
            return all;
        }, {});

    for (let id of Object.keys(spotLinksById)) {
        const spotLink = spotLinksById[id];
        const spot = spotsById[id];
        if (spot && spot.isAvailable) {
            spotLink.addEventListener('click', event => showSpotModal(event, id));
        } else {
            spotLink.addEventListener('click', event => event.preventDefault());
            spotLink.classList.add('spot-disabled');
        }
    }
}

const data = {
    "spots": [
        
        {
            "id": "67",
            "isAvailable": true,
            "title": "участок 67"
        },
        
        {
            "id": "57",
            "isAvailable": true,
            "title": "участок 57"
        },
        
        {
            "id": "40",
            "isAvailable": true,
            "title": "участок 40"
        },
        
        {
            "id": "28",
            "isAvailable": true,
            "title": "участок 28"
        },
        {
            "id": "27",
            "isAvailable": true,
            "title": "участок 27"
        },
        {
            "id": "12",
            "isAvailable": true,
            "title": "участок 12"
        },
        {
            "id": "01",
            "isAvailable": true,
            "title": "участок 01"
        },
        {
            "id": "02",
            "isAvailable": true,
            "title": "участок 02"
        },
        {
            "id": "19",
            "isAvailable": true,
            "title": "участок 19"
        },
        {
            "id": "03",
            "isAvailable": true,
            "title": "участок 03"
        },
        {
            "id": "37",
            "isAvailable": true,
            "title": "участок 37"
        },
        {
            "id": "27",
            "isAvailable": true,
            "title": "участок 27"
        },
        {
            "id": "26",
            "isAvailable": true,
            "title": "участок 26"
        },
        {
            "id": "25",
            "isAvailable": true,
            "title": "участок 25"
        },
        {
            "id": "24",
            "isAvailable": true,
            "title": "участок 24"
        },
        {
            "id": "23",
            "isAvailable": true,
            "title": "участок 23"
        },
        {
            "id": "22",
            "isAvailable": true,
            "title": "участок 22"
        },
        {
            "id": "21",
            "isAvailable": true,
            "title": "участок 21"
        },
        {
            "id": "20",
            "isAvailable": true,
            "title": "участок 20"
        },
        {
            "id": "18",
            "isAvailable": true,
            "title": "участок 18"
        },
        {
            "id": "04",
            "isAvailable": true,
            "title": "участок 04"
        },
        {
            "id": "17",
            "isAvailable": true,
            "title": "участок 17"
        },
        {
            "id": "16",
            "isAvailable": true,
            "title": "участок 16"
        },
        {
            "id": "15",
            "isAvailable": true,
            "title": "участок 15"
        },
        {
            "id": "14",
            "isAvailable": true,
            "title": "участок 14"
        },
        {
            "id": "13",
            "isAvailable": true,
            "title": "участок 13"
        },
        {
            "id": "12",
            "isAvailable": true,
            "title": "участок 12"
        },
        {
            "id": "11",
            "isAvailable": true,
            "title": "участок 11"
        },
        {
            "id": "10",
            "isAvailable": true,
            "title": "участок 10"
        },
        {
            "id": "09",
            "isAvailable": true,
            "title": "участок 09"
        },
        {
            "id": "08",
            "isAvailable": true,
            "title": "участок 08"
        },
        {
            "id": "07",
            "isAvailable": true,
            "title": "участок 07"
        },
        {
            "id": "06",
            "isAvailable": true,
            "title": "участок 06"
        },
        {
            "id": "05",
            "isAvailable": true,
            "title": "участок 05"
        },
        {
            "id": "59",
            "isAvailable": true,
            "title": "участок 59"
        },
        {
            "id": "58",
            "isAvailable": true,
            "title": "участок 58"
        },
        {
            "id": "57",
            "isAvailable": true,
            "title": "участок 57"
        },
        {
            "id": "56",
            "isAvailable": true,
            "title": "участок 56"
        },
        {
            "id": "55",
            "isAvailable": true,
            "title": "участок 55"
        },
        {
            "id": "54",
            "isAvailable": true,
            "title": "участок 54"
        },
        {
            "id": "53",
            "isAvailable": true,
            "title": "участок 53"
        },
        {
            "id": "52",
            "isAvailable": true,
            "title": "участок 52"
        },
        {
            "id": "51",
            "isAvailable": true,
            "title": "участок 51"
        },
        {
            "id": "50",
            "isAvailable": true,
            "title": "участок 50"
        },
        {
            "id": "49",
            "isAvailable": true,
            "title": "участок 49"
        },
        {
            "id": "48",
            "isAvailable": true,
            "title": "участок 48"
        },
        {
            "id": "47",
            "isAvailable": true,
            "title": "участок 47"
        },
        {
            "id": "46",
            "isAvailable": true,
            "title": "участок 46"
        },
        {
            "id": "45",
            "isAvailable": true,
            "title": "участок 45"
        },
        {
            "id": "36",
            "isAvailable": true,
            "title": "участок 36"
        },
        {
            "id": "44",
            "isAvailable": true,
            "title": "участок 44"
        },
        {
            "id": "43",
            "isAvailable": true,
            "title": "участок 43"
        },
        {
            "id": "42",
            "isAvailable": true,
            "title": "участок 42"
        },
        {
            "id": "41",
            "isAvailable": true,
            "title": "участок 41"
        },
        {
            "id": "40",
            "isAvailable": true,
            "title": "участок 40"
        },
        {
            "id": "39",
            "isAvailable": true,
            "title": "участок 39"
        },
        {
            "id": "38",
            "isAvailable": true,
            "title": "участок 38"
        },
        {
            "id": "35",
            "isAvailable": true,
            "title": "участок 35"
        },
        {
            "id": "34",
            "isAvailable": true,
            "title": "участок 34"
        },
        {
            "id": "33",
            "isAvailable": true,
            "title": "участок 33"
        },
        {
            "id": "32",
            "isAvailable": true,
            "title": "участок 32"
        },
        {
            "id": "31",
            "isAvailable": true,
            "title": "участок 31"
        },
        {
            "id": "30",
            "isAvailable": true,
            "title": "участок 30"
        },
        {
            "id": "29",
            "isAvailable": true,
            "title": "участок 29"
        },
        {
            "id": "65",
            "isAvailable": true,
            "title": "участок 65"
        },
        {
            "id": "64",
            "isAvailable": true,
            "title": "участок 64"
        },
        {
            "id": "63",
            "isAvailable": true,
            "title": "участок 63"
        },
        {
            "id": "62",
            "isAvailable": true,
            "title": "участок 62"
        },
        {
            "id": "61",
            "isAvailable": true,
            "title": "участок 61"
        },
        {
            "id": "60",
            "isAvailable": true,
            "title": "участок 60"
        },
        {
            "id": "66",
            "isAvailable": true,
            "title": "участок 66"
        }
    ],
    "projects": [
        {
            "id": "4",
            "title": "Дом 57 кв. м.",
            "description": "Деревянный дом в предчистовой отделке",
            "text": "Одноэтажный деревянный дом в предчистовой отделке, панорамное остекление",
            "price": "4 690 000"
        },
        {
            "id": "3",
            "title": "Дом 60 кв. м.",
            "description": "Деревянный дом в предчистовой отделке",
            "text": "Одноэтажный деревянный дом в предчистовой отделке, панорамное остекление",
            "price": "4 990 000"
        },

        {
            "id": "1",
            "title": "Дом 127 кв. м.",
            "description": "Двухэтажный дом с террасой и балконом, панорамное остекление <br />",
            "text": "Двухэтажный дом в предчистовой отделке с террасой и балконом, панорамное остекление",
            "price": "5 990 000"
        },
        {
            "id": "2",
            "title": "Дом 67 кв. м.",
            "description": "Дом из керамзитоблока в предчистовой отделке <br />",
            "text": "Одноэтажный дом из керамзитоблока в предчистовой отделке с террасой, панорамное остекление",
            "price": "4 990 000"
        },
    
        
    ]
};

function loadConfig() {
    return Promise.resolve(data);
    // return fetch('https://cors-anywhere.herokuapp.com/harmonyvillas.github.io/data.json', {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => res.json());
}

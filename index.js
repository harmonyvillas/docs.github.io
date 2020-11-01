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
    selectDescription.innerText = `Р’С‹Р±РµСЂРёС‚Рµ РґРѕРј`;
    reserve.innerText = `Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°С‚СЊ`;

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
        price.innerText = `${selectedProject.price} СЂ.`;
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
        setTimeout(() => document.querySelector('#rec244170344 a').click(), 500);
    })
}

function createCss() {
    const css = `
    #rec244170344 {
        display: none;
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
    color: #aaa;
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
    color: #000000;
    line-height: 1.17;
    font-size: 26px;
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
    font-size: 12px;
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
    background: #f8f8f8;
    color: #000;
    box-sizing: border-box;
    cursor: pointer;
    padding: 2px 30px 2px 10px;
    border-radius: 5px;
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
    font-size: 12px;
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
    width: 100%;
    font-family: Montserrat;
    font-weight: 600;
    color: #ffffff;
    background-color: #8e9dcc;
    border-radius: 8px;
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

function loadConfig() {
    return fetch('https://cors-anywhere.herokuapp.com/gucu.ru/tildafix/data.json', {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}
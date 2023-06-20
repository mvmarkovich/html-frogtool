// копировать ссылку в шеринге
document.querySelector(".js-copylink").onclick = function() {
    let copyTextarea = document.createElement("textarea");

    copyTextarea.style.position = "fixed";
    copyTextarea.style.opacity = "0";
    copyTextarea.textContent = document.querySelector('.modal__share-copylink').getAttribute('href');
 
    document.body.appendChild(copyTextarea);
    copyTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(copyTextarea);

    closeModal()
}

// смена модальных окон
let modal = document.querySelectorAll('.modal'),
    modalBtn = document.querySelectorAll('[data-modal]'),
    modalBtnClose = document.querySelectorAll('[data-close-modal]');

function openModal() {
    let modalId = this.getAttribute('data-modal');

    if(document.querySelector('.modal--open')) {
        document.querySelector('.modal--open').classList.remove('modal--open');

        setTimeout(function () {
            document.querySelector('.modal--fadeIn').classList.remove('modal--fadeIn');
        }, 50);
    }

    document.querySelector('#' + modalId).classList.add('modal--open');

    setTimeout(function () {
        document.querySelector('#' + modalId).classList.add('modal--fadeIn');
    }, 50);
}

function closeModal() {
    let openModal = document.querySelector('.modal--open');
    openModal.classList.remove('modal--fadeIn');

    setTimeout(function () {
        openModal.classList.remove('modal--open');
    }, 200);
}

for(let a = 0; a < modalBtn.length; a++) {
    modalBtn[a].addEventListener("click", openModal, false);
}

modalBtn.forEach(function(elem) {
    elem.addEventListener("click", openModal);
});

modal.forEach(function(elem) {
    elem.addEventListener("click", closeModal);

    elem.querySelector('[data-close-modal]').addEventListener("click", closeModal);

    elem.querySelector('*').addEventListener("click", function() {
        event.stopPropagation();
    });
});

// выпадающий список
document.querySelectorAll('.dropdown').forEach(function (dropdownWrapper) {
    const dropdownBtn = dropdownWrapper.querySelector('.dropdown__btn');
    const dropdownList = dropdownWrapper.querySelector('.dropdown__list');
    const dropdownItems = dropdownList.querySelectorAll('.dropdown__list-item');
    const dropdownInput = dropdownWrapper.querySelector('.dropdown__input');
    
    dropdownBtn.addEventListener('click', function () {
        dropdownList.classList.toggle('dropdown__list--visible');
        this.classList.toggle('dropdown__btn--active');
    });
    
    dropdownItems.forEach(function(listItem) {
        listItem.addEventListener('click', function (e) {
            dropdownItems.forEach(function(el) {
                el.classList.remove('dropdown__list-item--active');
            })

            e.target.classList.add('dropdown__list-item--active');
            dropdownBtn.innerHTML = this.innerHTML;
            dropdownInput.value = this.dataset.value;
            dropdownList.classList.remove('dropdown__list--visible');
        })
    })
    
    document.addEventListener('click', function (e) {
        if ( e.target !== dropdownBtn ){
            dropdownBtn.classList.remove('dropdown__btn--active');
            dropdownList.classList.remove('dropdown__list--visible');
        }
    })
    
    document.addEventListener('keydown', function (e) {
        if( e.key === 'Tab' || e.key === 'Escape' ) {
            dropdownBtn.classList.remove('dropdown__btn--active');
            dropdownList.classList.remove('dropdown__list--visible');
        }
    }) 
})

// табы
const tabs = () => { // объявляем основную функцию для вкладок, чтобы вся логика была в одном месте
    const head = document.querySelector('.frogtool__tabs-nav') // ищем элемент с кнопками и записываем в константу
    const body = document.querySelector('.frogtool__tabs-content') // ищем элемент с контентом и записываем в константу

    const getActiveTabName = () => { // объявляем функцию для получения названия активной вкладки
        return head.querySelector('.frogtool__tabs-nav-item--active').dataset.tab // возвращаем значение data-tab активной кнопки
    }

    const setActiveContent = () => { // объявляем функцию для установки активного элемента контента
        if (body.querySelector('.frogtool__tabs-section--active')) { // если уже есть активный элемент контента
            body.querySelector('.frogtool__tabs-section--active').classList.remove('frogtool__tabs-section--active') // то скрываем его
        }
        
        body.querySelector(`[data-tab=${getActiveTabName()}]`).classList.add('frogtool__tabs-section--active') // затем ищем элемент контента, у которого значение data-tab совпадает со значением data-tab активной кнопки и отображаем его
    }

    // проверяем есть ли активная вкладка
    if (!head.querySelector('.frogtool__tabs-nav-item--active')) {  // если активной вкладки нет
        head.querySelector('.frogtool__tabs-nav-item').classList.add('frogtool__tabs-nav-item--active') // то делаем активной по-умолчанию первую вкладку
    }

    setActiveContent(getActiveTabName()); // устанавливаем активный элемент контента в соответствии с активной кнопкой при загрузке страницы

    head.addEventListener('click', e => { // при клике на .tabs__head
        const caption = e.target.closest('.frogtool__tabs-nav-item'); // узнаем, был ли клик на кнопке

        if (!caption) return; // если клик был не на кнопке, то прерываем выполнение функции
        if (caption.classList.contains('.frogtool__tabs-nav-item--active')) return; // если клик был на активной кнопке, то тоже прерываем выполнение функции и ничего не делаем
        
        if (head.querySelector('.frogtool__tabs-nav-item--active')) { // если уже есть активная кнопка
            head.querySelector('.frogtool__tabs-nav-item--active').classList.remove('frogtool__tabs-nav-item--active') // то удаляем ей активный класс
        }

        caption.classList.add('frogtool__tabs-nav-item--active') // затем добавляем активный класс кнопке, на которой был клик

        setActiveContent(getActiveTabName()) // устанавливаем активный элемент контента в соответствии с активной кнопкой
    })
}

tabs() // вызываем основную функцию

// появление кнопок в рейтинге
let ratingInputs = document.querySelectorAll('.rating__input');

for (let input of ratingInputs) {
    input.addEventListener('change', function () {
        document.querySelector('.form-rating__footer').style.display = 'flex';

        console.log(this.value)

        if (this.value == 3 || this.value == 4 || this.value == 5) {
            document.querySelector('.form-rating__w-review').classList.add('is-show')
            document.querySelector('.form-rating__leave').classList.remove('is-show')
        } else {
            document.querySelector('.form-rating__leave').classList.add('is-show')
            document.querySelector('.form-rating__w-review').classList.remove('is-show')
        }
    });
}

// валидация в обратной связи
function validation(form) {
    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
            parent.querySelector('.input__error').remove()
            parent.classList.remove('error')
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('div');

        errorLabel.classList.add('input__error');
        errorLabel.textContent = text;

        parent.classList.add('error');

        parent.append(errorLabel);
    }

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const input = document.querySelector('input[name="feedback-email"]');

    function isEmailValid(value) {
        return EMAIL_REGEXP.test(value);
    }

    let result = true;

    const allInputs = form.querySelectorAll('textarea');

    const email = form.querySelector('input[name="feedback-email"]')

    for (const input of allInputs) {
        if (input.value == "") {
            removeError(input);
            createError(input, 'Error example')
            result = false;

        } else {
            removeError(input);
        }
    }

    if (!isEmailValid(email.value)) {
        removeError(input);
        createError(input, 'Error e');
        result = false;

    } else {
        removeError(input);
    }

    return result
}


document.querySelector('.feedback__form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (validation(this) == true) {
        this.querySelector('.form__success').classList.add('is-show');
    } 
})
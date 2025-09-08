import './fonts/ys-display/fonts.css'
import './style.css'
import { initPagination } from './components/pagination.js';

// Подключаем data 
import {data as sourceData} from "./data/dataset_1.js";

// Приводим их впорядок (предподготовку)

import {initData} from "./data.js";
import {processFormData} from "./lib/utils.js";

import {initTable} from "./components/table.js";
// @todo: подключение

import {initSorting} from "./components/sorting.js";
import {initFiltering} from "./components/filtering.js";
import {initSearching} from "./components/searching.js";




// Исходные данные используемые в render()
const {data, ...indexes} = initData(sourceData);

/**
 * Сбор и обработка полей из таблицы
 * @returns {Object}
 */



function collectState() {
     // Передаём form.table и инпуты в нём;

    const state = processFormData(new FormData(sampleTable.container)); // Передаём form.table и инпуты в нём;

    console.log(state);
    const rowsPerPage = parseInt(state.rowsPerPage); // Берём объект из formData возвращаем число отобр страниц
    const page = parseInt(state.page ?? 1); // page в state нету тюк это кнопка radio;
    console.log(page);
    return { 
        ...state,
        rowsPerPage,
        page
    };
}
// TEST:

/**
 * Перерисовка состояния таблицы при любых изменениях
 * @param {HTMLButtonElement?} action
 */
function render(action) {
     // состояние полей из таблицы в виде объекта;

    let state = collectState(); // состояние полей из таблицы в виде объекта;
    let result = [...data]; // копируем для последующего изменения
    // @todo: использование
    console.log(state);
    result = applySearching(result, state, action);
    result = applyFiltering(result, state, action);
    console.log(result);
    result = applySorting(result, state, action);
    result = applyPagination(result, state, action); //  resutl - данные, state - состояния полей
    sampleTable.render(result);

}

const sampleTable = initTable({
    tableTemplate: 'table',
    rowTemplate: 'row',
    before: ['search','header','filter'],
    after: ['pagination'],
}, render);

// @todo: инициализация

const applySorting = initSorting([        // Нам нужно передать сюда массив элементов, которые вызывают сортировку, чтобы изменять их визуальное представление
    sampleTable.header.elements.sortByDate,
    sampleTable.header.elements.sortByTotal
]);
console.log(indexes.sellers);
console.log(sampleTable.filter.elements);
const applyFiltering = initFiltering(sampleTable.filter.elements, {    // передаём элементы фильтра
    searchBySeller: indexes.sellers                                    // для элемента с именем searchBySeller устанавливаем массив продавцов
});

const applyPagination = initPagination(
    sampleTable.pagination.elements,             //Пагинацию передали через after - тут элементы пагинации;
    (el, page, isCurrent) => {                   // и колбэк, чтобы заполнять кнопки страниц данными;
        const input = el.querySelector('input');
        const label = el.querySelector('span');
        input.value = page;
        input.checked = isCurrent;
        label.textContent = page;
        return el;
    } 
);

const applySearching = initSearching(sampleTable.search.elements.search.dataset.name);
console.log('kek');

const appRoot = document.querySelector('#app');
appRoot.appendChild(sampleTable.container);

render();

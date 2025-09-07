import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
<<<<<<< HEAD
const compare = createComparison(defaultRules); 


export function initFiltering(elements, indexes) {
    console.log(elements);
    console.log(indexes);
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes) //[ searchBySeller ]                                     // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                          const el = document.createElement('option');
                          el.value=name;
                          el.textContent = name;
                          el.title = name;
                          return el;                          // @todo: создать и вернуть тег опции
                    })
        )
    })
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if(action && action.name == 'clear')
            action.parentNode.querySelector("[data-name]").value = '';

        // @todo: #4.5 — отфильтровать данные используя компаратор
        console.log(data);
        console.log(state);
        return data.filter(row => compare(row, state)); 
=======

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data;
>>>>>>> 7e65ca172ecd826430730549c58a24f5c1240581
    }
}
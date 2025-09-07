import {sortCollection, sortMap} from "../lib/sort.js";

<<<<<<< HEAD
export function initSorting(columns) { // columns - массив кнопок; замкнули по сути;
    console.log(columns);
=======
export function initSorting(columns) {
>>>>>>> 7e65ca172ecd826430730549c58a24f5c1240581
    return (data, state, action) => {
        let field = null;
        let order = null;

<<<<<<< HEAD
        if (action && action.name === 'sort') { // 
            // @todo: #3.1 — запомнить выбранный режим сортировки
            action.dataset.value = sortMap[action.dataset.value];   // none или другое; Ставим up;
            field = action.dataset.field;  //   total или date;  field = total, amount и др;           
            order = action.dataset.value; //    
            // @todo: #3.2 — сбросить сортировки остальных колонок
            // чтобы сбросить остальные инпуты;
            columns.forEach(column => {                                    // Перебираем элементы (в columns у нас массив кнопок)
                if (column.dataset.field !== action.dataset.field) {    // Если это не та кнопка, что нажал пользователь
                    column.dataset.value = 'none';                        // тогда сбрасываем её в начальное состояние
                }
            }); 

        } else {
            // @todo: #3.3 — получить выбранный режим сортировки
            columns.forEach(column => {                        // Перебираем все наши кнопки сортировки
                if (column.dataset.value !== 'none') {        // Ищем ту, что находится не в начальном состоянии (предполагаем, что одна)
                    field = column.dataset.field;            // Сохраняем в переменных поле
                    order = column.dataset.value;            // и направление сортировки
                }}); 
=======
        if (action && action.name === 'sort') {
            // @todo: #3.1 — запомнить выбранный режим сортировки

            // @todo: #3.2 — сбросить сортировки остальных колонок
        } else {
            // @todo: #3.3 — получить выбранный режим сортировки
>>>>>>> 7e65ca172ecd826430730549c58a24f5c1240581
        }

        return sortCollection(data, field, order);
    }
}
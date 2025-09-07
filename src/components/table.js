import { cloneTemplate } from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const { tableTemplate, rowTemplate, before, after } = settings;
    const root = cloneTemplate(tableTemplate); // вернул { form + elements}
  // @todo: #1.2 —  вывести дополнительные шаблоны до и после таблицы
    // До;
     before.reverse().forEach(subName => {                            // перебираем нужный массив идентификаторов
        root[subName] = cloneTemplate(subName);            // клонируем и получаем объект, сохраняем в таблице
        root.container.prepend(root[subName].container);    // добавляем к таблице после (append) или до (prepend)
    });
    // После;
    after.forEach(subName => {                            // перебираем нужный массив идентификаторов
        root[subName] = cloneTemplate(subName);            // клонируем и получаем объект, сохраняем в таблице
        root.container.append(root[subName].container);    // добавляем к таблице после (append) или до (prepend)
    });
  console.log(root.header);
  // @todo: #1.3 —  обработать события и вызвать onAction()
    root.container.addEventListener('change', (e)=>{
        console.log(e)
        onAction();
    })
    root.container.addEventListener('reset', (e)=>{
        setTimeout(onAction);
    })

    root.container.addEventListener('submit', (e)=>{
        e.preventDefault();
        console.log(e.submitter); // работает только при submit событии;
        onAction(e.submitter);
    })
    console.log(root);
    const render = (data) => {
    //
    // @todo: #1.1 — преобразовать данные в массив строк на основе шаблона rowTemplate
    // const nextRows = [];
    const nextRows = data.map((item) => {
      const row = cloneTemplate(rowTemplate);
      Object.keys(item).forEach((key) => {
        if (row.elements[key]) {
          if (row.elements[key] instanceof HTMLInputElement) {
            row.elements[key].value = item[key];
          } else if (row.elements[key] instanceof HTMLSelectElement) {
            row.elements[key].value = item[key];
          } else if (row.elements[key] instanceof HTMLDivElement) {
            row.elements[key].textContent = item[key];
          }
        }
      });

        return row.container;
    });
    // {{ data-name:, data-name:  }}
    // заменили в 1-ом шаблоне объект с rows на наш массив;
    root.elements.rows.replaceChildren(...nextRows); // это объект в котром elements в котором rows который явл div в него row
    };

    return { ...root, render };
}

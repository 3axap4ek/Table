
// Создаем таблицу
let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);
document.body.appendChild(table);



// Вставляем данные из обьекта в название колонки
let tr = document.createElement('tr');
let firstName = document.createElement('th');
firstName.innerHTML = `First Name`;
let lastName = document.createElement('th');
lastName.innerHTML = `Last Name`;
let about = document.createElement('th');
about.innerHTML = `About`;
let eyeColor = document.createElement('th');
eyeColor.innerHTML = `Eye color`;

tr.appendChild(firstName);
tr.appendChild(lastName);
tr.appendChild(about);
tr.appendChild(eyeColor);
thead.append(tr);



let trShow = document.createElement('tr');
let trSort = document.createElement('tr')
for(let i = 0; i<4; i++){
    // чек боксы для показа и скрытие колонок 
    const classes = ["first_name", "last_name", "about", "eye_color"]
    const tdShow = document.createElement('td');
    tdShow.innerHTML = `<div class="check_block"> Show / Hide
    <input class=${classes[i]} type = "checkbox" checked>
    </div>`
    trShow.appendChild(tdShow);
    // Select для выбора сортировки
    const tdSort = document.createElement('td')
    tdSort.innerHTML = `
        <label for="sort-select">Sorting:</label>
        <br/>
        <select name="sort" class="${classes[i]} sorting">
            <option value="">--Please choose an option--</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
        </select> `
        trSort.appendChild(tdSort);
    
}


// Добавляем чек боксы и select в tbody
tbody.appendChild(trShow);
tbody.appendChild(trSort);



// Функция для обрезания about.. 
function limitStr(str, n, symb) {
    if (!n && !symb) return str;
    symb = symb || '...';
    return str.substr(0, n - symb.length) + symb;
}

// Класс для создания td
class Table {
    constructor (id, fName, lName, aboutPerson, eyeColorG) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.aboutPerson = aboutPerson;
        this.eyeColorG = eyeColorG;
    }
  
   // Метод создающий td
    render(){
        const tr = document.createElement('tr');
        tr.id = this.id
        tr.innerHTML = `
            <td class="firstName">${this.fName}</td>
            <td class="lastName">${this.lName}</td>
            <td class="aboutMain">${limitStr(this.aboutPerson, 80)}</td>
            <td class="eyeColor" style="background-color:${this.eyeColorG}">${this.eyeColorG}</td>
        `;
        tbody.append(tr);

        return this.aboutPerson;
     
    }

}

// навигация таблицы
const tableNav = document.createElement('nav')

document.body.appendChild(tableNav);
for(let i = 0; i < 5; i++){
    const btnNav = document.createElement('button')
    btnNav.className = 'btn-nav'
    btnNav.innerHTML = `${i+1}`
    tableNav.appendChild(btnNav);
}


let mydata = getData (1);

tableNav.addEventListener('click', (e) => {
    // Загружает страницу по выбранному номеру
    function renderPage (numPage ){
      
        mydata.forEach(item => {
            const elem = document.getElementById(item.id);
             elem.remove()
        })
        mydata = getData (numPage)
        mydata.forEach(item =>{
            new Table(item.id, item.name.firstName, item.name.lastName, item.about, item.eyeColor).render();
        })
    }

    // устанавливает в дефолтное значение сортировку и кнопки
    function defaultSelect(){
        for(let i = 0; i < 4; i++){
            sorting[i].selectedIndex = 0
            
        }
        for(let i = 0; i < 5; i++){
            tableNav.childNodes[i].style.backgroundColor = ''
        }
    
    }
    // проверяем нажатие по номеру в кнопке, после чего рендерим именно ту страницу
    switch(e.target.innerHTML){

        case "1":
            defaultSelect()
            renderPage (1)
            break
        case "2":
            defaultSelect()
            renderPage (2)
            break
        case "3":
            defaultSelect()
            renderPage (3)
            break
        case "4":
            defaultSelect()
            renderPage (4)
            break
        case "5":
            defaultSelect()
            renderPage (5)
            break
        default: 
            break
    }

})


// Получаем данные с json и вставляем в таблицу с помощью метода рендер 


 function getData (j = 1) {
    tableNav.childNodes[j - 1].style.backgroundColor = 'white'
       let data =  JSON.parse(JSON.stringify(db))
       // Воспользуемся методом фильтр и будем выводить по 10 страниц
        const result = data.filter((item, i) => {
            if (i <= 9 && j == 1){
               return item
            }else if (i > 10 && i <= 20 && j == 2){
               
                return item
            }
            else if (i > 20 && i <= 30 && j == 3){
                stopAllSelect ()
                return item
            }
            else if (i > 30 && i <= 40 && j == 4){
                return item
            }
            else if (i > 40 && i <= 51 && j == 5){
                return item
            }
            })
            
    return result
  

    }

      
    mydata.forEach(item =>{
        new Table(item.id, item.name.firstName, item.name.lastName, item.about, item.eyeColor).render();
    })

   


// переменные для изменения временных данных. Что то типа useState в React
let data;
let id;
let classNameElem;

// ОБРАБОТЧИК СОБЫТИЙ //

table.addEventListener('click', (event)=>{
    // ОБРАБОТКА СОБЫТИЙ ПО ПОКАЗУ/СКРЫТИЮ КОЛОНОК

    // добавляем переменные колонок 
    const fName = document.querySelectorAll('.firstName'),
          lName = document.querySelectorAll('.lastName'),
          about = document.querySelectorAll('.aboutMain'),
          eyeColor = document.querySelectorAll('.eyeColor');

    // функция для показа/скрытия колонок
    function onShowAndHiden (item) {
       item.forEach((item)=>{
            if(item.style.visibility == 'hidden'){
                item.style.visibility = 'visible';
            }else{
                item.style.visibility = 'hidden';
            }
         
        })
    }
      // Обработчик события срабатывает на check-box и над выбранной колонкой и меняет стиль показывая или скрывая ее
    switch (event.target.className){
        case 'first_name':
            onShowAndHiden(fName)
            break
        case 'last_name':
            onShowAndHiden(lName)
            break
        case 'about':
            onShowAndHiden(about)
                break
        case 'eye_color':
            onShowAndHiden(eyeColor)
             break
         default:
            break
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ОБРАБОТКА СОБЫТИЙ ДЛЯ РЕДАКТИРОВАНИЯ СОДЕРЖИМОГО МАССИВА

      // проверяем попали ли мы на TD
      if (event.target && event.target.nodeName == "TD"){
        // делаем видимым блок с редактированием
        edit.style.display = '';
        
       
        // выделяем белым цветом выбранный элемент
        event.target.style.color = 'white';

        // Переменные хранящие в себе информацию о классе и id элемента
        data = event.target;  
        id = event.target.parentElement.id;
        classNameElem = event.target.className;

        // перебор даты для вывода полной инфрмации об about
        const elem = mydata.filter(item => {
            // проверка происходит по id элемента в mydata и по id указанном в методе рендер в классе newTable
            if(item.id === event.target.parentElement.id){
                return [item.about]
            }
        })

    
        // после чего делаем проверку, если клик по "aboutMain", то в input попадет полное описание, а иначе просто то что есть на данный момент в элементе
    
        if(event.target.className == "aboutMain" ){
            input.value = elem[0].about
            // изменяем размеры блока редактирования т.к. в about много информации
            edit.childNodes[0].style.height = '200px'
            edit.childNodes[0].style.width = '300px'
        }else{
            input.value = event.target.innerHTML
            edit.childNodes[0].style.height = '50px'
            edit.childNodes[0].style.width = '100px'
        }
      
 
    }
   
    edit.style.opacity = '0.9'
    // Устанавливаем блок справа от выбраного элемента
    edit.style.left = (event.clientX + 100) + 'px';
    edit.style.top =  (event.pageY - 30) + 'px';
  
});



// ОБРАБОТЧИК СОБЫТИЯ ДЛЯ СОРТИРОВКИ МАССИВА

// получаем select выбора сортировки
const sorting = document.querySelectorAll('.sorting')

    // Перебираем каждый select..
    sorting.forEach(item => {
        // и накидываем на каждый обработчик события.
        item.addEventListener('click', (e) => {
            // если название класса..
            switch (e.target.className){
                // совпадает с одним из выбранных..
                case 'first_name sorting':
                    // то при первом индексе..
                    if(e.target.selectedIndex == 1){
                        // массив данных переберется от A до Z..
                        mydata.sort((y, x) =>  sortArray(y.name.firstName, x.name.firstName))
                        // после чего за рендерит новый.
                        renderNewTable ()
                    // то при втором индексе..
                    }else if(e.target.selectedIndex == 2){
                        // массив данных переберется от Z до A..
                        mydata.sort((y, x) =>  sortArray(x.name.firstName, y.name.firstName))
                        // после чего за рендерит новый.
                        renderNewTable ()
                    // иначе..
                    }else{
                        // установим каждый select, кроме выбранного в начальное значение..
                        stopAllSelect (0)
                        // возьмем новую дату ..
                        
                        // с помощью новой даты сделаем рендер, таким образом при начальном значении все элементы масива будут выставлены по новой.
                        renderNewTable ()
                    }
                    break
                case 'last_name sorting':
                   
                    if(e.target.selectedIndex == 1){
                      
                        mydata.sort((y, x) =>  sortArray(y.name.lastName, x.name.lastName))
                        renderNewTable ()
                    }else if(e.target.selectedIndex == 2){
                        
                        mydata.sort((y, x) =>  sortArray(x.name.lastName, y.name.lastName))
                        renderNewTable ()
                    }else{
                        stopAllSelect (1)
                    
                        renderNewTable ()
                    }
                    break
                case 'about sorting':
                    if(e.target.selectedIndex == 1){
                    
                        mydata.sort((y, x) =>  sortArray(y.about, x.about))
                        renderNewTable ()
                    }else if(e.target.selectedIndex == 2){
                       
                        mydata.sort((y, x) =>  sortArray(x.about, y.about))
                        renderNewTable ()
                    }else{
                        stopAllSelect (2)
                     
                        renderNewTable ()
                    }
                        break
                case 'eye_color sorting':
                    if(e.target.selectedIndex == 1){
                        
                        mydata.sort((y, x) =>  sortArray(y.eyeColor, x.eyeColor))
                        renderNewTable ()
                    }else if(e.target.selectedIndex == 2){
                   
                        mydata.sort((y, x) =>  sortArray(x.eyeColor, y.eyeColor))
                        
                        renderNewTable ()
                    }else{
                        
                        stopAllSelect (3)
                       
                        renderNewTable ()
                    }
                    break
                default:
                    break
                }

        })
})

// функция сортировки массива
function sortArray(y, x){
    if (x > y ) {return -1;}
    if (x < y ) {return 1;}
    return 0;
}

// функция устанавливет каждый установленый index в select, кроме выбранного. Сделанно для того что бы обнулять каждый фильтр при нажатии на новый
function stopAllSelect (except){
    for(let i = 0; i < 4; i++){
        i === except ? null : sorting[i].selectedIndex = 0
     
    }
}


// Создаем блок редактирования
let edit = document.createElement('div');
document.body.append(edit);
// создаем для блока поле для ввода
const input = document.createElement('textarea');


// создаем для блока кнопки
const okBtn = document.createElement('button');
const cancelBtn = document.createElement('button');

// устанавливаем кнопкам определение
okBtn.textContent = 'Ok';
cancelBtn.textContent = 'Отмена';

// добавляем созданное в блок
edit.appendChild(input);
edit.appendChild(okBtn);
edit.appendChild(cancelBtn);

// делаем его невидимым 
edit.style.display = 'none';
edit.style.position = 'absolute';



// обработчик события в блоке редактирования кнопки "Ок"

okBtn.addEventListener( 'click', ()=> {
   mydata.map(item => {
    // проверяем наш id по клику, и поймав нужный объект, изменяем в нем именно тот элемент в строчке который совпадает с классом
        if(item.id == id){

            switch(classNameElem){
                case('firstName'):
                    return (item.name = {firstName: input.value, lastName: item.name.lastName }, [...mydata])
                case('lastName'):
                    return (item.name = {firstName: item.name.firstName, lastName: input.value }, [...mydata])
                case('aboutMain'):
                    return (item.about = input.value , [...mydata])
                case('eyeColor'):
                    return (item.eyeColor = input.value , [...mydata])
                default:
                    null
            }

        }

      
    })


    // После успешнего изменения наших данных, удаляем старые и выводим рендер новых
    renderNewTable()

        // Скрываем элемент и снимаем подсветку
        hideElem (edit);
        data.style.color = '';
    
});


// обработчик события в блоке редактирования кнопки "отмена"
cancelBtn.addEventListener( 'click', ()=> {
    // Скрываем элемент и снимаем подсветку
    hideElem (edit);
    data.style.color = '';
});

// функция принимает элемент и скрывает его
function hideElem (elem){
    elem.style.display = 'none';
}


// рендер новой таблицы, дефолтное значение mydata
function renderNewTable (elem = mydata) {
    elem.forEach(item =>{
        const elem = document.getElementById(item.id);
        console.log(mydata)
        console.log(elem)
        elem.remove()
        new Table(item.id, item.name.firstName, item.name.lastName, item.about, item.eyeColor).render();
        })
}





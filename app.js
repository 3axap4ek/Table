const trTable = {
    firstName: 'Имя',
    lastName: 'Фамилия',
    about: 'Описание',
    eyeColor: 'Цвет глаз'    
};

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
firstName.innerHTML = `${trTable.firstName}`;
let lastName = document.createElement('th');
lastName.innerHTML = `${trTable.lastName}`;
let about = document.createElement('th');
about.innerHTML = `${trTable.about}`;
let eyeColor = document.createElement('th');
eyeColor.innerHTML = `${trTable.eyeColor}`;

tr.appendChild(firstName);
tr.appendChild(lastName);
tr.appendChild(about);
tr.appendChild(eyeColor);
thead.append(tr);


// Показ и скрытие колонок 
let trShow = document.createElement('tr');
let tdFirstName = document.createElement('td');
tdFirstName.innerHTML = `
    <div class="check_block">Показать/скрыть
    <input class="first_name" type = "checkbox" checked>
    </div>`;

let tdLastName = document.createElement('td');
tdLastName.innerHTML = `        
<div class="check_block"> Показать/скрыть
<input class="last_name" type = "checkbox" checked>
</div>`;

let tdAbout = document.createElement('td');
tdAbout.innerHTML = `       
<div class="check_block">Показать/скрыть
<input class="about" type = "checkbox" checked>
</div>`;

let tdEyeColor = document.createElement('td');
tdEyeColor.innerHTML = `       
<div class="check_block"> Показать/скрыть
<input class="eye_color" type = "checkbox" checked>
</div>`;

trShow.appendChild(tdFirstName);
trShow.appendChild(tdLastName);
trShow.appendChild(tdAbout);
trShow.appendChild(tdEyeColor);
tbody.appendChild(trShow);

console.dir(tdFirstName);



table.addEventListener('click', (event)=>{
  // Обработчик события срабатывает на check-box и над выбранной колонкой и меняет стиль 
    const fName = document.querySelectorAll('.firstName');
    if(event.target && event.target.className == 'first_name'){
        fName.forEach((item)=>{
            if(item.style.visibility == 'hidden'){
                item.style.visibility = 'visible';
            }else{
                item.style.visibility = 'hidden';
            }
         
        });
    }
    const lName = document.querySelectorAll('.lastName');
    if(event.target && event.target.className == 'last_name'){
        lName.forEach((item)=>{
            if(item.style.visibility == 'hidden'){
                item.style.visibility = 'visible';
            }else{
                item.style.visibility = 'hidden';
            }
         
        });
    }
    const about = document.querySelectorAll('.aboutMain');
    if(event.target && event.target.className == 'about'){
        about.forEach((item)=>{
            if(item.style.visibility == 'hidden'){
                item.style.visibility = 'visible';
            }else{
                item.style.visibility = 'hidden';
            }
         
        });
    }
    const eyeColor = document.querySelectorAll('.eyeColor');
    if(event.target && event.target.className == 'eye_color'){
        eyeColor.forEach((item)=>{
           if( item.style.display == 'none'){
            item.style.display = '';
           }else{
            item.style.display = 'none';
           }
        });
    }
});


// Класс для создания td
class Table {
    constructor (fName, lName, aboutPerson, eyeColorG) {
        this.fName = fName;
        this.lName = lName;
        this.aboutPerson = aboutPerson;
        this.eyeColorG = eyeColorG;
    }
  
   // Метод создающий td
    render(){

        // Функция для обрезания about.. 
        function limitStr(str, n, symb) {
            if (!n && !symb) return str;
            symb = symb || '...';
            return str.substr(0, n - symb.length) + symb;
        }

        const tr = document.createElement('tr');
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





// Получаем данные с json и вставляем в таблицу
fetch('db.json')
.then(response => response.json())
.then(data => data.forEach((item)=>{
   
    new Table(item.name.firstName, item.name.lastName, item.about, item.eyeColor).render();

  
}));








// Создаем блок редактирования
let div = document.createElement('div');
document.body.append(div);
const input = document.createElement('textarea');
div.appendChild(input);
const okBtn = document.createElement('button');
const cancelBtn = document.createElement('button');

okBtn.textContent = 'Ok';
cancelBtn.textContent = 'Отмена';

div.appendChild(okBtn);
div.appendChild(cancelBtn);


div.style.display = 'none';
div.style.position = 'absolute';






// Обработчики событий для редактирования 
let data;

table.addEventListener('click', (event)=>{
    if (event.target && event.target.nodeName == "TD"){
        div.style.display = '';
        
        console.log(event.target);
        event.target.style.color = 'white';
        input.value = event.target.innerHTML;
      
        // event.target.innerHTML = '';
    }
       data = event.target;  
       console.log(event.pageX);
       console.log(event.pageY);
       div.style.right = '10px';
       div.style.top = event.pageY + 'px';
});



okBtn.addEventListener( 'click', ()=> {
    data.innerHTML = input.value;
    hideElem (div);
    data.style.color = '';
    console.log(data);
});

cancelBtn.addEventListener( 'click', ()=> {
    hideElem (div);
    data.style.color = '';
});

function hideElem (elem){
    elem.style.display = 'none';
}








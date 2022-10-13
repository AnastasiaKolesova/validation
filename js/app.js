let regEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/);//^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$
let regAge = /^[0-9]*?[0-9]+$/;
let regName = /[A-Za-zА-Яа-яЁё]/;


const form = document.getElementById('myForm');
const inputAll = form.querySelectorAll('.required');


//слушаем событие отправки данных и запускаем функцию прорверки
form.addEventListener('submit', subFunction);


//если значение переменной-счетчика 0, значит ошибок нет, значит отправляем форму
function subFunction(e) {
	e.preventDefault();
	let counter = validate(form);

	if (counter == 0) {
		alert('форма отправлена успешно!')
		console.log('успешно!');
	} else {
		//если значение переменной-счетчика не 0, значит есть ошибки, форму не отправляем
		e.preventDefault();
	}

}

//функция проверки на валидность и заполненность полей
function validate(form) {
	let counter = 0;

	//перебираем каждое поле ввода на соответствие классу. Для разных классов разные проверки.
	for (let index = 0; index < inputAll.length; index++) {
		const input = inputAll[index];


		if (input.classList.contains('text')) {
			/*если соответствующее поле не заполнено, добавлем переменной-счетчику 1 и подкрашиваем поле*/
			if (input.value == '') {
				addError(input);
				counter++;
				/*если соответствующее поле заполнено не верно, добавлем переменной-счетчику 1, подкрашиваем поле и выводим текст с ошибкой*/
			} else if (!regName.test(input.value)) {
				counter++;
				addError(input);
				addMessage(input);
			} else {
				/*если соответствующее поле заполнено верно,удаляем класс, перемнной-счетчику ничего не добавляем*/
				removeError(input);
				removeMessage(input);
			}
		} else if (input.classList.contains('email')) {
			if (input.value == '') {
				addError(input);
				counter++;
			} else if (!regEmail.test(input.value)) {
				counter++;
				addError(input);
				addMessage(input);
			} else {
				removeError(input);
				removeMessage(input);
			}
		} else if (input.classList.contains('age')) {
			if (input.value == '') {
				addError(input);
				counter++;
			} else if (!regAge.test(input.value)) {
				counter++;
				addError(input);
				addMessage(input);
			} else {
				removeError(input);
				removeMessage(input);
			}
		}

	}

	return counter;
	// console.log(counter)
}

//добавляем подсвечивание полей при ошибке
function addError(input) {
	input.classList.add('error')
}
function removeError(input) {
	input.classList.remove('error')
}

//добавляем сообщение об ошибке для поля при неправвильном введении
function addMessage(input) {
	let attrValueInput = input.getAttribute('name');
	let spanMessage = document.querySelector('[data-class="' + attrValueInput + '"]');
	spanMessage.innerHTML = 'некорректное введение'
}
// удаляем сообщение об ошибке
function removeMessage(input) {
	let attrValueInput = input.getAttribute('name');
	let spanMessage = document.querySelector('[data-class="' + attrValueInput + '"]');
	spanMessage.innerHTML = ''
}
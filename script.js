function createNewInput(){
    let countInput =  document.querySelectorAll('#listInput .itemInput').length;
    countInput = (countInput) ? countInput+1 : 1;
    
    let formControl = document.createElement('div');
    formControl.className = 'itemInput formControl row-flex';
    formControl.id = 'inputGroupText_'+countInput;
    
    let inputText = document.createElement('input');
    inputText.setAttribute("type", "text");
    inputText.setAttribute("placeholder", "Введите текст");
    inputText.name = 'inputText_'+countInput;
    inputText.className = 'inputText';
    
    let removeElement = document.createElement('div');
    removeElement.className = 'removeElement btn';
    removeElement.title = "Удалить поле";
    removeElement.setAttribute('data-element-id',countInput);
    removeElement.innerText = 'X';
    removeElement.onclick = removeInputControl.bind(this,countInput);
    
    formControl.append(inputText,removeElement);

    document.getElementById('listInput').append(formControl);
}

function removeInputControl(idElement){
    document.getElementById('inputGroupText_'+idElement).remove();
}

function constructorView(event){
    event.preventDefault();
    document.getElementById('error_panel').className = "";
    if (document.getElementById('createBlock')) document.getElementById('createBlock').remove();
    let listInput = document.querySelectorAll('#listInput .inputText')
    let length = document.getElementById('lengthBlock');
    let height = document.getElementById('heightBlock');
    let color = document.getElementById('colorBlock');
    length.classList.remove('error');
    height.classList.remove('error');
    color.classList.remove('error');
    for (let elem of listInput) {
        if (elem.value.length>1){
            elem.classList.remove('error');
        } 
    }
    if (validatorData(length,height,color,listInput)){
        let strContent = '';
        for (let elem of listInput) {
            strContent += elem.value+'</br>';
        }
        let createBlock = document.createElement('div');
        createBlock.id = 'createBlock';
        createBlock.style.backgroundColor = color.value;
        createBlock.style.textAlign = 'center';
        createBlock.style.height = height.value+'px';
        createBlock.style.width = length.value+'px';
        createBlock.innerHTML = strContent;
        document.getElementById('rightBlock').append(createBlock);
    }
    else{
        document.getElementById('error_panel').className = "show";
    }

    return true;
}

function validatorData(length,height,color,listInput){
    let validator = true;
    if (validatorNumberErr(Number(length.value)) || Number(length.value)<50 || Number(length.value)>1000){
        length.classList.add('error');
        validator = false;
    }
    if (validatorNumberErr(Number(height.value)) || Number(height.value)<50 || Number(height.value)>600){
        height.classList.add('error');
        validator = false;
    }
    if (color.value.length<1){
        color.classList.add('error');
        validator = false;
    }
    for (let elem of listInput) {
        if (elem.value.length<1){
            elem.classList.add('error');
            validator = false;
        } 
    }

    return validator;
}

function validatorNumberErr(num){
    if (!isFinite(num) || typeof num != 'number' || isNaN(num)){
        return true;
    }
    return false;
}

function initUsabiliti(){
    document.getElementById('btnAdd').addEventListener("click",createNewInput);
    document.getElementById('settingsBlock').addEventListener("submit",constructorView);
}

document.addEventListener("DOMContentLoaded", initUsabiliti);
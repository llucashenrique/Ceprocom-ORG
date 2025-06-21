const form = document.querySelector("form"),
    nextBtn = form.querySelector(".nextBtn"),
    backBtn = form.querySelector(".backBtn"),
    allInput = form.querySelectorAll(".first input"),
    submitBtn = form.querySelector(".submitBtn");


nextBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let allValid = true;

    allInput.forEach(input => {
        if (!input.checkValidity()) {
            allValid = false;
            input.reportValidity();
        }
    });
    if (allValid) {
        form.classList.add('secActive');
    }
});


backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    form.classList.remove('secActive');
});

submitBtn.addEventListener("click", (e) => {
    if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
    }
});


/*CEP e RG*/
// Formatação do CPF
// Formatação do CPF
function formatCPF(cpfField) {
    cpfField.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto após os 3 primeiros dígitos
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto após os próximos 3 dígitos
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen antes dos últimos 2 dígitos
        e.target.value = value;
    });
}

// Formatação do RG
function formatRG(rgField) {
    rgField.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
        value = value.replace(/(\d{2})(\d)/, '$1.$2'); // Coloca um ponto após os 2 primeiros dígitos
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto após os próximos 3 dígitos
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen antes dos últimos dígitos
        e.target.value = value;
    });
}

// Seleciona todos os campos de CPF e RG e aplica a formatação
const cpfFields = document.querySelectorAll('#cpffilho, #cpfmae, #cpfpai');
cpfFields.forEach(formatCPF);

const rgFields = document.querySelectorAll('#rgfilho, #rgmae, #rgpai');
rgFields.forEach(formatRG);

// Formatação do Telefone
function formatPhone(phoneField) {
    phoneField.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
        value = value.replace(/(\d{2})(\d)/, '($1) $2'); // Adiciona parênteses para o DDD
        value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen após os primeiros 5 dígitos do número
        e.target.value = value;
    });
}

// Seleciona todos os campos de telefone e aplica a formatação
const phoneFields = document.querySelectorAll('#telefomae, #telefonepai');
phoneFields.forEach(formatPhone);

function formatCurrency(inputField) {
    inputField.addEventListener('input', function (e) {
        let value = e.target.value;

        // Remove qualquer caractere que não seja número
        value = value.replace(/\D/g, '');

        // Adiciona a vírgula e pontos na posição correta
        value = (value / 100).toFixed(2).replace('.', ','); // Formata com duas casas decimais
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos a cada três dígitos

        e.target.value = value;
    });
}

// Função para limitar o ano a 4 dígitos
document.getElementById('ano').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    if (value.length > 4) {
        value = value.slice(0, 4); // Limita a 4 dígitos
    }
    e.target.value = value;
});





document.getElementById('donation-form').addEventListener('submit', function (event) {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const streetAddress = document.getElementById('street-address').value;
    const postalCode = document.getElementById('postal-code').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;

    if (!firstName || !lastName || !streetAddress || !postalCode || !city || !state) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        event.preventDefault(); // Impede o envio do formulário se houver campos vazios
    }
});
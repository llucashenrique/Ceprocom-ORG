document.getElementById('postal-code').addEventListener('blur', async function() {
    const cep = this.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico

    if (cep.length === 8) { // O CEP deve ter 8 dígitos
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) {
                throw new Error('Erro ao buscar CEP');
            }
            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado.');
            } else {
                document.getElementById('city').value = data.localidade;
                document.getElementById('state').value = data.uf;
            }
        } catch (error) {
            console.error('Erro ao buscar o CEP:', error);
            alert('Não foi possível buscar o CEP. Tente novamente mais tarde.');
        }
    } else {
        alert('Por favor, insira um CEP válido com 8 dígitos.');
    }
});

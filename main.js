const form = document.getElementById('form-atividade');

const imgAprovado = '<img src="Material de Apoio/images/aprovado.png" alt="Emoji Celebrando" />';
const imgReprovado = '<img src="Material de Apoio/images/reprovado.png" alt="Emoji Decepcionado" />';
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

const notaMinima = parseFloat(prompt('Digite a nota mínima para ser Aprovado: '));

const atividades = [];
const notas = [];

let linhas = '';    // Subiu ao escopo Global pois toda vez que estava acionando o Submit, estava sendo resetado

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

    // Função para verificar se o nome é válido (somente letras e espaços)
function isValidName(name) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    return regex.test(name);
};

// Apenas adicionar uma nova linha sem que suma a anterior  
function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaMateria = document.getElementById('nota-materia');

    //  Mensagem para saber o valor mínimo para ser aprovado 
    if (atividades.includes(inputNomeAtividade.value)) {
        Swal.fire({
            icon: 'error', // Opcional: ícone do alerta
            html: `A atividade: <i><b>${inputNomeAtividade.value}</b></i> já foi inserida!`,
            confirmButtonText: 'OK'
        });
        } else {
        // Adiciona a atividade e a nota às respectivas listas
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaMateria.value));
    
        // Cria uma nova linha para a tabela
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`; //linha +=  (Linha + Linha = `conteudo adicional`)
        linha += `<td>${inputNotaMateria.value}</td>`;
        linha += `<td>${inputNotaMateria.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; // ? Significa que caso seja >= 7 será Aprovado, e : significa o reverso ou seja, Reprovado
        linha += '</tr>';
    
        linhas += linha;
    };    

    // Limpa os campos de entrada
    inputNomeAtividade.value = '';
    inputNotaMateria.value = '';
};

// Somente para atualizar a tabela
function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
};

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); //Setar .toFixed(2) para apresentar somente 2 casas decimais
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
};

function calculaMediaFinal() {
    let somaDasNotas = 0;
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
};

const form = document.getElementById("formAluno");
const resultado = document.getElementById("resultado");
const recuperacaoDiv = document.getElementById("recuperacaoDiv");
const recuperacaoInput = document.getElementById("recuperacao");

function exibirResultado(texto, classe) {
  resultado.textContent = texto;
  resultado.className = `result-box ${classe}`;
}

function limparRecuperacao() {
  recuperacaoInput.value = "";
  recuperacaoDiv.style.display = "none";
}

function mostrarRecuperacao() {
  recuperacaoDiv.style.display = "block";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const numAulas = parseInt(form.numAulas.value);
  const faltas = parseInt(form.faltas.value);
  const p1 = parseFloat(form.p1.value);
  const p2 = parseFloat(form.p2.value);
  let recuperacao = parseFloat(form.recuperacao.value);

  // Validação simples
  if (faltas > numAulas) {
    alert("Número de faltas não pode ser maior que número de aulas.");
    return;
  }

  const percentualFaltas = (faltas / numAulas) * 100;
  const percentualPresenca = 100 - percentualFaltas;
  const media = (p1 + p2) / 2;

  let textoResultado = "";
  textoResultado += `Número de aulas do semestre: ${numAulas}\n`;
  textoResultado += `Número de faltas do aluno: ${faltas}\n`;
  textoResultado += `Percentual de presença do aluno: ${percentualPresenca.toFixed(2)}%\n\n`;
  textoResultado += `Primeira nota (P1): ${p1}\n`;
  textoResultado += `Segunda nota (P2): ${p2}\n\n`;

  if (percentualPresenca < 75) {
    exibirResultado(textoResultado + "Situação final do aluno: REPROVADO POR FREQUÊNCIA", "red");
    limparRecuperacao();
    return;
  }

  if (media >= 7) {
    exibirResultado(textoResultado + "Situação final do aluno: APROVADO", "green");
    limparRecuperacao();
  } else if (media >= 5 && media < 7) {
    // Precisa de recuperação
    if (isNaN(recuperacao)) {
      mostrarRecuperacao();
      exibirResultado(textoResultado + "O aluno está em RECUPERAÇÃO. Por favor, insira a nota da prova complementar.");
      return;
    } else {
      const mediaFinal = (media + recuperacao) / 2;
      textoResultado += `Nota complementar (recuperação): ${recuperacao}\n\n`;
      if (mediaFinal >= 5) {
        exibirResultado(textoResultado + "Situação final do aluno: APROVADO NA RECUPERAÇÃO", "green");
      } else {
        exibirResultado(textoResultado + "Situação final do aluno: REPROVADO NA RECUPERAÇÃO", "red");
      }
      limparRecuperacao();
    }
  } else {
    exibirResultado(textoResultado + "Situação final do aluno: REPROVADO POR NOTA", "red");
    limparRecuperacao();
  }
});

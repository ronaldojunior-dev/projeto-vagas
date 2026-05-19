const candidatos = [
    {
        nome: "João",
        area: "Desenvolvimento de Software",
        habilidades: ["JavaScript", "Python", "Java"],
        experienciaMeses: 5,
    },
    {
        nome: "Felipe",
        area: "Front-end",
        habilidades: ["HTML", "CSS", "JavaScript"],
        experienciaMeses: 24,
    },
    {
        nome: "Manuela",
        area: "Back-end",
        habilidades: ["Python", "Django", "SQL", "Java"],
        experienciaMeses: 15,
    }
];

const vagas = [
    {
        id: 1,
        empresa: "Softplan Planejamento e sistemas",
        cargo: "Desenvolvedor Full Stack",
        requisitos: ["JavaScript", "Python", "Java", "SQL", "Django", "HTML", "CSS"],
        salario: 8500,
        modalidade: "Presencial",
    },
    {
        id: 2,
        empresa: "Dígitro Tecnologia",
        cargo: "Desenvolvedor Front-end Júnior",
        requisitos: ["HTML", "CSS", "JavaScript"],
        salario: 3750,
        modalidade: "Presencial",
    },
    {
        id: 3,
        empresa: "SCADAHUB Tecnologia",
        cargo: "Analista de Software Júnior",
        requisitos: ["JavaScript", "Java"],
        salario: 3200,
        modalidade: "Remoto",
    }
];

function calcularCompatibilidade(candidato, vaga) {
    const habilidadesEncontradas = vaga.requisitos.filter(requisito =>
        candidato.habilidades.includes(requisito)
    );

    const habilidadesFaltantes = vaga.requisitos.filter(requisito =>
        !candidato.habilidades.includes(requisito)
    );

    const compatibilidade = (habilidadesEncontradas.length / vaga.requisitos.length) * 100;

    let classificacao = "";
    if (compatibilidade >= 80) {
        classificacao = "Alta compatibilidade";
    } else if (compatibilidade >= 50) {
        classificacao = "Média compatibilidade";
    } else {
        classificacao = "Baixa compatibilidade";
    }

    return {
        empresa: vaga.empresa,
        cargo: vaga.cargo,
        compatibilidade: Number(compatibilidade.toFixed(0)),
        habilidadesEncontradas,
        habilidadesFaltantes,
        classificacao,
    };
}

function analisarCandidato(candidato) {
    console.log(`\n=====================================\nCANDIDATO: ${candidato.nome}\n=====================================\n`);

    const resultados = vagas.map(vaga => calcularCompatibilidade(candidato, vaga));

    resultados.forEach(resultado => {
        console.log(`Empresa: ${resultado.empresa}`);
        console.log(`Cargo: ${resultado.cargo}`);
        console.log(`Compatibilidade: ${resultado.compatibilidade}%`);
        console.log(`Classificação: ${resultado.classificacao}`);
        console.log(`Habilidades : ${resultado.habilidadesEncontradas.join(", ")}`);
        console.log(`Habilidades Necessárias: ${resultado.habilidadesFaltantes.join(", ")}`);
        console.log("---------------------------------------------------");
    });

    const melhorVaga = resultados.reduce((melhor, atual) =>
        Number(atual.compatibilidade) > Number(melhor.compatibilidade) ? atual : melhor
    );

    console.log(`\n=====================================\nVAGA MAIS COMPATÍVEL\n=====================================\n${melhorVaga.cargo}\nCompatibilidade: ${melhorVaga.compatibilidade}%\n`);
}

candidatos.forEach(analisarCandidato);

function exibirRecomendacoes(candidato, melhorVaga) {

    console.log(`
Recomendações para ${candidato.nome}:
`);

if (melhorVaga.habilidadesFaltantes.length > 0) {

        console.log(`
Priorize estudar:

- ${melhorVaga.habilidadesFaltantes.join("\n- ")}
`);

    } else {

        console.log(`
Parabéns!

Você atende todos os requisitos.
`);
    }

    finalizarAnalise(
        candidato.nome,
        exibirMensagemFinal
    );
}


function finalizarAnalise(nomeCandidato, callback) {

    console.log(`
Análise finalizada.
`);

    callback(nomeCandidato);
}

function exibirMensagemFinal(nome) {

    console.log(`
${nome},
continue evoluindo suas habilidades!
`);
}
  
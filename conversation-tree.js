let delito;
let local;
let turno;
let hasScenario = false;
let isFirst = true;

module.exports = function conversation(message) {

    if (!hasScenario) {
        response = criaScenario(message);

        if (hasScenario) {
            response = response.concat(imprimeCenario());
        }
    }

    return response;
}

function imprimeCenario() {
    return [
        "Vamos revisar",
        `O ${delito} ${local}, no período ${turno}`
    ];
}

function criaScenario(message) {
    let response = "Calma, você poderia tentar descrever de outra forma?";

    if (!delito) {
        response = detecçãoDoDelito(message, response);
    } else if (!local) {
        response = detecçãoDoLocal(message);
    } else if (!turno) {
        detecçãoDoTurno(message);

        if (turno) {
            response = ["Obrigado"];
            hasScenario = true;
        } else {
            response = [
                "Desculpa",
                "Nós queremos muito te ajudar",
                "Mas precisamos quando aconteceu"
            ];
        }
    } else {
        hasScenario = true;
    }

    return response;
}

function saldacao() {
    if (new Date().getHours() < 12 && new Date().getHours() > 3) {
        return "Bom dia";
    } else if (new Date().getHours() < 18) {
        return "Boa tarde";
    } else {
        return "Boa noite";
    }
}

function detecçãoDoTurno(message) {
    if ((message.search(/ manhã/i) >= 0)|| (message.search(/ manha/i) >= 0)) {
        turno = "MANHÃ";
    } else if (message.search(/tarde/i) >= 0) {
        turno = "TARDE";
    } else if (message.search(/noite/i) >= 0) {
        turno = "NOITE";
    }
}

function detecçãoDoDelito(message) {
    let response = [];

    if (isFirst) {
        response = response.concat([saldacao()]);
    } 
    
    response = response.concat(["Oxe, onde foi que aconteceu isso?"]);
    
    if (furto(message)) {
        delito = "FURTO";
    } else if (assalto(message)) {
        delito = "ROUBO";
    } else {
        return response.concat(["A gente não entendeu muito não, tenta explicar de outra forma"]);
    }

    return response;
}


function detecçãoDoLocal(message) {
    let response = [
        "Pronto", 
        "Agora precisamos saber se foi pela manhã, tarde ou noite"
    ];

    _local = message.split(" ");

    if (_local && _local.length <= 2) {
        local = message;
    } else {
        disseLocal(message);

        if (!local) {
            response = [
                "Desculpa",
                "Nós queremos muito te ajudar",
                "Mas precisamos saber onde aconteceu"
            ];
        }
    }

    return response;
}

function disseLocal(message) {
    const possibilities = [
        /foi no/i,
        /foi em/i,
        /naquela/i,
        /fui ao/i,
        /aqui em/i,
        /aqui no/i,
        /aqui/i,
        /eu tava na/i,
        /eu estava na/i,
    ]

    possibilities.forEach(pos => {
        const cuted = message.split(pos);
        
        if (cuted.length > 1) {
            local = cuted[1];
            return;
        }
    });
}

function furto(message) {
    return (message.search(/furt/i) >= 0) ||
    (message.search(/não vi/i) >= 0) ||
    (message.search(/nem vi/i) >= 0);
}

function assalto(message) {
    return (message.search(/assalt/i) >= 0) ||
    (message.search(/arma/i) >= 0) ||
    (message.search(/ameaç/i) >= 0) ||
    (message.search(/roub/i) >= 0) ||
    (message.search(/tiro/i) >= 0);
}
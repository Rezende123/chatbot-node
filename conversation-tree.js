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
        `O ${delito} ${local}, durante a ${turno}`
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
    } else if (message.search(/agora/i) >= 0) {
        if (new Date().getHours() < 12 && new Date().getHours() > 3) {
            turno = "MANHÃ";
        } else if (new Date().getHours() < 18) {
            turno = "TARDE";
        } else {
            turno = "NOITE";
        }
    }
}

function detecçãoDoDelito(message) {
    let response = [];

    if (isFirst) {
        response = response.concat([saldacao()]);
    } 
    
    
    if (furto(message)) {
        delito = "FURTO";
        response = response.concat(["Oxe, onde foi que aconteceu isso?"]);
    } else if (assalto(message)) {
        delito = "ROUBO";
        response = response.concat(["Oxe, onde foi que aconteceu isso?"]);
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
    const possibilities = [
        /furt/i,
        /não vi/i,
        /nem vi/i
    ];
    let res = false;

    possibilities.forEach(pos => {        
        if (message.search(pos) >= 0) {
            res = true;
        }
    });

    return res;
}

function assalto(message) {
    const possibilities = [
        /assalt/i,
        /arma/i,
        /ameaç/i,
        /roub/i,
        /tiro/i,
    ];
    let res = false;

    possibilities.forEach(pos => {        
        if (message.search(pos) >= 0) {
            console.log("asdadasdas")
            res = true;
        }
    });

    return res;
}

function contraMulher(message) {
    const possibilities = [
        /marido/i,
        /namorado/i,
        /ex-/i,
        /chefe/i,
        /patrão/i,
        /homem/i,
    ];
    let res = false;

    possibilities.forEach(pos => {        
        if (message.search(pos) >= 0) {
            res = true;
        }
    });

    return res;
}
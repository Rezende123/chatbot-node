let delito;
let local;
let turno;
let hasScenario = false;
let isFirst = true;

module.exports = function conversation(message) {

    if (!hasScenario) {
        response = criaScenario(message);

        if (hasScenario) {
            console.log("has");
            response = response.concat(imprimeCenario());
        }
    }

    return response;
}

function imprimeCenario() {
    return [
        "Vamos recaptular",
        `O ${delito} foi ${local}, no período ${turno}`
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

    if (furto(message)) {
        delito = "FURTO";
        return response.concat(["Vish, onde foi que aconteceu isso?"]);
    } else {
        return response.concat(["Infelizmente a gente não entendeu o acontecido, poderia explicar de outra forma?"]);
    }

}


function detecçãoDoLocal(message) {
    disseLocal(message);
    let response = [
        "Pronto", 
        "Agora precisamos saber em que turno ocorreu",
        "Se foi pela manhã, tarde ou noite"
    ];

    if (!local) {
        _local = message.split(" ");

        if (_local && _local.length <= 3) {
            local = _local;
        } else {
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
        "foi no",
        "foi em",
        "naquela",
        "fui ao",
        "aqui em",
        "aqui no",
        "aqui",
        "eu tava na",
        "eu estava na",
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
module.exports = function getSolution(type, shift, location) {
    const data = [
        {
            type: "FURTO",
            shift: "MANHÂ",
            staps: [
                `Você pode registrar o boletim através do site https://www.delegaciadigital.ssp.ba.gov.br/`,
                `Ou ir para a Delegacia mais perto do(a) ${location} registrar queixa`,
                `Para acompanhar o processo, acesse o site https://www.delegaciaonline.pb.gov.br/pages/index.xhtml`
            ]
        },
        {
            type: "FURTO",
            shift: "TARDE",
            staps: [
                `Você pode registrar o boletim através do site https://www.delegaciadigital.ssp.ba.gov.br/`,
                `Ou ir para a Delegacia mais perto do(a) ${location} registrar queixa, só tome cuidado com o horário`,
                `Para acompanhar o processo, acesse o site https://www.delegaciaonline.pb.gov.br/pages/index.xhtml`
            ]
        },
        {
            type: "FURTO",
            shift: "NOITE",
            staps: [
                `Você pode registrar o boletim através do site https://www.delegaciadigital.ssp.ba.gov.br/`,
                `Ou ir para a Delegacia mais perto do(a) ${location} registrar queixa, só tome cuidado com o horário`,
                `Para acompanhar o processo, acesse o site https://www.delegaciaonline.pb.gov.br/pages/index.xhtml`
            ]
        },
        {
            type: "ROUBO",
            shift: "MANHÂ",
            staps: [
                `Você pode registrar o boletim através do site https://www.delegaciadigital.ssp.ba.gov.br/`,
                `Ou ir para a Delegacia mais perto do(a) ${location} registrar queixa`,
                `Para acompanhar o processo, acesse o site https://www.delegaciaonline.pb.gov.br/pages/index.xhtml`
            ]
        },
        {
            type: "ROUBO",
            shift: "TARDE",
            staps: [
                `Você pode registrar o boletim através do site https://www.delegaciadigital.ssp.ba.gov.br/`,
                `Ou ir para a Delegacia mais perto do(a) ${location} registrar queixa, só tome cuidado com o horário`,
                `Para acompanhar o processo, acesse o site https://www.delegaciaonline.pb.gov.br/pages/index.xhtml`
            ]
        },
        {
            type: "ROUBO",
            shift: "NOITE",
            staps: [
                `Você pode registrar o boletim através do site https://www.delegaciadigital.ssp.ba.gov.br/`,
                `Ou ir para a Delegacia mais perto do(a) ${location} registrar queixa, só tome cuidado com o horário`,
                `Para acompanhar o processo, acesse o site https://www.delegaciaonline.pb.gov.br/pages/index.xhtml`
            ]
        }
    ]

    const dataFiltred = data.find(_data => _data.shift === shift && _data.type === type);

    console.log(dataFiltred);
    if (dataFiltred) {
        return dataFiltred.staps;
    }
}


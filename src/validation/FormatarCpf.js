const FormatCPF = (cpf) => {
    var cpf = String(cpf);
    cpf = cpf.replaceAll("-","");
    cpf = cpf.replaceAll(".","");
    return cpf;
}

export default FormatCPF;
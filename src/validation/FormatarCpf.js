const formatCPF = (cpf) => {
    var cpf = String(cpf);
    cpf = cpf.replaceAll("-","");
    cpf = cpf.replaceAll(".","");
    return cpf;
}

export default formatCPF;
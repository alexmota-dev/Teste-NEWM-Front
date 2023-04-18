const formatarCPF = (cpf) => {
    return cpf.replace(/[^\d]+/g, '');
}

export default formatarCPF;
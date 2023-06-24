const verifyName = (nome) => {
    if(nome != ""){
        var regex = /^[a-zA-ZÀ-ÿ\s]+$/;
        return regex.test(nome);
    }
    else{
        return false;
    }
}
export default verifyName;
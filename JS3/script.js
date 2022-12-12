function counter(x){
    var secret = x;
    return function(){;
        return secret+=1;
    }
}

const incrementar = counter(10);

console.log('Primeira chamada ' + incrementar());
console.log('Segunda chamada ' + incrementar());
console.log('Terceira chamada ' + incrementar());
class IntegerSet{
    constructor(max){
        this.max = max;
        this.vet = [];

        for(let i=1;i<this.max;i++){
            this.vet[i] = false;
        }
    }
    insercao(num){
        if(num>0 || num<max){
            this.vet[num] = true;
        }
    }
    exclusao(num){
        if(this.vet[num]==true){
            this.vet[num] = false;
        }
    }
    uniao(conj){
        if(conj.max>this.max){
            this.max = conj.max;
        }

        for(let i=1;i<this.max;i++){
            if(conj.vet[i]==true && (this.vet[i]==false || this.vet[i]==undefined)){
                this.vet[i] = true;
            }
            if(this.vet[i]==undefined){
                this.vet[i] = false;
            }
        }
    }
    intersecao(conj){
        if(conj.max>this.max){
            this.max = conj.max;
        }

        for(let i=1;i<this.max;i++){
            if(this.vet[i]==true && conj.vet[i]==false){
                this.vet[i] = false;
            }
            if(this.vet[i]==undefined){
                this.vet[i] = false;
            }
        }
    }
    diferenca(conj){
        if(conj.max>this.max){
            this.max = conj.max;
        }

        for(let i=1;i<this.max;i++){
            if(this.vet[i]==true && conj.vet[i]==true){
                this.vet[i] = false;
            }
            if(this.vet[i]==undefined){
                this.vet[i] = false;
            }
        }
    }
    converte(){ // pra testar a classe
        let acum = "";
        for(let i=1;i<this.max;i++){
            acum += (i + ") " + this.vet[i] + "\n");
        }
        return acum;
    }
}

conjunto1 = new IntegerSet(5);
conjunto2 = new IntegerSet(6);

conjunto1.insercao(2);
conjunto1.insercao(3);
conjunto1.insercao(4);

conjunto2.insercao(1);
conjunto2.insercao(2);
conjunto2.insercao(3);
conjunto2.insercao(5);

console.log("Inserção:");
console.log("Conjunto 1:\n" + conjunto1.converte());
console.log("Conjunto 2:\n" + conjunto2.converte());

//------------------------

conjunto1.exclusao(2);
conjunto2.exclusao(1);

console.log("Exclusão:");
console.log("Conjunto 1:\n" + conjunto1.converte());
console.log("Conjunto 2:\n" + conjunto2.converte());

//-----------------------

conjunto1.uniao(conjunto2);

console.log("União:");
console.log("Conjunto 1:\n" + conjunto1.converte());

//-----------------------

conjunto2.intersecao(conjunto1);

console.log("Interseção:");
console.log("Conjunto 2:\n" + conjunto2.converte());

//-----------------------

conjunto1.diferenca(conjunto2);

console.log("Diferença:");
console.log("Conjunto 1:\n" + conjunto1.converte());
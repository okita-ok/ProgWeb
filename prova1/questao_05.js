// Código desenvolvido corretamente
// Nota: 2.0

class Venda{
    constructor(id, quant, preco){
        this.id = id;
        this.quant = quant;
        this.preco = preco;
    }
    getId(){
        return this.id;
    }
    setId(novoId){
        this.id = novoId;
    }
    getQuant(){
        return this.quant;
    }
    setQuant(novoQuant){
        this.quant = novoQuant;
    }
    getPreco(){
        return this.preco;
    }
    setPreco(novoPreco){
        this.preco = novoPreco;
    }
    getValorTotal(){
        return this.quant*this.preco;
    }
}

produto1 = new Venda(123,6,40);
produto2 = new Venda(456,2,80);

console.log("Produto1: " + produto1.getValorTotal());
console.log("Produto2: " + produto2.getValorTotal());
